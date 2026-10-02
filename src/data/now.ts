/**
 * Nội dung trang /now — "tôi đang làm gì, ngay lúc này".
 *
 * SỬA TAY. Phần "đang dựng" dùng chung src/data/building.ts để khỏi phải khai
 * hai chỗ rồi lệch nhau.
 *
 * NOW_UPDATED_AT hiển thị ngay trên trang, cố ý: một trang /now cập nhật lần
 * cuối từ nửa năm trước còn tệ hơn không có trang nào, vì nó chứng minh site
 * đã bỏ hoang. Thà để người đọc tự thấy ngày tháng.
 */

export const NOW_UPDATED_AT = '2026-10-02';

export interface NowSection {
    icon: string;
    title: string;
    items: string[];
}

export const NOW_SECTIONS: NowSection[] = [
    {
        icon: '📚',
        title: 'Đang học',
        items: [
            'Hệ phân tán: outbox pattern, idempotency, CDC — vừa học vừa viết chương 17 của khoá .NET.',
            'Kỹ thuật hiệu năng: đo bằng BenchmarkDotNet thay vì đoán.',
            'Kubernetes ở mức vận hành thật, không dừng ở `kubectl apply`.',
        ],
    },
    {
        icon: '✍️',
        title: 'Đang viết',
        items: [
            'Loạt bài SQL đi sâu: isolation level, window function, chi phí ghi của index — mỗi bài một thí nghiệm chạy được.',
            'Cơ chế đằng sau công cụ AI: Agent Skills, MCP, và phần tri thức bị bỏ lại khi chỉ cài rồi dùng.',
        ],
    },
    {
        icon: '🧪',
        title: 'Đang thử',
        items: [
            'Claude Code và MCP server trong quy trình làm việc hằng ngày.',
            'Viết tài liệu sao cho agent đọc đúng: cấu trúc heading, nhãn khối mã, bảng thay cho văn xuôi lấp lửng.',
        ],
    },
    {
        icon: '🎯',
        title: 'Tiếp theo',
        items: [
            'Hoàn thành giai đoạn 5 của khoá .NET: kiến trúc sạch, hệ phân tán, microservices, hiệu năng.',
            'Mở mục Notes cho những ghi chép ngắn chưa đủ thành bài.',
        ],
    },
];
