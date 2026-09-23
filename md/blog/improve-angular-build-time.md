# Cách mình giảm build time Angular 50% chỉ bằng 1 thay đổi đơn giản

> Nguồn: https://tiennhm.io.vn/blog/improve-angular-build-time
> Chia sẻ kinh nghiệm thực tế về cách migrate Angular project từ browser builder sang application builder giúp giảm build time từ 52 phút xuống 26 phút (giảm 50%). Đặc biệt hiệu quả cho hotfix và deploy, tăng năng suất và độ hài lòng của team. Hướng dẫn chi tiết với code examples và best practices.

> Bài viết chia sẻ kinh nghiệm thực tế về cách migrate Angular project từ browser builder sang application builder, giúp giảm build time từ 52 phút xuống 26 phút (giảm 50%). Chỉ cần sửa vài dòng trong `angular.json`, không cần thay đổi code hay dependencies. Đặc biệt hiệu quả cho hotfix khẩn cấp và deploy thường xuyên, giúp tăng năng suất developer và độ hài lòng của team. Bài viết bao gồm hướng dẫn chi tiết từng bước, giải thích kỹ thuật, và best practices để tối ưu build time đến mức tối đa.

Bạn có từng rơi vào tình huống này không? Chạy lệnh `ng build --configuration production` rồi... đi uống cà phê, ăn trưa, rồi quay lại mà build vẫn chưa xong? 😅

Đó chính xác là vấn đề mà mình đã gặp phải với một Angular project lớn. Mỗi lần build production mất **52 phút** - đúng là một cơn ác mộng cho developer, đặc biệt khi cần hotfix khẩn cấp! Nhưng giờ đây, sau một thay đổi đơn giản, build time đã giảm xuống còn **26 phút** - tiết kiệm được đúng **50% thời gian**!

Hãy cùng mình xem cách làm thế nào nhé! 🚀

## Câu chuyện bắt đầu: Khi build time là nỗi ám ảnh

Dự án mình đang làm là một **webapp enterprise** được code bằng **Angular 18**, với quy mô khá lớn: hàng trăm components, hàng ngàn files, và nhiều features phức tạp. Mọi thứ đều ổn cho đến khi... build production.

### Vấn đề thực tế - Đặc biệt nghiêm trọng với hotfix

Mỗi lần build, mình phải chờ **52 phút**. Đúng vậy - **gần 1 giờ đồng hồ** cho mỗi lần deploy! 😱

