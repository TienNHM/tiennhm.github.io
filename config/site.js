const organizationName = "TienNHM";
const projectName = "tiennhm.github.io"; // tên repo GitHub, không phải domain
const siteUrl = "https://tiennhm.io.vn"; // domain chính thức (canonical)

// Câu branding chung của site.
//
// ĐỪNG đổi chỗ này thành đọc `process.env.DOCUSAURUS_CURRENT_LOCALE` để chọn
// chuỗi theo locale. Cách đó KHÔNG chạy với `docusaurus build` đa locale:
// Docusaurus nạp config qua `loadFreshModule`, hàm này dùng jiti và giữ lại
// module đã đánh giá dù khai `requireCache: false`. Locale mặc định build
// trước, các locale sau dùng lại đúng object config đó, nên trang tiếng Anh
// nhận chuỗi tiếng Việt. Đã kiểm chứng: gọi loadFreshModule hai lần với hai
// giá trị env khác nhau cho ra kết quả giống hệt.
//
// Bản dịch theo locale nằm ở src/utils/siteDescription.ts (qua translate() và
// i18n/<locale>/code.json). Chuỗi dưới đây chỉ là giá trị mặc định mà
// Docusaurus dùng khi một trang không tự khai description.
const siteDescription =
    'Fullstack Developer — chia sẻ kiến thức chuyên sâu về lập trình, kiến trúc hệ thống, AI và kinh nghiệm triển khai sản phẩm thực tế.';

module.exports = { organizationName, projectName, siteUrl, siteDescription };
