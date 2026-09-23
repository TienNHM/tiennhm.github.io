---
title: "Why Does Your NOT IN Return Zero Rows? SQL's Three-Valued Logic and the NULL Trap"
slug: sql-null-not-in-three-valued-logic
description: "A NOT IN query returns exactly zero rows while the table clearly holds data, yet NOT EXISTS with the same intent returns all of them. The difference is that SQL does not run on true/false logic but on three-valued logic, and NULL is not a value but the absence of one. This post proves it with real output from PostgreSQL 16 and points out four other places NULL silently changes your results."
keywords: [sql not in null, not in returns no rows, three valued logic sql, unknown sql, null sql, not exists vs not in, sql null comparison, is null, coalesce, count null sql, group by null, unique constraint null, left join null, sql subquery null, postgresql null, mysql null, sql null pitfalls, learn sql]
tags: [sql, database, postgresql, backend, fundamentals]
authors: [tiennhm]
date: 2026-09-24
---

import { SummaryBox, FAQSection } from '@site/src/components/SEO';

# Why does your NOT IN return zero rows?

<SummaryBox>
`NULL` in SQL is **not a value** — it is a marker meaning *"unknown"*. Every comparison against it yields `UNKNOWN`, and `WHERE` only keeps rows that evaluate to `TRUE`, so `UNKNOWN` is discarded exactly like `FALSE`. The most serious consequence lands on `NOT IN`: a single `NULL` anywhere in the subquery makes the **entire** query return zero rows, even when the data plainly exists. I ran it on PostgreSQL 16: with the same intent, `NOT IN` returns **0 rows** while `NOT EXISTS` returns **3**. No error, no warning — the query just quietly returns the wrong answer.
</SummaryBox>

This is not the kind of bug that crashes an application. It just makes a report short by a few numbers, makes a list screen empty, makes a campaign miss some customers — and leaves nothing behind in the logs.

This post drills into one detail from my [30-day SQL series](/docs/database/learn-sql-in-30-days), specifically the lessons on [operators and expressions](/docs/database/learn-sql-in-30-days/05-operators-and-expressions) and [subqueries](/docs/database/learn-sql-in-30-days/11-subquery). Every number below is real output from PostgreSQL 16.11.

<!-- truncate -->

## TL;DR {#tldr}

- `NULL` is not a value, it is **the absence of one**.
- Comparing anything against `NULL` yields **`UNKNOWN`**, not `TRUE` or `FALSE`.
- `WHERE` keeps only rows evaluating to `TRUE`, so `UNKNOWN` is discarded just like `FALSE`.
- `NOT IN` with a subquery containing `NULL` → **always returns zero rows**.
- `NOT EXISTS` does not fall into this trap. Use it instead.
- `NULL` also silently changes results in `COUNT`, `GROUP BY`, `UNIQUE` and `LEFT JOIN`.

---

## The experiment {#thi-nghiem}

Three customers, one of whom never filled in a city:

```sql
CREATE TEMP TABLE kh(id int, ten text, thanh_pho text);
INSERT INTO kh VALUES (1,'An','HCM'), (2,'Binh','HN'), (3,'Chi', NULL);
```

Now ask a completely ordinary question: *"count the customers who are not in the same city as customer 3"*.

```sql
SELECT count(*) FROM kh
WHERE thanh_pho NOT IN (SELECT thanh_pho FROM kh WHERE id = 3);
```

```
 ket_qua_not_in
----------------
              0
```

**Not a single row.** Meanwhile the table holds three customers and two of them are clearly in HCM and HN.

Rewrite the same intent with `NOT EXISTS`:

```sql
SELECT count(*) FROM kh k
WHERE NOT EXISTS (
    SELECT 1 FROM kh x WHERE x.id = 3 AND x.thanh_pho = k.thanh_pho
);
```

```
 ket_qua_not_exists
--------------------
                  3
```

**Three rows.** The same question in English, two SQL statements, two completely different answers. No syntax error, no warning.

---

## Why {#vi-sao}

### `NULL` is not a value

This is where intuition misleads almost everyone. We read `NULL` as "empty", "blank" or "not set yet" — all of which still picture it as **some kind of value**. SQL does not.

`NULL` means **unknown**. Once you accept that reading, every strange behaviour it has becomes reasonable:

```sql
SELECT NULL = NULL;    -- not true; it is NULL
SELECT NULL <> NULL;   -- also NULL
SELECT NULL + 1;       -- NULL
```

Is "a number I do not know" equal to "another number I also do not know"? The honest answer is **I do not know**. That is exactly what SQL returns.

So to test for `NULL` you do not use `=`, you use a dedicated operator:

```sql
WHERE thanh_pho IS NULL       -- correct
WHERE thanh_pho = NULL        -- always UNKNOWN, never matches
```

### Three-valued logic

The consequence is that SQL does not run on the two-valued `TRUE`/`FALSE` logic most programming languages use, but on **three-valued logic**: `TRUE`, `FALSE`, `UNKNOWN`.

