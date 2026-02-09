---
slug: gioi-thieu-uuid-universally-unique-identifier
title: Giới thiệu UUID (Universally Unique Identifier) - Định danh duy nhất toàn cầu
authors: [tiennhm]
tags: [uuid, database, programming, identifier, unique-id]
---

import { SummaryBox } from '@site/src/components/SEO';

# Giới thiệu UUID (Universally Unique Identifier) - Định danh duy nhất toàn cầu

<SummaryBox>
UUID (Universally Unique Identifier) là chuẩn định danh 128-bit được sử dụng rộng rãi trong lập trình và cơ sở dữ liệu để tạo ID duy nhất toàn cầu mà không cần cơ quan trung tâm quản lý. Bài viết giới thiệu 5 phiên bản UUID (v1 time-based, v4 random, v3/v5 name-based), ưu nhược điểm của từng loại, cách sử dụng trong các ngôn ngữ lập trình phổ biến, và các use case thực tế trong distributed systems, microservices và database design.
</SummaryBox>

UUID (Universally Unique Identifier) là một chuẩn định danh duy nhất được sử dụng rộng rãi trong lập trình và cơ sở dữ liệu. Trong bài viết này, chúng ta sẽ tìm hiểu chi tiết về UUID, tại sao nên sử dụng nó, ưu nhược điểm và các ví dụ thực tế.

<!-- truncate -->

## UUID là gì?

UUID là một chuỗi 128-bit được biểu diễn dưới dạng 32 ký tự hexadecimal, được chia thành 5 nhóm và ngăn cách bởi dấu gạch ngang. Ví dụ:

```
550e8400-e29b-41d4-a716-446655440000
```

UUID được thiết kế để đảm bảo tính duy nhất trên toàn cầu mà không cần một cơ quan trung tâm nào quản lý.

## Các phiên bản UUID chi tiết

UUID có 5 phiên bản chính, mỗi phiên bản có cách tạo và mục đích sử dụng khác nhau:

### UUID Version 1 (Time-based)

**Cấu trúc:**
- 60 bits: Timestamp (số giây từ 15/10/1582)
- 12 bits: Clock sequence (để tránh trùng lặp)
- 48 bits: MAC address của máy tạo UUID

**Đặc điểm:**
- ✅ Có thể sắp xếp theo thời gian
- ✅ Đảm bảo tính duy nhất cao
- ❌ Tiết lộ thông tin về máy tạo
- ❌ Có thể dự đoán được thời gian tạo
- ❌ Có thể trùng lặp nếu tạo cùng lúc

**Ví dụ:**
```
550e8400-e29b-11d4-a716-446655440000
```

**Khi nào sử dụng:**
- Cần sắp xếp theo thời gian tạo
- Hệ thống đơn lẻ, không quan tâm bảo mật
- Cần trace được thời điểm tạo UUID

### UUID Version 2 (DCE Security)

**Đặc điểm:**
- Dựa trên Version 1 nhưng thay thế một phần bằng user/group ID
- Ít được sử dụng trong thực tế
- Chủ yếu dành cho DCE (Distributed Computing Environment)

**Khi nào sử dụng:**
- Hệ thống DCE
- Cần liên kết UUID với user/group

### UUID Version 3 (Name-based with MD5)

**Cấu trúc:**
- Sử dụng MD5 hash của namespace + name
- Namespace phải là UUID hợp lệ
- Name là chuỗi tùy ý

**Đặc điểm:**
- ✅ Cùng input luôn tạo ra cùng UUID
- ✅ Deterministic (xác định)
- ❌ MD5 đã lỗi thời về mặt bảo mật
- ❌ Không được khuyến khích sử dụng

**Ví dụ:**
```python
import uuid

# Tạo UUID v3 từ namespace và name
namespace = uuid.NAMESPACE_DNS
name = "example.com"
uuid3 = uuid.uuid3(namespace, name)
print(uuid3)  # 6fa459ea-ee8a-3ca4-894e-db77e160355e
```

