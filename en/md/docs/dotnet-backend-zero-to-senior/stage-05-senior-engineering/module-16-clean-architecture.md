# Module 16 — Clean Architecture

> Nguồn: https://tiennhm.io.vn/en/docs/dotnet-backend-zero-to-senior/stage-05-senior-engineering/module-16-clean-architecture/
> Clean Architecture & DDD tactical: layers, aggregates, application services — giảm coupling và tăng khả năng kiểm chứng cho CRM lớn.

## Nội dung module

- [16.1 — 1. Vì sao CRM “to ra” là lúc kiến trúc trả giá?](16.1-vi-sao-crm-to-ra-la-luc-kien-truc-tra-gia.mdx)
- [16.2 — 2. Layered architecture (cổ điển nhưng vẫn hữu ích)](16.2-layered-architecture-still-useful.mdx)
- [16.3 — 3. Clean Architecture (Uncle Bob) — dependency rule](16.3-uncle-bob.mdx)
- [16.4 — 4. Vertical Slice Architecture (VSA)](16.4-vertical-slice-architecture.mdx)
- [16.5 — 5. DDD chiến thuật (vừa đủ cho backend)](16.5-ddd-tactics-backend-pragmatic.mdx)
- [16.6 — 6. MediatR — pipeline cho use case](16.6-mediatr-use-case-pipeline.mdx)
- [16.7 — 7. FluentValidation](16.7-fluentvalidation.mdx)
- [16.8 — 8. Domain Events (in-process)](16.8-in-process.mdx)
- [16.9 — 9. Chiến lược test](16.9-testing-strategy-overview.mdx)
- [16.10 — 10. Anti-pattern cần tránh](16.10-anti-patterns-to-avoid.mdx)
- [16.11 — Bổ sung (đối chiếu roadmap.sh)](16.11-roadmap-sh-supplement.mdx)
- [16.12 — Liên hệ CRM](16.12-crm-context.mdx)
- [16.13 — Mở rộng và đào sâu](16.13-advanced-notes.mdx)
- [16.14 — Mini case study](16.14-mini-case-study.mdx)
- [16.15 — Ví dụ thực tế nhanh](16.15-quick-real-world-example.mdx)
- [16.16 — Review and Assessment](16.16-review-and-assessment.mdx)

## Bài liên quan

- [Singleton, Scoped hay Transient? Chọn sai là DbContext sống mãi](https://tiennhm.io.vn/blog/singleton-scoped-transient-captive-dependency) — Ba lifetime trong DI container của ASP.NET Core khác nhau ở thời điểm tạo và thời điểm dispose instance.
