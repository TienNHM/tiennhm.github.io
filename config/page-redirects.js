// Chuyển hướng cho trang đã gỡ khỏi site (không phải trang tag).
//
// Tách khỏi tag-redirects.js vì hai loại được kiểm bằng hai cách khác nhau:
// tag đối chiếu với blog/tags.yml, còn trang thì đối chiếu với file trong docs.
//
// Đích phải là route CÓ THẬT, nếu không plugin-client-redirects ném lỗi lúc
// build.
module.exports = [
    // Phụ lục Client .NET gỡ ngày 2026-10-01; trang lộ trình vẫn nói rõ vì sao
    // Blazor và .NET MAUI nằm ngoài phạm vi backend-first.
    {
        from: '/docs/dotnet-backend-zero-to-senior/dotnet-optional-client-dotnet',
        to: '/docs/dotnet-backend-zero-to-senior/dotnet-backend-zero-to-senior-roadmap',
    },
    // /docs/database là trang generated-index của thư mục `06-database`. Thư mục
    // đó chỉ chứa đúng khoá SQL, nên trang này và trang index của khoá mô tả
    // cùng 32 file — hai trang tranh nhau cùng một truy vấn. Gỡ trang ngoài,
    // chuyển hướng về khoá.
    {
        from: '/docs/database',
        to: '/docs/database/learn-sql-in-30-days',
    },
];
