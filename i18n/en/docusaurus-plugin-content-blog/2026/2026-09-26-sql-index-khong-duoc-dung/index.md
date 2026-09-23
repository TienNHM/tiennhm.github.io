---
title: "Index Exists but the Query Still Scans the Whole Table? Sargability and One Function Call"
slug: sql-index-khong-duoc-dung-sargable
description: "The column has an index, the WHERE clause filters on exactly that column, and the execution plan is still a Seq Scan. Usually the cause is a single function wrapped around the column. Measured on PostgreSQL 16 with 200,000 rows: wrapping a function costs 29.6 ms and a full scan, rewriting it as a range costs 5.4 ms and uses the index — plus a detail few people notice, where the planner's estimate is off by 37x."
keywords: [index not used, sargable sql, sargability, seq scan instead of index scan, explain analyze, postgresql explain, function on indexed column, index scan vs seq scan, sql query optimization, composite index leftmost prefix, index selectivity, query planner estimate, bitmap index scan, learn sql index, mysql index not working, functional index]
tags: [sql, database, postgresql, performance, backend]
authors: [tiennhm]
date: 2026-09-26
---

import { SummaryBox, FAQSection, Checklist } from '@site/src/components/SEO';

# Index exists but the query still scans the whole table?

<SummaryBox>
An index is a structure sorted by **the column's values**. Wrap a function around the column — `date_part('year', created_at)`, `LOWER(email)`, `CAST(...)` — and the thing you are comparing is no longer the sorted value, so the database **cannot use the index** and falls back to scanning the whole table. A condition that can use an index is called **sargable**. Measured on PostgreSQL 16 with 200,000 rows: the function-wrapped version runs in **29.6 ms** with a `Seq Scan`, the range-rewritten version runs in **5.4 ms** with a `Bitmap Index Scan` — about 5.4× faster, returning the same 37,518 rows.
</SummaryBox>

A familiar situation: the query is slow, you add an index on exactly the column being filtered, you run it again — still just as slow. The index is right there, `\d` shows it, but the execution plan never mentions it.

This post drills into [the Index lesson](/docs/database/learn-sql-in-30-days/15-index) and [the query optimization lesson](/docs/database/learn-sql-in-30-days/28-sql-query-optimization) from my 30-day SQL series. Every number is real output from PostgreSQL 16.11.

<!-- truncate -->

## TL;DR {#tldr}

- An index is sorted by **the column's raw values**, not by the result of a function applied to them.
- Wrapping a function around a column in `WHERE` → the index is skipped → full table scan.
- A condition that can use an index is called **sargable**.
- The fix: rewrite it as a **range**, or create an **expression index**.
- The side effect few people notice: the planner **misestimates** row counts, which then leads it to choose bad join plans.

---

## The measurement {#phep-do}

Two hundred thousand orders, with an index on the timestamp column:

```sql
CREATE TEMP TABLE don(id serial, tao_luc timestamp, tien numeric);
INSERT INTO don(tao_luc, tien)
SELECT timestamp '2024-01-01' + (i % 900) * interval '1 day', (i % 1000)
FROM generate_series(1, 200000) i;

CREATE INDEX idx_don_tao_luc ON don(tao_luc);
ANALYZE don;
```

**The most natural way to write it** — filter by year:

```sql
EXPLAIN (ANALYZE) SELECT count(*) FROM don
WHERE date_part('year', tao_luc) = 2026;
```

```
Aggregate  (cost=4276.50..4276.51 rows=1)
  ->  Seq Scan on don  (cost=0.00..4274.00 rows=1000) (actual rows=37518)
        Filter: (date_part('year'::text, tao_luc) = '2026'::double precision)
        Rows Removed by Filter: 162482
Execution Time: 29.644 ms
```

`Seq Scan`. The index exists but is never touched. The database reads all 200,000 rows and throws away 162,482 of them.

