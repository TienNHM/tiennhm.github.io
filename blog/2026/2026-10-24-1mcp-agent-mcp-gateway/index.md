---
title: "1MCP Agent: gom mọi MCP server về một cửa, và bớt ngốn context"
slug: 1mcp-agent-mcp-gateway
description: "1MCP Agent là một proxy mã nguồn mở gom nhiều MCP server sau một endpoint duy nhất, kèm chế độ CLI để agent khám phá tool theo từng bước thay vì nạp hết schema ngay từ đầu. Bài này giải thích vấn đề nó giải, cách cài, cách nối vào Claude Code và Cursor, và những chỗ cần cẩn thận."
keywords: [1mcp, 1mcp agent, mcp gateway, mcp proxy, model context protocol, mcp server, claude code mcp, cursor mcp, gop mcp server, giam context mcp, context7, lazy loading tool, cli mode agent]
tags: [ai, ai-tools, tools]
authors: [tiennhm]
date: 2026-10-24
---

import { SummaryBox, FAQSection } from '@site/src/components/SEO';

# 1MCP Agent

<SummaryBox>
Dùng vài MCP server cho Claude Code, Cursor, Codex… thì sớm muộn bạn cũng phải khai báo lặp lại cùng một danh sách ở từng client, và mỗi server lại đổ toàn bộ schema tool vào context ngay khi phiên bắt đầu. **1MCP Agent** (`@1mcp/agent`) là một proxy đứng giữa: bạn đăng ký các MCP server một lần, chạy `1mcp serve`, rồi client nào cũng chỉ cần trỏ về một địa chỉ. Ngoài ra nó có chế độ CLI cho phép agent khám phá và gọi tool theo từng bước (`instructions` → `inspect` → `run`) để không phải nạp hết schema từ đầu.
</SummaryBox>

