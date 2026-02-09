---
title: Phần 9 - Icon System Cheatsheet (Lucide)
slug: agent-skills-15-icons
description: Cheatsheet icon Lucide thường dùng (navigation, action, status, commerce, data, security...) + import code + lưu ý accessibility cho Agent Skills.
image: https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/refs/heads/main/public/icons-cover.png
sidebar_position: 9
tags:
  - agent-skills
  - icons
  - lucide
  - accessibility
keywords: [icons, lucide-react, icon system, accessibility, aria-label]
enableComments: true
draft: false
---

import { SummaryBox } from '@site/src/components/SEO';

# Agent Skills - Phần 15: Icon System Cheatsheet (Lucide)

<SummaryBox>
Tài liệu tổng hợp icon phổ biến từ Lucide dùng trong web app (React/Next.js), giúp chọn icon đúng ngữ nghĩa (navigation, action, status, commerce, data, security...), copy nhanh import code và JSX usage, và áp dụng accessibility đúng cách (aria-label, aria-hidden). Mỗi icon được phân loại theo category và có ví dụ code cụ thể. Nội dung dựa trên icons.csv từ ui-ux-pro-max-skill, giúp developers và AI Agents sử dụng icon system hiệu quả và accessible.
</SummaryBox>

Tài liệu này tổng hợp **icon phổ biến từ Lucide** dùng trong web app (React/Next.js), giúp Agent:

- Chọn icon đúng ngữ nghĩa (navigation, action, status, commerce, data, security...).
- Copy nhanh **import code** + **JSX usage**.
- Áp dụng **accessibility** đúng cách (`aria-label`, `aria-hidden`...).

Nguồn: [`icons.csv`](https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/refs/heads/main/src/ui-ux-pro-max/data/icons.csv) từ [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill).

---

## 1. Hướng dẫn dùng icon + accessibility

- **Decorative icon** (chỉ để đẹp, không mang nghĩa riêng):
  - Thêm `aria-hidden="true"` hoặc `role="presentation"`.
  - Không dùng `aria-label`.
- **Icon button / icon-only**:
  - Bắt buộc có **accessible name** qua `aria-label` hoặc `aria-labelledby`.
  - Ví dụ:

```diff
+ <button aria-label="Close menu">
+   <X className="h-4 w-4" />
+ </button>
```

- **Icon kèm text**:
  - Icon có thể `aria-hidden="true"`, text mang nghĩa chính.

```diff
+ <Button>
+   <Download aria-hidden="true" className="mr-2 h-4 w-4" />
+   Download
+ </Button>
```

---

## 2. Navigation Icons

| Purpose        | Icon        | Import                                      | Usage           |
|----------------|------------|---------------------------------------------|-----------------|
| Menu toggle    | `Menu`     | `import { Menu } from 'lucide-react'`      | `<Menu />`      |
| Back           | `ArrowLeft`| `import { ArrowLeft } from 'lucide-react'` | `<ArrowLeft />` |
| Next / Continue| `ArrowRight`| `import { ArrowRight } from 'lucide-react'`| `<ArrowRight />`|
| Dropdown       | `ChevronDown`| `import { ChevronDown } from 'lucide-react'`| `<ChevronDown />`|
| Collapse       | `ChevronUp`| `import { ChevronUp } from 'lucide-react'` | `<ChevronUp />` |
| Home           | `Home`     | `import { Home } from 'lucide-react'`      | `<Home />`      |
| Close          | `X`        | `import { X } from 'lucide-react'`         | `<X />`         |
| External link  | `ExternalLink`| `import { ExternalLink } from 'lucide-react'`| `<ExternalLink />`|

---

## 3. Action Icons

| Action         | Icon       | Import                                      |
|----------------|-----------|---------------------------------------------|
| Add / New      | `Plus`    | `import { Plus } from 'lucide-react'`      |
| Remove         | `Minus`   | `import { Minus } from 'lucide-react'`     |
| Delete         | `Trash2`  | `import { Trash2 } from 'lucide-react'`    |
| Edit           | `Edit`    | `import { Edit } from 'lucide-react'`      |
| Save           | `Save`    | `import { Save } from 'lucide-react'`      |
| Download       | `Download`| `import { Download } from 'lucide-react'`  |
| Upload         | `Upload`  | `import { Upload } from 'lucide-react'`    |
| Copy           | `Copy`    | `import { Copy } from 'lucide-react'`      |
| Share          | `Share`   | `import { Share } from 'lucide-react'`     |
| Search         | `Search`  | `import { Search } from 'lucide-react'`    |
| Filter         | `Filter`  | `import { Filter } from 'lucide-react'`    |
| Settings       | `Settings`| `import { Settings } from 'lucide-react'`  |

---

## 4. Status & Feedback Icons

