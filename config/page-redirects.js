// Chuyển hướng cho trang đã gỡ khỏi site (không phải trang tag).
//
// Tách khỏi tag-redirects.js vì hai loại được kiểm bằng hai cách khác nhau:
// tag đối chiếu với blog/tags.yml, còn trang thì đối chiếu với file trong docs.
//
// Đích phải là route CÓ THẬT, nếu không plugin-client-redirects ném lỗi lúc
// build.
module.exports = [
    // Khoá .NET (/docs/dotnet-backend-zero-to-senior/...) và khoá SQL 30 ngày
    // (/docs/database/...) đã chuyển sang site riêng. Plugin này chỉ chuyển
    // hướng nội bộ nên không giữ các URL đó; link trong blog đã trỏ thẳng sang
    // site mới.
];