Bài bắt đầu từ một vấn đề tôi gặp thật (máy nặng vì mỗi session Claude Code tự khởi động bản sao MCP server của riêng nó), rồi chuyển sang giới thiệu 1MCP dựa trên [README của repo](https://github.com/1mcp-app/agent) và tài liệu tại [docs.1mcp.app](https://docs.1mcp.app). Phần giới thiệu công cụ chưa phải đánh giá sau thời gian dài dùng. Chỗ nào tài liệu không nói rõ thì tôi ghi là chưa rõ, không đoán.

<!-- truncate -->

## Câu chuyện: máy ngốn RAM vì mỗi session một bộ MCP riêng

Tôi mở nhiều session Claude Code cùng lúc, và máy bắt đầu nặng. Khi hỏi Claude xem có cách nào để các session dùng chung MCP server không, câu trả lời làm rõ nguyên nhân: **mặc định Claude khởi động MCP server qua stdio, nên mỗi session có một bản sao riêng của từng server.** Mở năm session với mười server là năm mươi tiến trình, dù phần lớn làm đúng một việc giống nhau.

Muốn dùng chung thì server phải chạy **một lần** dưới dạng HTTP, rồi mọi session nối vào bằng URL. Từ đó có ba hướng, theo thứ tự từ dễ đến khó:

1. **Bỏ bản trùng.** Cấu hình của tôi khai cùng một server hai lần: Azure DevOps vừa là `ado` vừa là `azure-devops`, GitKraken vừa khai tay vừa đến từ plugin. Bỏ một bản là giảm bộ nhớ ở mọi session mà không cần công cụ mới.
2. **Dùng chung một tiến trình.** Bọc server stdio bằng một proxy như `supergateway` hay `mcp-proxy`, chạy một lần, rồi khai `"type": "http"` cùng URL `http://localhost:<cổng>/mcp`. Hợp với server không giữ trạng thái (Azure DevOps, GitKraken). **Không hợp** với server giữ trạng thái: `chrome-devtools` chỉ có một trạng thái trình duyệt, còn một server lưu bằng chứng theo từng tác vụ thì dùng chung sẽ làm dữ liệu giữa các session lẫn vào nhau.
3. **Nạp ít server hơn.** Tắt những cái ít dùng (Datadog, Docker, hàng loạt plugin) ở cấp dự án.

Một con số đáng nhớ để không kỳ vọng sai: chính `claude.exe` đã chiếm khoảng 3 GB, và dùng chung MCP không đụng tới phần đó. Mở ít session hơn vẫn là cách hiệu quả nhất.

### Tự dựng một hub, rồi gặp bài toán vận hành

Tôi đi theo hướng 2 và gom các server vào một "hub" chạy nền (`node hub.mjs start`, tách khỏi terminal, kiểm tra bằng `node hub.mjs status`). Chạy được rồi thì đến phần chán hơn: **giữ nó sống.** Tôi muốn hub tự bật sau mỗi lần khởi động lại máy, và gặp ngay những chi tiết vặt:

- Task Scheduler với trigger lúc đăng nhập thường bị Windows từ chối ("Access is denied") nếu không có quyền admin. Lối thoát là một shortcut trong thư mục Startup (`shell:startup`), không cần admin.
- Hub cần khoảng 30 giây để mở cổng. Mở Claude ngay sau khi đăng nhập thì server báo lỗi, phải chờ khoảng một phút rồi mới mở session mới.
- Đường dẫn `node.exe` bị ghi cứng; đổi phiên bản Node bằng `nvm` là phải tạo lại.
- Hub sập thì không có gì khởi động lại nó.

Mỗi mục trong số này nhỏ, nhưng cộng lại là một dịch vụ nền tôi phải tự bảo trì, chỉ để các MCP server khỏi nhân bản. Đó là lúc tôi quay sang nhìn xem đã có công cụ nào làm đúng việc này chưa, và 1MCP là một trong số đó.

> **Ghi chú của tác giả:** Phần dưới là những gì README của 1MCP nói, không phải kết quả tôi đã đo khi thay hub tự dựng bằng nó. Tôi chưa thử khởi động lại Windows thật để kiểm chứng việc tự bật, nên không khẳng định gì hơn về điều đó.

## Vấn đề chung: MCP server mọc nhanh hơn cách ta quản lý chúng

[Model Context Protocol](https://modelcontextprotocol.io/) giúp agent gọi công cụ bên ngoài theo một chuẩn chung. Nhưng khi số server tăng lên, hai cái đau xuất hiện:

1. **Cấu hình nhân bản.** Mỗi client (Claude Code, Cursor, Codex…) giữ một file cấu hình riêng. Thêm một server nghĩa là sửa N chỗ, quên một chỗ là client đó thiếu tool.
2. **Context bị ăn sẵn.** Mỗi server khai báo tool kèm JSON schema, và client thường nạp tất cả vào context từ đầu phiên. Mười server, vài trăm tool, chưa gõ chữ nào đã tốn một mảng token.

1MCP nhắm đúng hai điểm này.

## 1MCP làm gì

Repo mô tả nó là "unified MCP runtime": một tiến trình trung gian gom nhiều MCP server upstream thành một endpoint. Theo README, nó là gói TypeScript phân phối qua npm, giấy phép Apache-2.0, và hỗ trợ cả transport HTTP lẫn STDIO.

```text
Claude Code ─┐
Cursor ──────┼──► 1MCP (một endpoint) ──┬──► context7
Codex ───────┘                          ├──► server B
                                        └──► server C
```

Client chỉ biết một địa chỉ; việc server nào đứng sau do 1MCP lo.

## Cài và chạy

Ba lệnh trong README là đủ để có bản chạy được:

```bash
npm install -g @1mcp/agent
1mcp mcp add context7 -- npx -y @upstash/context7-mcp
1mcp serve
```

- `mcp add` đăng ký một server upstream; phần sau dấu `--` là lệnh khởi chạy nó (ở đây là `context7`).
- `serve` bật runtime. Các URL mẫu trong README dùng `127.0.0.1:3050`, nên nhiều khả năng đó là cổng mặc định, nhưng README không nói thẳng. Kiểm tra bằng output khi bạn chạy.

## Nối client vào

**Claude Code** (HTTP):

```bash
claude mcp add -t http 1mcp "http://127.0.0.1:3050/mcp?app=claude-code"
```

**Cursor** (`mcp.json`):

```json
{
  "mcpServers": {
    "1mcp": {
      "url": "http://127.0.0.1:3050/mcp?app=cursor"
    }
  }
}
```

Tham số `?app=` cho 1MCP biết client nào đang gọi, để có thể áp bộ lọc hay preset riêng cho từng client.

Client nào chỉ nói được STDIO thì dùng `1mcp proxy`; README gợi ý đây là phương án dự phòng sau chế độ CLI, và nó giữ ngữ cảnh dự án qua file `.1mcprc`.

## Chế độ CLI: khám phá từng bước

Đây là phần tôi thấy đáng chú ý nhất. Thay vì để agent nhận cả kho schema, README mô tả quy trình ba bước:

```bash
1mcp instructions                      # hướng dẫn dùng runtime
1mcp inspect context7                  # xem server có những tool nào
1mcp inspect context7/query-docs       # xem schema của đúng một tool
1mcp run context7/query-docs --args '{"libraryId":"/mongodb/docs","query":"aggregation pipeline"}'
```

Agent chỉ trả giá context cho thứ nó thật sự đụng tới: hỏi danh sách, xem schema của tool cần dùng, rồi gọi. Cài đặt nhanh cho agent:

```bash
1mcp cli-setup --codex
1mcp cli-setup --claude --scope repo --repo-root .
```

Nếu làm việc với nhiều worktree, có thể chỉ định checkout cho từng lệnh bằng `--project /duong/dan/tuyet/doi`. Theo README, tính năng này cần backend đã cài và cấu hình bằng `mcp setup`.

## Các tính năng tuỳ chọn

README liệt kê vài thứ bật khi cần:

| Tính năng | Ý nghĩa |
|---|---|
| Async loading | Cổng HTTP mở sớm, client xử lý việc danh sách capability thay đổi sau đó |
| Lazy loading | Chỉ lộ ba bề mặt ổn định `tool_list`, `tool_schema`, `tool_invoke` để schema ban đầu nhỏ lại. **Không** giảm số kết nối tới backend |
| Tự phục hồi | Với backend STDIO do 1MCP sở hữu, kèm theo dõi trạng thái và lệnh restart |
| Template server | Server được dựng theo ngữ cảnh từng repo, branch hay session thay vì nạp một lần lúc khởi động |

Ngoài ra còn bộ lọc và preset để mỗi client thấy một tập server khác nhau, cùng OAuth 2.1 theo tài liệu. Cú pháp cụ thể của filter, preset và OAuth tôi chưa kiểm chứng; hãy đọc [docs.1mcp.app](https://docs.1mcp.app) trước khi dựa vào.

## Khi nào nên dùng, khi nào không

**Hợp** khi bạn dùng từ ba server MCP trở lên, trên nhiều client, hoặc đã thấy context phình ra vì schema tool.

**Chưa cần** nếu chỉ có một hai server trên một client: thêm một tiến trình trung gian là thêm một thứ phải chạy và gỡ lỗi.

Vài điểm cần cân nhắc:

- **Thêm một điểm lỗi.** Mọi client đi qua 1MCP; nó dừng thì tất cả mất tool.
- **Lazy loading không phải phép màu.** Nó giảm schema nạp ban đầu, không giảm số tiến trình server chạy phía sau.
- **Bảo mật.** Mỗi server upstream chạy với quyền của bạn. Gom về một cửa tiện, nhưng cũng nghĩa là một endpoint nắm quyền gọi tất cả; đừng mở nó ra ngoài `127.0.0.1` khi chưa bật xác thực.
- **Dự án còn trẻ.** Khi tôi xem, repo có khoảng 500 sao; cú pháp có thể đổi giữa các phiên bản, nên ghim phiên bản nếu dùng trong quy trình quan trọng.

<FAQSection
  items={[
    {
      question: "1MCP Agent là gì?",
      answer: "Là một proxy mã nguồn mở viết bằng TypeScript, gom nhiều MCP server về một endpoint duy nhất để các client như Claude Code hay Cursor chỉ cần cấu hình một lần. Nó cài qua npm với gói @1mcp/agent và chạy bằng lệnh 1mcp serve."
    },
    {
      question: "Cài 1MCP như thế nào?",
      answer: "Chạy npm install -g @1mcp/agent, đăng ký server upstream bằng 1mcp mcp add (ví dụ 1mcp mcp add context7 -- npx -y @upstash/context7-mcp), rồi bật runtime bằng 1mcp serve. Sau đó trỏ client về địa chỉ HTTP của nó."
    },
    {
      question: "Làm sao nối Claude Code vào 1MCP?",
      answer: "Dùng claude mcp add -t http 1mcp với URL dạng http://127.0.0.1:3050/mcp?app=claude-code. Cổng 3050 là giá trị xuất hiện trong ví dụ của README, hãy đối chiếu với output của lệnh serve trên máy bạn."
    },
    {
      question: "Chế độ CLI giúp tiết kiệm context ra sao?",
      answer: "Agent không nhận toàn bộ schema tool ngay từ đầu mà đi qua ba bước: lấy hướng dẫn (instructions), xem server hoặc tool cần dùng (inspect), rồi gọi (run). Nhờ vậy chỉ phần schema thật sự cần mới đi vào context."
    },
    {
      question: "Lazy loading của 1MCP có giảm số server chạy không?",
      answer: "Không. Theo README, lazy loading chỉ giữ bề mặt tool_list, tool_schema, tool_invoke ổn định để giảm kích thước schema ban đầu; số kết nối tới các backend vẫn như cũ."
    }
  ]}
/>

## Tham khảo

- [1mcp-app/agent](https://github.com/1mcp-app/agent) — mã nguồn và README
- [docs.1mcp.app](https://docs.1mcp.app) — tài liệu, hướng dẫn quick start và worktree
- [Model Context Protocol](https://modelcontextprotocol.io/) — chuẩn phía sau