| Status         | Icon          | Import                                        |
|----------------|---------------|-----------------------------------------------|
| Success        | `Check`       | `import { Check } from 'lucide-react'`       |
| Success badge  | `CheckCircle` | `import { CheckCircle } from 'lucide-react'` |
| Error / Failed | `XCircle`     | `import { XCircle } from 'lucide-react'`     |
| Warning        | `AlertTriangle`| `import { AlertTriangle } from 'lucide-react'`|
| Info           | `AlertCircle` | `import { AlertCircle } from 'lucide-react'` |
| Info (tooltip) | `Info`        | `import { Info } from 'lucide-react'`        |
| Loading        | `Loader`      | `import { Loader } from 'lucide-react'`      |
| Pending / Time | `Clock`       | `import { Clock } from 'lucide-react'`       |

Ví dụ spinner:

```diff
+ <Loader className="h-4 w-4 animate-spin" aria-hidden="true" />
```

---

## 5. Communication & Notifications

| Use case      | Icon            | Import                                         |
|---------------|-----------------|------------------------------------------------|
| Email         | `Mail`          | `import { Mail } from 'lucide-react'`         |
| Chat / Comment| `MessageCircle` | `import { MessageCircle } from 'lucide-react'`|
| Phone         | `Phone`         | `import { Phone } from 'lucide-react'`        |
| Send          | `Send`          | `import { Send } from 'lucide-react'`         |
| Notifications | `Bell`          | `import { Bell } from 'lucide-react'`         |

---

## 6. User & Auth

| Use case   | Icon       | Import                                      |
|------------|-----------|---------------------------------------------|
| Profile    | `User`    | `import { User } from 'lucide-react'`      |
| Team       | `Users`   | `import { Users } from 'lucide-react'`     |
| Invite user| `UserPlus`| `import { UserPlus } from 'lucide-react'`  |
| Login      | `LogIn`   | `import { LogIn } from 'lucide-react'`     |
| Logout     | `LogOut`  | `import { LogOut } from 'lucide-react'`    |

---

## 7. Media Controls

| Use case   | Icon        | Import                                      |
|------------|------------|---------------------------------------------|
| Image      | `Image`     | `import { Image } from 'lucide-react'`     |
| Video      | `Video`     | `import { Video } from 'lucide-react'`     |
| Play       | `Play`      | `import { Play } from 'lucide-react'`      |
| Pause      | `Pause`     | `import { Pause } from 'lucide-react'`     |
| Volume     | `Volume2`   | `import { Volume2 } from 'lucide-react'`   |
| Microphone | `Mic`       | `import { Mic } from 'lucide-react'`       |
| Camera     | `Camera`    | `import { Camera } from 'lucide-react'`    |

---

## 8. Commerce & Pricing

| Use case       | Icon           | Import                                         |
|----------------|----------------|-----------------------------------------------|
| Cart           | `ShoppingCart` | `import { ShoppingCart } from 'lucide-react'`|
| Bag / Purchase | `ShoppingBag`  | `import { ShoppingBag } from 'lucide-react'` |
| Payment        | `CreditCard`   | `import { CreditCard } from 'lucide-react'`  |
| Price / Money  | `DollarSign`   | `import { DollarSign } from 'lucide-react'`  |
| Price tag      | `Tag`          | `import { Tag } from 'lucide-react'`         |
| Gift / Reward  | `Gift`         | `import { Gift } from 'lucide-react'`        |
| Discount       | `Percent`      | `import { Percent } from 'lucide-react'`     |

---

## 9. Data, Analytics & Dev

| Use case         | Icon         | Import                                      |
|------------------|-------------|---------------------------------------------|
| Bar chart        | `BarChart`  | `import { BarChart } from 'lucide-react'`  |
| Pie chart        | `PieChart`  | `import { PieChart } from 'lucide-react'`  |
| Trend up         | `TrendingUp`| `import { TrendingUp } from 'lucide-react'`|
| Trend down       | `TrendingDown`| `import { TrendingDown } from 'lucide-react'`|
| Activity / Pulse | `Activity`  | `import { Activity } from 'lucide-react'`  |
| Database         | `Database`  | `import { Database } from 'lucide-react'`  |
| Terminal         | `Terminal`  | `import { Terminal } from 'lucide-react'`  |
| Code             | `Code`      | `import { Code } from 'lucide-react'`      |
| Git branch       | `GitBranch` | `import { GitBranch } from 'lucide-react'` |
| GitHub           | `Github`    | `import { Github } from 'lucide-react'`    |

---

## 10. Files, Layout & Devices

### 10.1 Files & Links