**Rewritten as a range:**

```sql
EXPLAIN (ANALYZE) SELECT count(*) FROM don
WHERE tao_luc >= '2026-01-01' AND tao_luc < '2027-01-01';
```

```
Aggregate  (cost=2475.04..2475.05 rows=1)
  ->  Bitmap Heap Scan on don  (cost=532.10..2379.48 rows=38225) (actual rows=37518)
        ->  Bitmap Index Scan on idx_don_tao_luc  (cost=0.00..522.54 rows=38225)
              Index Cond: (tao_luc >= '2026-01-01' AND tao_luc < '2027-01-01')
Execution Time: 5.453 ms
```

`Bitmap Index Scan`. **5.4 ms instead of 29.6 ms**, same 37,518 rows.

---

## Why the index gets skipped {#vi-sao-bi-bo-qua}

Picture an index as the index at the back of a book, sorted by **name**. Look up "Nguyen Van An" and you jump straight to N. But if the question is *"find everyone whose name is exactly 12 characters long"*, that index is useless — it is not sorted by name length.

A B-tree index on `tao_luc` is sorted by **timestamp value**. The condition `date_part('year', tao_luc) = 2026` does not ask about the timestamp value; it asks about **the result of a function** applied to that timestamp. The database has no structure sorted by that, so its only option is to compute the function for every row and compare — a full scan.

The term for a condition that can use an index is **sargable**, short for *Search ARGument ABLE*. The short rule: **keep one side of the comparison a bare column, with nothing wrapped around it.**

---

## Patterns that destroy sargability {#cac-dang-mat-sargability}

| Written like this (not sargable) | Rewrite as |
|---|---|
| `date_part('year', tao_luc) = 2026` | `tao_luc >= '2026-01-01' AND tao_luc < '2027-01-01'` |
| `DATE(tao_luc) = '2026-05-01'` | `tao_luc >= '2026-05-01' AND tao_luc < '2026-05-02'` |
| `LOWER(email) = 'a@b.com'` | an expression index; see below |
| `tien * 1.1 > 1000` | `tien > 1000 / 1.1` |
| `CAST(ma_kh AS text) = '123'` | `ma_kh = 123` |
| `ten LIKE '%an'` | a B-tree cannot help here |
| `ma_so + 0 = 100` | `ma_so = 100` |

Three rows deserve extra words.

**`LIKE` with a leading `%`** cannot use a B-tree, because the index is ordered left to right and you have not told it the first character. `LIKE 'an%'` works fine. To search for a substring in the middle you need a different tool — a trigram index or full-text search.

**Implicit `CAST`** is the hardest form to spot, because you never wrote it. Comparing a numeric column against a string, or `varchar` against `nvarchar`, can make the database insert a conversion around **the column** and kill the index. This is a classic source of trouble in systems with inconsistent column types — data type choices are covered in [the table structure lesson](/docs/database/learn-sql-in-30-days/02-table-structure-and-data-types).

**`OR` across two different columns** also tends to break the plan. `WHERE a = 1 OR b = 2` is far harder to serve with an index than `WHERE a = 1` combined with `UNION` and `WHERE b = 2`.

---

## When you cannot rewrite it: expression indexes {#index-tren-bieu-thuc}

Sometimes the transformation is intrinsic to the requirement, such as case-insensitive email lookup. In that case do not remove the function — **index the expression itself**:

```sql
-- PostgreSQL
CREATE INDEX idx_kh_email_lower ON kh (LOWER(email));

-- From here this query can use the index
SELECT * FROM kh WHERE LOWER(email) = 'a@b.com';
```

The condition for it to work: the expression in the index must **match exactly** the expression in the `WHERE` clause. `LOWER(email)` is not `LOWER(TRIM(email))`, and an index for one does not serve the other.

MySQL 8.0 has equivalent functional indexes, and SQL Server uses indexed computed columns. Same idea, different syntax.

