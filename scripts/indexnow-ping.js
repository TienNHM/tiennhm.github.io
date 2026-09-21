#!/usr/bin/env node
/**
 * indexnow-ping.js
 *
 * Đẩy danh sách URL của site lên IndexNow (Bing, Yandex, Seznam, Naver…) để
 * các search engine này biết có nội dung mới/thay đổi mà không phải chờ crawl.
 *
 * ⚠️ ĐÂY LÀ SCRIPT CHẠY TAY. Cố ý KHÔNG gắn vào `npm run build`:
 *    một lần build không đồng nghĩa với một lần deploy, và việc tự động ping
 *    search engine mỗi lần build là cách nhanh nhất để bị coi là spam.
 *
 * Dùng:
 *   npm run seo:indexnow -- --dry-run          # xem trước, không gửi gì
 *   npm run seo:indexnow                       # gửi toàn bộ URL trong sitemap
 *   npm run seo:indexnow -- --url https://tiennhm.io.vn/blog/bai-moi
 *   npm run seo:indexnow -- --sitemap build/sitemap.xml
 *
 * Yêu cầu: site đã deploy và file key truy cập được tại
 *   https://tiennhm.io.vn/<KEY>.txt
 * (xem SEO-NEXT-STEPS.md). IndexNow sẽ fetch file này để xác thực quyền sở hữu.
 */

const fs = require('fs');
const path = require('path');

// Đồng bộ với hằng `siteUrl` trong docusaurus.config.js.
const SITE_URL = 'https://tiennhm.io.vn';
const HOST = 'tiennhm.io.vn';

const ROOT = path.resolve(__dirname, '..');
const STATIC_DIR = path.join(ROOT, 'static');
const ENDPOINT = 'https://api.indexnow.org/indexnow';

// IndexNow giới hạn 10.000 URL mỗi request.
const MAX_URLS_PER_REQUEST = 10000;

function parseArgs(argv) {
    const args = { urls: [], dryRun: false, sitemap: null, key: null };
    for (let i = 2; i < argv.length; i += 1) {
        const a = argv[i];
        if (a === '--dry-run') args.dryRun = true;
        else if (a === '--url') args.urls.push(argv[++i]);
        else if (a === '--sitemap') args.sitemap = argv[++i];
        else if (a === '--key') args.key = argv[++i];
        else if (a === '--help' || a === '-h') args.help = true;
        else console.warn(`[indexnow] bỏ qua tham số lạ: ${a}`);
    }
    return args;
}

/**
 * Key được lấy từ chính file `static/<key>.txt` — nguồn sự thật duy nhất, để
 * không bao giờ lệch giữa key gửi đi và key mà IndexNow fetch về.
 */
function findKey(explicitKey) {
    if (explicitKey) return explicitKey;
    if (process.env.INDEXNOW_KEY) return process.env.INDEXNOW_KEY;

    const candidates = fs
        .readdirSync(STATIC_DIR)
        .filter((f) => /^[0-9a-f]{32,64}\.txt$/i.test(f));

    if (candidates.length === 0) {
        throw new Error(
            'Không tìm thấy file key IndexNow trong static/. ' +
                'Tạo bằng: openssl rand -hex 32 → static/<key>.txt (nội dung đúng bằng key).'
        );
    }
    if (candidates.length > 1) {
        throw new Error(
            `Có ${candidates.length} file key trong static/ (${candidates.join(', ')}). ` +
                'Dùng --key <key> để chỉ định rõ.'
        );
    }

    const file = candidates[0];
    const keyFromName = file.replace(/\.txt$/i, '');
    const keyFromBody = fs.readFileSync(path.join(STATIC_DIR, file), 'utf8').trim();

    if (keyFromName !== keyFromBody) {
        throw new Error(
            `static/${file}: nội dung file ("${keyFromBody}") không khớp tên file. ` +
                'IndexNow sẽ từ chối. Sửa lại cho khớp.'
        );
    }
    return keyFromBody;
}

