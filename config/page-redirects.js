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
];