---

## The side effect few people notice: the planner misestimates {#planner-uoc-luong-sai}

This is the part of the measurement I find most interesting, and it is not the timing figure.

Look again at the plan for the function-wrapped version:

```
Seq Scan on don  (cost=0.00..4274.00 rows=1000) (actual rows=37518)
```

The planner **guessed 1,000 rows**; the reality was **37,518** — off by nearly 37×.

Compare with the sargable version:

```
Bitmap Index Scan  (rows=38225)  (actual rows=37518)
```

Guessed 38,225, actual 37,518 — off by under 2%.

The reason: the database keeps **statistics** about each column's value distribution. When you compare directly on the column, it consults those statistics and estimates fairly accurately. When you wrap a function, it **has no idea what that function does** to the distribution, so it falls back to a default guess.

The consequence is far more serious than scanning one table unnecessarily: in a query spanning several tables, **a bad row estimate leads to the wrong join algorithm and the wrong join order**. A number that is 37× off at the first step can turn into a plan hundreds of times slower at a later one. Reading execution plans to catch this is covered in [the query performance lesson](/docs/database/learn-sql-in-30-days/20-query-performance).

Put another way: **losing sargability does not just slow down one scan, it makes the database take poor decisions across the whole query.**

---

## Indexes are not free {#index-khong-mien-phi}

Since this post is about making indexes work, the other side deserves saying plainly: **every index is a cost paid on writes.**

Every `INSERT`, `UPDATE` and `DELETE` must update every relevant index. A table with eight indexes means nine structures change on every write. On a write-heavy table, adding an index can make the system slower rather than faster.

A few practical rules:

- Index columns used in `WHERE`, `JOIN` and `ORDER BY` — do not index everything indiscriminately.
- **Column order matters in a composite index.** `(a, b)` serves `WHERE a = ?` and `WHERE a = ? AND b = ?`, but **not** `WHERE b = ?`. This is the leftmost prefix rule.
- Low-selectivity columns (a `gender` column with two values, say) rarely benefit from an index.
- Redundant indexes — `(a)` when `(a, b)` already exists — are pure write cost, so drop them.

<Checklist
  title="When a query is slow despite having an index"
  items={[
    { text: "Run EXPLAIN ANALYZE and check for a Seq Scan on a large table" },
    { text: "Look for a function or arithmetic wrapped around the column in WHERE" },
    { text: "Check for an implicit CAST caused by comparing mismatched types" },
    { text: "Compare estimated rows against actual rows — a big gap signals lost sargability" },
    { text: "With a composite index, check the condition covers the leftmost column" },
    { text: "Run ANALYZE if the statistics are stale" },
    { text: "Rewrite as a value range, or create an expression index", checked: true }
  ]}
/>

---

## Learn more {#hoc-tiep}

This post drills into two points from my [30-day SQL series](/docs/database/learn-sql-in-30-days):

| Lesson in the series | How it relates |
|---|---|
| [Index](/docs/database/learn-sql-in-30-days/15-index) | Index structure, how to create one and when |
| [Query performance](/docs/database/learn-sql-in-30-days/20-query-performance) | Reading execution plans, identifying bottlenecks |
| [SQL query optimization](/docs/database/learn-sql-in-30-days/28-sql-query-optimization) | Techniques for rewriting queries |
| [Table structure and data types](/docs/database/learn-sql-in-30-days/02-table-structure-and-data-types) | Consistent types to avoid implicit casts |
| [Database design](/docs/database/learn-sql-in-30-days/27-database-design-best-practices) | Balancing reads against writes when placing indexes |

On the application side, a different kind of slowness often confused with this one is [the N+1 query problem in EF Core](/blog/ef-core-n-plus-1-query): there every individual statement is fast, and the cost lies in **how many round trips** happen rather than in the execution plan.

---

