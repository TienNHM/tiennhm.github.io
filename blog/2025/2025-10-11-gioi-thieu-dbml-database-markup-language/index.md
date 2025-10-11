---
slug: gioi-thieu-dbml-database-markup-language
title: Giới thiệu DBML - Database Markup Language
authors: [tiennhm]
tags: [database, dbml, schema, documentation, tools]
---

# Giới thiệu DBML - Database Markup Language

Trong thế giới phát triển phần mềm hiện đại, việc quản lý và tài liệu hóa cấu trúc cơ sở dữ liệu (database schema) là một thách thức không nhỏ. DBML (Database Markup Language) ra đời như một giải pháp hiệu quả để giải quyết vấn đề này.

## DBML là gì?

DBML là một ngôn ngữ DSL (Domain Specific Language) mã nguồn mở được thiết kế để định nghĩa và tài liệu hóa các cấu trúc và lược đồ cơ sở dữ liệu. Với cú pháp đơn giản, nhất quán và dễ đọc, DBML giúp các nhà phát triển dễ dàng mô tả và quản lý các lược đồ cơ sở dữ liệu phức tạp.

## Tại sao nên sử dụng DBML?

### 1. **Đơn giản và dễ đọc**
Cú pháp của DBML được thiết kế để dễ hiểu, giúp việc định nghĩa lược đồ cơ sở dữ liệu trở nên trực quan hơn so với việc viết SQL DDL truyền thống.

### 2. **Độc lập với hệ quản trị cơ sở dữ liệu**
DBML không phụ thuộc vào bất kỳ hệ quản trị cơ sở dữ liệu cụ thể nào (MySQL, PostgreSQL, SQL Server, v.v.), cho phép sử dụng linh hoạt trong nhiều môi trường khác nhau.

### 3. **Hỗ trợ công cụ trực quan hóa**
DBML đi kèm với các công cụ mạnh mẽ để vẽ sơ đồ ER (Entity Relationship) và tạo tài liệu cơ sở dữ liệu một cách tự động.

### 4. **Version Control thân thiện**
Vì DBML là text-based, nó rất phù hợp với hệ thống quản lý phiên bản như Git, giúp theo dõi thay đổi schema một cách hiệu quả.

## Cú pháp cơ bản của DBML

### Định nghĩa Table

```dbml
Table users {
  id integer [primary key]
  username varchar(50) [unique, not null]
  email varchar(100) [unique, not null]
  password_hash varchar(255) [not null]
  role user_role [default: 'user']
  created_at timestamp [default: `now()`]
  updated_at timestamp [default: `now()`]
}
```

### Định nghĩa Enum

```dbml
Enum user_role {
  admin
  moderator
  user
  guest
}

Enum post_status {
  draft
  published
  archived
  private [note: 'Chỉ hiển thị qua URL trực tiếp']
}
```

### Định nghĩa Relationships

```dbml
// One-to-Many relationship
Ref: posts.user_id > users.id

// Many-to-Many relationship
Ref: post_tags.post_id > posts.id
Ref: post_tags.tag_id > tags.id

// One-to-One relationship
Ref: user_profiles.user_id - users.id
```

## Ví dụ thực tế: Blog System

Dưới đây là một ví dụ hoàn chỉnh về schema cho một hệ thống blog:

```dbml
// Users table
Table users {
  id integer [primary key, increment]
  username varchar(50) [unique, not null]
  email varchar(100) [unique, not null]
  password_hash varchar(255) [not null]
  first_name varchar(50)
  last_name varchar(50)
  avatar_url varchar(255)
  bio text
  role user_role [default: 'user']
  is_active boolean [default: true]
  email_verified_at timestamp
  created_at timestamp [default: `now()`]
  updated_at timestamp [default: `now()`]
  
  Note: 'Bảng lưu trữ thông tin người dùng'
}

// Posts table
Table posts {
  id integer [primary key, increment]
  title varchar(255) [not null]
  slug varchar(255) [unique, not null]
  content text [not null]
  excerpt text
  featured_image varchar(255)
  status post_status [default: 'draft']
  view_count integer [default: 0]
  author_id integer [not null]
  category_id integer
  published_at timestamp
  created_at timestamp [default: `now()`]
  updated_at timestamp [default: `now()`]
  
  Note: 'Bảng lưu trữ bài viết blog'
}

// Categories table
Table categories {
  id integer [primary key, increment]
  name varchar(100) [unique, not null]
  slug varchar(100) [unique, not null]
  description text
  parent_id integer
  created_at timestamp [default: `now()`]
  updated_at timestamp [default: `now()`]
}

// Tags table
Table tags {
  id integer [primary key, increment]
  name varchar(50) [unique, not null]
  slug varchar(50) [unique, not null]
  description text
  created_at timestamp [default: `now()`]
}

// Post-Tag relationship table
Table post_tags {
  post_id integer
  tag_id integer
  
  indexes {
    (post_id, tag_id) [pk]
  }
}

// Comments table
Table comments {
  id integer [primary key, increment]
  post_id integer [not null]
  user_id integer
  parent_id integer
  content text [not null]
  is_approved boolean [default: false]
  created_at timestamp [default: `now()`]
  updated_at timestamp [default: `now()`]
}

// Enums
Enum user_role {
  admin
  moderator
  author
  user
  guest
}

Enum post_status {
  draft
  published
  archived
  private
}

// Relationships
Ref: posts.author_id > users.id
Ref: posts.category_id > categories.id
Ref: categories.parent_id > categories.id
Ref: post_tags.post_id > posts.id
Ref: post_tags.tag_id > tags.id
Ref: comments.post_id > posts.id
Ref: comments.user_id > users.id
Ref: comments.parent_id > comments.id
```