![Thời gian build trước khi improve](https://tiennhm.io.vn/img/blogs/before-improve-build-angular.png)

Điều này gây ra những hệ quả **rất nghiêm trọng**, đặc biệt trong các tình huống:

**🔥 Hotfix khẩn cấp - Tình huống tồi tệ nhất:**
- 🚨 Bug production cần fix ngay → Build mất 52 phút → Khách hàng phải chờ → Stress level tăng vọt!
- 💼 **Độ hài lòng của các bên giảm**: Product owner, stakeholders phải chờ quá lâu để fix một bug đơn giản
- 😰 **Áp lực cao**: Developer phải ngồi đợi build trong khi khách hàng đang gặp vấn đề

**📊 Ảnh hưởng hàng ngày:**
- 🕐 **Developer frustration**: Mỗi lần deploy là một bài test kiên nhẫn. Bạn fix bug, commit, push, rồi... chờ. Chờ mãi không thấy kết quả.
- 🐌 **CI/CD pipeline chậm chạp**: Build chạy trên CI server cũng mất gần 1 tiếng, làm chậm toàn bộ release cycle.
- 💸 **Chi phí tăng cao**: Với cloud CI/CD, thời gian build lâu = tiền bị đốt nhiều hơn.
- 😫 **Năng suất giảm**: Thay vì code tiếp, mình phải ngồi đợi build xong.

"Phải làm gì đó thôi!" - mình nghĩ vậy và bắt đầu tìm hiểu.

## Bước ngoặt: Phát hiện Application Builder

Sau một thời gian research và đọc documentation, mình phát hiện ra rằng từ Angular 17+, Angular team đã giới thiệu một builder mới tên là **Application Builder** - được thiết kế để thay thế cho Browser Builder cũ kỹ.

### Browser Builder vs Application Builder: Cuộc chiến giữa cũ và mới

Để hiểu rõ hơn, mình sẽ giải thích sự khác biệt giữa hai builder này:

**Browser Builder** (bạn cũ) - `@angular-devkit/build-angular:browser`:
- 👴 Builder "ông nội" đã có từ những ngày đầu của Angular
- 📦 Dựa trên Webpack với nhiều plugin và loader phức tạp
- 🐢 Build process nhiều bước, không được tối ưu tốt
- ⏳ Chậm, đặc biệt với project lớn

**Application Builder** (người mới) - `@angular-devkit/build-angular:application`:
- 🚀 Builder mới được thiết kế lại từ đầu (từ Angular 17+)
- ⚡ Sử dụng công nghệ hiện đại: esbuild (viết bằng Go, siêu nhanh!), Vite-like architecture
- 🎯 Build process được tối ưu, ít bước xử lý hơn
- 💾 Caching thông minh hơn - rebuild chỉ build phần thay đổi
- ✂️ Tree-shaking và code splitting hiệu quả hơn nhiều

## Hành trình migrate: Chỉ cần sửa vài dòng code!

Sau khi quyết định migrate, mình bắt đầu thực hiện. Và tin vui là... nó **đơn giản hơn mình nghĩ rất nhiều**!

Chỉ cần sửa file `angular.json` - không cần thay đổi code, không cần migrate dependencies phức tạp. Đúng là một cú hích (quick win) đáng giá! 🎯

### Bước 1: Thay đổi Builder

Đầu tiên, mở file `angular.json` và tìm phần `architect.build`. Đây là những gì bạn cần thay đổi:

**Trước khi migrate (Browser Builder):**
```json
{
  "projects": {
    "your-project-name": {
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "main": "projects/your-project/src/main.ts",
            "polyfills": "projects/your-project/src/polyfills.ts"
          }
        }
      }
    }
  }
}
```

**Sau khi migrate (Application Builder):**
```json
{
  "projects": {
    "your-project-name": {
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:application",
          "options": {
            "browser": "projects/your-project/src/main.ts",
            "polyfills": [
              "projects/your-project/src/polyfills.ts"
            ]
          }
        }
      }
    }
  }
}
```

**Những thay đổi chính:**
1. ✅ `builder`: Đổi từ `browser` → `application`
2. ✅ `main` → `browser`: Tên option thay đổi (nhưng vẫn trỏ đến cùng file)
3. ✅ `polyfills`: Từ string đơn → array (cho phép thêm nhiều polyfills sau này)

### Bước 2: Tối ưu Development Configuration (Optional nhưng khuyến khích)

Trong phần `configurations.development`, bạn có thể đơn giản hóa config:

**Trước:**
```json
{
  "configurations": {
    "development": {
      "buildOptimizer": false,
      "optimization": false,
      "vendorChunk": true,
      "extractLicenses": false,
      "sourceMap": true,
      "namedChunks": true
    }
  }
}
```

**Sau (đơn giản hơn):**
```json
{
  "configurations": {
    "development": {
      "optimization": false,
      "extractLicenses": false,
      "sourceMap": true,
      "namedChunks": true
    }
  }
}
```

**Tại sao bỏ đi?**
- 🎯 Application Builder tự động xử lý `buildOptimizer` và `vendorChunk` tốt hơn
- 🚀 Cơ chế caching và optimization được tích hợp sẵn, không cần config thủ công
- ✨ Đơn giản hóa config = dễ maintain hơn

**Lưu ý:** Bạn có thể giữ nguyên config cũ, nhưng để tận dụng tối đa performance của Application Builder, mình khuyến khích bỏ những dòng không cần thiết.

## Kết quả: Từ ác mộng thành giấc mơ!

Sau khi migrate xong, mình chạy build và... **WOW!** 🤩

![Thời gian build sau khi improve](https://tiennhm.io.vn/img/blogs/after-improve-build-angular.png)

### Số liệu thực tế: Cải thiện đáng kinh ngạc!

Mình đã test và đo lại thời gian build, và đây là kết quả:

| Metric | Trước | Sau | Cải thiện |
|--------|-------|-----|-----------|
| **Build Time** | ~52 phút | ~26 phút | **-50%** 🎉 |
| **Rebuild Time** | ~40 phút | ~18 phút | **-55%** 🚀 |
| **Initial Build** | ~52 phút | ~26 phút | **-50%** ⚡ |

### Những lợi ích thực tế mình cảm nhận được

✅ **Tiết kiệm 26 phút mỗi lần build**: Từ 52 phút xuống 26 phút - **giảm đúng 50%**! Đủ thời gian để giải quyết vấn đề khác thay vì chờ đợi.

✅ **Hotfix trở nên khả thi**: Khi có bug production khẩn cấp, giờ đây chỉ mất **26 phút** thay vì 52 phút để deploy fix. Đây là **game changer** thực sự! 🚨

✅ **Rebuild cực nhanh**: Lần build thứ 2 chỉ mất 18 phút nhờ caching thông minh - giảm **55%** so với trước! Đặc biệt hữu ích khi test nhiều lần.

✅ **Tăng năng suất đáng kể**: Developer không còn phải "giết thời gian" chờ build, có thể focus vào code và giải quyết vấn đề khác.

✅ **Độ hài lòng của các bên tăng cao**:
   - Product Owner/Stakeholders: Fix bug nhanh hơn → hài lòng hơn
   - Customer: Vấn đề được giải quyết nhanh chóng → trải nghiệm tốt hơn
   - Team: Ít stress, nhiều thời gian hơn cho quality work

✅ **CI/CD pipeline "sống lại"**: Release cycle nhanh hơn rất nhiều, team deploy được thường xuyên hơn, không còn sợ deploy nữa!

✅ **Bundle size giữ nguyên**: Không có trade-off - vẫn giữ nguyên kích thước output, chỉ build nhanh hơn thôi!

✅ **Chi phí CI/CD giảm**: Với cloud CI/CD tính theo thời gian, tiết kiệm được **50% chi phí** cho mỗi lần build!

## Giải thích kỹ thuật: Vì sao Application Builder nhanh hơn?

Bạn có thể thắc mắc: "Sao chỉ đổi builder mà nhanh được nhiều vậy?" Câu trả lời nằm ở những cải tiến kỹ thuật bên dưới! 🔍

### 1. Build Pipeline được tối ưu từ đầu

Application Builder không phải là "nâng cấp" Browser Builder - nó là một **kiến trúc hoàn toàn mới**:

- ⚡ **esbuild**: JavaScript bundler viết bằng Go (không phải JavaScript!), nhanh gấp 10-100 lần Webpack trong một số trường hợp
- 🚀 **Vite-like architecture**: Sử dụng ESM (ES Modules) native, không cần bundle trong development
- 🔄 **Parallel processing**: Xử lý nhiều task song song thay vì tuần tự

**So sánh đơn giản:** Browser Builder giống như đi xe đạp, còn Application Builder như đi xe máy! 🏍️

### 2. Caching thông minh - "Nhớ" những gì đã build

Đây là điểm mình thích nhất - Application Builder có bộ nhớ tốt hơn nhiều:

- 💾 **Persistent cache**: Cache được lưu trên disk, không mất khi tắt terminal
- 🔍 **Incremental builds**: Chỉ build lại phần code thay đổi (không phải toàn bộ!)
- 📦 **Metadata cache**: Cache cả thông tin về dependencies, không cần resolve lại mỗi lần

**Ví dụ thực tế:** Bạn sửa 1 file component nhỏ → Browser Builder build lại 1000+ files, Application Builder chỉ build lại file đó + dependencies liên quan!

### 3. Tree-shaking và Code Splitting siêu hiệu quả

- ✂️ **Better tree-shaking**: Loại bỏ dead code chính xác hơn, bundle nhẹ hơn
- 📊 **Optimized code splitting**: Tự động chia bundle hợp lý - load code khi cần
- 🎯 **Lazy loading**: Hỗ trợ lazy loading routes tốt hơn, giảm initial bundle size

### 4. Giảm số bước xử lý (Fewer Steps = Faster Build)

Browser Builder phải đi qua một hành trình dài:
1. 🔨 TypeScript compilation
2. 📝 Template compilation
3. 📦 Module bundling
4. 🖼️ Asset processing
5. ⚙️ Optimization
6. 🔀 Chunk splitting
7. 📤 Output generation

Application Builder gộp nhiều bước lại và tối ưu từng bước, giảm overhead đáng kể. Kết quả? Build nhanh hơn mà vẫn giữ nguyên chất lượng output!

## Lưu ý quan trọng trước khi migrate

Mình muốn chia sẻ những điều cần lưu ý để bạn migrate một cách an toàn và hiệu quả nhất! ⚠️

### 1. Kiểm tra Compatibility - Điều kiện tiên quyết

Không phải project nào cũng migrate được ngay. Hãy đảm bảo:

- ✅ **Angular version >= 17**: Tốt nhất là >= 18 (như project của mình)
- ✅ **Dependencies tương thích**: Kiểm tra xem các thư viện bạn dùng có support Application Builder không
- ⚠️ **Custom webpack config**: Nếu bạn có custom webpack config, có thể cần điều chỉnh hoặc bỏ đi (Application Builder không dùng Webpack nữa!)

**Mẹo:** Nếu không chắc, hãy tạo một branch riêng để test migrate trước, đừng migrate trực tiếp trên main branch nhé!

### 2. Test kỹ lưỡng sau khi migrate

Sau khi migrate, **NHẤT ĐỊNH** phải test kỹ:

- ✅ Build production: `ng build --configuration production`
- ✅ Build development: `ng build --configuration development`
- ✅ Serve và HMR: `ng serve` - kiểm tra hot reload có hoạt động không
- ✅ Bundle size: So sánh với build cũ, đảm bảo không tăng đột biến
- ✅ Runtime testing: Test các tính năng chính của app, đảm bảo không có lỗi

**Quy trình mình làm:**
1. Migrate trên branch riêng
2. Build và test local
3. Deploy lên staging environment
4. Test kỹ trên staging
5. Mới merge vào main và deploy production

### 3. Tối ưu thêm sau khi migrate (Bonus!)

Sau khi migrate xong và mọi thứ hoạt động ổn, bạn có thể tối ưu thêm:

- 💾 **Enable Angular cache**: Thường đã có sẵn trong config, nhưng kiểm tra lại:
  ```json
  {
    "cli": {
      "cache": {
        "enabled": true,
        "environment": "all"
      }
    }
  }
  ```
- 🧹 **Clean up dependencies**: Loại bỏ các package không dùng đến
- 🎯 **Code splitting**: Review lại lazy loading routes, tối ưu nếu cần
- 🖼️ **Asset optimization**: Compress images, sử dụng WebP khi có thể

### 4. Environment Variables - Lưu ý nhỏ

Application Builder xử lý environment variables hơi khác một chút so với Browser Builder. Nếu project bạn có nhiều environment files (dev, staging, prod), hãy kiểm tra lại để đảm bảo chúng được load đúng.

## Best Practices: Tối ưu build time đến mức tối đa

Ngoài việc migrate sang Application Builder, mình cũng áp dụng một số best practices này để build càng nhanh càng tốt! 🚀

### 1. Bật Angular Cache - Quan trọng nhất!

Đây là tính năng mình recommend **100%** - nó giúp rebuild nhanh hơn rất nhiều:

```json
{
  "cli": {
    "cache": {
      "enabled": true,
      "environment": "all",
      "path": ".angular/cache"
    }
  }
}
```

**Lưu ý:** Thêm `.angular/cache` vào `.gitignore` nhé, không cần commit cache lên git!

### 2. Dọn dẹp Dependencies - Bớt gánh nặng

Dependencies không dùng đến = thời gian build lãng phí:

```bash
# Kiểm tra dependencies có thực sự được dùng không
npm ls --depth=0

# Loại bỏ packages không dùng (nhưng cẩn thận!)
npm prune

# Bonus: Sử dụng npm-check để tìm unused packages
npx npm-check -u
```

### 3. Code Splitting Strategy - Chia để trị

Lazy load routes giúp initial bundle nhỏ hơn, build cũng nhanh hơn:

```typescript
// Tối ưu lazy loading routes
const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.module')
        .then(m => m.DashboardModule)
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./features/settings/settings.module')
        .then(m => m.SettingsModule)
  }
];
```

**Pro tip:** Không lazy load routes nhỏ, chỉ lazy load các feature modules lớn!

### 4. Asset Optimization - Giảm kích thước

Assets lớn = build chậm:

- 🖼️ **Compress images**: Sử dụng tools như `imagemin` hoặc online tools
- 📸 **WebP format**: Nếu browser support, dùng WebP thay vì PNG/JPG (nhẹ hơn 25-30%)
- 🎬 **Lazy load images**: Không load tất cả images ngay, chỉ load khi cần:

```typescript
// Lazy load images với Intersection Observer
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target as HTMLImageElement;
      img.src = img.dataset['src'] || '';
      imageObserver.unobserve(img);
    }
  });
});
```

### 5. TypeScript Configuration - Compile nhanh hơn

Tối ưu `tsconfig.json` để TypeScript compile nhanh hơn:

```json
{
  "compilerOptions": {
    "incremental": true,        // Lưu cache compilation
    "skipLibCheck": true,       // Bỏ qua check type của node_modules
    "isolatedModules": true,    // Tối ưu cho build tools
    "sourceMap": false          // Tắt sourcemap trong production (nếu không cần)
  }
}
```

**Lưu ý:** Chỉ tắt `sourceMap` trong production nếu bạn không cần debug trên production!

## Kết luận: Một thay đổi nhỏ, kết quả lớn - Đặc biệt với hotfix!

Migrate sang Application Builder không chỉ là một "technical upgrade" - nó thực sự thay đổi cách mình làm việc với Angular project. Từ một project mỗi lần build phải chờ **52 phút**, giờ đây chỉ còn **26 phút** - một cải thiện đáng kể!

### Tổng kết những gì đạt được

- ⚡ **Giảm 50% build time**: Từ 52 phút → 26 phút
- 🚀 **Rebuild nhanh hơn 55%**: Từ 40 phút → 18 phút
- 🔥 **Hotfix khả thi hơn**: Giảm thời gian deploy hotfix từ 52 phút xuống 26 phút - giải quyết vấn đề khẩn cấp nhanh chóng hơn!
- 💰 **Tiết kiệm chi phí CI/CD**: Giảm 50% thời gian build = tiết kiệm đáng kể với cloud CI/CD
- 😊 **Developer experience tốt hơn**: Không còn phải chờ đợi, tập trung vào code và giải quyết vấn đề
- 🎯 **Tăng độ hài lòng của các bên**: Stakeholders, customers, và team đều hài lòng hơn nhờ deploy nhanh hơn
- 📦 **Bundle size không đổi**: Không có trade-off về performance - vẫn giữ nguyên chất lượng output

### Khuyến nghị cho bạn

Đặc biệt nếu bạn đang:
- ✅ Sử dụng Angular 17+ (tốt nhất là 18+)
- ✅ Gặp vấn đề về build time quá lâu (đặc biệt khi deploy hotfix khẩn cấp!)
- ✅ Muốn cải thiện developer experience và độ hài lòng của các bên
- ✅ Cần deploy thường xuyên hoặc có nhiều hotfix production

Thì **đây chính là lúc** để migrate sang Application Builder!

**Use case đặc biệt quan trọng: Hotfix Production**
Với build time 52 phút, mỗi lần hotfix là một cơn ác mộng. Stakeholders hỏi "Bao giờ fix xong?" và bạn phải trả lời "Khoảng 1 tiếng nữa" chỉ để build! Giờ đây với 26 phút, bạn có thể tự tin hơn rất nhiều. Đây không chỉ là vấn đề kỹ thuật, mà còn là vấn đề về **business impact** và **customer satisfaction**!

**Action plan đơn giản:**
1. ✅ Tạo branch mới để test
2. ✅ Sửa `angular.json` như mình hướng dẫn
3. ✅ Test build và chạy app
4. ✅ So sánh build time trước/sau
5. ✅ Nếu OK → merge và enjoy! 🎉

### Lời khuyên cuối cùng

- 🔍 **Đọc kỹ documentation** trước khi migrate, đặc biệt nếu project có custom webpack config
- 🧪 **Test kỹ lưỡng** trên staging trước khi deploy production
- 📊 **Monitor metrics**: Theo dõi build time và bundle size sau khi migrate
- 💬 **Share với team**: Nếu bạn thấy hiệu quả, hãy share với team để mọi người cùng benefit!

### Application Builder khác gì so với Browser Builder?

Browser Builder (@angular-devkit/build-angular:browser) dựa trên Webpack với nhiều plugin và loader, build qua nhiều bước nên chậm với project lớn. Application Builder (@angular-devkit/build-angular:application) được thiết kế lại từ Angular 17+, dùng esbuild viết bằng Go cùng kiến trúc kiểu Vite, có caching thông minh hơn, tree-shaking và code splitting hiệu quả hơn.

### Migrate sang Application Builder có phải sửa code không?

Không. Chỉ cần sửa file angular.json: đổi builder từ browser sang application, đổi option main thành browser, và chuyển polyfills từ chuỗi đơn sang mảng. Không cần thay đổi source code hay migrate dependencies phức tạp.

### Cần Angular phiên bản nào để dùng Application Builder?

Application Builder có từ Angular 17 trở lên, tốt nhất là từ Angular 18 như project trong bài. Ngoài ra cần kiểm tra các thư viện đang dùng có tương thích không, và nếu project có custom webpack config thì phải điều chỉnh hoặc bỏ đi vì Application Builder không dùng Webpack nữa.

### Build nhanh hơn thì bundle size có bị tăng không?

Bài viết này chỉ đo build time chứ không đo bundle size, nên không có số liệu cụ thể để khẳng định. Về mặt cơ chế thì Application Builder có tree-shaking chính xác hơn và code splitting tự động nên bundle không có lý do gì phải phình ra. Dù vậy đây là suy luận chứ không phải số đo, nên vẫn nên tự so sánh bundle size trước và sau khi migrate.

### Kết quả cụ thể đo được sau khi migrate là bao nhiêu?

Với một webapp enterprise viết bằng Angular 18, build production giảm từ khoảng 52 phút xuống khoảng 26 phút (giảm 50%), rebuild giảm từ khoảng 40 phút xuống khoảng 18 phút (giảm 55%). Nhờ đó thời gian deploy hotfix production cũng rút ngắn một nửa.

---

## Tài liệu tham khảo và tài nguyên hữu ích

- 📚 [Angular Application Builder Documentation](https://angular.dev/reference/configs/application) - Official docs về Application Builder
- ⚙️ [Angular Build Optimization Guide](https://angular.dev/guide/build-optimization) - Hướng dẫn tối ưu build từ Angular team
- 💾 [Angular Cache Configuration](https://angular.dev/reference/configs/cache) - Cách cấu hình cache để build nhanh hơn
- 🔧 [esbuild Documentation](https://esbuild.github.io/) - Tài liệu về esbuild (bundler được dùng trong Application Builder)

---

*Bài viết này được cập nhật lần cuối vào tháng 11/2025 dựa trên kinh nghiệm thực tế với Angular 18.*

**Bạn có câu hỏi hay kinh nghiệm riêng về Angular build optimization? Hãy chia sẻ ở phần comment bên dưới nhé! 🚀**
