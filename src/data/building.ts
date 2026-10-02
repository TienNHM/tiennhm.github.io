/**
 * Khối "Đang dựng" ở trang chủ và trang /now.
 *
 * CỐ TÌNH SỬA TAY, không sinh tự động. Khối "Top repositories" ngay dưới đã
 * lấy dữ liệu từ GitHub API và sắp theo số sao — đó là QUÁ KHỨ, và `ebooks`
 * 566 sao sẽ luôn đứng đầu kể cả khi cả năm không ai đụng tới.
 *
 * Khối này nói HIỆN TẠI, và chỉ người viết mới biết mình đang làm gì.
 *
 * Nhớ cập nhật UPDATED_AT mỗi lần sửa: trang chủ tự ẩn khối này khi dữ liệu
 * quá cũ, vì một mục "đang dựng" đứng yên nửa năm chứng minh điều ngược lại
 * với thứ nó muốn nói.
 */

export const BUILDING_UPDATED_AT = '2026-10-02';

/** Quá số ngày này thì trang chủ ẩn khối đi. */
export const BUILDING_STALE_AFTER_DAYS = 90;

export type BuildStatus = 'building' | 'live' | 'maintaining' | 'experimenting';

export interface BuildingItem {
    name: string;
    /** Một câu. Nói nó LÀ gì, không quảng cáo. */
    summary: string;
    status: BuildStatus;
    /** Link tới bản chạy được, hoặc tới trang trong site này. */
    href?: string;
    repo?: string;
    tech?: string[];
}

export const BUILDING: BuildingItem[] = [
    {
        name: 'Khoá .NET Backend: Zero → Senior',
        summary:
            'Giáo trình 19 module xoay quanh một bài toán CRM lớn dần qua từng giai đoạn. Đang viết tiếp các chương cuối.',
        status: 'building',
        href: '/docs/dotnet-backend-zero-to-senior',
        tech: ['.NET', 'ASP.NET Core', 'EF Core'],
    },
    {
        name: 'Đi Đâu Đây?',
        summary: 'Công cụ nhỏ gợi ý chỗ đi chơi, mã nguồn mở.',
        status: 'live',
        href: 'https://didauday.tiennhm.io.vn',
        repo: 'https://github.com/TienNHM/di-dau-day',
    },
    {
        name: 'VIEvent',
        summary: 'Nền tảng sự kiện và bán vé — .NET, Angular, Redis, SignalR.',
        status: 'maintaining',
        href: 'https://vievent.tiennhm.io.vn',
        tech: ['.NET', 'ABP', 'Angular', 'SignalR'],
    },
    {
        name: 'tiennhm.io.vn',
        summary:
            'Chính trang này. Viết về gỡ lỗi production, kiến trúc và cơ chế đằng sau công cụ AI.',
        status: 'building',
        href: '/blog',
        repo: 'https://github.com/TienNHM/tiennhm.github.io',
        tech: ['Docusaurus', 'TypeScript'],
    },
];

/** Dữ liệu đã quá cũ để đáng tin chưa. */
export function isBuildingStale(now: Date = new Date()): boolean {
    const updated = new Date(BUILDING_UPDATED_AT);
    const days = (now.getTime() - updated.getTime()) / 86_400_000;
    return days > BUILDING_STALE_AFTER_DAYS;
}
