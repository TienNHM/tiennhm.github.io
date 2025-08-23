# Cursor Project Rules - Quy tắc dự án Cursor

Thư mục này chứa Cursor Project Rules cho dự án blog Docusaurus TienNHM.
This directory contains Cursor Project Rules for the TienNHM Docusaurus blog project.

## Project Rules là gì? / What are Project Rules?
Project Rules cung cấp hướng dẫn cấp hệ thống cho Cursor's Agent và Inline Edit features. Chúng hoạt động như persistent context, preferences, hoặc workflows cho dự án của bạn.
Project Rules provide system-level instructions to Cursor's Agent and Inline Edit features. They act as persistent context, preferences, or workflows for your project.

## Các Rules có sẵn / Available Rules

### 1. docusaurus-blog.mdc - Tiêu chuẩn dự án chính
- **Phạm vi / Scope**: Tất cả TypeScript, JavaScript, Markdown, và MDX files
- **Mục đích / Purpose**: Tiêu chuẩn phát triển chung và tổng quan dự án
- **Khi áp dụng / When Applied**: Tự động khi làm việc với files liên quan

### 2. blog-posts.mdc - Hướng dẫn viết Blog
- **Phạm vi / Scope**: Blog post files trong thư mục blog/
- **Mục đích / Purpose**: Tiêu chuẩn cho viết blog posts, frontmatter, và nội dung
- **Khi áp dụng / When Applied**: Khi edit blog posts

### 3. components.mdc - Tiêu chuẩn React Components
- **Phạm vi / Scope**: React components trong src/components/
- **Mục đích / Purpose**: Cấu trúc component, styling, và best practices
- **Khi áp dụng / When Applied**: Khi tạo hoặc edit React components

### 4. i18n.mdc - Hướng dẫn Đa ngôn ngữ
- **Phạm vi / Scope**: Internationalization files và content
- **Mục đích / Purpose**: Hướng dẫn quản lý nội dung Việt/Anh
- **Khi áp dụng / When Applied**: Khi làm việc với nội dung đa ngôn ngữ

### 5. git-commits.mdc - Tiêu chuẩn Git Commit Messages
- **Phạm vi / Scope**: Git files và version control
- **Mục đích / Purpose**: Conventional commits và best practices cho Git
- **Khi áp dụng / When Applied**: Khi làm việc với Git và commit code

## Cách sử dụng / How to Use

### Áp dụng tự động / Automatic Application
Rules được áp dụng tự động dựa trên file patterns (globs) khi bạn làm việc với files liên quan.

### Tham chiếu thủ công / Manual Reference
Bạn có thể tham chiếu rules cụ thể trong chat bằng:
@ruleName

Ví dụ / For example:
- @docusaurus-blog - Tiêu chuẩn dự án chính
- @blog-posts - Hướng dẫn viết blog
- @components - Tiêu chuẩn phát triển components
- @i18n - Hướng dẫn đa ngôn ngữ
- @git-commits - Tiêu chuẩn Git commit messages

## Lợi ích / Benefits

✅ **Phát triển nhất quán**: Tất cả team members follow cùng standards
✅ **AI hỗ trợ tốt hơn**: Cursor hiểu rõ context dự án của bạn
✅ **Version controlled**: Rules được track trong Git
✅ **Scoped**: Different rules cho different parts của dự án
✅ **Future-proof**: Sử dụng latest Cursor features
✅ **Git workflow chuẩn**: Conventional commits và best practices

## Migration từ .cursorrules / Migration from .cursorrules

File .cursorrules legacy vẫn được support nhưng deprecated. Project Rules này cung cấp:

- Tổ chức tốt hơn
- Automatic file pattern matching
- Nested rule support
- Better IDE integration
- Future-proof architecture

## Tùy chỉnh / Customization

Bạn có thể modify rules này hoặc tạo rules mới:

1. Edit existing .mdc files
2. Tạo rules mới bằng New Cursor Rule command
3. Organize rules trong subdirectories cho specific areas
4. Sử dụng /Generate Cursor Rules command trong chat

## Cần giúp đỡ? / Need Help?

- Check Cursor Rules Documentation
- Sử dụng /Generate Cursor Rules trong chat để tạo rules mới
- Hỏi AI để được help với rule customization
- Rules được viết bằng tiếng Việt (chính) và tiếng Anh (technical terms)
