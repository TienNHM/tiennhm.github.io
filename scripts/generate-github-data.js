// Sinh src/data/github.json: số liệu GitHub dùng ở trang chủ (follower và
// danh sách repo nhiều sao nhất).
//
// Vì sao lấy lúc build chứ không gọi API từ trình duyệt: GitHub API giới hạn
// 60 request/giờ cho mỗi IP khi không có token. Người đọc ở cùng một mạng
// (công ty, quán cà phê) dùng chung hạn mức đó, nên khối này sẽ trống với phần
// lớn khách. Lấy một lần lúc build thì trang tĩnh, không cần JS, không hỏng.
//
// File JSON được commit: build vẫn chạy khi không có mạng hay không có token,
// chỉ là số liệu giữ nguyên lần cập nhật gần nhất.
//
// Trong CI, truyền GITHUB_TOKEN để có hạn mức 1000 request/giờ.

const fs = require('fs');
const path = require('path');

const USER = 'TienNHM';
const COUNT = 6;
const OUTPUT = path.join(__dirname, '..', 'src', 'data', 'github.json');

// Repo không muốn hiện dù nhiều sao.
const EXCLUDE = new Set([]);

function normalizeHomepage(url) {
    if (!url) return null;
    return url.replace(/^http:\/\/(tiennhm\.io\.vn|tiennhm\.github\.io)/, 'https://$1');
}

function headers() {
    const h = { accept: 'application/vnd.github+json', 'user-agent': 'site-build' };
    if (process.env.GITHUB_TOKEN) h.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    return h;
}

async function get(url) {
    const res = await fetch(url, { headers: headers() });
    if (!res.ok) throw new Error(`GitHub API trả ${res.status} cho ${new URL(url).pathname}`);
    return res.json();
}

async function fetchUser() {
    const u = await get(`https://api.github.com/users/${USER}`);
    return { followers: u.followers ?? 0, following: u.following ?? 0 };
}

async function fetchRepos() {
    const all = await get(`https://api.github.com/users/${USER}/repos?per_page=100&type=owner`);
    if (!Array.isArray(all)) throw new Error('API không trả về mảng repo');

    return all
        .filter((r) => !r.fork && !r.archived && !r.private && !EXCLUDE.has(r.name))
        .sort((a, b) => b.stargazers_count - a.stargazers_count || b.forks_count - a.forks_count)
        .slice(0, COUNT)
        .map((r) => ({
            name: r.name,
            description: r.description ?? '',
            url: r.html_url,
            // Vài repo còn khai homepage bằng http:// — nâng lên https để
            // khách không phải đi thêm một chặng 301.
            homepage: normalizeHomepage(r.homepage),
            language: r.language ?? null,
            stars: r.stargazers_count,
            forks: r.forks_count,
            topics: (r.topics ?? []).slice(0, 4),
        }));
}

(async () => {
    try {
        const [user, repos] = await Promise.all([fetchUser(), fetchRepos()]);
        if (repos.length === 0) throw new Error('không có repo nào sau khi lọc');

        const payload = { updatedAt: new Date().toISOString(), user, repos };
        fs.writeFileSync(OUTPUT, JSON.stringify(payload, null, 2) + '\n');
        console.log(
            `✓ ${user.followers} follower, ${repos.length} repo: ` +
            repos.map((r) => `${r.name}(${r.stars}★)`).join(', '),
        );
    } catch (err) {
        // Không làm đỏ build: dữ liệu cũ đã commit vẫn dùng được.
        console.warn(`⚠ không cập nhật được repo (${err.message}), giữ nguyên ${path.basename(OUTPUT)}`);
        if (!fs.existsSync(OUTPUT)) {
            const empty = { updatedAt: null, user: { followers: 0, following: 0 }, repos: [] };
            fs.writeFileSync(OUTPUT, JSON.stringify(empty, null, 2) + '\n');
        }
    }
})();
