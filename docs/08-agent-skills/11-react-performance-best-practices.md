---
title: Phần 11 - React Performance Best Practices
slug: agent-skills-11-react-performance
description: Checklist tối ưu hiệu năng React/Next.js – async waterfall, bundle size, caching, rerender, rendering, JS perf – trích từ react-performance.csv cho Agent Skills.
image: https://react.dev/images/og-home.png
sidebar_position: 11
tags:
  - agent-skills
  - react
  - performance
  - nextjs
keywords: [react performance, nextjs performance, async waterfall, bundle size, caching, rerender]
enableComments: true
draft: false
---

# Agent Skills - Phần 11: React Performance Best Practices

Tài liệu này tóm tắt **React/Next.js performance best practices** dùng làm checklist cho Agent khi refactor hoặc review code.  
Nguồn: [`react-performance.csv`](https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/refs/heads/main/src/ui-ux-pro-max/data/react-performance.csv) từ [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill).

**Nhóm chính:**

1. Async Waterfall & Data fetching
2. Bundle Size & Code splitting
3. Server-side caching & RSC boundaries
4. Client caching (SWR) & event listeners
5. Rerender tối ưu (state/effect)
6. Rendering & hydration
7. JS performance & advanced patterns

Trong mỗi mục:  
**Nên** có ví dụ `+` · **Không nên** có ví dụ `-`.

---

## 1. Async Waterfall & Data Fetching

### 1.1 🔴 Tránh await blocking trên mọi branch (Async Waterfall)

- **Nên:** Chỉ `await` trong branch thực sự cần.

```diff
+ if (skip) return { skipped: true };
+ const data = await fetch();
```

- **Không nên:** Await ở đầu function rồi mới kiểm tra branch.

```diff
- const data = await fetch();
- if (skip) return { skipped: true };
```

---

### 1.2 🔴 Promise.all cho async độc lập

- **Nên:** Chạy song song khi không phụ thuộc nhau.

```diff
+ const [user, posts] = await Promise.all([
+   fetchUser(),
+   fetchPosts(),
+ ]);
```

- **Không nên:** Await tuần tự cho các request độc lập.

```diff
- const user = await fetchUser();
- const posts = await fetchPosts();
```

---

### 1.3 🔴 Tối ưu API Route – start promises early, await late

- **Nên:** Khởi tạo promise sớm, `await` khi thật cần trả về.

```diff
+ const sessionP = auth();
+ const configP = fetchConfig();
+ const session = await sessionP;
+ const config = await configP;
```

- **Không nên:** `await` tuần tự trong handler API.

```diff
- const session = await auth();
- const config = await fetchConfig();
```

---

### 1.4 🔴 Dùng Suspense để tránh chặn cả page

- **Nên:** Wrap phần async trong `Suspense` với skeleton.

```diff
+ <Suspense fallback={<Skeleton />}>
+   <DataDisplay />
+ </Suspense>
```

- **Không nên:** Đợi fetch xong hết rồi mới render page.

```diff
- const data = await fetchData();
- return <DataDisplay data={data} />;
```

---

### 1.5 🟡 Parallel fetch bằng composition trong RSC

- **Nên:** Để `Header` / `Sidebar` tự fetch → chạy song song trong tree.

```diff
+ export default function Page() {
+   return (
+     <>
+       <Header />
+       <Sidebar />
+       <Content />
+     </>
+   );
+ }
```

- **Không nên:** Fetch từng phần tuần tự trong component cha.

---

## 2. Bundle Size & Code Splitting

### 2.1 🔴 Tránh barrel import cho lib lớn

- **Nên:** Import trực tiếp icon/component cần dùng.

```diff
+ import Check from 'lucide-react/dist/esm/icons/check';
```

- **Không nên:** Import từ barrel `index` kéo theo nhiều module không dùng.

```diff
- import { Check } from 'lucide-react';
```

---

### 2.2 🔴 Dynamic import cho component nặng

- **Nên:** Lazy-load editor/chart/... bằng `next/dynamic`.

```diff
+ const Monaco = dynamic(() => import('./MonacoEditor'), { ssr: false });
```

- **Không nên:** Import thẳng editor ở top – vào main bundle.

```diff
- import MonacoEditor from './MonacoEditor';
```

---

### 2.3 🟡 Defer third-party (analytics, logging)

- **Nên:** Dynamic import sau hydration / khi cần.

```diff
+ const Analytics = dynamic(() => import('@vercel/analytics/react'), {
+   ssr: false,
+ });
```

- **Không nên:** Nhét analytics vào bundle chính.

```diff
- import { Analytics } from '@vercel/analytics/react';
```

---

### 2.4 🔴 Conditional loading cho feature hiếm dùng

- **Nên:** Chỉ load module nặng khi bật feature.

```diff
+ useEffect(() => {
+   if (enabled) {
+     import('./heavy');
+   }
+ }, [enabled]);
```

- **Không nên:** Import module nặng mọi lúc.

```diff
- import './heavy';
```

---

