---
title: "Your LEFT JOIN Became an INNER JOIN and Nothing Warned You"
slug: left-join-thanh-inner-join
description: "Add one WHERE condition on a right-hand column and your LEFT JOIN silently turns into an INNER JOIN, taking with it exactly the rows you meant to keep. This post proves it with three numbers measured on PostgreSQL 16, explains SQL's logical processing order, and shows when a condition belongs in ON versus WHERE."
keywords: [left join becomes inner join, left join where null, left join vs inner join, on clause vs where clause, sql join order of operations, sql logical processing order, left join is null, anti join sql, outer join filter, left join count wrong, sql join null, postgresql left join, mysql left join, learn sql join, sql join advanced]
tags: [sql, database, postgresql, backend, fundamentals]
authors: [tiennhm]
date: 2026-09-25
---

import { SummaryBox, FAQSection } from '@site/src/components/SEO';

# Your LEFT JOIN became an INNER JOIN

<SummaryBox>
`LEFT JOIN` keeps every row from the left table and fills in `NULL` where nothing matches. But `WHERE` runs **after** the join, so any condition placed on a right-hand column also removes those `NULL` rows — and the `LEFT JOIN` becomes an `INNER JOIN` with no warning whatsoever. Measured on PostgreSQL 16: a plain `LEFT JOIN` gives **4 rows**, adding `WHERE` leaves **2 rows**, but moving that same condition into `ON` gives **3 rows** — which is the correct answer.
</SummaryBox>

This is the bug I see most often in reporting queries. It is not a syntax error, it is not slow, it throws nothing. It simply returns **too few rows**, and usually it is precisely the important ones that go missing: customers with no orders yet, products that have never sold, salespeople who have not closed anything.

This post drills into [the JOIN lesson from my 30-day SQL series](/docs/database/learn-sql-in-30-days/10-join). Every number below is real output from PostgreSQL 16.11.

<!-- truncate -->

## TL;DR {#tldr}

- `WHERE` runs **after** `JOIN`, so it filters the very `NULL` rows `LEFT JOIN` just created.
- A condition on the **right-hand table** placed in `WHERE` → `LEFT JOIN` becomes `INNER JOIN`.
- The same condition placed in `ON` → the meaning of `LEFT JOIN` is preserved.
- The one exception: `WHERE right_column IS NULL` — that is deliberate, and it is called an **anti-join**.
- Telltale symptom: reports missing exactly the "nothing yet" group.

---

## Three numbers {#ba-con-so}

Three customers, four orders, and customer `Chi` has never bought anything:

```sql
CREATE TEMP TABLE kh(id int, ten text);
INSERT INTO kh VALUES (1,'An'), (2,'Binh'), (3,'Chi');

CREATE TEMP TABLE dh(id int, kh_id int, tong numeric);
INSERT INTO dh VALUES (10,1,500), (11,1,300), (12,2,700);
```

**Run 1 — a plain `LEFT JOIN`:**

```sql
SELECT count(*) FROM kh k LEFT JOIN dh d ON d.kh_id = k.id;
```

```
 so_dong_left_join
-------------------
                 4
```

Four rows: An has two orders, Binh has one, and Chi contributes one row whose order columns are all `NULL`. Exactly as expected.

**Run 2 — add an ordinary filter:**

```sql
SELECT count(*) FROM kh k LEFT JOIN dh d ON d.kh_id = k.id
WHERE d.tong > 400;
```

```
 them_where
------------
          2
```

**Chi has vanished.** The query now returns only An (the 500 order) and Binh (the 700 order). If your intent was *"list every customer, along with their orders above 400 if any"*, this result is **wrong**.

**Run 3 — move that same condition into `ON`:**

```sql
SELECT count(*) FROM kh k LEFT JOIN dh d ON d.kh_id = k.id AND d.tong > 400;
```

```
 dieu_kien_trong_on
--------------------
                  3
```

**Three rows.** An (500), Binh (700), and Chi with `NULL` order columns. This is what you actually wanted.

The same condition, `d.tong > 400`, moved from `WHERE` to `ON`, takes the result from 2 to 3.

---

