# Module 10 — Authentication + Authorization

> Nguồn: https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-03-aspnet-core-backend/module-10-authentication-authorization/
> Xác thực & phân quyền ASP.NET Core: JWT, OAuth2/OIDC, cookie, policy-based authorization — mô hình bảo mật đa tenant cho CRM.

## Nội dung module

- [10.2 — 1. Authentication so với Authorization](10.2-authentication-vs-authorization.mdx)
- [10.3 — 2. JWT Authentication](10.3-jwt-authentication.mdx)
- [10.4 — 3. Refresh Token](10.4-refresh-token.mdx)
- [10.5 — 4. Role-based Authorization](10.5-role-based-authorization.mdx)
- [10.6 — 5. Policy-based Authorization](10.6-policy-based-authorization.mdx)
- [10.7 — 6. Resource-based Authorization](10.7-resource-based-authorization.mdx)
- [10.8 — 7. Permission System](10.8-permission-system.mdx)
- [10.9 — 8. ASP.NET Core Identity (Overview)](10.9-overview.mdx)
- [10.10 — 9. External Login và OAuth2 (Overview)](10.10-overview.mdx)
- [10.11 — 10. Security Best Practices](10.11-security-best-practices.mdx)
- [10.12 — Mở rộng và đào sâu](10.12-advanced-notes.mdx)
- [10.13 — Mini case study](10.13-mini-case-study.mdx)
- [10.14 — Ví dụ thực tế nhanh](10.14-quick-real-world-example.mdx)
- [10.15 — Review and Assessment](10.15-review-and-assessment.mdx)

## Bài liên quan

- [Đổi id trên URL ra dữ liệu người khác? Chặn IDOR ở một tầng duy nhất](https://tiennhm.io.vn/blog/idor-broken-access-control-aspnet-core) — IDOR xảy ra khi API nhận id từ request rồi đọc thẳng bản ghi mà không hỏi xem người gọi có sở hữu bản ghi đó không.
- [Dựng một nền tảng CRM multi-tenant từ con số không: chuyện nghề 20 tháng](https://tiennhm.io.vn/blog/founding-engineer-nen-tang-crm-abp-dotnet-angular) — Sản phẩm đầu tiên mình được giao init và dựng từ đầu: một nền tảng CRM multi-tenant, đi demo cho nhiều ngành gần một năm rồi chuyển sang delivery…
