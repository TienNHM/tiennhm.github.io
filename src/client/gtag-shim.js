/**
 * Docusaurus (@docusaurus/plugin-google-gtag) gọi window.gtag() khi đổi route SPA.
 * GTM chỉ gắn dataLayer — không luôn tạo window.gtag. Inline script của plugin
 * cũng có thể không chạy (CSP/adblock). Chuẩn Google: stub push(arguments).
 */
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

if (ExecutionEnvironment.canUseDOM && typeof window.gtag !== 'function') {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
}
