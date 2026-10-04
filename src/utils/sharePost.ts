/**
 * Dựng sẵn nội dung bài đăng mạng xã hội từ metadata của trang.
 *
 * VỀ KỲ VỌNG SEO: link trong bài đăng LinkedIn, Facebook và X đều mang
 * `rel="nofollow"`. Chúng KHÔNG truyền thẩm quyền tên miền. Giá trị thật của
 * việc chia sẻ là người đọc bấm vào, không phải thứ hạng — nên nội dung dưới
 * đây tối ưu cho việc khiến người ta muốn bấm, không phải nhồi từ khoá.
 *
 * Mỗi nền tảng có ràng buộc riêng nên không dùng chung một chuỗi:
 *  - X giới hạn 280 ký tự, và MỌI link đều bị tính đúng 23 ký tự sau khi rút
 *    gọn qua t.co, bất kể dài bao nhiêu.
 *  - LinkedIn cắt ở khoảng 1.300 ký tự với nút "xem thêm"; phần trước đó quyết
 *    định người ta có mở ra không.
 *  - Facebook tự dựng thẻ xem trước từ Open Graph nên không cần mô tả dài.
 */

/** Độ dài mà X tính cho một link sau khi rút gọn qua t.co. */
const X_LINK_LENGTH = 23;
const X_LIMIT = 280;

/** Khoảng LinkedIn hiện trước khi gập lại sau nút "xem thêm". */
const LINKEDIN_FOLD = 1300;

export type SharePlatform = 'linkedin' | 'facebook' | 'x';

export interface ShareInput {
    title: string;
    /** Mô tả trang; thường là `description` trong frontmatter. */
    description?: string;
    /** URL tuyệt đối, chưa gắn tham số theo dõi. */
    url: string;
    /** Thẻ của bài; dùng `permalink` để sinh hashtag ASCII. */
    tags?: { label: string; permalink: string }[];
}

export interface SharePost {
    /** Nội dung dán thẳng vào ô soạn bài. */
    text: string;
    /** Link mở hộp thoại chia sẻ của nền tảng. */
    shareUrl: string;
    /** URL kèm tham số theo dõi, để đối chiếu khi đọc số liệu. */
    trackedUrl: string;
}

/**
 * Sinh hashtag từ `permalink` của thẻ chứ không từ `label`.
 *
 * Nhãn thẻ có dấu tiếng Việt ("Bảo mật", "Gỡ rối") và dấu chấm (".NET"), đưa
 * thẳng vào hashtag thì vỡ. `permalink` vốn đã là slug ASCII (/bao-mat,
 * /dotnet) nên chỉ cần bỏ dấu gạch.
 */
export function toHashtags(tags: ShareInput['tags'], max: number): string[] {
    if (!tags?.length) return [];
    return tags
        .map((t) => t.permalink.replace(/^.*\//, '').replace(/-/g, ''))
        .filter((t) => /^[a-z0-9]{2,}$/i.test(t))
        .slice(0, max)
        .map((t) => `#${t}`);
}

/** Gắn tham số theo dõi để biết lượt truy cập đến từ đâu. */
export function withTracking(url: string, platform: SharePlatform): string {
    const sep = url.includes('?') ? '&' : '?';
    return `${url}${sep}utm_source=${platform}&utm_medium=social`;
}

/** Cắt ở ranh giới từ, không cắt giữa chữ. */
function truncate(text: string, max: number): string {
    if (text.length <= max) return text;
    const cut = text.slice(0, max - 1);
    const lastSpace = cut.lastIndexOf(' ');
    return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

function buildLinkedIn(input: ShareInput, url: string): string {
    const tags = toHashtags(input.tags, 5).join(' ');
    const body = [input.title, input.description, `👉 ${url}`, tags]
        .filter(Boolean)
        .join('\n\n');
    // Hiếm khi chạm ngưỡng, nhưng mô tả dài bất thường thì vẫn phải gọn trước
    // nút "xem thêm" để không mất phần link.
    return body.length <= LINKEDIN_FOLD
        ? body
        : [input.title, truncate(input.description ?? '', LINKEDIN_FOLD - input.title.length - url.length - tags.length - 20), `👉 ${url}`, tags]
              .filter(Boolean)
              .join('\n\n');
}

function buildFacebook(input: ShareInput, url: string): string {
    // Facebook tự dựng thẻ xem trước từ Open Graph nên không lặp lại mô tả dài.
    const tags = toHashtags(input.tags, 3).join(' ');
    return [input.title, truncate(input.description ?? '', 280), url, tags]
        .filter(Boolean)
        .join('\n\n');
}

function buildX(input: ShareInput, url: string): string {
    const tags = toHashtags(input.tags, 2).join(' ');
    // Ngân sách ký tự: link luôn tính 23, cộng hai dòng trống và dấu cách.
    const fixed = X_LINK_LENGTH + (tags ? tags.length + 1 : 0) + 2;
    const forText = X_LIMIT - fixed;

    let head = input.title;
    if (input.description && head.length + 3 < forText) {
        head = `${head}\n\n${truncate(input.description, forText - head.length - 2)}`;
    }
    head = truncate(head, forText);

    return [head, tags ? `${url} ${tags}` : url].join('\n\n');
}

/** Độ dài X tính được, dùng cho kiểm thử và hiển thị bộ đếm. */
export function xLength(text: string): number {
    return text.replace(/https?:\/\/\S+/g, 'x'.repeat(X_LINK_LENGTH)).length;
}

const SHARE_URL: Record<SharePlatform, (url: string, text: string) => string> = {
    linkedin: (url) =>
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    facebook: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    x: (url, text) =>
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(
            text.split('\n\n').slice(0, -1).join('\n\n'),
        )}`,
};

export function buildSharePost(platform: SharePlatform, input: ShareInput): SharePost {
    const trackedUrl = withTracking(input.url, platform);
    const text =
        platform === 'linkedin'
            ? buildLinkedIn(input, trackedUrl)
            : platform === 'facebook'
              ? buildFacebook(input, trackedUrl)
              : buildX(input, trackedUrl);

    return { text, shareUrl: SHARE_URL[platform](trackedUrl, text), trackedUrl };
}
