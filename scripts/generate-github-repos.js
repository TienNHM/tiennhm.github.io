// Sinh src/data/github-repos.json cho khối "Top repositories" ở trang chủ.
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
const OUTPUT = path.join(__dirname, '..', 'src', 'data', 'github-repos.json');

// Repo không muốn hiện dù nhiều sao.
const EXCLUDE = new Set([]);

function normalizeHomepage(url) {
    if (!url) return null;
    return url.replace(/^http:\/\/(tiennhm\.io\.vn|tiennhm\.github\.io)/, 'https://$1');
}

async function fetchRepos() {
    const headers = { accept: 'application/vnd.github+json', 'user-agent': 'site-build' };
    if (process.env.GITHUB_TOKEN) headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

    const res = await fetch(
        `https://api.github.com/users/${USER}/repos?per_page=100&type=owner`,
        { headers },
    );
    if (!res.ok) throw new Error(`GitHub API trả ${res.status}`);

    const all = await res.json();
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
        const repos = await fetchRepos();
        if (repos.length === 0) throw new Error('không có repo nào sau khi lọc');

        fs.writeFileSync(OUTPUT, JSON.stringify({ updatedAt: new Date().toISOString(), repos }, null, 2) + '\n');
        console.log(`✓ ${repos.length} repo: ` + repos.map((r) => `${r.name}(${r.stars}★)`).join(', '));
    } catch (err) {
        // Không làm đỏ build: dữ liệu cũ đã commit vẫn dùng được.
        console.warn(`⚠ không cập nhật được repo (${err.message}), giữ nguyên ${path.basename(OUTPUT)}`);
        if (!fs.existsSync(OUTPUT)) {
            fs.writeFileSync(OUTPUT, JSON.stringify({ updatedAt: null, repos: [] }, null, 2) + '\n');
        }
    }
})();
