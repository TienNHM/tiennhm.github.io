# Những hàm JavaScript hữu ích

> Nguồn: https://tiennhm.io.vn/blog/helpful-javascript-utility-functions

> Bài viết giới thiệu các hàm tiện ích JavaScript hữu ích được sử dụng trong các dự án thực tế, bao gồm các hàm xử lý object như GetValuesByKey, FlattenObject, FlattenObjectWithKey. Mỗi hàm được trình bày kèm code examples, test cases và use cases cụ thể. Các hàm này giúp developers xử lý dữ liệu phức tạp một cách hiệu quả và tái sử dụng code trong các dự án JavaScript/TypeScript.

Ngày nay, JavaScript là một trong những ngôn ngữ lập trình phổ biến nhất trên thế giới. Nó được sử dụng bởi nhiều công ty như Google, Facebook, Microsoft, v.v. để xây dựng các ứng dụng web. JavaScript là một ngôn ngữ rất mạnh mẽ có thể được sử dụng để xây dựng các ứng dụng web phức tạp. Nó cũng là một ngôn ngữ rất linh hoạt có thể được sử dụng để xây dựng các ứng dụng web đơn giản.

Trong bài viết này, tôi sẽ liệt kê một số hàm tiện ích JavaScript hữu ích nhất mà tôi đã sử dụng trong các dự án của mình.

## 1. GetValuesByKey

Hàm này sẽ giúp bạn lấy các giá trị có cùng tên field trong một `object`, bao gồm các `object` con lồng nhau. Nó sẽ trả về một mảng các giá trị tìm được.

        {GetValuesByKey}

        {GetValuesByKeyTest}

## 2. Flatten object

### 2.1. Flatten object
Hàm này sẽ giúp bạn làm phẳng một `object` có các `object` con lồng nhau. Nó sẽ trả về một `object` mới với các `key` là `key` của các `object` con lồng nhau.

        {FlattenObject}

        {FlattenObjectTest}

### 2.2. Flatten object with key

Hàm này sẽ giúp bạn làm phẳng một `object` có các `object` con lồng nhau. Nó sẽ trả về một `object` mới với các `key` là `key` của các `object` con lồng nhau, nhưng có thêm `key` của `object` cha ở đầu `key` của `object` con.

        {FlattenObjectWithKey}

        {FlattenObjectWithKeyTest}
