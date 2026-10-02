/**
 * Mốc nghề nghiệp cho trang /timeline.
 *
 * Nguồn: CV tại https://tiennhm.io.vn/CV/ (bản PDF). Mọi mốc ở đây đều lấy
 * từ đó — không suy đoán, không làm tròn. Khi cập nhật CV thì sửa cả file này.
 *
 * `links` chỉ trỏ tới trang CÓ THẬT trên site. onBrokenLinks là 'throw' nên
 * link sai sẽ làm đỏ build, nhưng đừng dựa vào đó: kiểm bằng npm run check.
 */

export type TimelineKind = 'work' | 'project' | 'site';

export interface TimelineEntry {
    /** Khoảng thời gian, viết đúng như CV. */
    period: string;
    title: string;
    /** Nơi làm hoặc bối cảnh. Bỏ trống với dự án cá nhân. */
    org?: string;
    role?: string;
    kind: TimelineKind;
    description: string;
    tech?: string[];
    links?: { label: string; to: string }[];
}

export interface TimelineYear {
    year: string;
    /** Một câu tóm tắt năm đó, hiện dưới số năm. */
    summary: string;
    entries: TimelineEntry[];
}

export const TIMELINE: TimelineYear[] = [
    {
        year: '2026',
        summary: 'Loyalty quay lại, và phần lớn thời gian ngoài giờ dành cho AI agent.',
        entries: [
            {
                period: '04/2026 — nay',
                title: 'Loyalty System (ACFC)',
                org: 'FPT IS',
                role: 'Developer',
                kind: 'work',
                description:
                    'Luồng tích điểm, đổi quà và tặng quà cho các chương trình khuyến mãi; tích hợp giao hàng và thông báo để khép kín hành trình loyalty.',
                tech: ['.NET', 'ABP', 'Integration'],
            },
            {
                period: '2026',
                title: 'Khoá .NET Backend: Zero → Senior',
                kind: 'site',
                description:
                    '19 module, 5 giai đoạn, 4 dự án — xoay quanh một bài toán CRM lớn dần. 277 trang tài liệu.',
                links: [{ label: 'Xem khoá học', to: '/docs/dotnet-backend-zero-to-senior' }],
            },
            {
                period: '2026',
                title: 'Viết về Agent Skills và MCP',
                kind: 'site',
                description:
                    'Chuyển trọng tâm blog sang chuyện gỡ lỗi thật và cơ chế đằng sau công cụ AI, thay vì bài hướng dẫn.',
                links: [
                    { label: 'Cơ chế Agent Skills', to: '/blog/agent-skills-co-che-va-tri-thuc-bi-bo-qua' },
                ],
            },
        ],
    },
    {
        year: '2025',
        summary: 'Năm nhận vai trò dẫn dắt kỹ thuật, cùng lúc ba sản phẩm CRM.',
        entries: [
            {
                period: '03/2025 — nay',
                title: 'CRM Next (FPT CX Suite)',
                org: 'FPT IS',
                role: 'Tech Lead',
                kind: 'work',
                description:
                    'Dẫn đội tới 10 kỹ sư: lập kế hoạch tính năng, ưu tiên backlog, nghiên cứu kỹ thuật và chốt hướng triển khai. Rà chất lượng hiện thực để giữ kiến trúc nhất quán.',
                tech: ['.NET', 'ABP', 'Angular'],
                links: [
                    {
                        label: 'Chuyện nghề 20 tháng dựng nền tảng CRM',
                        to: '/blog/founding-engineer-nen-tang-crm-abp-dotnet-angular',
                    },
                ],
            },
            {
                period: '09/2025 — 03/2026',
                title: 'CRM Healthcare (Mắt Sài Gòn)',
                org: 'FPT IS',
                role: 'Developer',
                kind: 'work',
                description:
                    'Module lead, account và booking; tích hợp Pancake cùng giao diện chat cho Facebook, Zalo và Instagram.',
                tech: ['.NET', 'Pancake', 'Integration'],
            },
            {
                period: '06/2025 — nay',
                title: 'CRM cho GEIC',
                org: 'FPT IS',
                role: 'Developer',
                kind: 'work',
                description:
                    'Module quản lý khách hàng, theo dõi hoạt động và báo cáo; ổn định tính năng qua các đợt rollout.',
                tech: ['.NET', 'ABP'],
            },
        ],
    },
    {
        year: '2024',
        summary: 'Lần đầu làm sản phẩm GenAI chạy thật, không phải thử nghiệm.',
        entries: [
            {
                period: '07/2024 — 03/2025',
                title: 'AI Content Generator (Maison Online)',
                org: 'FPT IS',
                role: 'Developer',
                kind: 'work',
                description:
                    'Pipeline RAG và LLM sinh mô tả sản phẩm thời trang: nhận diện ảnh sản phẩm, crawl dữ liệu làm giàu ngữ cảnh, xuất bản qua headless CMS Directus.',
                tech: ['RAG', 'LLM', 'Directus', '.NET'],
            },
        ],
    },
    {
        year: '2023',
        summary: 'Chuyển sang FPT IS, và mở blog này.',
        entries: [
            {
                period: '01/2023 — nay',
                title: 'Technical Specialist / Developer',
                org: 'FPT IS',
                kind: 'work',
                description:
                    'Thiết kế giải pháp và hiện thực tính năng cho khách hàng doanh nghiệp; xử lý sự cố production; phân công và theo dõi công việc trong đội.',
                tech: ['.NET', 'ABP', 'Angular'],
            },
            {
                period: '06/2023 — 06/2024',
                title: 'Loyalty System (Maison Online)',
                org: 'FPT IS',
                role: 'Developer',
                kind: 'work',
                description:
                    'Tích hợp nền tảng loyalty với thương mại điện tử Haravan và ứng dụng di động. Chiến dịch, tích điểm, đổi quà, quy tắc quy đổi, phân hạng thành viên và thông báo qua OneSignal. Tối ưu các đường nóng trong tính điểm.',
                tech: ['.NET', 'Haravan', 'OneSignal', 'Redis'],
            },
            {
                period: '05/2023',
                title: 'Mở blog tiennhm.io.vn',
                kind: 'site',
                description:
                    'Commit đầu tiên ngày 23/05/2023, bài viết đầu tiên ngày 12/06/2023.',
                links: [{ label: 'Lưu trữ theo năm', to: '/blog/archive' }],
            },
        ],
    },
    {
        year: '2022',
        summary: 'Bắt đầu đi làm toàn thời gian, vào đúng mảng loyalty.',
        entries: [
            {
                period: '02/2022 — 12/2022',
                title: 'Software Developer',
                org: 'FPT Software',
                kind: 'work',
                description:
                    'Hiện thực tính năng cho Loyalty Network System của FPT Group; bàn giao theo nhịp sprint và giữ ổn định các bản phát hành.',
                tech: ['.NET', 'SQL'],
            },
        ],
    },
    {
        year: '2021',
        summary: 'Vừa học vừa nhận việc ngoài; mấy dự án đầu tiên có người dùng thật.',
        entries: [
            {
                period: '12/2021 — 01/2022',
                title: 'Freelancer Developer',
                org: 'AEMI Beauty',
                kind: 'work',
                description:
                    'Dựng website thương mại điện tử cho sản phẩm làm đẹp: giao diện responsive và luồng mua hàng cơ bản.',
            },
            {
                period: '09/2021 — nay',
                title: 'X2MINT',
                kind: 'project',
                description:
                    'Nền tảng web tạo và làm bài thi trắc nghiệm trực tuyến. Tự làm từ phân tích, thiết kế, lập trình tới kiểm thử và triển khai.',
                tech: ['MERN', 'VNPay', 'Google OAuth2', 'Cloudinary'],
                links: [{ label: 'Xem trong Showcase', to: '/showcase' }],
            },
            {
                period: '05/2021 — 06/2021',
                title: 'VIETSHOP · Artist Style Transfer',
                kind: 'project',
                description:
                    'Ứng dụng Android đặt đồ ăn và nhu yếu phẩm. Song song là đồ án CycleGAN chuyển phong cách tranh và phục chế ảnh cũ.',
                tech: ['Java', 'Android', 'Python', 'PyTorch'],
            },
        ],
    },
    {
        year: '2020',
        summary: 'Dự án web đầu tiên làm cùng nhóm.',
        entries: [
            {
                period: '11/2020 — 06/2021',
                title: 'X4FIT',
                kind: 'project',
                description:
                    'Ứng dụng web chia sẻ nội dung công nghệ và tương tác cộng đồng, làm nhóm 4 người.',
                tech: ['Java Servlet', 'MongoDB', 'Bootstrap', 'Heroku'],
            },
        ],
    },
];