**Khi nào sử dụng:**
- Cần tạo UUID từ dữ liệu có sẵn
- Không quan tâm đến bảo mật
- Legacy systems

### UUID Version 4 (Random)

**Cấu trúc:**
- 122 bits: Số ngẫu nhiên
- 4 bits: Version (0100)
- 2 bits: Variant (10)

**Đặc điểm:**
- ✅ Hoàn toàn ngẫu nhiên
- ✅ Không thể dự đoán
- ✅ Bảo mật cao
- ✅ Được sử dụng phổ biến nhất
- ❌ Không thể sắp xếp theo thời gian
- ❌ Không deterministic

**Ví dụ:**
```
550e8400-e29b-41d4-a716-446655440000
```

**Khi nào sử dụng:**
- Hầu hết các trường hợp
- Cần bảo mật cao
- Hệ thống phân tán
- API public

### UUID Version 5 (Name-based with SHA-1)

**Cấu trúc:**
- Sử dụng SHA-1 hash của namespace + name
- Namespace phải là UUID hợp lệ
- Name là chuỗi tùy ý

**Đặc điểm:**
- ✅ Cùng input luôn tạo ra cùng UUID
- ✅ Deterministic (xác định)
- ✅ SHA-1 an toàn hơn MD5
- ✅ Được khuyến khích thay thế v3
- ❌ Vẫn có thể dự đoán được

**Ví dụ:**
```python
import uuid

# Tạo UUID v5 từ namespace và name
namespace = uuid.NAMESPACE_DNS
name = "example.com"
uuid5 = uuid.uuid5(namespace, name)
print(uuid5)  # 886313e1-3b8a-5372-9b90-0c9aee199e5d

# Cùng input sẽ tạo ra cùng UUID
uuid5_2 = uuid.uuid5(namespace, name)
print(uuid5 == uuid5_2)  # True
```

**Khi nào sử dụng:**
- Cần tạo UUID từ dữ liệu có sẵn
- Cần deterministic UUID
- Thay thế cho UUID v3
- Tạo UUID từ URL, email, tên file

## So sánh các phiên bản UUID

| Version | Tính duy nhất | Bảo mật | Deterministic | Sắp xếp được | Sử dụng phổ biến |
|---------|---------------|---------|---------------|--------------|------------------|
| v1 | Cao | Thấp | Không | Có | Trung bình |
| v2 | Cao | Thấp | Không | Có | Thấp |
| v3 | Cao | Thấp | Có | Không | Thấp |
| v4 | Cao | Cao | Không | Không | Cao |
| v5 | Cao | Trung bình | Có | Không | Trung bình |

## Namespace UUIDs chuẩn

Khi sử dụng UUID v3 hoặc v5, bạn có thể sử dụng các namespace chuẩn:

```python
import uuid

# Các namespace chuẩn
print(uuid.NAMESPACE_DNS)    # 6ba7b810-9dad-11d1-80b4-00c04fd430c8
print(uuid.NAMESPACE_URL)    # 6ba7b811-9dad-11d1-80b4-00c04fd430c8
print(uuid.NAMESPACE_OID)    # 6ba7b812-9dad-11d1-80b4-00c04fd430c8
print(uuid.NAMESPACE_X500)   # 6ba7b814-9dad-11d1-80b4-00c04fd430c8
```

**Ví dụ sử dụng namespace:**

```python
# Tạo UUID từ URL
url_uuid = uuid.uuid5(uuid.NAMESPACE_URL, "https://example.com")
print(url_uuid)  # 6ba7b811-9dad-51d1-80b4-00c04fd430c8

# Tạo UUID từ email
email_uuid = uuid.uuid5(uuid.NAMESPACE_DNS, "user@example.com")
print(email_uuid)

# Tạo UUID từ tên file
file_uuid = uuid.uuid5(uuid.NAMESPACE_OID, "/path/to/file.txt")
print(file_uuid)
```

