import React from 'react';
import Head from '@docusaurus/Head';
import { useLocation } from '@docusaurus/router';

const INDEXABLE = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
const NOINDEX = 'noindex, follow, max-image-preview:large';

/**
 * Các route chỉ là trang điều hướng/tổng hợp: nội dung mỏng, trùng lặp,
 * không có giá trị xếp hạng. Cho crawler đi qua (follow) nhưng không index.
 */
const THIN_ROUTES = [
    /(^|\/)tags(\/|$)/,       // /docs/tags/*, /blog/tags/*
    /(^|\/)search$/,          // trang tìm kiếm
    /(^|\/)blog\/archive$/,   // trang lưu trữ
    /(^|\/)blog\/authors(\/|$)/,
    /(^|\/)page\/\d+$/,       // phân trang: /blog/page/2

    /*
     * Bốn loại bài lặp lại ở cả 19 module của khoá .NET backend. Số đo trên
     * nội dung thật (đã chuẩn hoá bỏ số thứ tự):
     *
     *   quick-real-world-example  19 trang -> 2 nội dung khác nhau, 18 chữ/trang
     *   mini-case-study           19 trang -> 2 nội dung khác nhau, 42 chữ/trang
     *   advanced-notes            19 trang -> 16 nội dung,          48 chữ/trang
     *   module-orientation        19 trang -> 19 nội dung,         128 chữ/trang
     *                                         (gần như chỉ là danh sách link)
     *
     * Hai loại đầu là nội dung trùng lặp đúng nghĩa: hai trang ở hai module
     * hoàn toàn khác nhau giống hệt nhau từng chữ. Trang mỏng và gần trùng kéo
     * tụt đánh giá chất lượng của cả site, nên cho crawler đi qua (follow) để
     * vẫn truyền được link, nhưng không index.
     *
     * CỐ Ý GIỮ LẠI review-and-assessment: 19 trang là 19 nội dung riêng, trung
     * bình 216 chữ — ngang với bài thường (225 chữ).
     */
    /-(module-orientation|mini-case-study|quick-real-world-example|advanced-notes)$/,
];

/**
 * Locale `en` được build đầy đủ (~950 trang) nhưng chỉ một số ít trang thực sự
 * đã dịch — phần còn lại là nội dung tiếng Việt lặp lại dưới prefix /en/.
 * Chỉ cho index những route đã dịch thật.
 *
 * Khi dịch thêm trang mới sang tiếng Anh, thêm route tương ứng vào đây.
 * Nguồn dịch: i18n/en/
 */
const TRANSLATED_EN_ROUTES = new Set([
    '/en',
    '/en/community',
    '/en/blog/best-extensions-for-vs-code',
    '/en/blog/best-websites-to-learn-javascript',
    '/en/blog/helpful-javascript-utility-functions',
]);

export function resolveRobots(pathname) {
    const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;

    if (THIN_ROUTES.some((re) => re.test(path))) {
        return NOINDEX;
    }
    if (path === '/en' || path.startsWith('/en/')) {
        return TRANSLATED_EN_ROUTES.has(path) ? INDEXABLE : NOINDEX;
    }
    return INDEXABLE;
}

export default function Robots() {
    const { pathname } = useLocation();
    return (
        <Head>
            <meta name="robots" content={resolveRobots(pathname)} />
        </Head>
    );
}
