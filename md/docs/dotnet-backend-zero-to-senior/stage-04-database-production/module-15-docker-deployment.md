# Module 15 — Docker + Deployment

> Nguồn: https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior/stage-04-database-production/module-15-docker-deployment/
> Container hóa và triển khai: Dockerfile multi-stage, compose, health checks, reverse proxy — pipeline production-like cho .NET.

## Nội dung module

- [15.1 — 1. Docker Fundamentals](15.1-docker-fundamentals.mdx)
- [15.2 — 2. Dockerfile cho ASP.NET Core](15.2-dockerfile-for-aspnet-core.mdx)
- [15.3 — 3. Docker Compose](15.3-docker-compose.mdx)
- [15.4 — 4. Environment và Secrets](15.4-environment-and-secrets.mdx)
- [15.5 — 5. Linux VPS Deployment](15.5-linux-vps-deployment.mdx)
- [15.6 — 6. GitHub Actions CI/CD](15.6-github-actions-ci-cd.mdx)
- [15.7 — 7. Azure Deployment](15.7-azure-deployment.mdx)
- [15.8 — 8. Production Monitoring](15.8-production-monitoring.mdx)
- [15.9 — 9. Kubernetes Intro (Awareness Level)](15.9-awareness-level.mdx)
- [15.10 — 10. .NET Aspire (.NET 8+)](15.10-dotnet-aspire-dotnet-8-plus.mdx)
- [15.11 — Mở rộng và đào sâu](15.11-advanced-notes.mdx)
- [15.12 — Mini case study](15.12-mini-case-study.mdx)
- [15.13 — Ví dụ thực tế nhanh](15.13-quick-real-world-example.mdx)
- [15.14 — Review and Assessment](15.14-review-and-assessment.mdx)

## Bài liên quan

- [Traefik + Cloudflare: vì sao cert hết hạn đồng loạt sau 60 ngày?](https://tiennhm.io.vn/blog/traefik-cloudflare-https-tu-dong-vps) — Một VPS, 14 container, 13 hostname, tất cả nằm sau Cloudflare và đều cần HTTPS tự động.
- [Dựng một nền tảng CRM multi-tenant từ con số không: chuyện nghề 20 tháng](https://tiennhm.io.vn/blog/founding-engineer-nen-tang-crm-abp-dotnet-angular) — Sản phẩm đầu tiên mình được giao init và dựng từ đầu: một nền tảng CRM multi-tenant, đi demo cho nhiều ngành gần một năm rồi chuyển sang delivery…
- [Một dấu tiếng Việt làm chết lời gọi API: cf-ipcity, HttpClient và giới hạn ASCII](https://tiennhm.io.vn/blog/cloudflare-header-broke-dotnet-httpclient) — Trên một nền tảng loyalty thương mại điện tử khoảng 3 triệu khách hàng, một lời gọi HTTP nội bộ hỏng trên production trong khi database, Kubernetes…