## Ví dụ nâng cao: E-commerce System

```dbml
// Products table
Table products {
  id integer [primary key, increment]
  name varchar(255) [not null]
  slug varchar(255) [unique, not null]
  description text
  short_description varchar(500)
  sku varchar(100) [unique, not null]
  price decimal(10,2) [not null]
  compare_price decimal(10,2)
  cost_price decimal(10,2)
  stock_quantity integer [default: 0]
  low_stock_threshold integer [default: 5]
  weight decimal(8,2)
  dimensions varchar(100)
  status product_status [default: 'active']
  featured boolean [default: false]
  category_id integer
  brand_id integer
  created_at timestamp [default: `now()`]
  updated_at timestamp [default: `now()`]
}

// Orders table
Table orders {
  id integer [primary key, increment]
  order_number varchar(50) [unique, not null]
  customer_id integer [not null]
  status order_status [default: 'pending']
  payment_status payment_status [default: 'pending']
  shipping_status shipping_status [default: 'pending']
  subtotal decimal(10,2) [not null]
  tax_amount decimal(10,2) [default: 0]
  shipping_amount decimal(10,2) [default: 0]
  discount_amount decimal(10,2) [default: 0]
  total_amount decimal(10,2) [not null]
  currency varchar(3) [default: 'USD']
  notes text
  created_at timestamp [default: `now()`]
  updated_at timestamp [default: `now()`]
}

// Order Items table
Table order_items {
  id integer [primary key, increment]
  order_id integer [not null]
  product_id integer [not null]
  quantity integer [not null]
  unit_price decimal(10,2) [not null]
  total_price decimal(10,2) [not null]
  created_at timestamp [default: `now()`]
}

// Enums for E-commerce
Enum product_status {
  active
  inactive
  discontinued
  out_of_stock
}

Enum order_status {
  pending
  confirmed
  processing
  shipped
  delivered
  cancelled
  refunded
}

Enum payment_status {
  pending
  paid
  failed
  refunded
  partially_refunded
}

Enum shipping_status {
  pending
  processing
  shipped
  delivered
  returned
}

// Relationships
Ref: products.category_id > categories.id
Ref: products.brand_id > brands.id
Ref: orders.customer_id > customers.id
Ref: order_items.order_id > orders.id
Ref: order_items.product_id > products.id
```

## Các công cụ hỗ trợ DBML

### 1. [**dbdiagram.io**](https://dbdiagram.io)
- Công cụ miễn phí trực tuyến để vẽ sơ đồ ER từ mã DBML
- Hỗ trợ export sang nhiều định dạng (PNG, PDF, SQL)
- Giao diện trực quan và dễ sử dụng

### 2. [**dbdocs.io**](https://dbdocs.io)
- Công cụ tạo tài liệu cơ sở dữ liệu từ mã DBML
- Tự động generate documentation với giao diện đẹp
- Hỗ trợ hosting và chia sẻ tài liệu

### 3. [**DBML CLI**](https://github.com/holistics/dbml)
- Công cụ dòng lệnh để chuyển đổi giữa SQL và DBML
- Hỗ trợ import từ các database hiện có
- Tích hợp với CI/CD pipeline

### 4. [**VS Code Extension**](https://marketplace.visualstudio.com/items?itemName=bocovo.dbml-erd-visualizer)
- Extension cho Visual Studio Code
- Syntax highlighting và IntelliSense
- Preview sơ đồ trực tiếp trong editor

## Lợi ích khi sử dụng DBML trong dự án

### 1. **Cải thiện Collaboration**
- Team có thể dễ dàng hiểu và review database schema
- Giảm thiểu miscommunication về cấu trúc dữ liệu
- Onboarding developer mới nhanh hơn

### 2. **Documentation tự động**
- Tài liệu database luôn được cập nhật
- Giảm thời gian viết và maintain documentation
- Đảm bảo tính nhất quán trong tài liệu

### 3. **Database Migration**
- Dễ dàng track changes trong schema
- Hỗ trợ rollback khi cần thiết
- Version control cho database structure

### 4. **Testing và Development**
- Tạo test database nhanh chóng
- Đảm bảo consistency giữa các môi trường
- Hỗ trợ database seeding

## Kết luận

DBML là một công cụ mạnh mẽ và linh hoạt cho việc quản lý database schema. Với cú pháp đơn giản, các công cụ hỗ trợ phong phú, và khả năng tích hợp tốt với workflow phát triển hiện đại, DBML đang trở thành lựa chọn hàng đầu cho nhiều team phát triển.

Việc áp dụng DBML vào dự án không chỉ giúp cải thiện chất lượng code mà còn tăng hiệu quả làm việc của team, đặc biệt trong các dự án có database schema phức tạp.

Bạn có thể bắt đầu sử dụng DBML ngay hôm nay bằng cách truy cập [dbdiagram.io](https://dbdiagram.io) để tạo sơ đồ đầu tiên của mình!

---

**Tài liệu tham khảo:**
- [DBML Official Documentation](https://dbml.dbdiagram.io/home)
- [dbdiagram.io - Online DBML Editor](https://dbdiagram.io)
- [dbdocs.io - Database Documentation](https://dbdocs.io)