## Why {#vi-sao}

### The logical processing order of a SELECT

SQL does not execute clauses in the order you write them. The logical processing order is:

```
1. FROM  +  JOIN ... ON      ← combine tables, produce NULLs for non-matches
2. WHERE                     ← filter the combined result
3. GROUP BY
4. HAVING
5. SELECT
6. ORDER BY
7. LIMIT
```

`ON` belongs to **step 1**, `WHERE` to **step 2**. That is the entire explanation.

### Replaying it step by step

After step 1 with a `LEFT JOIN`, the intermediate result looks like this:

| k.ten | d.id | d.tong |
|---|---|---|
| An | 10 | 500 |
| An | 11 | 300 |
| Binh | 12 | 700 |
| **Chi** | **NULL** | **NULL** |

Step 2 applies `WHERE d.tong > 400` to exactly this table. For Chi's row, the comparison is:

```
NULL > 400   →   UNKNOWN
```

Not `TRUE`, not `FALSE`. And since `WHERE` keeps only rows evaluating to `TRUE`, Chi's row is dropped. That `UNKNOWN` mechanism is the [three-valued logic I wrote a separate post about](/blog/sql-null-not-in-three-valued-logic) — the same root cause showing up somewhere else.

The result: every row `LEFT JOIN` produced is wiped out, and you are left with exactly what an `INNER JOIN` would have given you.

### When the condition sits in `ON`

Put `d.tong > 400` in `ON` and it participates in **step 1**, meaning it decides which rows count as **matches**. An's 300 order does not match, so it does not appear. But `LEFT JOIN` still does its job: every customer on the left is kept, and anyone without a matching row gets `NULL`.

Chi has no matching order → Chi is still there with `NULL`. Intent preserved.

---

## The decision rule {#quy-tac}

| Filter applies to | Put it in | Why |
|---|---|---|
| The **left** table | `WHERE` | It produces no `NULL`s; `WHERE` reads more clearly |
| The **right** table | `ON` | Putting it in `WHERE` destroys the `LEFT` semantics |
| The right table, **deliberately** finding non-matches | `WHERE ... IS NULL` | That is an anti-join; see below |

Put briefly: **with a `LEFT JOIN`, a filter on the right-hand table almost always belongs in `ON`.**

With an `INNER JOIN` both placements give the same result, because there are no `NULL` rows to lose. That is why the habit of "throw everything into `WHERE`" forms and survives for so long — right up until somebody changes `INNER` to `LEFT` and cannot work out why the numbers did not move.

---

## The exception: an anti-join is deliberate {#anti-join}

There is exactly one case where you **deliberately** put a right-hand condition in `WHERE`:

```sql
-- Find customers who have NEVER bought anything
SELECT k.*
FROM kh k
LEFT JOIN dh d ON d.kh_id = k.id
WHERE d.id IS NULL;
```

This is called an **anti-join**. You intentionally use `LEFT JOIN` to produce `NULL`s, then filter for exactly those `NULL` rows.

The pattern is valid and common, but it is worth knowing there is a clearer way to write it:

```sql
SELECT k.* FROM kh k
WHERE NOT EXISTS (SELECT 1 FROM dh d WHERE d.kh_id = k.id);
```

`NOT EXISTS` states the intent directly — *"no such order exists"* — whereas `LEFT JOIN ... IS NULL` makes the reader reason backwards. And as covered in [the NULL post](/blog/sql-null-not-in-three-valued-logic), never replace it with `NOT IN`.

---

## How to spot that you have this bug {#cach-nhan-ra}

You do not need to reread every query. Three signals are fairly reliable.

**The report is missing exactly the "nothing yet" group.** The customer list does not show new customers, revenue-by-product skips products that sold zero, per-salesperson stats omit whoever has not closed a deal. The missing group is always the one carrying `NULL`s.

**The row count equals the `INNER JOIN` count.** Change `LEFT JOIN` to `INNER JOIN` and compare. If both numbers are identical, the word `LEFT` in your query is doing nothing.

