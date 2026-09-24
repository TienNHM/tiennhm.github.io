# Module 13 — Entity Framework Core

> Nguồn: https://tiennhm.io.vn/en/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-13-entity-framework-core/
> EF Core: change tracking, migrations, raw SQL, performance patterns — ORM mapping an toàn cho domain CRM.

## Nội dung module

- [13.1 — 1. EF Core Overview](13.1-ef-core-overview.mdx)
- [13.2 — 2. DbContext và Entity Configuration](13.2-dbcontext-and-entity-configuration.mdx)
- [13.3 — 3. Relationships](13.3-relationships.mdx)
- [13.4 — 4. Migrations](13.4-migrations.mdx)
- [13.5 — 5. Query Patterns](13.5-query-patterns.mdx)
- [13.6 — 6. N+1 Problem](13.6-n-plus-1-problem.mdx)
- [13.7 — 7. Performance](13.7-performance.mdx)
- [13.8 — 8. Concurrency Control](13.8-concurrency-control.mdx)
- [13.9 — 9. Unit of Work và Repository Pattern](13.9-unit-of-work-and-repository-pattern.mdx)
- [13.10 — 10. Global Query Filters](13.10-global-query-filters.mdx)
- [13.11 — Mở rộng và đào sâu](13.11-advanced-notes.mdx)
- [13.12 — Mini case study](13.12-mini-case-study.mdx)
- [13.13 — Ví dụ thực tế nhanh](13.13-quick-real-world-example.mdx)
- [13.14 — Review and Assessment](13.14-review-and-assessment.mdx)

## Bài liên quan

- [Vì sao EF Core bắn 201 query cho 1 màn hình danh sách? Cách sửa N+1](https://tiennhm.io.vn/blog/ef-core-n-plus-1-query) — Một màn hình 200 dòng mà log SQL ghi 201 câu lệnh là dấu hiệu của N+1 query.
- [Gọi .Result khi nào thì deadlock, khi nào thì không?](https://tiennhm.io.vn/blog/deadlock-result-wait-csharp) — Gọi .Result hay .Wait() trên một Task treo cứng ứng dụng WPF và ASP.NET Framework, nhưng chạy bình thường trong console và ASP.NET Core.