function readSitemapUrls(sitemapPath) {
    if (!fs.existsSync(sitemapPath)) {
        throw new Error(
            `Không thấy sitemap tại ${sitemapPath}. Chạy \`npm run build\` trước, ` +
                'hoặc chỉ định --sitemap <đường dẫn>, hoặc dùng --url để gửi từng URL.'
        );
    }
    const xml = fs.readFileSync(sitemapPath, 'utf8');
    const locs = xml.match(/<loc>\s*([^<]*?)\s*<\/loc>/g) || [];
    return locs
        .map((m) => m.replace(/<\/?loc>/g, '').trim())
        .filter((u) => u.startsWith(SITE_URL));
}

async function submit(key, urls, dryRun) {
    const payload = {
        host: HOST,
        key,
        keyLocation: `${SITE_URL}/${key}.txt`,
        urlList: urls,
    };

    if (dryRun) {
        console.log('[indexnow] --dry-run: KHÔNG gửi request. Payload sẽ là:');
        console.log(JSON.stringify({ ...payload, urlList: urls.slice(0, 5) }, null, 2));
        if (urls.length > 5) console.log(`  … và ${urls.length - 5} URL nữa`);
        return true;
    }

    const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(payload),
    });

    const body = await res.text().catch(() => '');

    // IndexNow: 200 = nhận, 202 = nhận nhưng key đang chờ xác thực.
    if (res.status === 200 || res.status === 202) {
        console.log(`[indexnow] HTTP ${res.status} — đã gửi ${urls.length} URL.`);
        if (res.status === 202) {
            console.log(
                `[indexnow] 202 = key đang chờ xác thực. Kiểm tra ${SITE_URL}/${key}.txt đã live chưa.`
            );
        }
        return true;
    }

    console.error(`[indexnow] HTTP ${res.status} ${res.statusText}`);
    if (body) console.error(`[indexnow] response: ${body.slice(0, 500)}`);
    console.error(
        {
            400: '400 — payload sai định dạng.',
            403: '403 — key không hợp lệ hoặc không fetch được file key trên host.',
            422: '422 — URL không thuộc host đã khai, hoặc key không khớp schema.',
            429: '429 — gửi quá nhiều. Chờ rồi thử lại.',
        }[res.status] || 'Lỗi không xác định từ IndexNow.'
    );
    return false;
}

async function main() {
    const args = parseArgs(process.argv);

    if (args.help) {
        console.log(fs.readFileSync(__filename, 'utf8').split('*/')[0]);
        return;
    }

    const key = findKey(args.key);

    let urls = args.urls;
    if (urls.length === 0) {
        const sitemapPath = path.resolve(ROOT, args.sitemap || 'build/sitemap.xml');
        urls = readSitemapUrls(sitemapPath);
        console.log(`[indexnow] đọc ${urls.length} URL từ ${path.relative(ROOT, sitemapPath)}`);
    }

    // Loại URL trùng, giữ nguyên thứ tự.
    urls = [...new Set(urls)];

    const invalid = urls.filter((u) => !u.startsWith(SITE_URL));
    if (invalid.length) {
        throw new Error(
            `${invalid.length} URL không thuộc ${SITE_URL} (IndexNow sẽ trả 422): ${invalid
                .slice(0, 3)
                .join(', ')}`
        );
    }

    if (urls.length === 0) {
        console.log('[indexnow] không có URL nào để gửi.');
        return;
    }

    console.log(`[indexnow] host=${HOST} key=${key.slice(0, 8)}… urls=${urls.length}`);

    let ok = true;
    for (let i = 0; i < urls.length; i += MAX_URLS_PER_REQUEST) {
        const batch = urls.slice(i, i + MAX_URLS_PER_REQUEST);
        // eslint-disable-next-line no-await-in-loop
        const result = await submit(key, batch, args.dryRun);
        ok = ok && result;
    }

    if (!ok) process.exitCode = 1;
}

main().catch((err) => {
    console.error(`[indexnow] ${err.message}`);
    process.exitCode = 1;
});