## Tại sao sử dụng UUID?

### 1. Tính duy nhất toàn cầu
UUID đảm bảo không có xung đột giữa các hệ thống khác nhau, ngay cả khi chúng hoạt động độc lập.

### 2. Không cần server trung tâm
Không cần một server để quản lý và phân phối ID như auto-increment.

### 3. Bảo mật
UUID khó đoán được, giúp bảo vệ thông tin nhạy cảm.

### 4. Phân tán dữ liệu
Hỗ trợ tốt cho các hệ thống phân tán và microservices.

## Ưu điểm của UUID

### ✅ Ưu điểm
- **Tính duy nhất cao**: Xác suất trùng lặp cực kỳ thấp
- **Không cần đồng bộ**: Có thể tạo ở nhiều nơi khác nhau
- **Bảo mật**: Khó đoán được nội dung
- **Hỗ trợ phân tán**: Lý tưởng cho hệ thống phân tán
- **Không tiết lộ thông tin**: Không cho biết số lượng record

### ❌ Nhược điểm
- **Kích thước lớn**: 16 bytes so với 4-8 bytes của integer
- **Hiệu suất**: Chậm hơn integer trong indexing và sorting
- **Khó đọc**: Không thân thiện với con người
- **Memory overhead**: Tốn nhiều bộ nhớ hơn

## Ví dụ thực tế trong các ngôn ngữ lập trình

### JavaScript/Node.js

```javascript
// Sử dụng crypto API (Node.js)
const crypto = require('crypto');
const uuid = crypto.randomUUID();
console.log(uuid); // 550e8400-e29b-41d4-a716-446655440000

// Sử dụng thư viện uuid
const { v4: uuidv4 } = require('uuid');
const id = uuidv4();
console.log(id);

// Trong browser
const browserUuid = crypto.randomUUID();
```

### Python

```python
import uuid

# Tạo UUID version 4 (random)
uuid4 = uuid.uuid4()
print(uuid4)  # 550e8400-e29b-41d4-a716-446655440000

# Tạo UUID version 1 (time-based)
uuid1 = uuid.uuid1()
print(uuid1)

# Tạo UUID version 5 (name-based)
namespace = uuid.NAMESPACE_DNS
name = "example.com"
uuid5 = uuid.uuid5(namespace, name)
print(uuid5)

# Chuyển đổi sang string
uuid_string = str(uuid4)
```

### Java

```java
import java.util.UUID;

public class UUIDExample {
    public static void main(String[] args) {
        // Tạo UUID random
        UUID uuid = UUID.randomUUID();
        System.out.println(uuid.toString());
        
        // Tạo UUID từ string
        UUID fromString = UUID.fromString("550e8400-e29b-41d4-a716-446655440000");
        
        // Tạo UUID version 3 (name-based with MD5)
        UUID nameBased = UUID.nameUUIDFromBytes("example".getBytes());
    }
}
```

### C#

```csharp
using System;

class Program
{
    static void Main()
    {
        // Tạo UUID mới
        Guid uuid = Guid.NewGuid();
        Console.WriteLine(uuid.ToString());
        
        // Tạo UUID từ string
        Guid fromString = Guid.Parse("550e8400-e29b-41d4-a716-446655440000");
        
        // Tạo UUID empty
        Guid empty = Guid.Empty;
    }
}
```

### Go

```go
package main

import (
    "fmt"
    "github.com/google/uuid"
)

func main() {
    // Tạo UUID version 4
    id := uuid.New()
    fmt.Println(id.String())
    
    // Tạo UUID version 1
    id1 := uuid.NewUUID()
    fmt.Println(id1.String())
    
    // Parse UUID từ string
    parsed, err := uuid.Parse("550e8400-e29b-41d4-a716-446655440000")
    if err != nil {
        panic(err)
    }
    fmt.Println(parsed)
}
```

