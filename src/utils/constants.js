// Dùng thẳng URL đích của ảnh đại diện, không dùng https://github.com/TienNHM.png.
// Đường dẫn đó trả 302 sang chính URL này; với <link rel="preload"> thì một lần
// chuyển hướng khiến trình duyệt không khớp được tài nguyên đã tải trước với
// request thật, nên phần preload thành công cốc và Search Console báo
// "Lỗi chuyển hướng" cho ảnh.
export const AVATAR_URL = "https://avatars.githubusercontent.com/u/33385777?v=4";
export const GITHUB_USER = "TienNHM";

export const LOGIN_PATH = "/login";
export const LOGOUT_PATH = "/logout";
export const AUTHENTICATED = "authenticated";
export const BASE = "/";

export const LOGOUT_BUTTON = "Logout";
export const LOGIN_BUTTON = "Login";

// Add the protected paths here
export const PROTECTED_PATHS = [
    "/profile",
    "/dashboard",
    "/settings",
    "/logout",
];