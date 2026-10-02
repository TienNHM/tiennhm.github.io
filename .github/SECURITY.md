# Chính sách bảo mật

## Phạm vi

Kho mã này sinh ra một **trang tĩnh** đặt trên GitHub Pages. Không có máy chủ
ứng dụng, không có cơ sở dữ liệu, không có tài khoản người dùng, và không thu
thập dữ liệu người đọc ngoài phần thống kê truy cập ẩn danh.

Vì vậy bề mặt tấn công hẹp hơn nhiều so với một ứng dụng web thông thường.

### Có nằm trong phạm vi

- Lỗ hổng trong mã của kho này: `src/`, `plugins/`, `scripts/`, `config/`
- Cấu hình sai dẫn tới rò rỉ bí mật (token, khoá API) trong lịch sử git hoặc
  trong bản build
- XSS qua nội dung Markdown hoặc qua các thành phần React tự viết
- Lỗ hổng trong luồng GitHub Actions — đặc biệt là leo thang quyền qua
  `GITHUB_TOKEN`
- Phụ thuộc npm có lỗ hổng đã biết **và** thật sự đi vào bản build

### Không nằm trong phạm vi

- Báo cáo tự động từ công cụ quét mà không có bằng chứng khai thác được
- Thiếu các HTTP header bảo mật do GitHub Pages không cho cấu hình
- Vấn đề của chính nền tảng GitHub Pages — hãy báo cho GitHub
- Lỗ hổng trong phụ thuộc chỉ dùng lúc phát triển, không có trong bản build
- Kỹ thuật xã hội, tấn công vật lý, DoS

## Cách báo cáo

**Đừng mở issue công khai cho lỗ hổng bảo mật.**

Gửi email tới **tiennhm.it@gmail.com**, tiêu đề bắt đầu bằng `[SECURITY]`.

Trong email xin ghi rõ:

1. Loại lỗ hổng và vị trí (tệp, dòng, hoặc URL)
2. Các bước tái hiện
3. Ảnh hưởng thực tế — khai thác được thì kẻ tấn công làm được gì
4. Phiên bản hoặc commit bạn đã thử

## Cam kết thời gian

| Mốc | Thời hạn |
|---|---|
| Xác nhận đã nhận | 3 ngày làm việc |
| Đánh giá ban đầu | 7 ngày |
| Vá lỗi nghiêm trọng | 14 ngày |
| Vá lỗi mức thấp | theo đợt cập nhật kế tiếp |

Đây là dự án cá nhân làm ngoài giờ, nên tôi không hứa nhanh hơn mức trên. Nếu
quá hạn mà chưa thấy hồi âm, cứ gửi lại email nhắc.

## Ghi công

Tôi sẽ ghi tên bạn trong commit vá lỗi và trong phần ghi công bên dưới, trừ khi
bạn muốn ẩn danh. Dự án không có chương trình thưởng tiền.

## Phiên bản được hỗ trợ

Chỉ nhánh `master` — tức bản đang chạy tại https://tiennhm.io.vn. Không có bản
phát hành cũ nào được duy trì.
