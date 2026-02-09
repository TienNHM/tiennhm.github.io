---
title: Phần 14 - Chart Selection Guide
slug: agent-skills-14-charts
description: Hướng dẫn chọn loại chart phù hợp (line, bar, pie, heatmap, map, funnel, gauge, treemap, network...) theo kiểu dữ liệu, kèm màu, accessibility & library gợi ý.
image: https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/refs/heads/main/public/charts-cover.png
sidebar_position: 14
tags:
  - agent-skills
  - charts
  - data-viz
  - dashboards
keywords: [charts, data visualization, line chart, bar chart, heatmap, map, funnel, scatter, treemap]
enableComments: true
draft: false
---

# Agent Skills - Phần 14: Chart Selection Guide

Tài liệu này giúp chọn **loại biểu đồ phù hợp cho từng dạng dữ liệu**, kèm:

- **Best chart type** + lựa chọn phụ.
- Gợi ý **màu sắc**, hiệu năng, accessibility.
- Gợi ý thư viện: `Recharts`, `Chart.js`, `D3.js`, `ApexCharts`, `Plotly`, v.v.

Nguồn: [`charts.csv`](https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/refs/heads/main/src/ui-ux-pro-max/data/charts.csv) từ [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill).

---

## 1. Thời gian, trend & phân bố

### 1.1 Trend over time (time-series)

- **Keywords:** `trend`, `time-series`, `growth`, `timeline`.
- **Best chart:** **Line Chart**  
  **Secondary:** Area / Smooth area.
- **Màu:** Primary `#0080FF`; đa series → màu khác nhau; fill 20% opacity.
- **Hiệu năng:** ⚡ Excellent.  
- **Accessibility:** Đảm bảo pattern/marker khác nhau; legend rõ.
- **Thư viện:** `Chart.js`, `Recharts`, `ApexCharts`.  
- **Interactive:** Hover + zoom.

---

### 1.2 Distribution / Statistical

- **Keywords:** `distribution`, `box`, `stats`.
- **Best chart:** **Box Plot**  
  **Secondary:** Violin, Beeswarm.
- **Màu:** Box `#BBDEFB`, border `#1976D2`, median `#D32F2F`, outlier `#F44336`.
- **Accessibility:** Luôn kèm bảng thống kê (min, Q1, median, Q3, max).

---

### 1.3 Correlation / Scatter / Bubble

- **Keywords:** `correlation`, `relationship`, `scatter`, `distribution`.
- **Best chart:** **Scatter Plot / Bubble Chart**  
  **Secondary:** Heatmap / Matrix.
- **Màu:** Gradient blue→red; size theo giá trị; opacity 0.6–0.8.
- **Gợi ý:** Nên cung cấp table alternative; region zoom/brush khi nhiều điểm.

---

## 2. So sánh & tỷ lệ

### 2.1 Compare categories

- **Keywords:** `categories`, `bar`, `ranking`.
- **Best chart:** **Bar Chart** (ngang/dọc)  
  **Secondary:** Column, Grouped bar.
- **Màu:** Mỗi category màu khác; sort descending; hiển thị value trên bar.

---

### 2.2 Part-to-whole (phần trăm)

- **Keywords:** `part-to-whole`, `proportion`, `share`.
- **Best chart:** Pie / Donut  
  **Secondary:** Stacked bar, Treemap.
- **Màu:** Tối đa 5–6 slice; palette tương phản.
- **Note:** Accessibility không tốt khi > 5; cân nhắc stacked bar thay pie.

---

### 2.3 Proportional / Waffle

- **Keywords:** `proportional`, `percentage`, `waffle`.
- **Best chart:** **Waffle Chart**  
  **Secondary:** Pictogram, 100% stacked bar.
- **Màu:** Grid 10x10; 3–5 category; spacing 2–3px.
- **Ưu điểm:** Dễ đọc hơn pie, tốt cho accessibility hơn.

---

### 2.4 Multi-variable comparison

- **Keywords:** `multi-variable`, `radar`, `spider`.
- **Best chart:** **Radar / Spider Chart**  
  **Secondary:** Parallel coordinates, grouped bar.
- **Note:** Giới hạn 5–8 axis; luôn kèm bảng.

---

## 3. Heatmap, geo & intensity

### 3.1 Heatmap / Intensity

- **Keywords:** `heatmap`, `intensity`, `matrix`.
- **Best chart:** **Heat Map / Choropleth**  
  **Secondary:** Grid heat, bubble heat.
- **Màu:** Gradient cool (blue) → hot (red); divergent cho ±.
- **Accessibility:** Cung cấp legend + pattern overlay cho colorblind.

---

### 3.2 Geographic data

- **Keywords:** `map`, `geo`, `location`.
- **Best chart:** Choropleth map / Bubble map.  
  **Secondary:** Geo heat.
- **Gợi ý:** Text label + table alternative; pan/zoom + drilldown.
- **Lib:** `D3`, `Mapbox`, `Leaflet`.

---

## 4. Funnel, flow & process

### 4.1 Funnel / Flow (conversion)

- **Keywords:** `funnel`, `flow`.
- **Best chart:** **Funnel chart / Sankey**  
  **Secondary:** Waterfall cho flow đơn giản.
- **Màu:** Gradient qua stages; hiển thị % conversion.
- **Best use:** Funnel signup, checkout, sales pipeline.

---

### 4.2 Flow / Process data

- **Keywords:** `process`, `log`, `path`.
- **Best chart:** **Sankey Diagram**  
  **Secondary:** Alluvial, chord.
- **Màu:** Gradient source→target; opacity 0.4–0.6.
- **Accessibility:** Graph phức tạp → cần path summary / bảng.