## Sử dụng UUID trong Database

### PostgreSQL

```sql
-- Tạo bảng với UUID
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100),
    email VARCHAR(100)
);

-- Chèn dữ liệu
INSERT INTO users (name, email) VALUES 
('John Doe', 'john@example.com');

-- Tạo UUID trong query
SELECT gen_random_uuid() as new_id;

-- Index trên UUID
CREATE INDEX idx_users_id ON users(id);
```

### MySQL

```sql
-- Tạo bảng với UUID
CREATE TABLE users (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);

-- Chèn dữ liệu với UUID
INSERT INTO users (id, name, email) VALUES 
(UUID(), 'John Doe', 'john@example.com');

-- Tạo UUID trong query
SELECT UUID() as new_id;
```

### MongoDB

```javascript
// Tạo document với UUID
db.users.insertOne({
    _id: ObjectId(), // MongoDB ObjectId
    uuid: UUID(),    // Hoặc sử dụng UUID
    name: "John Doe",
    email: "john@example.com"
});

// Tìm kiếm theo UUID
db.users.findOne({uuid: "550e8400-e29b-41d4-a716-446655440000"});
```

## So sánh UUID với các phương pháp khác

| Phương pháp | Kích thước | Tính duy nhất | Hiệu suất | Bảo mật |
|-------------|------------|---------------|-----------|---------|
| Auto-increment | 4-8 bytes | Trong DB | Cao | Thấp |
| UUID v4 | 16 bytes | Toàn cầu | Trung bình | Cao |
| Snowflake ID | 8 bytes | Toàn cầu | Cao | Trung bình |
| ULID | 16 bytes | Toàn cầu | Cao | Trung bình |

## Khi nào nên sử dụng UUID?

### ✅ Nên sử dụng khi:
- Xây dựng hệ thống phân tán
- Cần bảo mật cao
- Merge dữ liệu từ nhiều nguồn
- API public
- Microservices architecture

### ❌ Không nên sử dụng khi:
- Database nhỏ, ít dữ liệu
- Cần hiệu suất cao nhất
- Primary key thường xuyên được join
- Cần ID ngắn gọn, dễ đọc

## Best Practices

### 1. Chọn đúng version
- **UUID v4**: Cho hầu hết trường hợp
- **UUID v1**: Khi cần timestamp
- **UUID v5**: Khi cần tạo UUID từ dữ liệu có sẵn

### 2. Database optimization
```sql
-- PostgreSQL: Sử dụng UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tạo index cho UUID
CREATE INDEX CONCURRENTLY idx_users_uuid ON users USING btree (id);
```

### 3. Application level
```javascript
// Cache UUID để tránh tạo lại
const userId = useMemo(() => uuidv4(), []);

// Validate UUID format
const isValidUUID = (str) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(str);
};
```

## Kết luận

UUID là một công cụ mạnh mẽ cho việc tạo định danh duy nhất trong các ứng dụng hiện đại. Mặc dù có một số nhược điểm về hiệu suất và kích thước, nhưng lợi ích về tính duy nhất, bảo mật và khả năng phân tán làm cho nó trở thành lựa chọn lý tưởng cho nhiều trường hợp sử dụng.

Khi quyết định sử dụng UUID, hãy cân nhắc kỹ lưỡng về yêu cầu của hệ thống, đặc biệt là về hiệu suất và bảo mật. Với sự hiểu biết đúng đắn, UUID sẽ giúp bạn xây dựng các hệ thống robust và scalable.

---

**Tài liệu tham khảo:**
- [RFC 4122 - UUID Specification](https://tools.ietf.org/html/rfc4122)
- [UUID Wikipedia](https://en.wikipedia.org/wiki/Universally_unique_identifier)
- [PostgreSQL UUID Documentation](https://www.postgresql.org/docs/current/datatype-uuid.html)