## 3. Server-side Caching & RSC Boundaries

### 3.1 🟡 `React.cache` để dedupe fetch trong 1 request

- **Nên:** Wrap fetcher bằng `cache()` để tránh gọi lặp lại trong tree.

```diff
+ export const getUser = cache(async () => {
+   return db.user.find();
+ });
```

---

### 3.2 🟡 LRU cache cho cross-request

- **Nên:** Cache dữ liệu ít đổi (config, feature flags...) bằng LRU.

```diff
+ const cache = new LRUCache({ max: 1000, ttl: 5 * 60 * 1000 });
```

---

### 3.3 🔴 Giảm serialization giữa Server & Client Component

- **Nên:** Truyền đúng field client cần, không pass cả object to.

```diff
+ <Profile name={user.name} avatarUrl={user.avatarUrl} />
```

- **Không nên:** Pass full `user` 50 field qua boundary.

```diff
- <Profile user={user} />
```

---

### 3.4 🟡 Dùng `after()` cho work không block response (Next.js)

- **Nên:** Logging/analytics chạy sau khi trả response.

```diff
+ after(async () => {
+   await logAction();
+ });
+ return Response.json(data);
```

- **Không nên:** Đợi log xong mới trả response.

```diff
- await logAction();
- return Response.json(data);
```

---

## 4. Client Caching & Shared Event Listeners

### 4.1 🟡 Dùng SWR cho fetch client-side

- **Nên:** `useSWR` để tự dedupe + cache + revalidate.

```diff
+ const { data } = useSWR('/api/users', fetcher);
```

- **Không nên:** Tự fetch trong `useEffect` mỗi lần mount.

```diff
- useEffect(() => {
-   fetch('/api/users').then(setUsers);
- }, []);
```

---

### 4.2 🟢 Share global event listeners

- **Nên:** Dùng `useSWRSubscription` hoặc abstraction để share listener global.

```diff
+ useSWRSubscription('global-keydown', subscribeKeydown);
```

- **Không nên:** Đăng ký `window.addEventListener` trong mỗi instance.

---

## 5. Rerender Tối Ưu (State & Effects)

### 5.1 🟡 Đọc state chỉ trong callback khi cần

- **Nên:** Đọc `location`/`search` trực tiếp trong handler nếu không cần subscribe.

```diff
+ const handleClick = () => {
+   const params = new URLSearchParams(location.search);
+   // ...
+ };
```

- **Không nên:** Subscribe vào state nặng chỉ để dùng trong handler.

```diff
- const params = useSearchParams();
- const handleClick = () => {
-   params.get('ref');
- };
```

---

### 5.2 🟡 Dùng `memo()` cho phần expensive

- **Nên:** Tách sub-component và memo.

```diff
+ const UserAvatar = memo(function UserAvatar({ user }) {
+   // expensive
+   return <Avatar ... />;
+ });
```

- **Không nên:** Tính toán nặng trong component chính rồi early return.

---

### 5.3 🟢 Narrow dependency cho `useEffect`

- **Nên:** Dependency là primitive (id) thay vì cả object.

```diff
+ useEffect(() => {
+   console.log(user.id);
+ }, [user.id]);
```

- **Không nên:** Dùng object reference làm dependency.

```diff
- useEffect(() => {
-   console.log(user.id);
- }, [user]);
```

---

### 5.4 🟡 Dùng state derived boolean thay vì state continuous

- **Nên:** Subscribes vào `isMobile` boolean.

```diff
+ const isMobile = useMediaQuery('(max-width: 767px)');
```

- **Không nên:** Truyền cả width lên mọi component.

```diff
- const width = useWindowWidth();
- const isMobile = width < 768;
```

---

### 5.5 🟡 Functional `setState`

- **Nên:** Dùng dạng callback để tránh stale closure & dependency dư thừa.

```diff
+ setItems(curr => [...curr, newItem]);
```

- **Không nên:** Dựa vào biến `items` bên ngoài.

```diff
- setItems([...items, newItem]);
```

---

### 5.6 🟡 Lazy init cho `useState`

- **Nên:** Truyền function nếu init tốn kém.

```diff
+ const [index] = useState(() => buildSearchIndex(items));
```

- **Không nên:** Gọi trực tiếp – chạy lại mỗi render.

```diff
- const [index] = useState(buildSearchIndex(items));
```

---

### 5.7 🟡 Dùng `startTransition` cho update không khẩn cấp

- **Nên:** Mark update heavy như scroll, filter UI là transition.

```diff
+ startTransition(() => {
+   setScrollY(window.scrollY);
+ });
```

- **Không nên:** Gây block UI trên mọi state change.

```diff
- setScrollY(window.scrollY);
```

---

## 6. Rendering & Hydration

### 6.1 🟢 Animate wrapper thay vì SVG trực tiếp

- **Nên:** Bọc SVG trong `div` và animate wrapper cho GPU-friendly.

```diff
+ <div className="animate-spin">
+   <svg>...</svg>
+ </div>
```

