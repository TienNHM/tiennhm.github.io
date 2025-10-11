# Environment Variables Setup Guide

Hướng dẫn thiết lập các biến môi trường (Environment Variables) cho dự án TienNHM Blog.

## 🚀 Cách thiết lập nhanh

### 1. Sử dụng script tự động
```bash
npm run setup-env
```

Script này sẽ tạo file `.env.local` với template sẵn có. Bạn chỉ cần cập nhật các giá trị thực tế.

### 2. Tạo thủ công
Copy nội dung từ file `env-template.txt` và tạo file `.env.local` trong thư mục gốc của dự án.

## 📋 Danh sách Environment Variables

### Google Analytics & Tag Manager
- `GTAG_TRACKING_ID`: Google Analytics tracking ID (format: G-XXXXXXXXXX)
- `GOOGLE_TAG_MANAGER_ID`: Google Tag Manager container ID (format: GTM-XXXXXXX)
- `GOOGLE_SITE_VERIFICATION`: Google Search Console verification code

### Algolia Search
- `ALGOLIA_APP_ID`: Algolia application ID
- `ALGOLIA_API_KEY`: Algolia search API key (public key)
- `ALGOLIA_INDEX_NAME`: Algolia index name

### Canny Feedback
- `CANNY_BOARD_TOKEN`: Canny feedback board token

### GitHub Integration
- `REPO_GITHUB_ID`: GitHub repository ID
- `REPO_GITHUB`: GitHub repository name
- `REPO_GITHUB_CATEGORY_ID`: GitHub category ID

## 🔧 Cách lấy các giá trị

### Google Analytics & Tag Manager
1. Truy cập [Google Analytics](https://analytics.google.com/)
2. Tạo property mới hoặc sử dụng property hiện có
3. Lấy Tracking ID từ Admin > Property Settings
4. Tương tự với Google Tag Manager tại [tagmanager.google.com](https://tagmanager.google.com/)

### Algolia Search
1. Đăng ký tài khoản tại [Algolia](https://www.algolia.com/)
2. Tạo application mới
3. Lấy App ID và API Key từ Dashboard
4. Tạo index mới hoặc sử dụng index có sẵn

### Canny Feedback
1. Đăng ký tại [Canny](https://canny.io/)
2. Tạo board mới
3. Lấy token từ Settings > API

### GitHub Integration
1. Repository ID: Lấy từ GitHub API hoặc repository settings
2. Repository name: Tên repository (ví dụ: `tiennhm.github.io`)
3. Category ID: ID của category trong GitHub Discussions

## 📁 Cấu trúc file

```
.env.local          # File chứa environment variables (không commit)
env-template.txt    # Template để tham khảo
scripts/setup-env.js # Script tự động tạo .env.local
```

## ⚠️ Lưu ý bảo mật

- **KHÔNG BAO GIỜ** commit file `.env.local` lên Git
- File `.env.local` đã được thêm vào `.gitignore`
- Chỉ sử dụng các API keys có quyền hạn phù hợp
- Thường xuyên rotate các keys để đảm bảo bảo mật

## 🐛 Troubleshooting

### Lỗi "trackingID is required"
- Đảm bảo `GTAG_TRACKING_ID` đã được set trong `.env.local`
- Kiểm tra format của tracking ID (phải bắt đầu bằng `G-`)

### Lỗi Algolia search không hoạt động
- Kiểm tra `ALGOLIA_APP_ID`, `ALGOLIA_API_KEY`, và `ALGOLIA_INDEX_NAME`
- Đảm bảo API key có quyền search

### Lỗi build trên GitHub Actions
- Kiểm tra các secrets đã được cấu hình trong GitHub repository
- Xem logs của GitHub Actions để debug

## 📊 Monitoring

GitHub Actions workflow sẽ log ra tất cả các environment variables (với giá trị đầy đủ) để bạn có thể:
- Kiểm tra trạng thái của các secrets
- Copy về local để sử dụng
- Download file `.env.local` từ artifacts

## 🔄 Cập nhật

Khi cần cập nhật environment variables:
1. Cập nhật file `.env.local` local
2. Cập nhật các secrets trong GitHub repository
3. Chạy lại GitHub Actions để deploy

---

**Lưu ý**: Tài liệu này được tạo tự động và cập nhật theo cấu hình hiện tại của dự án.
