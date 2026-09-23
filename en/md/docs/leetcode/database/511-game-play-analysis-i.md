# 511. Game Play Analysis I

> Nguồn: https://tiennhm.io.vn/en/docs/leetcode/database/511-game-play-analysis-i
> Write a solution to find the first login date for each player.

## Giới thiệu bài toán

Chi tiết: https://leetcode.com/problems/game-play-analysis-i/

Table: `Activity`

| Column Name  | Type    |
| ------------ | ------- |
| player_id    | int     |
| device_id    | int     |
| event_date   | date    |
| games_played | int     |

- `(player_id, event_date)` is the primary key (combination of columns with unique values) of this table.
- This table shows the activity of players of some games.
- Each row is a record of a player who logged in and played a number of games (possibly 0) before logging out on someday using some device.

> **Tip: Yêu cầu**
>
> Write a solution to find the first login date for each player.
>
> Return the result table in any order. The result format is in the following example.
## Giải quyết bài toán

```sql
SELECT
    player_id,
    MIN(event_date) AS first_login
FROM Activity
GROUP BY player_id;
```

Tham khảo: https://leetcode.com/submissions/detail/1039350725/