- **Không nên:** Add animation trực tiếp lên SVG.

```diff
- <svg className="animate-spin">...</svg>
```

---

### 6.2 🔴 Dùng `content-visibility: auto` cho list dài

- **Nên:** Cho item off-screen để browser defer render.

```diff
+ .item {
+   content-visibility: auto;
+   contain-intrinsic-size: 0 80px;
+ }
```

- **Không nên:** Render 1000 item full DOM không tối ưu.

---

### 6.3 🟢 Hoist static JSX ra ngoài component

- **Nên:** Khai báo skeleton/static element ở module scope.

```diff
+ const skeleton = <div className="animate-pulse" />;
+ function C() {
+   return skeleton;
+ }
```

- **Không nên:** Tạo lại JSX y chang mỗi render.

```diff
- function C() {
-   return <div className="animate-pulse" />;
- }
```

---

### 6.4 🟡 Tránh flicker khi hydration (theme, layout)

- **Nên:** Dùng inline script sync trước hydration (ví dụ theme).

```diff
+ <script
+   dangerouslySetInnerHTML={{
+     __html: "document.documentElement.dataset.theme = localStorage.theme || 'light'",
+   }}
+ />
```

- **Không nên:** Đợi `useEffect` mới set theme → flash.

```diff
- useEffect(() => {
-   setTheme(localStorage.theme);
- }, []);
```

---

### 6.5 🟢 Dùng ternary thay vì `&&` cho số `0`

- **Nên:** Explicit null khi count = 0.

```diff
+ {count > 0 ? <Badge>{count}</Badge> : null}
```

- **Không nên:** `count &&` vì `0` là falsy nhưng có thể render `'0'`.

```diff
- {count && <Badge>{count}</Badge>}
```

---

### 6.6 🟡 Preserve state khi show/hide component đắt

- **Nên:** Dùng wrapper (Activity-like) để giữ DOM/state.

```diff
+ <Activity mode={isOpen ? 'visible' : 'hidden'}>
+   <Menu />
+ </Activity>
```

- **Không nên:** Unmount/remount gây mất state mỗi lần toggle.

```diff
- {isOpen && <Menu />}
```

---

## 7. JS Performance & Advanced Patterns

### 7.1 🟡 Batch thay đổi CSS/DOM

- **Nên:** Toggle class hoặc set nhiều style một lần.

```diff
+ element.classList.add('highlighted');
```

- **Không nên:** Set từng property một gây nhiều reflow.

```diff
- el.style.width = '100px';
- el.style.height = '200px';
```

---

### 7.2 🟡 Dùng Map/Set & cache cho lookup lặp lại

- **Nên:** Index trước rồi lookup O(1).

```diff
+ const byId = new Map(users.map(u => [u.id, u]));
+ byId.get(id);
```

- **Không nên:** `.find()` trong loop hoặc `.includes()` lặp lại.

```diff
- users.find(u => u.id === id);
```

---

### 7.3 🟡 Hoist RegExp & memoize kết quả

- **Nên:** Khai báo `RegExp` & cache ngoài render.

```diff
+ const EMAIL_RE = /^[^@]+@[^@]+$/;
+ function validate(x) {
+   return EMAIL_RE.test(x);
+ }
```

- **Không nên:** Tạo RegExp/slugify trong mọi render/hot path.

---

### 7.4 🟡 Dùng `toSorted()` thay vì `sort()` mutate

- **Nên:** Giữ immutability khi sort.

```diff
+ const sorted = users.toSorted((a, b) =>
+   a.name.localeCompare(b.name),
+ );
```

- **Không nên:** Dùng `array.sort()` làm mutate state.

```diff
- users.sort((a, b) => a.name.localeCompare(b.name));
```

---

### 7.5 🟢 Early return, length check, combine loop

- **Nên:** Thoát sớm khi có thể, check `.length` trước, combine nhiều `filter()`/`map()` thành 1 vòng lặp.

---

### 7.6 🟢 Event handler refs & `useLatest`

- **Nên:** Lưu callback trong ref / `useEffectEvent` để effect subscription stable.
- **Giảm:** Re-subscribe event hoặc chạy lại effect nặng chỉ vì callback đổi reference.

---

## Tóm tắt

| Nhóm                 | Ý chính                                                      |
|----------------------|--------------------------------------------------------------|
| Async Waterfall      | Dùng `Promise.all`, start early/await late, Suspense        |
| Bundle Size          | Dynamic import, tránh barrel, load conditional/intent-based |
| Server & RSC         | `cache()`, LRU, giảm serialization qua boundary             |
| Client Caching       | SWR cho fetch, share event listeners                        |
| Rerender             | Functional setState, narrow deps, memoized component        |
| Rendering            | `content-visibility`, hoist JSX, tránh flicker hydration    |
| JS Perf & Advanced   | Set/Map, cache, toSorted, early return, stable handler refs |

Nguồn dữ liệu: [`react-performance.csv`](https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/refs/heads/main/src/ui-ux-pro-max/data/react-performance.csv) — [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill).

