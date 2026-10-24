# 1MCP Agent: gom mọi MCP server về một cửa, và bớt ngốn context

> Nguồn: https://tiennhm.io.vn/blog/1mcp-agent-mcp-gateway
> 1MCP Agent là một proxy mã nguồn mở gom nhiều MCP server sau một endpoint duy nhất, kèm chế độ CLI để agent khám phá tool theo từng bước thay vì nạp hết schema ngay từ đầu. Bài này giải thích vấn đề nó giải, cách cài, cách nối vào Claude Code và Cursor, và những chỗ cần cẩn thận.

> Dùng vài MCP server cho Claude Code, Cursor, Codex… thì sớm muộn bạn cũng phải khai báo lặp lại cùng một danh sách ở từng client, và mỗi server lại đổ toàn bộ schema tool vào context ngay khi phiên bắt đầu. **1MCP Agent** (`@1mcp/agent`) là một proxy đứng giữa: bạn đăng ký các MCP server một lần, chạy `1mcp serve`, rồi client nào cũng chỉ cần trỏ về một địa chỉ. Ngoài ra nó có chế độ CLI cho phép agent khám phá và gọi tool theo từng bước (`instructions` → `inspect` → `run`) để không phải nạp hết schema từ đầu.

Bài này là giới thiệu công cụ dựa trên [README của repo](https://github.com/1mcp-app/agent) và tài liệu tại [docs.1mcp.app](https://docs.1mcp.app), không phải đánh giá sau thời gian dài dùng. Chỗ nào tài liệu không nói rõ thì tôi ghi là chưa rõ, không đoán.

## Vấn đề: MCP server mọc nhanh hơn cách ta quản lý chúng

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

### 1MCP Agent là gì?

Là một proxy mã nguồn mở viết bằng TypeScript, gom nhiều MCP server về một endpoint duy nhất để các client như Claude Code hay Cursor chỉ cần cấu hình một lần. Nó cài qua npm với gói @1mcp/agent và chạy bằng lệnh 1mcp serve.

### Cài 1MCP như thế nào?

Chạy npm install -g @1mcp/agent, đăng ký server upstream bằng 1mcp mcp add (ví dụ 1mcp mcp add context7 -- npx -y @upstash/context7-mcp), rồi bật runtime bằng 1mcp serve. Sau đó trỏ client về địa chỉ HTTP của nó.

### Làm sao nối Claude Code vào 1MCP?

Dùng claude mcp add -t http 1mcp với URL dạng http://127.0.0.1:3050/mcp?app=claude-code. Cổng 3050 là giá trị xuất hiện trong ví dụ của README, hãy đối chiếu với output của lệnh serve trên máy bạn.

### Chế độ CLI giúp tiết kiệm context ra sao?

Agent không nhận toàn bộ schema tool ngay từ đầu mà đi qua ba bước: lấy hướng dẫn (instructions), xem server hoặc tool cần dùng (inspect), rồi gọi (run). Nhờ vậy chỉ phần schema thật sự cần mới đi vào context.

### Lazy loading của 1MCP có giảm số server chạy không?

Không. Theo README, lazy loading chỉ giữ bề mặt tool_list, tool_schema, tool_invoke ổn định để giảm kích thước schema ban đầu; số kết nối tới các backend vẫn như cũ.

## Tham khảo

- [1mcp-app/agent](https://github.com/1mcp-app/agent) — mã nguồn và README
- [docs.1mcp.app](https://docs.1mcp.app) — tài liệu, hướng dẫn quick start và worktree
- [Model Context Protocol](https://modelcontextprotocol.io/) — chuẩn phía sau
