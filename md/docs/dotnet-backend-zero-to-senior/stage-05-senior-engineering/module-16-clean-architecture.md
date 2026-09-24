# Module 16 — Clean Architecture

> Nguồn: https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-05-senior-engineering/module-16-clean-architecture/
> Clean Architecture & DDD tactical: layers, aggregates, application services — giảm coupling và tăng khả năng kiểm chứng cho CRM lớn.

## Nội dung module

- [16.2 — 1. Vì sao CRM “to ra” là lúc kiến trúc trả giá?](16.2-vi-sao-crm-to-ra-la-luc-kien-truc-tra-gia.mdx)
- [16.3 — 2. Layered architecture (cổ điển nhưng vẫn hữu ích)](16.3-layered-architecture-still-useful.mdx)
- [16.4 — 3. Clean Architecture (Uncle Bob) — dependency rule](16.4-uncle-bob.mdx)
- [16.5 — 4. Vertical Slice Architecture (VSA)](16.5-vertical-slice-architecture.mdx)
- [16.6 — 5. DDD chiến thuật (vừa đủ cho backend)](16.6-ddd-tactics-backend-pragmatic.mdx)
- [16.7 — 6. MediatR — pipeline cho use case](16.7-mediatr-use-case-pipeline.mdx)
- [16.8 — 7. FluentValidation](16.8-fluentvalidation.mdx)
- [16.9 — 8. Domain Events (in-process)](16.9-in-process.mdx)
- [16.10 — 9. Chiến lược test](16.10-testing-strategy-overview.mdx)
- [16.11 — 10. Anti-pattern cần tránh](16.11-anti-patterns-to-avoid.mdx)
- [16.12 — Bổ sung (đối chiếu roadmap.sh)](16.12-roadmap-sh-supplement.mdx)
- [16.13 — Liên hệ CRM](16.13-crm-context.mdx)
- [16.14 — Mở rộng và đào sâu](16.14-advanced-notes.mdx)
- [16.15 — Mini case study](16.15-mini-case-study.mdx)
- [16.16 — Ví dụ thực tế nhanh](16.16-quick-real-world-example.mdx)
- [16.17 — Review and Assessment](16.17-review-and-assessment.mdx)

## Bài liên quan

- [Singleton, Scoped hay Transient? Chọn sai là DbContext sống mãi](https://tiennhm.io.vn/blog/singleton-scoped-transient-captive-dependency) — Ba lifetime trong DI container của ASP.NET Core khác nhau ở thời điểm tạo và thời điểm dispose instance.