The truth tables for `AND` and `OR` extend like this:

| A | B | A AND B | A OR B |
|---|---|---|---|
| TRUE | UNKNOWN | UNKNOWN | **TRUE** |
| FALSE | UNKNOWN | **FALSE** | UNKNOWN |
| UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN |

The two bold cells are worth noting: `FALSE AND UNKNOWN` is still `FALSE` (one false side is enough), and `TRUE OR UNKNOWN` is still `TRUE` (one true side is enough). Everywhere else, the unknown spreads and swallows the result.

And here is the decisive rule: **`WHERE` keeps only rows evaluating to `TRUE`.** `FALSE` is dropped, and so is `UNKNOWN`. Two very different meanings, one identical fate.

### Putting it together: why `NOT IN` dies

`x NOT IN (a, b, c)` is expanded by SQL into:

```
x <> a AND x <> b AND x <> c
```

In the experiment the subquery returns exactly one value, `NULL`, so the condition becomes:

```
'HCM' <> NULL   →   UNKNOWN
```

Not `TRUE`. Not `FALSE`. `UNKNOWN`. And `WHERE` drops it.

The same happens for every row, including the one whose `thanh_pho` is itself `NULL`. Result: zero rows.

It is worth noting that `IN` (without `NOT`) does **not** fall into this trap the same way. `x IN (a, b, NULL)` still returns `TRUE` when `x` matches `a` or `b`, because `TRUE OR UNKNOWN` is `TRUE`. Only when nothing matches does it yield `UNKNOWN` instead of `FALSE`. That asymmetry between `IN` and `NOT IN` is precisely what makes the trap so hard to remember.

### Why `NOT EXISTS` is safe

`EXISTS` does not compare values. It asks only: *did the subquery return any row?* That question always has a definite answer — yes or no — so it never produces `UNKNOWN`.

Inside the subquery, `x.thanh_pho = k.thanh_pho` still yields `UNKNOWN` when it meets `NULL`, so that row is not selected, so the subquery is empty, so `NOT EXISTS` is `TRUE`. The unknown stops at the subquery boundary instead of leaking out.

---

## Four other places NULL quietly changes results {#bon-cho-khac}

The `NOT IN` trap is the famous one, but it is not the only one.

### 1. `COUNT(*)` is not `COUNT(column)`

```sql
SELECT count(*), count(thanh_pho) FROM kh;
-- 3, 2
```

`COUNT(*)` counts **rows**. `COUNT(column)` counts **non-NULL values**. The gap between the two numbers is exactly the number of rows missing that data — sometimes that is what you want, sometimes it is a bug in a report. The aggregate functions are covered in [the aggregate functions lesson](/docs/database/learn-sql-in-30-days/08-aggregate-functions).

By the same logic, `AVG(column)` skips `NULL` rather than treating it as zero. The average of `(10, NULL, 20)` is `15`, not `10`.

### 2. `GROUP BY` lumps all `NULL`s into one group

```sql
SELECT thanh_pho, count(*) FROM kh GROUP BY thanh_pho;
```

Every row whose `thanh_pho` is `NULL` falls into **the same group**, even though logically they are "unknown" rather than "identical". This is a deliberate exception in the SQL standard, and it contradicts the very `NULL <> NULL` rule above. See [the GROUP BY and HAVING lesson](/docs/database/learn-sql-in-30-days/09-group-by-having).

### 3. `UNIQUE` does not prevent multiple `NULL`s

A `UNIQUE` constraint on a nullable column accepts **many rows all holding NULL**, because two unknowns are not considered duplicates of each other. Plenty of people rely on `UNIQUE` to guarantee "one tax ID per customer" and are then surprised by hundreds of `NULL` rows. If the column really is mandatory, declare it `NOT NULL` — table design is covered in [the table structure and data types lesson](/docs/database/learn-sql-in-30-days/02-table-structure-and-data-types).

### 4. `LEFT JOIN` creates `NULL`s and then you filter them away

`LEFT JOIN` deliberately produces `NULL`s for rows that do not match. Add a `WHERE` condition on a right-hand column and you wipe them all out, and the `LEFT JOIN` silently becomes an `INNER JOIN`. That trap is big enough that I gave it [its own post](/blog/left-join-thanh-inner-join).

---

## Writing it safely {#viet-sao-cho-an-toan}

| Situation | Avoid | Use |
|---|---|---|
| Excluding via a subquery | `NOT IN (SELECT ...)` | `NOT EXISTS (SELECT 1 ...)` |
| Comparison that may meet NULL | `a = b` | `a IS NOT DISTINCT FROM b` |
| Substituting a default | (no handling) | `COALESCE(col, 'default')` |
| Testing for emptiness | `= NULL` | `IS NULL` |
| Mandatory column | leave as default | declare `NOT NULL` from the start |

Two rows deserve extra words.

