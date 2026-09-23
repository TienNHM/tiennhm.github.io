# 196. Delete Duplicate Emails

> Nguồn: https://tiennhm.io.vn/docs/leetcode/database/196-delete-duplicate-emails
> Write a solution to delete all duplicate emails, keeping only one unique email with the smallest id. After running your script, the answer shown is the `Person` table. The driver will first compile and run your piece of code and then show the `Person` table. The final order of the `Person` table does not matter.

## Giới thiệu bài toán

Chi tiết: https://leetcode.com/problems/delete-duplicate-emails/

Table: `Person`

| Column Name | Type    |
| ----------- | ------- |
| id          | int     |
| email       | varchar |

- `id` is the primary key (column with unique values) for this table.
- Each row of this table contains an email. The emails will not contain uppercase letters.

> **Tip: Yêu cầu**
>
> Write a solution to delete all duplicate emails, keeping only one unique email with the smallest id.
>
> After running your script, the answer shown is the `Person` table. The driver will first compile and run your piece of code and then show the `Person` table. The final order of the `Person` table does not matter.
>
> The result format is in the following example.
**Example 1:**

Input: `Person` table:

| id | email              |
| -- | ------------------ |
| 1  | `john@example.com` |
| 2  | `bob@example.com`  |
| 3  | `john@example.com` |

Output:

| id | email              |
| -- | ------------------ |
| 1  | `john@example.com` |
| 2  | `bob@example.com`  |

- Explanation: `john@example.com` is repeated two times. We keep the row with the smallest Id = 1.

## Giải quyết bài toán

```sql
DELETE FROM Person
WHERE id NOT IN (
    SELECT id
    FROM (
        SELECT MIN(p.id) as id FROM Person p
        GROUP BY p.email
    ) AS c
);
```

Tham khảo: https://leetcode.com/submissions/detail/1039208682/
