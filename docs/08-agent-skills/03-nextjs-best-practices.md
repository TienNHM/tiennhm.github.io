---
title: Phần 3 - Next.js Best Practices
slug: agent-skills-02-nextjs-best-practices
description: Tổng hợp guideline Next.js best practices cho Agent Skills – Routing, Rendering, Data Fetching, Images, Fonts, Metadata, API, Middleware, Environment, Performance, Security.
image: https://nextjs.org/api/docs-og?title=Next.js%20Best%20Practices
sidebar_position: 3
tags:
  - agent-skills
  - nextjs
  - best-practices
  - cursor
keywords: [agent skills, nextjs, best practices, app router, server components, data fetching]
enableComments: true
draft: false
---

import { SummaryBox } from '@site/src/components/SEO';

# Agent Skills - Phần 2: Next.js Best Practices

<SummaryBox>
Tài liệu tổng hợp Next.js Best Practices dùng làm nguồn tham chiếu cho Agent Skills (ví dụ trong Cursor), bao gồm các chủ đề: Routing, Rendering, Data Fetching, Images, Fonts, Metadata, API, Middleware, Environment, Performance và Security. Mỗi guideline được đánh giá mức độ quan trọng và có ví dụ code cụ thể. Nội dung dựa trên bộ guideline từ ui-ux-pro-max-skill, giúp developers và AI Agents xây dựng ứng dụng Next.js hiệu quả và tuân thủ best practices.
</SummaryBox>

Tài liệu này tổng hợp **Next.js Best Practices** dùng làm nguồn tham chiếu cho Agent Skills (ví dụ trong Cursor).  
Nội dung dựa trên bộ guideline từ [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) — file [`nextjs.csv`](https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/refs/heads/main/src/ui-ux-pro-max/data/stacks/nextjs.csv).

**Cập nhật:** 08/02/2026.

**Mức độ:** 🔴 Cao · 🟡 Trung bình · 🟢 Thấp  
**Ví dụ code:** `+` nên · `-` tránh

---

## 1. Routing

### 1.1 🟡 Use App Router for new projects

App Router (`app/`) là cách tiếp cận được khuyến nghị cho Next.js 14+.

- **Nên:** Dùng `app/` directory với `page.tsx` cho route mới.

```diff
+ app/dashboard/page.tsx
```

- **Không nên:** Bắt đầu project mới với `pages/`.

```diff
- pages/dashboard.tsx
```

