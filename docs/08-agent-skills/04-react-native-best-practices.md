---
title: Phần 4 - React Native Best Practices
slug: agent-skills-04-react-native-best-practices
description: Tổng hợp guideline React Native best practices cho Agent Skills – Components, Styling, Navigation, State, Lists, Performance, Images, Forms, Touch, Animation, Async, Accessibility, Testing, Native.
image: https://reactnative.dev/img/header_logo.svg
sidebar_position: 4
tags:
  - agent-skills
  - react-native
  - best-practices
  - cursor
keywords: [agent skills, react native, best practices, components, styling, navigation, state]
enableComments: true
draft: false
---

# Agent Skills - Phần 4: React Native Best Practices

Tài liệu này tổng hợp **React Native Best Practices** dùng làm nguồn tham chiếu cho Agent Skills (ví dụ trong Cursor).  
Nội dung dựa trên bộ guideline từ [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) — file [`react-native.csv`](https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/refs/heads/main/src/ui-ux-pro-max/data/stacks/react-native.csv).

**Cập nhật:** 08/02/2026.

**Mức độ:** 🔴 Cao · 🟡 Trung bình · 🟢 Thấp  
**Ví dụ code:** `+` nên · `-` tránh

---

## 1. Components

### 1.1 🟡 Use functional components

React Native hiện đại chuẩn là **function component + hooks**.

- **Nên:** Dùng functional component với hooks.

```diff
+ const App = () => { ... }
```

- **Không nên:** Viết class component mới.

```diff
- class App extends Component { ... }
```

