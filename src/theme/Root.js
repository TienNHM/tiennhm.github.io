import React from 'react';
import Robots from "./Robots";
import SiteStructuredData from "./SiteStructuredData";

// Xác thực đang TẮT.
//
// Site này là landing page + tài liệu kỹ thuật, không có trang nào thực sự cần
// đăng nhập: /login, /profile, /dashboard, /settings trong PROTECTED_PATHS đều
// không tồn tại trong src/pages.
//
// Nhưng AuthCheck bọc mọi trang, nên chỉ cần nó có mặt trong cây là webpack kéo
// `firebase/auth` vào main bundle — 1,2 MB mã, 281 KiB qua mạng, tải và phân
// tích trên MỌI lượt xem blog/docs/trang chủ. Đó là phần lớn Total Blocking
// Time trong báo cáo PageSpeed.
//
// Bỏ dòng import và <AuthCheck> ra khỏi cây là đủ để webpack loại hẳn Firebase
// khỏi đồ thị phụ thuộc; mã trong src/components/Auth và src/components/Login
// vẫn còn nguyên.
//
// NẾU BẬT LẠI: đừng import tĩnh như cũ. Dùng `import()` động bên trong effect,
// chỉ chạy khi đường dẫn thuộc PROTECTED_PATHS, nếu không thì lỗi này quay lại y
// nguyên.
// import { AuthCheck } from "../components/Auth";

// Default implementation, that you can customize
export default function Root({children}) {
  return (
    <>
        <Robots />
        <SiteStructuredData />
        {children}
    </>
  );
}