**`COUNT` comes out lower than expected.** Especially when counting per group — a group that should read zero disappears from the result entirely instead of showing 0. See [the GROUP BY and HAVING lesson](/docs/database/learn-sql-in-30-days/09-group-by-having) on how empty groups are handled.

A quick audit trick: find every query containing `LEFT JOIN`, then check whether the `WHERE` clause mentions the right-hand table's alias. If it does and it is not an `IS NULL` test, it is almost certainly a bug.

---

## Learn more {#hoc-tiep}

This post drills into one point from my [30-day SQL series](/docs/database/learn-sql-in-30-days):

| Lesson in the series | How it relates |
|---|---|
| [JOIN](/docs/database/learn-sql-in-30-days/10-join) | Join types and `ON` syntax |
| [SELECT and WHERE](/docs/database/learn-sql-in-30-days/03-select-where) | Why `WHERE` keeps only `TRUE` |
| [Subqueries](/docs/database/learn-sql-in-30-days/11-subquery) | `NOT EXISTS` in place of an anti-join |
| [GROUP BY and HAVING](/docs/database/learn-sql-in-30-days/09-group-by-having) | Empty groups and clause processing order |
| [Query performance](/docs/database/learn-sql-in-30-days/20-query-performance) | Reading an execution plan to see how the join really runs |

---

<FAQSection
  title="Frequently asked questions"
  items={[
    {
      question: "Why does my LEFT JOIN behave like an INNER JOIN?",
      answer: "Because you placed a filter on a right-hand column in the WHERE clause. SQL processes the JOIN first and WHERE afterwards, so the NULL rows the LEFT JOIN just produced get removed by WHERE: comparing NULL against a value always yields UNKNOWN, and WHERE keeps only rows evaluating to TRUE. The final result is identical to an INNER JOIN, with no warning of any kind."
    },
    {
      question: "When should a condition go in ON and when in WHERE?",
      answer: "With a LEFT JOIN, a filter on the right-hand table almost always belongs in ON, because putting it in WHERE destroys the property of keeping every left-hand row. A filter on the left-hand table belongs in WHERE for clarity, since it produces no NULLs. With an INNER JOIN both placements give the same result, and that is exactly what creates the habit of throwing everything into WHERE — a habit that only reveals its problem when someone changes INNER to LEFT."
    },
    {
      question: "Is there ever a reason to deliberately filter a right-hand column in WHERE?",
      answer: "Yes, that is an anti-join: use a LEFT JOIN and then add WHERE right_column IS NULL to find left-hand rows with no matching record, such as customers who have never ordered. The pattern is valid and common, but NOT EXISTS usually reads more clearly because it states the non-existence condition directly, whereas LEFT JOIN combined with IS NULL makes the reader reason backwards."
    },
    {
      question: "What is the processing order of clauses in a SELECT statement?",
      answer: "The logical processing order is FROM and JOIN ON first, then WHERE, GROUP BY, HAVING, SELECT, ORDER BY and finally LIMIT. This differs from the order you write them, and it explains several surprising behaviours: why you cannot use a SELECT alias in WHERE, why HAVING can filter aggregates while WHERE cannot, and why a condition in WHERE can break the meaning of a LEFT JOIN."
    },
    {
      question: "How can I quickly audit my queries for this bug?",
      answer: "Find every query containing LEFT JOIN and check whether the WHERE clause mentions the right-hand table's alias; if it does and it is not an IS NULL test, it is almost certainly a bug. Another check is to change LEFT JOIN to INNER JOIN and compare row counts: if the two numbers are identical, the word LEFT in your query is doing nothing at all."
    }
  ]}
/>

## Conclusion {#ket-luan}

This bug survives because it **does not look like a bug**. The query reads smoothly, runs fast, and returns plausible data. It is just short a few rows, and those rows usually belong to the group nobody looks at.

Two things worth remembering:

1. **`ON` filters while joining, `WHERE` filters after joining.** With a `LEFT JOIN`, the gap between those two moments is exactly where the rows you wanted to keep get lost.
2. **The group that disappears is always the `NULL` group.** When a report is missing precisely those entities that have "nothing yet", reread the `WHERE` clause before going looking for causes in the data.

---

**Last updated**: September 2026
