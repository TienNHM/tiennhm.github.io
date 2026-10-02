# Sơ đồ Mermaid sai cú pháp không làm đỏ build

> Nguồn: https://tiennhm.io.vn/en/notes/2026/10/01/mermaid-khong-lam-do-build
> Mermaid render ở trình duyệt, nên lỗi chỉ hiện thành hộp đỏ trên trang. Cách bắt tại chỗ.

Docusaurus render Mermaid **ở phía trình duyệt**. Hệ quả: một sơ đồ sai cú pháp vẫn build xanh, vẫn deploy, và chỉ hiện thành hộp báo lỗi đỏ khi có người mở đúng trang đó.

Bắt tại chỗ được, dù hơi vòng. `mermaid.parse()` cần DOM (nó gọi DOMPurify), nhưng **lỗi ngữ pháp được ném ra trước bước đó**:

```js
const mermaid = (await import('mermaid')).default;
try {
  await mermaid.parse(code);
} catch (err) {
  const msg = String(err.message);
  // Chỉ lỗi cú pháp mới đáng quan tâm; lỗi DOMPurify là do thiếu DOM.
  if (/parse error|syntax error|expecting/i.test(msg)) report(msg);
}
```

Một chi tiết suýt làm tôi tin nhầm: lần tiêm lỗi thử nghiệm đầu tiên **không ăn**, vì chuỗi tôi chèn vẫn nằm trong dấu nháy nên vẫn hợp lệ. Phải dùng ngoặc vuông không đóng mới ra lỗi thật.

Checker luôn xanh thì vô dụng. Luôn thử làm nó đỏ trước khi tin nó.
