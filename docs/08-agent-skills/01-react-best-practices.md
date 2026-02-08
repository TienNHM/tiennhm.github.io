---
title: Phần 1 - React Best Practices
slug: agent-skills-01-react-best-practices
description: Tổng hợp 53 guideline React best practices cho Agent Skills - State, Effects, Rendering, Components, Props, Events, Forms, Hooks, Context, Performance, Testing, Accessibility, TypeScript.
image: https://react.dev/img/og-image.png
sidebar_position: 1
tags:
  - agent-skills
  - react
  - best-practices
  - cursor
keywords: [agent skills, react, best practices, useState, useEffect, hooks, typescript]
enableComments: true
draft: false
---

# Agent Skills - Phần 1: React Best Practices

Tài liệu này tổng hợp **React Best Practices** dùng làm nguồn tham chiếu cho Agent Skills (ví dụ trong Cursor). Nội dung dựa trên bộ guideline từ [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) — file [react.csv](https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/refs/heads/main/src/ui-ux-pro-max/data/stacks/react.csv).

**Cập nhật:** 08/02/2026.

**Mức độ:** 🔴 Cao · 🟡 Trung bình · 🟢 Thấp  
**Ví dụ code:** `+` nên · `-` tránh

---

## 1. State

### 1.1 🟡 Use useState for local state

Simple component state nên dùng hook `useState`.

- **Nên:** `useState` cho form inputs, toggles, counters.

```diff
+ const [count, setCount] = useState(0);
```

- **Không nên:** Class components với `this.state`.

```diff
- this.state = { count: 0 };
```

