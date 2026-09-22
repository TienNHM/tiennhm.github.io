import { translate } from "@docusaurus/Translate";

/**
 * Câu branding dùng chung cho meta description của trang chủ và cho node
 * WebSite trong JSON-LD site-wide.
 *
 * VÌ SAO KHÔNG ĐẶT TRONG docusaurus.config.js:
 * Cách làm hiển nhiên là đọc `process.env.DOCUSAURUS_CURRENT_LOCALE` trong
 * config rồi chọn chuỗi theo locale. Cách đó KHÔNG chạy với `docusaurus build`
 * đa locale: Docusaurus nạp config qua `loadFreshModule`, mà hàm này dùng jiti
 * và giữ lại module đã đánh giá dù khai `requireCache: false`. Locale mặc định
 * (vi) build trước, và mọi locale sau đó dùng lại đúng object config ấy — nên
 * trang tiếng Anh nhận mô tả tiếng Việt. Đã kiểm chứng bằng cách gọi
 * loadFreshModule hai lần với hai giá trị env khác nhau: kết quả giống hệt.
 *
 * `translate()` thì chạy ở runtime của bundle, đọc từ i18n/<locale>/code.json
 * đã được biên dịch riêng cho từng locale, nên không dính vấn đề trên.
 */
export function getSiteDescription(): string {
  return translate({
    id: "site.description",
    message:
      "Fullstack Developer — chia sẻ kiến thức chuyên sâu về lập trình, kiến trúc hệ thống, AI và kinh nghiệm triển khai sản phẩm thực tế.",
    description: "Câu branding chung của site, dùng cho meta description và JSON-LD",
  });
}