---

### 4.3 Process mining

- **Keywords:** `process mining`, `variants`, `bottleneck`.
- **Best chart:** Process map / graph  
  **Secondary:** DAG, Petri net.
- **Màu:** Happy path xanh (#10B981), deviation cam (#F59E0B), bottleneck đỏ (#EF4444).

---

## 5. KPI, target & forecast

### 5.1 Performance vs Target (Gauge / Bullet)

- **Keywords:** `performance vs target`, `gauge`, `bullet`.
- **Best chart:** Gauge hoặc Bullet chart (compact).  
  **Secondary:** Progress bar.
- **Màu:** Dải màu (red/yellow/green); target line màu đen.
- **Note:** Luôn hiển thị giá trị numeric + % cạnh gauge.

---

### 5.2 Time-series forecast

- **Keywords:** `forecast`, `prediction`.
- **Best chart:** Line với confidence band.  
  **Secondary:** Ribbon chart.
- **Màu:** Actual: solid #0080FF; forecast: dashed #FF9500; band: shading nhẹ.

---

### 5.3 Anomaly detection

- **Keywords:** `anomaly`, `outlier`, `alerts`.
- **Best chart:** Line chart với highlight.  
  **Secondary:** Scatter với marker đỏ.
- **Màu:** Normal xanh; anomaly đỏ (#FF0000) với marker rõ + annotation.

---

### 5.4 Compact bullet (dashboard)

- **Keywords:** `compact performance`.
- **Best chart:** Bullet chart (dải màu + marker).  
- **Ưu điểm:** Rất tiết kiệm diện tích, phù hợp dashboard executive.

---

## 6. Hierarchy, network & root cause

### 6.1 Hierarchical / Nested data

- **Keywords:** `hierarchical`, `nested`.
- **Best chart:** Treemap.  
  **Secondary:** Sunburst, Nested donut, Icicle.
- **Màu:** Parent màu đậm; child nhạt hơn 15–20%; border trắng 2–3px.
- **Note:** Khó đọc → luôn có view bảng/hierarchy song song.

---

### 6.2 Hierarchical proportional / Sunburst

- **Keywords:** `hierarchical proportional`, `sunburst`.
- **Best chart:** Sunburst chart.  
  **Secondary:** Treemap, circle packing.
- **Màu:** Từ center ra ngoài: đậm → nhạt dần.

---

### 6.3 Relationship / Network graph

- **Keywords:** `relationship`, `network`, `graph`.
- **Best chart:** Network graph.  
  **Secondary:** Tree, adjacency matrix.
- **Màu:** Node theo category; edge `#90A4AE` opacity ~60%.
- **Cảnh báo:** ❌ Rất nặng & khó đọc khi > 500 nodes → nên có adjacency list/table.

---

### 6.4 Root cause analysis (Decomposition Tree)

- **Keywords:** `root cause`, `decomposition tree`.
- **Best chart:** Decomposition tree.  
  **Màu:** Node primary #2563EB, node negative #EF4444; connector grey.
- **Accessibility:** Hỗ trợ keyboard navigation cho node.

---

## 7. 3D, real-time & advanced viz

### 7.1 3D Spatial Data

- **Keywords:** `3d`, `spatial`, `terrain`, `molecular`.
- **Best chart:** 3D scatter / surface.  
  **Secondary:** Point cloud, volumetric.
- **Màu:** Z-axis = gradient cool→warm; dùng lighting/shading cho depth.
- **Cảnh báo:** ❌ WebGL nặng; luôn cung cấp 2D hoặc table alternative.

---

### 7.2 Real-time streaming

- **Keywords:** `streaming`, `ticker`, `live`.
- **Best chart:** Streaming area chart.  
  **Secondary:** Ticker tape, moving gauge.
- **Màu:** Current: bright pulse #00FF00; history: fade opacity.
- **Accessibility:** Cho phép **pause** để tránh nhấp nháy quá nhiều.

---

### 7.3 Sentiment / Emotion

- **Keywords:** `sentiment`, `emotion`, `NLP`.
- **Best chart:** Word cloud + sentiment.  
  **Secondary:** Sentiment arc, radar.
- **Màu:** Positive xanh (#22C55E), negative đỏ (#EF4444), neutral xám (#94A3B8).
- **Note:** Word cloud kém cho screen reader → luôn kèm list view.

---

## 8. Tóm tắt nhanh (Agent Cheat Sheet)

| Câu hỏi dữ liệu              | Chart nên dùng                                     |
|-----------------------------|----------------------------------------------------|
| Trend theo thời gian        | Line / Area                                       |
| So sánh category            | Bar ngang/dọc                                     |
| Part-to-whole (≤ 5 phần)    | Pie / Donut / 100% stacked bar                    |
| Tỷ lệ phức tạp              | Waffle / Stacked bar                              |
| Correlation / scatter       | Scatter / Bubble                                  |
| Intensity theo grid/map     | Heatmap / Choropleth                              |
| Geo (vùng/quốc gia)         | Choropleth / Bubble map                           |
| Funnel/checkout             | Funnel / Sankey                                   |
| KPI vs target               | Gauge / Bullet                                    |
| Forecast + confidence       | Line + Band                                       |
| Anomaly trên time-series    | Line + marker đỏ                                  |
| Hierarchy + size            | Treemap / Sunburst                                |
| Relationship graph          | Network graph (thêm table)                        |
| Real-time streaming         | Streaming area / ticker                           |

Nguồn dữ liệu: [`charts.csv`](https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/refs/heads/main/src/ui-ux-pro-max/data/charts.csv) — [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill).