📖 [Intro to React – React Native](https://reactnative.dev/docs/intro-react)

---

### 1.2 🟡 Keep components small

Áp dụng **Single Responsibility Principle** – mỗi component làm một việc rõ ràng.

- **Nên:** Tách UI thành các component nhỏ: header, content, footer...

```diff
+ <Header />
+ <Content />
+ <Footer />
```

- **Không nên:** Một component 500+ dòng xử lý mọi thứ.

```diff
- 500+ line component
```

---

### 1.3 🟡 Use TypeScript

TypeScript giúp tránh bug runtime, tự hoàn thành tốt hơn.

- **Nên:** Dùng TypeScript cho project mới, khai báo type cho props/state.

```diff
+ const Button: FC<Props> = () => { ... }
```

- **Không nên:** Viết JS thuần không type.

```diff
- const Button = (props) => { ... }
```

---

### 1.4 🟢 Colocate component files

File component nên đi cùng styles, test, v.v. trong cùng thư mục.

- **Nên:** Dùng folder riêng cho mỗi component.

```diff
+ components/Button/index.tsx
+ components/Button/styles.ts
```

- **Không nên:** Cấu trúc phẳng, styles rải rác ở nơi khác.

```diff
- components/Button.tsx
- styles/button.ts
```

---

## 2. Styling

### 2.1 🔴 Use StyleSheet.create

`StyleSheet.create` tối ưu hoá style object và cảnh báo typo.

- **Nên:** Khai báo style bằng `StyleSheet.create`.

```diff
+ const styles = StyleSheet.create({
+   container: { padding: 16 },
+ });
```

- **Không nên:** Tạo object style inline trong JSX.

```diff
- <View style={{ margin: 10 }} />
```

📖 [StyleSheet – React Native](https://reactnative.dev/docs/stylesheet)

---

### 2.2 🟡 Avoid inline styles in render

Inline style mỗi lần render tạo object mới, gây re-render không cần thiết.

- **Nên:** Tham chiếu style từ `styles.*`.

```diff
+ <View style={styles.container} />
```

- **Không nên:** Viết style object trực tiếp trong JSX.

```diff
- <View style={{ margin: 10, padding: 5 }} />
```

---

### 2.3 🟡 Use flexbox for layout

Layout chính nên dùng flexbox thay vì absolute mọi nơi.

- **Nên:** Dùng `flexDirection`, `alignItems`, `justifyContent`.

```diff
+ const styles = StyleSheet.create({
+   row: { flexDirection: 'row', alignItems: 'center' },
+ });
```

- **Không nên:** Dựa vào `position: 'absolute'` để xếp layout.

```diff
- position: 'absolute' everywhere
```

📖 [Flexbox – React Native](https://reactnative.dev/docs/flexbox)

---

### 2.4 🟡 Handle platform differences

Style đôi khi cần khác nhau cho iOS/Android.

- **Nên:** Dùng `Platform.select` hoặc file `.ios.tsx`/`.android.tsx`.

```diff
+ const styles = StyleSheet.create({
+   container: Platform.select({
+     ios: { paddingTop: 44 },
+     android: { paddingTop: 0 },
+   }),
+ });
```

- **Không nên:** Hard-code giá trị chỉ hợp với một platform.

```diff
- Hardcoded iOS values
```

📖 [Platform-specific code](https://reactnative.dev/docs/platform-specific-code)

---

### 2.5 🟡 Use responsive dimensions

UI phải scale tốt trên màn hình nhỏ/lớn khác nhau.

- **Nên:** Dùng `Dimensions` hoặc `useWindowDimensions`.

```diff
+ const { width } = useWindowDimensions();
```

- **Không nên:** Fix width height bằng pixel cố định cho toàn app.

```diff
- width: 375
```

---

## 3. Navigation

### 3.1 🟡 Use React Navigation

React Navigation là thư viện chuẩn cho routing trong React Native.

- **Nên:** Dùng `@react-navigation/*` cho stack/tab/drawer.

```diff
+ const Stack = createStackNavigator();
```

- **Không nên:** Tự implement state navigation thủ công.

```diff
- Custom navigation state
```

📖 [React Navigation](https://reactnavigation.org/)

---

### 3.2 🟡 Type navigation params

Navigation nên được type-safe để tránh bug params.

- **Nên:** Khai báo `RootStackParamList` và dùng generics.

```diff
+ navigation.navigate<RootStackParamList>('Home', { id });
```

- **Không nên:** Gọi `navigate` với string thuần không type.

```diff
- navigation.navigate('Home', { id });
```

---

### 3.3 🟡 Support deep linking

App nên hỗ trợ mở màn hình qua URL/deeplink.

- **Nên:** Cấu hình prop `linking` cho React Navigation.

```diff
+ const linking = { prefixes: ['myapp://', 'https://myapp.com'] };
```

- **Không nên:** Bỏ qua deep link, không cấu hình gì.

```diff
- No linking configuration
```

📖 [Deep linking](https://reactnavigation.org/docs/deep-linking/)

---

### 3.4 🔴 Handle Android back button

Back button trên Android cần được xử lý hợp lý (exit, pop stack...).

- **Nên:** Dùng `useFocusEffect` + `BackHandler`.

```diff
+ useFocusEffect(
+   useCallback(() => {
+     const sub = BackHandler.addEventListener('hardwareBackPress', onBack);
+     return () => sub.remove();
+   }, [onBack]),
+ );
```

- **Không nên:** Bỏ qua back button khiến UX tệ hoặc crash.

```diff
- No back handler
```

---

## 4. State

### 4.1 🟡 Use useState for local UI state

State UI đơn giản nên dùng `useState`.

- **Nên:** Dùng `useState` cho counter, toggle, input...

```diff
+ const [count, setCount] = useState(0);
```

- **Không nên:** Dùng class component với `this.state` cho case đơn giản.

```diff
- this.state = { count: 0 };
```

---

### 4.2 🟡 Use useReducer for complex state

State có nhiều field liên quan hoặc logic phức tạp nên dùng `useReducer`.

- **Nên:** Gom nhiều field liên quan vào reducer.

```diff
+ const [state, dispatch] = useReducer(reducer, initialState);
```

- **Không nên:** 5+ `useState` cho các giá trị liên quan nhau.

```diff
- 5+ useState calls
```

---

### 4.3 🟡 Use context sparingly

Context thích hợp cho theme/auth/locale – không cho dữ liệu đổi liên tục.

- **Nên:** Dùng context cho theme, auth, locale...

```diff
+ <ThemeContext.Provider value={theme}>...</ThemeContext.Provider>
```

- **Không nên:** Dùng context cho data list item thay đổi liên tục.

```diff
- Context for list item data
```

---

### 4.4 🟡 Consider Zustand or Redux for global state

Global state phức tạp nên dùng riêng store, không prop drilling/useState khắp nơi.

- **Nên:** Dùng Zustand cho đơn giản, Redux cho domain phức tạp.

```diff
+ const useStore = create((set) => ({ ... }));
```

- **Không nên:** Dùng `useState` rồi prop drilling cho global state.

```diff
- Prop drilling global state
```

---

## 5. Lists

### 5.1 🔴 Use FlatList for long lists

List dài phải dùng `FlatList` (virtualized) thay vì `ScrollView + map`.

- **Nên:** Dùng `FlatList` cho list > 50 items.

```diff
+ <FlatList data={items} renderItem={renderItem} />
```

- **Không nên:** Map trực tiếp trong `ScrollView`.

```diff
- <ScrollView>{items.map(renderItem)}</ScrollView>
```

📖 [FlatList](https://reactnative.dev/docs/flatlist)

---

### 5.2 🔴 Provide keyExtractor

Item trong list cần key ổn định, không dùng index.

- **Nên:** Dùng `keyExtractor` với ID/stable key.

```diff
+ keyExtractor={(item) => item.id}
```

- **Không nên:** Dùng index làm key.

```diff
- keyExtractor={(_, index) => index.toString()}
```

---

### 5.3 🔴 Optimize renderItem

Item list nên được memo để tránh re-render không cần thiết.

- **Nên:** Bọc item trong `React.memo` và dùng trong `renderItem`.

```diff
+ renderItem={({ item }) => <MemoizedItem item={item} />}
```

- **Không nên:** Inline `renderItem` tạo View mới mỗi lần.

```diff
- renderItem={({ item }) => <View>...</View>}
```

---

### 5.4 🟡 Use getItemLayout for fixed-height rows

List có item height cố định nên khai báo `getItemLayout` để tối ưu scroll.

- **Nên:** Tính sẵn `length` và `offset`.

```diff
+ getItemLayout={(_, index) => ({
+   length: 50,
+   offset: 50 * index,
+   index,
+ })}
```

- **Không nên:** Bỏ trống `getItemLayout` với list dài có fixed height.

```diff
- No getItemLayout for fixed height
```

---

### 5.5 🟡 Tune windowSize for large lists

`windowSize` kiểm soát số item render quanh viewport.

- **Nên:** Giảm `windowSize` cho list cực dài để tiết kiệm RAM.

```diff
+ <FlatList windowSize={5} ... />
```

- **Không nên:** Dùng `windowSize` lớn mặc định cho list rất dài.

```diff
- windowSize={21} for huge lists
```

---

## 6. Performance

### 6.1 🟡 Use React.memo for pure components

Component chỉ phụ thuộc props nên memo để tránh re-render.

- **Nên:** Export component với `memo`.

```diff
+ export default memo(MyComponent);
```

- **Không nên:** Export component “trần”.

```diff
- export default MyComponent;
```

---

### 6.2 🟡 Use useCallback for handlers

Handler truyền xuống child nên được `useCallback` để ổn định reference.

- **Nên:** Memo hoá callback theo deps.

```diff
+ const handlePress = useCallback(() => { ... }, [deps]);
```

- **Không nên:** Tạo function mới inline mỗi lần render.

```diff
- onPress={() => doSomething()}
```

---

### 6.3 🟡 Use useMemo for expensive calculations

Tính toán nặng nên được cache bằng `useMemo`.

- **Nên:** Dùng `useMemo` cho logic nặng phụ thuộc deps.

```diff
+ const result = useMemo(() => expensive(), [deps]);
```

- **Không nên:** Gọi hàm nặng trực tiếp mỗi render.

```diff
- const result = expensive();
```

---

### 6.4 🟡 Avoid anonymous functions in JSX

Anonymous function trong JSX tạo reference mới, khiến child re-render.

- **Nên:** Truyền handler đã khai báo.

```diff
+ onPress={handlePress}
```

- **Không nên:** Viết inline arrow function trong JSX.

```diff
- onPress={() => doSomething()}
```

---

### 6.5 🟡 Use Hermes engine

Hermes giúp cải thiện startup time, memory và overall perf.

- **Nên:** Bật Hermes trong cấu hình build.

```diff
+ hermes_enabled: true
```

- **Không nên:** Dùng JavaScriptCore cho project mới mà không lý do.

```diff
- hermes_enabled: false
```

📖 [Hermes](https://reactnative.dev/docs/hermes)

---

## 7. Images

### 7.1 🟡 Prefer expo-image for modern image handling

`expo-image` cung cấp caching, blur, performance tốt hơn cho RN (đặc biệt Expo).

- **Nên:** Dùng `expo-image` cho list ảnh nặng.

```diff
+ <Image source={url} cachePolicy="memory-disk" />
```

- **Không nên:** Dùng thư viện không maintain hoặc default Image cho case nặng.

```diff
- <FastImage source={url} />
```

📖 [Expo Image](https://docs.expo.dev/versions/latest/sdk/image/)

---

### 7.2 🔴 Specify image dimensions

Ảnh remote cần width/height rõ để tránh flicker/layout shift.

- **Nên:** Set width/height trong style.

```diff
+ <Image style={{ width: 100, height: 100 }} source={{ uri }} />
```

- **Không nên:** Bỏ trống kích thước.

```diff
- <Image source={{ uri }} />
```

---

### 7.3 🟢 Use resizeMode

`resizeMode` điều khiển cách ảnh được scale trong box.

- **Nên:** Dùng `cover`, `contain` hoặc phù hợp use case.

```diff
+ <Image resizeMode="cover" ... />
```

- **Không nên:** Bỏ `resizeMode` khiến mặc định không mong muốn.

```diff
- <Image ... />
```

---

## 8. Forms

### 8.1 🟡 Use controlled inputs

Form nên controlled (`value` + `onChangeText`) để state nhất quán.

- **Nên:** Bind `value` vào state.

```diff
+ <TextInput value={text} onChangeText={setText} />
```

- **Không nên:** Chỉ dùng `defaultValue`.

```diff
- <TextInput defaultValue={text} />
```

---

### 8.2 🔴 Handle keyboard properly

Keyboard có thể che mất input/nút submit nếu không xử lý.

- **Nên:** Dùng `KeyboardAvoidingView` cho form.

```diff
+ <KeyboardAvoidingView behavior="padding">
+   <Form />
+ </KeyboardAvoidingView>
```

- **Không nên:** Bỏ qua, để keyboard che mất content.

```diff
- No keyboard handling
```

📖 [KeyboardAvoidingView](https://reactnative.dev/docs/keyboardavoidingview)

---

### 8.3 🟢 Use proper keyboard types

`keyboardType` nên khớp với loại input (email, number, phone...).

- **Nên:** Dùng keyboard phù hợp.

```diff
+ <TextInput keyboardType="email-address" />
```

- **Không nên:** Mọi input đều `default`.

```diff
- <TextInput keyboardType="default" />
```

---

## 9. Touch & Gestures

### 9.1 🟢 Use Pressable for new touch interactions

`Pressable` là API hiện đại, linh hoạt hơn `TouchableOpacity`.

- **Nên:** Dùng `Pressable` cho touch interactions mới.

```diff
+ <Pressable onPress={handlePress}>...</Pressable>
```

- **Không nên:** Tiếp tục thêm `TouchableOpacity` cho code mới.

```diff
- <TouchableOpacity onPress={handlePress}>...</TouchableOpacity>
```

📖 [Pressable](https://reactnative.dev/docs/pressable)

---

### 9.2 🟡 Provide touch feedback

Người dùng cần thấy feedback khi nhấn vào phần tử.

- **Nên:** Dùng ripple (Android) hoặc opacity change.

```diff
+ <Pressable android_ripple={{ color: 'gray' }}>...</Pressable>
```

- **Không nên:** Không có bất kỳ feedback nào khi bấm.

```diff
- No press feedback
```

---

### 9.3 🟡 Set hitSlop for small targets

Icon nhỏ cần `hitSlop` để dễ bấm.

- **Nên:** Tăng vùng chạm bằng `hitSlop`.

```diff
+ <Pressable hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>...</Pressable>
```

- **Không nên:** Để touch target nhỏ < 44x44.

```diff
- 44x44 with no hitSlop
```

---

## 10. Animation & Gestures

### 10.1 🟡 Use Reanimated for complex animations

`react-native-reanimated` cho phép animation mượt trên UI thread.

- **Nên:** Dùng Reanimated cho gesture/animation phức tạp.

```diff
+ const offset = useSharedValue(0);
```

- **Không nên:** Dùng Animated API cũ cho flow gesture nặng.

```diff
- Animated.timing for gesture
```

📖 [Reanimated](https://docs.swmansion.com/react-native-reanimated/)

---

### 10.2 🔴 Run animations on UI thread

Animation chạy trên UI thread sẽ mượt và không phụ thuộc JS thread.

- **Nên:** Dùng worklet `runOnUI`.

```diff
+ runOnUI(() => { 'worklet'; /* animation */ })();
```

- **Không nên:** Để animation nặng chạy trên JS thread.

```diff
- Animated on JS thread
```

---

### 10.3 🟡 Use gesture handler

`react-native-gesture-handler` cho gesture native performant hơn JS `onTouch*`.

- **Nên:** Dùng `GestureDetector` / gesture handler cho gesture phức tạp.

```diff
+ <GestureDetector gesture={gesture}>...</GestureDetector>
```

- **Không nên:** Dùng `onTouchMove` JS cho mọi gesture.

```diff
- <View onTouchMove={...} />
```

📖 [Gesture handler](https://docs.swmansion.com/react-native-gesture-handler/)

---

## 11. Async Logic

### 11.1 🟡 Handle loading states

Async request nên có loading indicator rõ ràng.

- **Nên:** Hiển thị `ActivityIndicator` trong khi chờ.

```diff
+ {isLoading ? <ActivityIndicator /> : <Content />}
```

- **Không nên:** Để màn hình trống trong lúc load.

```diff
- No loading state
```

---

### 11.2 🔴 Handle errors gracefully

Lỗi network/API cần UI hiển thị thông báo & retry, không crash app.

- **Nên:** Có view lỗi rõ ràng.

```diff
+ {error ? <ErrorView /> : <Content />}
```

- **Không nên:** Không handle error, để app crash hoặc treo.

```diff
- No error handling
```

---

### 11.3 🔴 Cancel async operations on unmount

Async request/subscription cần cleanup để tránh memory leak.

- **Nên:** Dùng `AbortController` hoặc return cleanup trong `useEffect`.

```diff
+ useEffect(() => {
+   const controller = new AbortController();
+   fetch(url, { signal: controller.signal });
+   return () => controller.abort();
+ }, [url]);
```

- **Không nên:** Không cleanup subscription/timer.

```diff
- No cleanup for subscriptions
```

---

## 12. Accessibility

### 12.1 🔴 Add accessibility labels

Element interactive phải có `accessibilityLabel` mô tả hành động.

- **Nên:** Thêm label rõ ràng cho button/icon.

```diff
+ <Pressable accessibilityLabel="Submit form">...</Pressable>
```

- **Không nên:** Pressable không label.

```diff
- <Pressable>...</Pressable>
```

📖 [Accessibility](https://reactnative.dev/docs/accessibility)

---

### 12.2 🟡 Use accessibility roles

`accessibilityRole` giúp screen reader hiểu loại control.

- **Nên:** Gán role phù hợp (button, header, link...).

```diff
+ <Pressable accessibilityRole="button">...</Pressable>
```

- **Không nên:** Không set role cho button/link.

```diff
- <Pressable>...</Pressable>
```

---

### 12.3 🔴 Test with screen readers

App cần được test với TalkBack (Android) và VoiceOver (iOS).

- **Nên:** Thường xuyên test luồng chính bằng screen reader.

```diff
+ Regular TalkBack testing
```

- **Không nên:** Bỏ qua hoàn toàn accessibility testing.

```diff
- No screen reader testing
```

---

## 13. Testing

### 13.1 🟡 Use React Native Testing Library

Testing component nên dựa trên behavior (render, event) thay vì implementation.

- **Nên:** Dùng `@testing-library/react-native`.

```diff
+ render(<Component />);
```

- **Không nên:** Dùng Enzyme hoặc shallow rendering cũ.

```diff
- shallow(<Component />);
```

📖 [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)

---

### 13.2 🔴 Test on real devices

Simulator không phản ánh đầy đủ behavior (hiệu năng, gesture, camera...).

- **Nên:** Test trên device thật cho cả iOS và Android.

```diff
+ Device testing in CI
```

- **Không nên:** Chỉ test trên simulator/emulator.

```diff
- Simulator only testing
```

---

### 13.3 🟡 Use Detox for E2E

Flow quan trọng nên có E2E test tự động.

- **Nên:** Dùng Detox cho E2E của luồng chính.

```diff
+ detox test
```

- **Không nên:** Chỉ test E2E bằng tay.

```diff
- Manual testing only
```

📖 [Detox](https://wix.github.io/Detox/)

---

## 14. Native & Permissions

### 14.1 🔴 Use native modules carefully

Bridge giữa JS và native có overhead – nên batch call.

- **Nên:** Gom các native call, hạn chế gọi liên tục.

```diff
+ Batch updates
```

- **Không nên:** Gọi native trên mọi keystroke/scroll nhỏ.

```diff
- Call native on every keystroke
```

---

### 14.2 🟢 Use Expo when possible

Expo đơn giản hoá nhiều phần (build, permissions, camera, push...).

- **Nên:** Dùng Expo nếu app không cần native custom quá phức tạp.

```diff
+ expo install package
```

- **Không nên:** Dùng bare RN + manual linking cho app đơn giản.

```diff
- react-native link package
```

📖 [Expo](https://docs.expo.dev/)

---

### 14.3 🔴 Handle permissions correctly

Permissions (camera, location, v.v.) phải được request/check đúng cách.

- **Nên:** Dùng `PermissionsAndroid` (Android) hoặc API tương ứng, luôn check trước khi dùng.

```diff
+ const granted = await PermissionsAndroid.request(...);
```

- **Không nên:** Truy cập tài nguyên trực tiếp mà không kiểm tra permission.

```diff
- Access without permission check
```

📖 [PermissionsAndroid](https://reactnative.dev/docs/permissionsandroid)

---

## Tóm tắt

| Nhóm            | Số guideline | Mức độ ưu tiên   |
|-----------------|-------------|------------------|
| Components      | 4           | 🟢–🟡            |
| Styling         | 5           | 🟡–🔴            |
| Navigation      | 4           | 🟡–🔴            |
| State           | 4           | 🟡               |
| Lists           | 5           | 🟡–🔴            |
| Performance     | 5           | 🟡               |
| Images          | 3           | 🟢–🔴            |
| Forms           | 3           | 🟡–🔴            |
| Touch           | 3           | 🟢–🟡            |
| Animation       | 3           | 🟡–🔴            |
| Async           | 3           | 🟡–🔴            |
| Accessibility   | 3           | 🟡–🔴            |
| Testing         | 3           | 🟡–🔴            |
| Native          | 3           | 🟢–🔴            |

Nguồn dữ liệu: [`react-native.csv`](https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/refs/heads/main/src/ui-ux-pro-max/data/stacks/react-native.csv) — [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill).

