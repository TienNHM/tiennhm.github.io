# 182. Duplicate Emails

> Nguồn: https://tiennhm.io.vn/en/docs/leetcode/database/182-duplicate-emails
> Write a solution to report all the duplicate emails. Note that it's guaranteed that the email field is not `NULL`.

## Giới thiệu bài toán

Chi tiết: https://leetcode.com/problems/duplicate-emails

Table: `Person`

| Column Name  | Type     |
| ------------ | -------- |
| id           | int      |
| email        | varchar  |

- `id` is the primary key (column with unique values) for this table.
- Each row of this table contains an email. The emails will not contain uppercase letters.

> **Tip: Yêu cầu**
>
> Write a solution to report all the duplicate emails. Note that it's guaranteed that the email field is not `NULL`.
>
> Return the result table in any order. The result format is in the following example.
*Example 1:*
- Input: `Person` table:

| id   | email     |
| ---- | --------- |
| 1    | `a@b.com` |
| 2    | `c@d.com` |
| 3    | `a@b.com` |

- Output:

| Email      |
| ---------- |
| `a@b.com`  |

- Explanation: `a@b.com` is repeated two times.

## Giải quyết bài toán

```sql
SELECT email
FROM Person
GROUP BY email
HAVING COUNT(id) > 1;
```

Tham khảo: https://leetcode.com/submissions/detail/1039091405/