| Use case   | Icon       | Import                                      |
|------------|-----------|---------------------------------------------|
| File       | `File`    | `import { File } from 'lucide-react'`      |
| File text  | `FileText`| `import { FileText } from 'lucide-react'`  |
| Folder     | `Folder`  | `import { Folder } from 'lucide-react'`    |
| Folder open| `FolderOpen`| `import { FolderOpen } from 'lucide-react'`|
| Attachment | `Paperclip`| `import { Paperclip } from 'lucide-react'`|
| Link       | `Link`    | `import { Link as LinkIcon } from 'lucide-react'`|
| Clipboard  | `Clipboard`| `import { Clipboard } from 'lucide-react'`|

### 10.2 Layout & View Modes

| Use case   | Icon       | Import                                      |
|------------|-----------|---------------------------------------------|
| Grid view  | `Grid`    | `import { Grid } from 'lucide-react'`      |
| List view  | `List`    | `import { List } from 'lucide-react'`      |
| Columns    | `Columns` | `import { Columns } from 'lucide-react'`   |
| Maximize   | `Maximize`| `import { Maximize } from 'lucide-react'`  |
| Minimize   | `Minimize`| `import { Minimize } from 'lucide-react'`  |
| Sidebar    | `Sidebar` | `import { Sidebar } from 'lucide-react'`   |

### 10.3 Devices

| Device   | Icon         | Import                                       |
|----------|-------------|----------------------------------------------|
| Mobile   | `Smartphone`| `import { Smartphone } from 'lucide-react'` |
| Tablet   | `Tablet`    | `import { Tablet } from 'lucide-react'`     |
| Monitor  | `Monitor`   | `import { Monitor } from 'lucide-react'`    |
| Laptop   | `Laptop`    | `import { Laptop } from 'lucide-react'`     |
| Printer  | `Printer`   | `import { Printer } from 'lucide-react'`    |

---

## 11. Security & Privacy

| Use case     | Icon     | Import                                      |
|--------------|---------|---------------------------------------------|
| Lock/secure  | `Lock`  | `import { Lock } from 'lucide-react'`      |
| Unlock       | `Unlock`| `import { Unlock } from 'lucide-react'`    |
| Shield/protect| `Shield`| `import { Shield } from 'lucide-react'`   |
| Key/password | `Key`   | `import { Key } from 'lucide-react'`       |
| Show password| `Eye`   | `import { Eye } from 'lucide-react'`       |
| Hide password| `EyeOff`| `import { EyeOff } from 'lucide-react'`    |

---

## 12. Location & Time

### 12.1 Location

| Use case   | Icon      | Import                                      |
|------------|----------|---------------------------------------------|
| Location   | `MapPin` | `import { MapPin } from 'lucide-react'`    |
| Map        | `Map`    | `import { Map } from 'lucide-react'`       |
| Navigation | `Navigation`| `import { Navigation } from 'lucide-react'`|
| Globe      | `Globe`  | `import { Globe } from 'lucide-react'`     |

### 12.2 Time & History

| Use case      | Icon         | Import                                      |
|---------------|-------------|---------------------------------------------|
| Calendar/date | `Calendar`  | `import { Calendar } from 'lucide-react'`  |
| Refresh       | `RefreshCw` | `import { RefreshCw } from 'lucide-react'` |
| Undo          | `RotateCcw` | `import { RotateCcw } from 'lucide-react'` |
| Redo          | `RotateCw`  | `import { RotateCw } from 'lucide-react'`  |

---

## 13. Social & Feedback

| Use case     | Icon        | Import                                      |
|--------------|------------|---------------------------------------------|
| Like / Love  | `Heart`    | `import { Heart } from 'lucide-react'`     |
| Star / Rating| `Star`     | `import { Star } from 'lucide-react'`      |
| Thumbs up    | `ThumbsUp` | `import { ThumbsUp } from 'lucide-react'`  |
| Thumbs down  | `ThumbsDown`| `import { ThumbsDown } from 'lucide-react'`|
| Bookmark     | `Bookmark` | `import { Bookmark } from 'lucide-react'`  |
| Flag / Report| `Flag`     | `import { Flag } from 'lucide-react'`      |

---

## 14. Tips chọn icon hệ thống

- Một **concept → một icon** nhất quán (ví dụ delete luôn dùng `Trash2`).
- Không trộn quá nhiều style icon (ở đây: dùng **Lucide outline** là chủ đạo).
- Size & stroke:
  - Dùng `h-4 w-4` hoặc `h-5 w-5` cho button, `h-3 w-3` cho inline text.
- Khoảng cách:

```diff
+ <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
+ <span>Label</span>
```

- i18n: Với icon-only button, **label bằng text localizable** trong `aria-label`.

Nguồn dữ liệu: [`icons.csv`](https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/refs/heads/main/src/ui-ux-pro-max/data/icons.csv) — [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill).