<FAQSection
  title="Frequently asked questions"
  items={[
    {
      question: "Why does my query still do a Seq Scan when the index exists?",
      answer: "The most common cause is a function or arithmetic operation wrapped around the column in the WHERE clause, such as date_part, DATE, LOWER or CAST. A B-tree index is sorted by the column's raw values, so when you compare the result of a function applied to the column there is no suitable structure to look up, and the database must compute the function for every row. Other causes include a table too small to bother with, low selectivity, or stale statistics."
    },
    {
      question: "What does sargable mean?",
      answer: "Sargable is short for Search ARGument ABLE and refers to filter conditions the database can serve using an index. The practical rule is to keep one side of the comparison a bare column with nothing wrapped around it. For example tao_luc >= '2026-01-01' AND tao_luc < '2027-01-01' is sargable, whereas date_part('year', tao_luc) = 2026 is not, even though both return the same rows."
    },
    {
      question: "How do I filter by year or by day and still use the index?",
      answer: "Rewrite it as a range over the column itself. Instead of date_part('year', tao_luc) = 2026, use tao_luc >= '2026-01-01' AND tao_luc < '2027-01-01'. Instead of DATE(tao_luc) = '2026-05-01', use tao_luc >= '2026-05-01' AND tao_luc < '2026-05-02'. Note the pattern of an inclusive lower bound and an exclusive upper bound; avoid BETWEEN with timestamps because it includes the upper bound and is easy to get wrong at the seconds level."
    },
    {
      question: "What if I genuinely need a function in the WHERE clause?",
      answer: "Create an index on that expression. In PostgreSQL that is CREATE INDEX idx ON table (LOWER(email)), MySQL 8.0 has equivalent functional indexes, and SQL Server uses indexed computed columns. The requirement is that the expression in the index matches the expression in the WHERE clause exactly: an index on LOWER(email) does not serve a query using LOWER(TRIM(email))."
    },
    {
      question: "Why does losing sargability make the planner misestimate row counts?",
      answer: "Because the database keeps statistics on each column's value distribution. Comparing directly on the column lets it consult those statistics and estimate accurately. Wrapping a function means it has no idea how that function transforms the distribution, so it falls back to a default guess. In the PostgreSQL 16 measurement, the function-wrapped version estimated 1,000 rows against an actual 37,518 — off by nearly 37× — while the sargable version estimated 38,225 against 37,518. Bad estimates are dangerous because they lead to the wrong join algorithm and join order in multi-table queries."
    },
    {
      question: "Does a composite index on (a, b) serve a query filtering only on b?",
      answer: "No. A composite index is sorted by its leftmost column first, so (a, b) serves WHERE a = ? and WHERE a = ? AND b = ?, but not WHERE b = ? on its own. This is the leftmost prefix rule. Column order in a composite index is therefore a design decision rather than an arbitrary one, and the column appearing most often in filter conditions should come first."
    },
    {
      question: "Are there downsides to adding more indexes?",
      answer: "Yes. Every index is a structure that must be updated on every INSERT, UPDATE and DELETE, so a table with eight indexes means nine structures change per write. On a write-heavy table, adding an index can make the system slower rather than faster. Indexes also consume storage, and redundant ones such as (a) when (a, b) already exists are pure write cost and should be dropped."
    }
  ]}
/>

## Conclusion {#ket-luan}

An index is not a switch you flip for speed. It is a **structure sorted by specific values**, and your query has to ask about the thing it is sorted by in order to use it.

Three things worth remembering:

1. **Keep a bare column on one side of the comparison.** Almost every case of an ignored index comes down to something wrapped around the column.
2. **Read the estimates, not just the timing.** The gap between `rows=` and `actual rows=` tells you how badly the planner misunderstands your data, and that is what produces bad plans in larger queries.
3. **Every index is a cost paid on writes.** The right question is not "should this column have an index" but "is the extra write cost worth the reads it saves".

---

**Last updated**: September 2026
