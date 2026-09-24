# Module 7 — Dependency Injection

> Nguồn: https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-02-csharp-professional/module-07-dependency-injection/
> Dependency injection trong .NET: service lifetime, composition root, options pattern — khớp với container ASP.NET Core và kiểm thử đơn vị.

## Nội dung module

- [7.2 — Vấn đề DI giải quyết](7.2-di-problem-scope.mdx)
- [7.3 — 1. IoC Container và DI Container](7.3-ioc-container-and-di-container.mdx)
- [7.4 — 2. Ba cách tiêm dependency](7.4-three-ways-register-services.mdx)
- [7.5 — 3. Service Lifetimes](7.5-service-lifetimes.mdx)
- [7.6 — 4. Registering Services](7.6-registering-services.mdx)
- [7.7 — 5. Program.cs và WebApplicationBuilder](7.7-program-cs-and-webapplicationbuilder.mdx)
- [7.8 — 6. Options Pattern](7.8-options-pattern.mdx)
- [7.9 — 7. Keyed Services (.NET 8)](7.9-keyed-services.mdx)
- [7.10 — 8. Anti-patterns](7.10-anti-patterns.mdx)
- [7.11 — Mở rộng và đào sâu](7.11-advanced-notes.mdx)
- [7.12 — Mini case study](7.12-mini-case-study.mdx)
- [7.13 — Ví dụ thực tế nhanh](7.13-quick-real-world-example.mdx)
- [7.14 — Review and Assessment](7.14-review-and-assessment.mdx)

## Bài liên quan

- [Singleton, Scoped hay Transient? Chọn sai là DbContext sống mãi](https://tiennhm.io.vn/blog/singleton-scoped-transient-captive-dependency) — Ba lifetime trong DI container của ASP.NET Core khác nhau ở thời điểm tạo và thời điểm dispose instance.
- [Forward header trong ASP.NET Core: vì sao 'forward hết' là một lỗi kiến trúc](https://tiennhm.io.vn/blog/forward-http-header-an-toan-aspnet-core) — Vòng lặp copy mọi header từ request đi vào sang lời gọi HttpClient đi ra là đoạn code trông vô hại nhất mà tôi từng thấy gây sự cố production.