📖 [`App Router`](https://nextjs.org/docs/app)

---

### 1.2 🟡 Use file-based routing

Routing nên hoàn toàn dựa trên cấu trúc file trong `app/`.

- **Nên:** Dùng `page.tsx` cho route và `layout.tsx` cho layout.

```diff
+ app/blog/[slug]/page.tsx
```

- **Không nên:** Tự cấu hình router thủ công.

```diff
- Custom router setup
```

📖 [Routing fundamentals](https://nextjs.org/docs/app/building-your-application/routing)

---

### 1.3 🟢 Colocate related files

Colocate component, styles, tests ngay cạnh route để dễ bảo trì.

- **Nên:** Đặt component liên quan cạnh `page.tsx`.

```diff
+ app/dashboard/_components/
```

- **Không nên:** Một `components/dashboard/` chung cho mọi nơi.

```diff
- components/dashboard/
```

---

### 1.4 🟢 Use route groups for organization

Route groups giúp tổ chức folder mà không ảnh hưởng URL.

- **Nên:** Dùng dấu ngoặc `()` cho route groups.

```diff
+ (marketing)/about/page.tsx
```

- **Không nên:** Tạo folder thật làm thay đổi URL.

```diff
- marketing/about/page.tsx
```

📖 [Route groups](https://nextjs.org/docs/app/building-your-application/routing/route-groups)

---

### 1.5 🟡 Handle loading states with loading.tsx

Loading UI nên tách riêng bằng `loading.tsx` cho từng route.

- **Nên:** Tạo `loading.tsx` cạnh `page.tsx`.

```diff
+ app/dashboard/loading.tsx
```

- **Không nên:** Dùng `useState` loading trong chính page cho mọi thứ.

```diff
- useState for loading in page
```

📖 [Loading UI and streaming](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)

---

### 1.6 🔴 Handle errors with error.tsx

Error nên được bắt ở cấp route bằng `error.tsx`.

- **Nên:** Tạo `error.tsx` với hàm `reset` để retry.

```diff
+ app/dashboard/error.tsx
```

- **Không nên:** `try/catch` lặp lại trong mọi component.

```diff
- try/catch in page component
```

📖 [Error handling](https://nextjs.org/docs/app/building-your-application/routing/error-handling)

---

## 2. Rendering

### 2.1 🔴 Use Server Components by default

Server Components giúp giảm lượng JS gửi xuống client.

- **Nên:** Giữ component là Server Component trừ khi cần interactivity.

```diff
+ export default function Page() {}
```

- **Không nên:** Thêm `'use client'` khi không cần.

```diff
- ('use client') for static content
```

📖 [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)

---

### 2.2 🔴 Mark Client Components explicitly

Component cần hooks / event handler phải là Client Component có `'use client'`.

- **Nên:** Thêm `'use client'` ở đầu file khi dùng `useState`, `onClick`, ...

```diff
+ 'use client'
+ // component với useState / events
```

- **Không nên:** Dùng hooks trong Server Component hoặc quên directive.

```diff
- No directive with useState
```

📖 [Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)

---

### 2.3 🔴 Push Client Components down

Giữ Client Component ở leaf node để tối thiểu hóa JS phía client.

- **Nên:** Bọc phần interactive trong client wrapper riêng.

```diff
+ <InteractiveButton /> // client leaf
```

- **Không nên:** Đánh dấu cả `page.tsx` là Client Component khi không cần.

```diff
- ('use client') on page.tsx
```

---

### 2.4 🟡 Use streaming with Suspense

Streaming giúp render sớm phần nhanh, trì hoãn phần chậm.

- **Nên:** Dùng `Suspense` cho phần fetch chậm.

```diff
+ <Suspense>
+   <SlowComponent />
+ </Suspense>
```

- **Không nên:** Chờ tất cả data xong rồi mới render.

```diff
- await allData; // rồi mới render
```

📖 [Loading UI and streaming](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)

---

### 2.5 🟡 Choose the correct rendering strategy

Chọn giữa SSG, SSR, ISR tùy đặc tính dữ liệu.

- **Nên:** Dùng `generateStaticParams` + `revalidate` hợp lý.

```diff
+ export const revalidate = 3600;
```

- **Không nên:** Dùng SSR cho nội dung hoàn toàn tĩnh hoặc fetch không cấu hình cache.

```diff
- fetch(url) // không cấu hình cache
```

---

## 3. Data Fetching

### 3.1 🔴 Fetch data in Server Components

Data ban đầu nên fetch trong Server Component async, không phải `useEffect`.

- **Nên:** Fetch trực tiếp trong `async function Page()`.

```diff
+ async function Page() {
+   const data = await fetch(url);
+   // ...
+ }
```

- **Không nên:** Dùng `useEffect` để fetch initial data.

```diff
- useEffect(() => fetch(url), []);
```

📖 [Data fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)

---

### 3.2 🔴 Configure caching explicitly (Next.js 15+)

Trong Next.js 15+, `fetch` mặc định là **uncached** — cần cấu hình cache rõ ràng.

- **Nên:** Chỉ định `cache: 'force-cache'` cho dữ liệu tĩnh.

```diff
+ fetch(url, { cache: 'force-cache' });
```

- **Không nên:** Giả định `fetch(url)` mặc định được cache.

```diff
- fetch(url) // uncached trong v15
```

📖 [Upgrading to v15](https://nextjs.org/docs/app/building-your-application/upgrading/version-15)

---

### 3.3 🟢 Deduplicate fetch requests

Next.js tự dedupe các `fetch` giống nhau – không cần cache layer thủ công trong đa số case.

- **Nên:** Gọi cùng một `fetch` trong nhiều component khi cần.

```diff
+ const data = await fetch(url);
```

- **Không nên:** Tự xây cache trùng lặp khi không cần thiết.

```diff
- Custom cache layer cho cùng URL
```

---

### 3.4 🟡 Use Server Actions for mutations

Server Actions là cách chuẩn để xử lý form/mutation trong App Router.

- **Nên:** Dùng `action={serverAction}` trên form.

```diff
+ <form action={createPost}>
+   ...
+ </form>
```

- **Không nên:** Tạo API Route cho mọi mutation nếu chỉ dùng nội bộ.

```diff
- <form onSubmit={callApiRoute}>
```

📖 [Server Actions & mutations](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)

---

### 3.5 🟡 Revalidate data appropriately

Sau mutation, cần revalidate route hoặc tag để UI luôn mới.

- **Nên:** Dùng `revalidatePath` / `revalidateTag` trong Server Action.

```diff
+ await createPost();
+ revalidatePath('/posts');
```

- **Không nên:** Ở client dùng `router.refresh()` ở khắp nơi để “fix”.

```diff
- router.refresh() ở mọi chỗ
```

📖 [Revalidating data](https://nextjs.org/docs/app/building-your-application/caching#revalidating)

---

## 4. Images

### 4.1 🔴 Use next/image for optimization

`next/image` tối ưu hóa ảnh (lazy load, resize, format) tự động.

- **Nên:** Dùng `<Image>` cho ảnh trong app.

```diff
+ <Image src={url} alt="..." width={400} height={300} />
```

- **Không nên:** Dùng `<img>` trực tiếp cho ảnh trong UI.

```diff
- <img src={url} />
```

📖 [`next/image`](https://nextjs.org/docs/app/building-your-application/optimizing/images)

---

### 4.2 🔴 Provide width and height

Thiếu kích thước ảnh gây layout shift.

- **Nên:** Luôn cung cấp `width`/`height` hoặc `fill`.

```diff
+ <Image src={url} alt="..." width={400} height={300} />
```

- **Không nên:** Bỏ trống kích thước.

```diff
- <Image src={url} alt="..." />
```

---

### 4.3 🟡 Use fill for responsive images

Ảnh full-bleed nên dùng `fill` + parent có `position: relative`.

- **Nên:** Dùng `fill` + `object-cover` cho ảnh phủ container.

```diff
+ <Image fill className="object-cover" />
```

- **Không nên:** Hard-code width/height bằng `window.width`...

```diff
- <Image width={window.width} />
```

---

### 4.4 🔴 Configure remote image domains

Ảnh remote phải được whitelist trong `next.config.js`.

- **Nên:** Cấu hình `remotePatterns` cụ thể.

```diff
+ images: {
+   remotePatterns: [{ hostname: 'cdn.example.com' }],
+ }
```

- **Không nên:** Cho phép `'*'` hoặc cấu hình quá rộng.

```diff
- domains: ['*']
```

📖 [Remote patterns](https://nextjs.org/docs/app/api-reference/components/image#remotepatterns)

---

### 4.5 🟡 Use priority for LCP images

Ảnh hero trên màn hình đầu tiên nên gắn `priority`.

- **Nên:** Dùng `priority` cho ảnh LCP.

```diff
+ <Image priority src={hero} alt="Hero" />
```

- **Không nên:** Gắn `priority` cho mọi ảnh.

```diff
- <Image priority ... /> // cho mọi ảnh
```

---

## 5. Fonts

### 5.1 🟡 Use next/font for fonts

`next/font` giúp self-host font và tránh layout shift.

- **Nên:** Dùng `next/font/google` hoặc `next/font/local`.

```diff
+ import { Inter } from 'next/font/google';
```

- **Không nên:** Nhúng link Google Fonts trực tiếp.

```diff
- <link href="https://fonts.googleapis.com/..." />
```

📖 [Optimizing fonts](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)

---

### 5.2 🟢 Apply font to layout

Font nên được áp dụng ở root layout để đồng nhất.

- **Nên:** Set `className` cho `<body>` trong `layout.tsx`.

```diff
+ <body className={inter.className}>
```

- **Không nên:** Import font riêng ở từng page.

```diff
- Mỗi page tự import font
```

---

### 5.3 🟢 Use variable fonts

Variable font giảm số file & kích thước bundle.

- **Nên:** Dùng 1 variable font cho nhiều weight.

```diff
+ Inter({ subsets: ['latin'] })
```

- **Không nên:** Import từng weight thành nhiều file riêng.

```diff
- Inter_400, Inter_500, Inter_700
```

---

## 6. Metadata

### 6.1 🟡 Use generateMetadata for dynamic metadata

Metadata động nên được generate từ `generateMetadata`.

- **Nên:** Dùng `generateMetadata({ params })` cho page động.

```diff
+ export async function generateMetadata({ params }) {
+   return { title: params.slug };
+ }
```

- **Không nên:** Hard-code metadata khắp nơi.

```diff
- export const metadata = {};
```

📖 [Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)

---

### 6.2 🟡 Include OpenGraph images

OG image giúp sharing social đẹp & thống nhất.

- **Nên:** Cấu hình Open Graph images.

```diff
+ export const metadata = {
+   openGraph: { images: ['/og.png'] },
+ };
```

- **Không nên:** Bỏ trống OG image cho các trang quan trọng.

```diff
- No OG configuration
```

---

### 6.3 🟡 Use metadata API instead of manual head tags

Dùng `metadata`/`generateMetadata` thay vì tự viết `<head>`.

- **Nên:** Export `metadata` object.

```diff
+ export const metadata = { title: 'Page' };
```

- **Không nên:** Viết thẳng `<head><title>...</title></head>`.

```diff
- <head><title>Page</title></head>
```

---

## 7. API

### 7.1 🟡 Use Route Handlers for APIs

Trong App Router, API nên dùng **Route Handlers** trong `app/api`.

- **Nên:** Tạo route dưới `app/api/.../route.ts`.

```diff
+ app/api/users/route.ts
```

- **Không nên:** Dùng `pages/api` cho project mới.

```diff
- pages/api/...
```

📖 [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

---

### 7.2 🟡 Return proper Response objects

API nên trả về `NextResponse` thay vì object thuần.

- **Nên:** Dùng `NextResponse.json()` cho JSON.

```diff
+ return NextResponse.json({ data });
```

- **Không nên:** Trả về plain object.

```diff
- return { data };
```

---

### 7.3 🟢 Handle HTTP methods explicitly

Mỗi HTTP method nên là 1 hàm export riêng (`GET`, `POST`, ...).

- **Nên:** Export các hàm `GET`/`POST`/... rõ ràng.

```diff
+ export async function POST(request: Request) {}
```

- **Không nên:** Dùng một handler switch trên `req.method`.

```diff
- switch (req.method) { ... }
```

---

### 7.4 🔴 Validate request body

Input từ client luôn phải validate & sanitize.

- **Nên:** Dùng Zod (hoặc lib tương đương) parse body.

```diff
+ const body = schema.parse(await request.json());
```

- **Không nên:** Tin tưởng dữ liệu client gửi lên.

```diff
- const body = await request.json();
```

---

## 8. Middleware

### 8.1 🟡 Use middleware for auth

Middleware giúp bảo vệ route tập trung thay vì lặp lại trong page.

- **Nên:** Đặt logic auth trong `middleware.ts` ở root.

```diff
+ export function middleware(request: NextRequest) {
+   // auth check
+ }
```

- **Không nên:** Check auth trong từng page một.

```diff
- if (!session) redirect trong mọi page
```

📖 [Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)

---

### 8.2 🟡 Match specific paths

Middleware chỉ nên chạy trên các path cần thiết.

- **Nên:** Cấu hình `config.matcher`.

```diff
+ export const config = {
+   matcher: ['/dashboard/:path*'],
+ };
```

- **Không nên:** Để middleware chạy trên mọi route.

```diff
- No matcher config
```

---

### 8.3 🔴 Keep middleware edge-compatible

Middleware chạy trên **Edge Runtime**, không dùng API Node.js.

- **Nên:** Viết code edge-compatible (không dùng `fs`, v.v.).

```diff
+ Edge-compatible auth check
```

- **Không nên:** Dùng API Node như `fs`, `crypto` (bản Node), ...

```diff
- fs.readFile in middleware
```

---

## 9. Environment

### 9.1 🔴 Use NEXT_PUBLIC prefix for client env

Env dùng ở client phải có prefix `NEXT_PUBLIC_`.

- **Nên:** Đặt biến public với prefix rõ ràng.

```diff
+ NEXT_PUBLIC_API_URL
```

- **Không nên:** Lộ server secret ra client.

```diff
- API_SECRET dùng trong client code
```

📖 [Environment variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)

---

### 9.2 🔴 Validate env vars

Thiếu env quan trọng phải fail sớm khi khởi động.

- **Nên:** Validate env trong startup code.

```diff
+ if (!process.env.DATABASE_URL) throw new Error('Missing DATABASE_URL');
```

- **Không nên:** Dùng env trực tiếp, để đến runtime mới lỗi.

```diff
- process.env.DATABASE_URL // có thể undefined
```

---

### 9.3 🔴 Use .env.local for secrets

Secrets dev nên đặt trong `.env.local` (được gitignore).

- **Nên:** Dùng `.env.local` cho secret development.

```diff
+ .env.local với DATABASE_PASSWORD
```

- **Không nên:** Commit secret trong `.env`.

```diff
- .env với DATABASE_PASSWORD
```

---

## 10. Performance

### 10.1 🟡 Analyze bundle size

Luôn theo dõi kích thước bundle bằng bundle analyzer.

- **Nên:** Bật `@next/bundle-analyzer` khi build.

```diff
+ ANALYZE=true npm run build
```

- **Không nên:** Ship bundle lớn mà không đo đạc.

```diff
- No bundle analysis
```

📖 [Bundle analyzer](https://nextjs.org/docs/app/building-your-application/optimizing/bundle-analyzer)

---

### 10.2 🟡 Use dynamic imports

Component nặng nên được lazy-load bằng `next/dynamic`.

- **Nên:** Dùng `dynamic()` cho phần ít dùng/nặng.

```diff
+ const Chart = dynamic(() => import('./Chart'));
```

- **Không nên:** Import mọi thứ statically.

```diff
- import Chart from './Chart';
```

📖 [Lazy loading](https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading)

---

### 10.3 🔴 Avoid layout shifts

Tránh nội dung “nhảy” khi load bằng skeleton/aspect ratio.

- **Nên:** Dùng skeleton với chiều cao/ratio cố định.

```diff
+ <Skeleton className="h-48" />
```

- **Không nên:** Để content xuất hiện đột ngột không chừa chỗ.

```diff
- No placeholder for async content
```

---

### 10.4 🟢 Use Partial Prerendering

Partial Prerendering kết hợp shell tĩnh với phần động.

- **Nên:** Render header/footer tĩnh + nội dung động trong `Suspense`.

```diff
+ Static header + dynamic content
```

- **Không nên:** Toàn bộ page đều SSR hoặc toàn bộ tĩnh dù cần realtime.

```diff
- Entire page SSR cho mọi thứ
```

📖 [Partial prerendering](https://nextjs.org/docs/app/building-your-application/rendering/partial-prerendering)

---

## 11. Links & Navigation

### 11.1 🔴 Use next/link for navigation

Navigation nội bộ nên dùng `next/link` để có prefetch + client routing.

- **Nên:** Dùng `<Link href="/about">` cho internal links.

```diff
+ <Link href="/about">About</Link>
```

- **Không nên:** Dùng `<a>` cho điều hướng nội bộ.

```diff
- <a href="/about">About</a>
```

📖 [`next/link`](https://nextjs.org/docs/app/api-reference/components/link)

---

### 11.2 🟢 Prefetch strategically

Không phải link nào cũng cần prefetch – cân nhắc chi phí.

- **Nên:** Tắt `prefetch` cho link ít dùng / bên dưới viewport.

```diff
+ <Link href="/heavy" prefetch={false}>
```

- **Không nên:** Prefetch mọi link không cần thiết.

```diff
- Prefetch mặc định cho mọi link nặng
```

---

### 11.3 🟢 Use scroll option appropriately

Một số navigation (tab, pagination) không nên scroll lên đầu trang.

- **Nên:** Dùng `scroll={false}` khi muốn giữ nguyên vị trí scroll.

```diff
+ <Link href="?page=2" scroll={false}>
```

- **Không nên:** Tự quản lý scroll thủ công ở mọi nơi.

```diff
- Manual scroll management
```

---

## 12. Config & Deployment

### 12.1 🟡 Use next.config.js correctly

`next.config.js` là nơi cấu hình chính thức cho Next.js.

- **Nên:** Dùng option đúng & cập nhật (ví dụ `images.remotePatterns`).

```diff
+ images: { remotePatterns: [] }
```

- **Không nên:** Dùng option deprecated / sai kiểu.

```diff
- images: { domains: [] } // với remotePatterns mới
```

📖 [`next.config.js`](https://nextjs.org/docs/app/api-reference/next-config-js)

---

### 12.2 🟡 Enable React strict mode

Strict mode giúp phát hiện bug sớm trong dev.

- **Nên:** Bật `reactStrictMode: true`.

```diff
+ reactStrictMode: true
```

- **Không nên:** Tắt strict mode trừ khi có lý do rất rõ.

```diff
- reactStrictMode: false
```

---

### 12.3 🟡 Configure redirects and rewrites

Redirect/rewrite nên được cấu hình tập trung trong `next.config.js`.

- **Nên:** Dùng `redirects()` / `rewrites()` trong config.

```diff
+ async redirects() {
+   return [{ source: '/old', destination: '/new', permanent: true }];
+ }
```

- **Không nên:** Gọi `res.redirect` rải rác trong page.

```diff
- res.redirect('/new') trong page
```

📖 [Redirects](https://nextjs.org/docs/app/api-reference/next-config-js/redirects)

---

### 12.4 🟢 Use Vercel for easiest deploy

Vercel là platform được tối ưu cho Next.js.

- **Nên:** Deploy trực tiếp lên Vercel khi không có yêu cầu hạ tầng đặc biệt.

```diff
+ vercel deploy
```

- **Không nên:** Dùng Docker/self-host phức tạp cho app đơn giản.

```diff
- Complex Docker setup for simple app
```

📖 [Deploying](https://nextjs.org/docs/app/building-your-application/deploying)

---

### 12.5 🟡 Configure output for self-hosting

Khi tự host (Docker, VM), cần cấu hình `output: 'standalone'`.

- **Nên:** Set `output: 'standalone'` trong config.

```diff
+ output: 'standalone'
```

- **Không nên:** Giữ default output khi build cho container.

```diff
- No output config for Docker
```

📖 [Self hosting](https://nextjs.org/docs/app/building-your-application/deploying#self-hosting)

---

## 13. Security

### 13.1 🔴 Sanitize user input

Không bao giờ tin dữ liệu người dùng – luôn sanitize/escape.

- **Nên:** Sanitize HTML trước khi render.

```diff
+ DOMPurify.sanitize(userInput)
```

- **Không nên:** Render trực tiếp input người dùng bằng `dangerouslySetInnerHTML`.

```diff
- dangerouslySetInnerHTML={{ __html: userInput }}
```

---

### 13.2 🔴 Use CSP headers

Content Security Policy giúp chặn nhiều dạng XSS.

- **Nên:** Cấu hình CSP trong `next.config.js` hoặc header.

```diff
+ headers() {
+   return [{ source: '/(.*)', headers: [{ key: 'Content-Security-Policy', value: '...' }] }];
+ }
```

- **Không nên:** Deploy mà không có bất kỳ security header nào.

```diff
- No CSP configuration
```

📖 [Content Security Policy](https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy)

---

### 13.3 🔴 Validate Server Action input

Server Action là endpoint public – phải validate & authorize.

- **Nên:** Check quyền + validate input trong Server Action.

```diff
+ async function createPost(formData: FormData) {
+   requireAuth();
+   const data = schema.parse(formData);
+ }
```

- **Không nên:** Gọi DB trực tiếp trong Server Action mà không check gì.

```diff
- Direct database call without check
```

---

## Tóm tắt

| Nhóm          | Số guideline | Mức độ ưu tiên   |
|--------------|-------------|------------------|
| Routing      | 6           | 🟡–🔴            |
| Rendering    | 5           | 🟡–🔴            |
| Data Fetching| 5           | 🟢–🔴            |
| Images       | 5           | 🟡–🔴            |
| Fonts        | 3           | 🟢–🟡            |
| Metadata     | 3           | 🟡               |
| API          | 4           | 🟢–🔴            |
| Middleware   | 3           | 🟡–🔴            |
| Environment  | 3           | 🔴               |
| Performance  | 4           | 🟢–🔴            |
| Links        | 3           | 🟢–🔴            |
| Config/Deploy| 5           | 🟢–🟡            |
| Security     | 3           | 🔴               |

Nguồn dữ liệu: [`nextjs.csv`](https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/refs/heads/main/src/ui-ux-pro-max/data/stacks/nextjs.csv) — [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill).