📖 [useState – React](https://react.dev/reference/react/useState)

---

### 1.2 🟡 Lift state up when needed

Chia sẻ state giữa các component anh em bằng cách “lift state” lên component cha chung.

- **Nên:** Đưa state dùng chung lên ancestor chung.

```diff
+ // Parent giữ state và truyền xuống
```

- **Không nên:** Prop drilling qua nhiều tầng.

```diff
- // chuỗi props dài qua nhiều cấp
```

📖 [Sharing state between components](https://react.dev/learn/sharing-state-between-components)

---

### 1.3 🟡 Use useReducer for complex state

State phức tạp (nhiều trường con, logic cập nhật phức tạp) nên dùng reducer.

- **Nên:** `useReducer` khi state có nhiều sub-values hoặc cập nhật cùng lúc.

```diff
+ useReducer with action types
```

- **Không nên:** Nhiều `useState` riêng lẻ cho các giá trị liên quan.

```diff
- 5+ useState cập nhật cùng nhau
```

📖 [useReducer – React](https://react.dev/reference/react/useReducer)

---

### 1.4 🔴 Avoid unnecessary state

Ưu tiên **tính toán từ state hiện có** thay vì lưu giá trị dẫn xuất vào state.

- **Nên:** Tính derived values trong lúc render.

```diff
+ const total = items.reduce(...);
```

- **Không nên:** Lưu giá trị có thể suy ra từ state khác.

```diff
- const [total, setTotal] = useState(0);
```

📖 [Choosing the state structure](https://react.dev/learn/choosing-the-state-structure)

---

### 1.5 🟡 Initialize state lazily

Với initial state tốn kém tính toán, dùng dạng **hàm** để khởi tạo lazy.

- **Nên:** `useState(() => computeExpensive())`.

```diff
+ useState(() => JSON.parse(data));
```

- **Không nên:** `useState(computeExpensive())` (chạy mỗi lần render).

```diff
- useState(JSON.parse(data));
```

📖 [Avoiding recreating the initial state](https://react.dev/reference/react/useState#avoiding-recreating-the-initial-state)

---

## 2. Effects

### 2.1 🔴 Clean up effects

Subscription, timer, listener phải có cleanup trong `useEffect`.

- **Nên:** Return cleanup function trong `useEffect`.

```diff
+ useEffect(() => {
+   sub();
+   return unsub;
+ }, []);
```

- **Không nên:** Bỏ qua cleanup cho subscriptions/timers.

```diff
- useEffect(() => {
-   subscribe();
- }, []);
```

📖 [Connecting to an external system](https://react.dev/reference/react/useEffect#connecting-to-an-external-system)

---

### 2.2 🔴 Specify dependencies correctly

Mọi giá trị **đọc trong effect** phải có trong mảng dependency.

- **Nên:** Đưa đủ giá trị dùng trong effect vào deps.

```diff
+ // [value] khi dùng value trong effect
+ useEffect(() => { ... }, [value]);
```

- **Không nên:** `[]` nhưng vẫn dùng props/state trong effect.

```diff
- // [] nhưng dùng props/state trong effect
- useEffect(() => { ... }, []);
```

📖 [Specifying reactive dependencies](https://react.dev/reference/react/useEffect#specifying-reactive-dependencies)

---

### 2.3 🔴 Avoid unnecessary effects

Không dùng effect để “transform data” hay xử lý event thuần — làm trong render hoặc event handler.

- **Nên:** Transform data khi render, xử lý event trực tiếp trong handler.

```diff
+ const filtered = items.filter(...);
```

- **Không nên:** `useEffect` cho derived state hoặc event handling.

```diff
- useEffect(() => setFiltered(items.filter(...)), [items]);
```

📖 [You might not need an Effect](https://react.dev/learn/you-might-not-need-an-effect)

---

### 2.4 🟡 Use refs for non-reactive values

Giá trị không cần trigger re-render (interval ID, DOM ref, instance) nên dùng `useRef`.

- **Nên:** `useRef` cho interval IDs, DOM elements.

```diff
+ const intervalRef = useRef(null);
```

- **Không nên:** `useState` cho giá trị không cần render.

```diff
- const [intervalId, setIntervalId] = useState();
```

📖 [useRef – React](https://react.dev/reference/react/useRef)

---

## 3. Rendering

### 3.1 🔴 Use keys properly

List động cần **key ổn định và unique** (ID), không dùng index khi thứ tự/thêm/xóa thay đổi.

- **Nên:** Stable IDs làm key.

```diff
+ key={item.id}
```

- **Không nên:** Array index làm key cho list động.

```diff
- key={index}
```

📖 [Keeping list items in order with key](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key)

---

### 3.2 🟡 Memoize expensive calculations

Tính toán nặng nên bọc trong `useMemo` với dependency đúng.

- **Nên:** `useMemo` cho filter/sort/transform tốn kém.

```diff
+ useMemo(() => expensive(), [deps]);
```

- **Không nên:** Gọi hàm nặng mỗi lần render không cần thiết.

```diff
- const result = expensiveCalc();
```

📖 [useMemo – React](https://react.dev/reference/react/useMemo)

---

### 3.3 🟡 Memoize callbacks passed to children

Handler truyền xuống component con (đặc biệt đã `memo`) nên dùng `useCallback` để tránh re-render không cần thiết.

- **Nên:** `useCallback` cho handlers truyền vào children đã memo.

```diff
+ useCallback(() => {}, [deps]);
```

- **Không nên:** Tạo function mới mỗi lần render.

```diff
- const handler = () => {};
```

📖 [useCallback – React](https://react.dev/reference/react/useCallback)

---

### 3.4 🟢 Use React.memo wisely

Chỉ bọc component **render thường xuyên với props ổn định** bằng `memo`.

- **Nên:** `memo` cho pure component với props ổn định.

```diff
+ memo(ExpensiveList);
```

- **Không nên:** `memo` mọi thứ hoặc component đơn giản không cần.

```diff
- memo(SimpleButton); // cân nhắc cho component rất đơn giản
```

📖 [React.memo – React](https://react.dev/reference/react/memo)

---

### 3.5 🟡 Avoid inline object/array creation in JSX

Tránh tạo object/array mới ngay trong JSX (gây re-render con không cần thiết). Định nghĩa bên ngoài hoặc memoize.

- **Nên:** Style/object định nghĩa ngoài component hoặc memo.

```diff
+ <div style={styles.container} />
```

- **Không nên:** Inline object trong props.

```diff
- <div style={{ margin: 10 }} />
```

---

## 4. Components

### 4.1 🟡 Keep components small and focused

Mỗi component nên có **một trách nhiệm** rõ ràng.

- **Nên:** Một concern per component.
- **Không nên:** Component lớn, làm nhiều việc.

```tsx
<UserAvatar />
<UserName />
```

```tsx
// Tránh: <UserCard /> với 500 dòng
```

---

### 4.2 🟡 Use composition over inheritance

Ưu tiên **composition** (children, props) thay vì kế thừa class.

- **Nên:** `children` prop để linh hoạt cấu trúc.

```diff
+ <Card>{content}</Card>
```

- **Không nên:** Cây kế thừa sâu.

```diff
- class SpecialCard extends Card
```

📖 [Thinking in React](https://react.dev/learn/thinking-in-react)

---

### 4.3 🟢 Colocate related code

Đặt component và hook liên quan gần nhau (cùng thư mục/feature).

- **Nên:** File liên quan trong cùng directory.

```diff
+ components/User/UserCard.tsx
```

- **Không nên:** Cấu trúc phẳng với quá nhiều file tách rời.

```diff
- components/UserCard.tsx + hooks/useUser.ts xa nhau
```

---

### 4.4 🟢 Use fragments to avoid extra DOM

Dùng `Fragment` hoặc `<>` khi cần nhóm nhiều phần tử mà không thêm node DOM.

- **Nên:** `<>` để nhóm không thêm wrapper.

```diff
+ <>{items.map(...)}</>
```

- **Không nên:** Thêm `<div>` chỉ để bọc.

```diff
- <div>{items.map(...)}</div>
```

📖 [Fragment – React](https://react.dev/reference/react/Fragment)

---

## 5. Props

### 5.1 🟢 Destructure props

Destructure props trong signature để code gọn và rõ.

- **Nên:** Destructure trong tham số hàm.

```diff
+ function User({ name, age }) { ... }
```

- **Không nên:** Dùng `props.name`, `props.value` khắp nơi.

```diff
- function User(props) { ... }
```

---

### 5.2 🟢 Provide default props values

Dùng default parameters hoặc `defaultProps` thay vì check `undefined` trong component.

- **Nên:** Default trong destructuring.

```diff
+ function Button({ size = 'md' }) { ... }
```

- **Không nên:** `if (size === undefined) size = 'md'` nhiều chỗ.

```diff
- if (size === undefined) size = 'md';
```

---

### 5.3 🟡 Avoid prop drilling

Data cần truyền sâu nhiều tầng nên dùng **Context** hoặc **composition** thay vì truyền props qua 5+ cấp.

- **Nên:** Context cho data global, composition cho UI.

```diff
+ <UserContext.Provider>
```

- **Không nên:** Truyền props qua nhiều tầng không dùng.

```diff
- <A user={u}><B user={u}><C user={u}>
```

📖 [Passing data deeply with context](https://react.dev/learn/passing-data-deeply-with-context)

---

### 5.4 🟡 Validate props with TypeScript

Dùng **TypeScript interface** cho props thay vì PropTypes hoặc không validate.

- **Nên:** `interface Props { name: string; ... }`.

```diff
+ interface ButtonProps {
+   onClick: () => void;
+ }
```

- **Không nên:** `PropTypes` hoặc không có type.

```diff
- Button.propTypes = { ... };
```

---

## 6. Events

### 6.1 🟢 Use synthetic events correctly

Dùng event object chuẩn của React (đã normalize), không truy cập `nativeEvent` trừ khi cần.

- **Nên:** `e.preventDefault()`, `e.stopPropagation()`.

```diff
+ onClick={(e) => e.preventDefault()}
```

- **Không nên:** Dùng `e.nativeEvent` khi không cần.

```diff
- onClick={(e) => e.nativeEvent.preventDefault()}
```

📖 [React event object](https://react.dev/reference/react-dom/components/common#react-event-object)

---

### 6.2 🟡 Avoid binding in render

Trong function component dùng arrow function hoặc `useCallback`; tránh `.bind(this)` trong render.

- **Nên:** Arrow function trong functional component.

```diff
+ const handleClick = () => {};
```

- **Không nên:** `bind` trong render hoặc constructor.

```diff
- this.handleClick.bind(this)
```

---

### 6.3 🔴 Pass event handlers not call results

Truyền **reference** hàm, không gọi hàm ngay (trừ khi handler trả về hàm).

- **Nên:** `onClick={handleClick}`.

```diff
+ onClick={handleClick}
```

- **Không nên:** `onClick={handleClick()}` (gọi ngay mỗi lần render).

```diff
- onClick={handleClick()}
```

---

## 7. Forms

### 7.1 🟡 Controlled components for forms

Form input nên **controlled**: `value` + `onChange` từ state.

- **Nên:** `value` + `onChange` cho inputs.

```diff
+ <input value={val} onChange={setVal} />
```

- **Không nên:** Uncontrolled với chỉ ref (trừ khi có lý do rõ).

```diff
- <input ref={inputRef} />
```

📖 [Controlling an input with a state variable](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable)

---

### 7.2 🟡 Handle form submission properly

Xử lý submit trong `onSubmit` của `<form>`, gọi `preventDefault()` trong handler.

- **Nên:** `onSubmit` với `preventDefault`.

```diff
+ <form onSubmit={handleSubmit}>
```

- **Không nên:** Chỉ `onClick` trên nút submit.

```diff
- <button onClick={handleSubmit}>
```

---

### 7.3 🟡 Debounce rapid input changes

Search/filter theo input nên debounce hoặc dùng `useDeferredValue` để tránh lag.

- **Nên:** `useDeferredValue` hoặc debounce cho search.

```diff
+ useDeferredValue(searchTerm);
```

- **Không nên:** Filter/request mỗi keystroke không kiểm soát.

```diff
- useEffect filtering on every change
```

📖 [useDeferredValue – React](https://react.dev/reference/react/useDeferredValue)

---

## 8. Hooks

### 8.1 🔴 Follow rules of hooks

Chỉ gọi hooks **ở top level** và trong React function (component hoặc custom hook).

- **Nên:** Hooks luôn ở top level component/hook.
- **Không nên:** Hooks trong condition, loop, hoặc callback.

```diff
+ const [x, setX] = useState();
```

```diff
- if (cond) {
-   const [x, setX] = useState();
- }
```

📖 [Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks)

---

### 8.2 🟡 Custom hooks for reusable logic

Logic stateful dùng chung nên gom vào **custom hook**.

- **Nên:** `useCustomHook` cho pattern dùng lại.

```diff
+ const { data } = useFetch(url);
```

- **Không nên:** Copy-paste `useEffect`/`useState` giữa các component.

```diff
- duplicate useEffect/useState trong nhiều component
```

📖 [Reusing logic with custom hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)

---

### 8.3 🔴 Name custom hooks with use prefix

Custom hook **bắt buộc** bắt đầu bằng `use`.

- **Nên:** `useFetch`, `useForm`, `useAuth`.

```diff
+ function useFetch(url) { ... }
```

- **Không nên:** `fetchData`, `getData` cho hook.

```diff
- function fetchData(url) { ... }
```

---

## 9. Context

### 9.1 🟡 Use context for global data

Context phù hợp cho **theme, auth, locale** — data dùng rộng, ít thay đổi tần suất cao.

- **Nên:** Context cho app-wide state.

```diff
+ <ThemeContext.Provider>
```

- **Không nên:** Context cho data thay đổi rất thường xuyên (form field từng ô).

```diff
- Context cho từng giá trị form
```

📖 [Passing data deeply with context](https://react.dev/learn/passing-data-deeply-with-context)

---

### 9.2 🟡 Split contexts by concern

Tách Context theo **domain** (theme, auth, i18n...) thay vì một Context khổng lồ.

- **Nên:** `ThemeContext` + `AuthContext`.

```diff
+ <ThemeProvider>
+   <AuthProvider>
```

- **Không nên:** Một `AppContext` chứa tất cả.

```diff
- <AppProvider value={{ theme, user, ... }}>
```

---

### 9.3 🔴 Memoize context values

`value` của Provider nên **ổn định reference** (dùng `useMemo`) để tránh re-render toàn bộ consumer không cần thiết.

- **Nên:** `useMemo` cho object value.

```diff
+ value={useMemo(() => ({ ... }), [])}
```

- **Không nên:** Tạo object mới mỗi lần render.

```diff
- value={{ user, theme }}
```

---

## 10. Performance

### 10.1 🟡 Use React DevTools Profiler

Đo và xác định bottleneck trước khi tối ưu.

- **Nên:** Profile trước khi optimize.
- **Không nên:** Đoán mò bottleneck.

📖 [React Developer Tools](https://react.dev/learn/react-developer-tools)

---

### 10.2 🟡 Lazy load components

Route hoặc component nặng nên dùng `React.lazy` (và `Suspense`) để code splitting.

- **Nên:** `lazy()` cho route và component nặng.

```diff
+ const Page = lazy(() => import('./Page'));
```

- **Không nên:** Import tất cả upfront.

```diff
- import Page from './Page';
```

📖 [React.lazy – React](https://react.dev/reference/react/lazy)

---

### 10.3 🔴 Virtualize long lists

List > ~100 item nên dùng **windowing** (chỉ render phần visible).

- **Nên:** `react-window` hoặc `react-virtual`.

```diff
+ <VirtualizedList items={items} />
```

- **Không nên:** Render hàng nghìn node DOM.

```diff
- {items.map(i => <Item />)}
```

---

### 10.4 🟢 Batch state updates

React 18 auto-batch; tránh dùng `flushSync` trừ khi thật cần đồng bộ với DOM.

- **Nên:** Để React batch các `setState` liên quan.

```diff
+ setA(1);
+ setB(2); // batched
```

- **Không nên:** `flushSync` không cần thiết.

```diff
- flushSync(() => setA(1));
```

📖 [Queueing a series of state updates](https://react.dev/learn/queueing-a-series-of-state-updates)

---

## 11. Error Handling

### 11.1 🔴 Use error boundaries

Bắt lỗi render trong cây component bằng **Error Boundary** để app không crash toàn bộ.

- **Nên:** ErrorBoundary bọc từng section/route.

```diff
+ <ErrorBoundary>
+   <App />
+ </ErrorBoundary>
```

- **Không nên:** Để lỗi làm sập cả app.

```diff
- No error handling
```

📖 [Error boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)

---

### 11.2 🔴 Handle async errors

Mọi async (fetch, promise) cần `try/catch` hoặc `.catch()` để không có unhandled rejection.

- **Nên:** `try { await fetch() } catch (e) { ... }`.

```diff
+ try {
+   await fetch();
+ } catch (e) {}
```

- **Không nên:** `await fetch()` không có catch.

```diff
- await fetch(); // no catch
```

---

## 12. Testing

### 12.1 🟡 Test behavior not implementation

Test **hành vi** (user thấy gì, làm gì), không test chi tiết implementation (state nội bộ, method).

- **Nên:** Test render và tương tác.

```diff
+ expect(screen.getByText('Hello'));
```

- **Không nên:** Test `component.state.name` hay internal API.

```diff
- expect(component.state.name);
```

📖 [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

---

### 12.2 🟡 Use testing-library queries

Ưu tiên query theo **role, label, text** (accessible) thay vì `data-testid` cho mọi thứ.

- **Nên:** `getByRole`, `getByLabelText`.

```diff
+ getByRole('button');
```

- **Không nên:** `getByTestId` cho mọi element.

```diff
- getByTestId('submit-btn');
```

📖 [Testing Library queries priority](https://testing-library.com/docs/queries/about#priority)

---

## 13. Accessibility

### 13.1 🔴 Use semantic HTML

Dùng đúng thẻ HTML theo mục đích: `button` cho hành động, `nav` cho điều hướng, v.v.

- **Nên:** `<button onClick={...}>`.

```diff
+ <button onClick={...}>
```

- **Không nên:** `<div onClick={...}>` cho nút bấm.

```diff
- <div onClick={...}>
```

📖 [HTML components – React](https://react.dev/reference/react-dom/components#all-html-components)

---

### 13.2 🔴 Manage focus properly

Modal, dialog cần **focus trap** và trả focus về element trước khi mở khi đóng.

- **Nên:** Focus trap trong modal, return focus on close.

```diff
+ useEffect to focus input
```

- **Không nên:** Modal không quản lý focus.

```diff
- Modal without focus trap
```

---

### 13.3 🟡 Announce dynamic content

Nội dung thay đổi động (thông báo, toast) nên có **aria-live** để screen reader đọc.

- **Nên:** `aria-live` cho cập nhật động.

```diff
+ <div aria-live="polite">{msg}</div>
```

- **Không nên:** Cập nhật im lặng cho screen reader.

```diff
- <div>{msg}</div>
```

---

### 13.4 🔴 Label form controls

Mọi input phải có **label** liên kết (`htmlFor` + `id`) hoặc `aria-label`; không dùng placeholder thay label.

- **Nên:** `<label htmlFor="email">Email</label>` + input `id="email"`.

```diff
+ <label htmlFor="email">Email</label>
+ <input id="email" />
```

- **Không nên:** Chỉ `<input placeholder="Email" />`.

```diff
- <input placeholder="Email" />
```

---

## 14. TypeScript

### 14.1 🔴 Type component props

Mọi component nên có **interface** cho props, không dùng `any` hoặc bỏ type.

- **Nên:** `interface Props { name: string; ... }`.

```diff
+ interface Props {
+   name: string;
+ }
```

- **Không nên:** `any` hoặc không khai báo type.

```diff
- function Component(props: any)
```

---

### 14.2 🟡 Type state properly

`useState` với kiểu phức tạp nên khai báo generic rõ ràng.

- **Nên:** `useState<Type>()` cho state phức tạp.

```diff
+ useState<User | null>(null);
```

- **Không nên:** Để infer thành `any`.

```diff
- useState(null);
```

---

### 14.3 🟡 Type event handlers

Dùng kiểu event của React cho handler: `React.ChangeEvent<HTMLInputElement>`, v.v.

- **Nên:** `React.ChangeEvent<HTMLInputElement>`.

```diff
+ onChange: React.ChangeEvent<HTMLInputElement>
```

- **Không nên:** `Event` chung chung.

```diff
- onChange: Event
```

---

### 14.4 🟡 Use generics for reusable components

Component dùng lại với data generic (list, table) nên dùng **generics** cho type an toàn.

- **Nên:** Generic props cho list/table.

```diff
+ <List<T> items={T[]} />
```

- **Không nên:** `any[]` cho items.

```diff
- <List items={any[]} />
```

---

## 15. Patterns

### 15.1 🟢 Container/Presentational split

Tách **logic lấy data** (container) và **hiển thị UI** (presentational) khi component phức tạp.

- **Nên:** Container fetch, presentational render.

```diff
+ <UserContainer>
+   <UserView />
+ </UserContainer>
```

- **Không nên:** Trộn data và UI trong một component lớn.

```diff
- <User /> vừa fetch vừa render
```

---

### 15.2 🟢 Render props for flexibility

Khi cần chia sẻ logic và tùy biến cách render, có thể dùng **render prop**.

- **Nên:** Render prop để tùy chỉnh render.
- **Không nên:** Copy-paste logic fetch/data giữa nhiều component.

```tsx
<DataFetcher render={data => ...} />
```

📖 [Passing data with a render prop](https://react.dev/reference/react/cloneElement#passing-data-with-a-render-prop)

---

### 15.3 🟢 Compound components

Nhóm component liên quan (Tab + TabPanel) dùng chung state qua context thay vì prop drilling.

- **Nên:** Tab + TabPanel chia sẻ context.

```diff
+ <Tabs>
+   <Tab />
+   <TabPanel />
+ </Tabs>
```

- **Không nên:** Prop drilling giữa các component liên quan.

```diff
- <Tabs tabs={[]} panels={[...]} />
```

---

## Tóm tắt

| Nhóm            | Số guideline | Mức độ ưu tiên   |
|-----------------|-------------|------------------|
| State           | 5           | 🟡–🔴            |
| Effects         | 4           | 🔴               |
| Rendering       | 5           | 🟡–🔴            |
| Components      | 4           | 🟢–🟡            |
| Props           | 4           | 🟢–🟡            |
| Events          | 3           | 🟡–🔴            |
| Forms           | 3           | 🟡               |
| Hooks           | 3           | 🔴               |
| Context         | 3           | 🟡–🔴            |
| Performance     | 4           | 🟡–🔴            |
| Error Handling  | 2           | 🔴               |
| Testing         | 2           | 🟡               |
| Accessibility   | 4           | 🔴               |
| TypeScript      | 4           | 🟡–🔴            |
| Patterns        | 3           | 🟢               |

Nguồn dữ liệu: [react.csv](https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/refs/heads/main/src/ui-ux-pro-max/data/stacks/react.csv) — [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill).