`IS NOT DISTINCT FROM` is a comparison operator that treats `NULL` as equal to `NULL` — which is exactly what your intuition wanted in the first place. It is verbose, but unambiguous.

And the last row is the root-cause fix: **most NULL traps disappear if the column is not allowed to be NULL.** Before hunting for tricks to handle `NULL`, ask whether that column has any legitimate reason to be empty. A great many nullable columns exist only because nobody thought about it when the table was created, not because the business permits it.

---

## Learn more {#hoc-tiep}

This post drills into one point from my [30-day SQL series](/docs/database/learn-sql-in-30-days). The directly related lessons:

| Lesson in the series | How it relates |
|---|---|
| [Operators and expressions](/docs/database/learn-sql-in-30-days/05-operators-and-expressions) | Where `IS NULL`, `IN` and `NOT IN` are introduced |
| [Subqueries](/docs/database/learn-sql-in-30-days/11-subquery) | `EXISTS`, `NOT EXISTS` and correlated subqueries |
| [Aggregate functions](/docs/database/learn-sql-in-30-days/08-aggregate-functions) | `COUNT`, `AVG` and how they skip `NULL` |
| [GROUP BY and HAVING](/docs/database/learn-sql-in-30-days/09-group-by-having) | How `NULL`s are grouped |
| [SELECT and WHERE](/docs/database/learn-sql-in-30-days/03-select-where) | Why `WHERE` keeps only `TRUE` |

---

<FAQSection
  title="Frequently asked questions"
  items={[
    {
      question: "Why does my NOT IN query return zero rows when the table has data?",
      answer: "Because the subquery inside NOT IN contains a NULL. SQL expands x NOT IN (a, b, c) into x <> a AND x <> b AND x <> c, and any comparison against NULL yields UNKNOWN rather than TRUE or FALSE. The WHERE clause only keeps rows evaluating to TRUE, so UNKNOWN is discarded exactly like FALSE, and no row survives. A single NULL anywhere in the subquery is enough to break the entire query."
    },
    {
      question: "How does NOT EXISTS differ from NOT IN when NULLs are involved?",
      answer: "NOT EXISTS does not compare values; it only asks whether the subquery returned any row, and that question always has a definite yes-or-no answer, so it never produces UNKNOWN. The comparison against NULL inside the subquery still yields UNKNOWN, so that row is not selected, the subquery is empty, and NOT EXISTS evaluates to TRUE. The unknown stops at the subquery boundary instead of leaking out. Tested on PostgreSQL 16, the same intent gives 0 rows with NOT IN and 3 rows with NOT EXISTS."
    },
    {
      question: "What is three-valued logic in SQL?",
      answer: "SQL does not run on the two-valued TRUE and FALSE logic most programming languages use, but on three-valued logic comprising TRUE, FALSE and UNKNOWN. UNKNOWN appears whenever something is compared against NULL, because NULL means unknown rather than a specific value. The crucial part is that WHERE keeps only rows evaluating to TRUE, so UNKNOWN is discarded exactly like FALSE even though the two mean very different things."
    },
    {
      question: "Why does IN work fine with NULL while NOT IN breaks?",
      answer: "Because the truth tables for OR and AND treat UNKNOWN differently. IN expands into a chain of ORs, and TRUE OR UNKNOWN is still TRUE, so a value matching any element still satisfies the condition. NOT IN expands into a chain of ANDs with inequality, and UNKNOWN AND anything other than FALSE yields UNKNOWN, so no row survives. That asymmetry is what makes the trap so hard to remember."
    },
    {
      question: "What is the difference between COUNT(*) and COUNT(column)?",
      answer: "COUNT(*) counts rows, while COUNT(column) counts only rows where that column is not NULL. The gap between the two numbers is exactly how many rows are missing data in that column. By the same logic AVG skips NULL rather than treating it as zero, so the average of 10, NULL and 20 is 15 rather than 10. This is a very common source of wrong numbers in reports."
    },
    {
      question: "Does a UNIQUE constraint prevent multiple NULL rows?",
      answer: "No. A UNIQUE constraint on a nullable column accepts many rows all holding NULL, because in SQL's logic two unknowns are not considered duplicates of each other. Many people rely on UNIQUE to guarantee one identifier per record and are then surprised to find hundreds of NULL rows coexisting. If the column is genuinely mandatory, it must be declared NOT NULL when the table is designed."
    }
  ]}
/>

## Conclusion {#ket-luan}

`NULL` is one of the few places where SQL asks you to **drop ordinary programming intuition**. In most languages, comparing two things yields true or false. In SQL there is a third possibility, and it is treated exactly like "false" in the `WHERE` clause.

Three things worth remembering:

1. **Read `NULL` as "unknown", not as "empty".** Every strange behaviour immediately becomes reasonable.
2. **Do not use `NOT IN` with a subquery.** Switching to `NOT EXISTS` costs almost nothing, and the risk is very real.
3. **The best fix is prevention.** A `NOT NULL` column never causes any of the problems in this post.

---

**Last updated**: September 2026
