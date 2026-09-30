// Ảnh đại diện tự host trong static/img thay vì trỏ sang avatars.githubusercontent.com.
// Ngoài việc không còn phụ thuộc hạ tầng bên thứ ba cho một tài sản thương hiệu,
// nó cũng giải luôn vấn đề cũ: github.com/TienNHM.png trả 302, mà một lần chuyển
// hướng là <link rel="preload"> không khớp được với request thật.
//
// Đường dẫn gốc `/` chứ không phải URL tuyệt đối: chỗ nào cần tuyệt đối (JSON-LD)
// thì tự ghép với siteConfig.url, để không hardcode domain lần nữa.
export const AVATAR_URL = "/img/tiennhm-avatar.jpg";
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