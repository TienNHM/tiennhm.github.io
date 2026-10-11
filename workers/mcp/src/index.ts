/**
 * MCP server cho tiennhm.io.vn — cho agent tìm và đọc bài blog/docs.
 *
 * Site là trang tĩnh trên GitHub Pages nên không tự chạy được MCP. Worker này
 * nằm ở route `tiennhm.io.vn/mcp*` (cần bật proxy Cloudflare, xem
 * dev-docs/CLOUDFLARE-AGENT-READINESS.md) và chỉ ĐỌC những thứ site đã build
 * sẵn: `md/index.json` (danh mục trang) và `md/<route>.md` (bản Markdown của
 * từng trang), cả hai do plugins/page-markdown sinh ra. Không có dữ liệu riêng,
 * không đăng nhập, không ghi gì cả.
 *
 * Chạy stateless: mỗi request tạo server + transport mới, nên không cần
 * Durable Object hay session.
 */
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import { z } from 'zod';
import serverCard from '../../../static/.well-known/mcp/server-card.json';

interface Env {
  /** Gốc của site tĩnh, không có `/` ở cuối. */
  SITE_ORIGIN: string;
}

interface IndexEntry {
  title: string;
  description: string;
  url: string;
  markdown: string;
  type: 'docs' | 'blog';
  date?: string;
  tags?: string[];
}

type Locale = 'vi' | 'en';

// Một trang Markdown dài nhất của site cỡ vài chục KB. Trần này chỉ để một
// file bất thường không đổ cả MB vào context của agent.
const MAX_PAGE_CHARS = 200_000;
// Danh mục chỉ đổi khi site build lại, nên giữ trong isolate một lúc là đủ.
const INDEX_TTL_MS = 10 * 60 * 1000;

const indexCache = new Map<Locale, { at: number; entries: IndexEntry[] }>();

async function loadIndex(env: Env, locale: Locale): Promise<IndexEntry[]> {
  const hit = indexCache.get(locale);
  if (hit && Date.now() - hit.at < INDEX_TTL_MS) return hit.entries;

  const prefix = locale === 'en' ? '/en' : '';
  const res = await fetch(`${env.SITE_ORIGIN}${prefix}/md/index.json`, {
    cf: { cacheTtl: 600, cacheEverything: true },
  });
  if (!res.ok) throw new Error(`Không tải được danh mục (${locale}): HTTP ${res.status}`);
  const entries = (await res.json()) as IndexEntry[];
  indexCache.set(locale, { at: Date.now(), entries });
  return entries;
}

/**
 * Chuẩn hoá để so khớp không dấu: "Bảo mật" khớp "bao mat". Phần lớn nội
 * dung là tiếng Việt, còn agent thì hay gõ không dấu hoặc trộn tiếng Anh.
 */
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/đ/g, 'd');
}

function score(entry: IndexEntry, terms: string[]): number {
  const title = normalize(entry.title);
  const tags = normalize((entry.tags ?? []).join(' '));
  const desc = normalize(entry.description);
  const url = normalize(entry.url);
  let total = 0;
  for (const term of terms) {
    let s = 0;
    if (title.includes(term)) s += 5;
    if (tags.includes(term)) s += 3;
    if (desc.includes(term)) s += 2;
    if (url.includes(term)) s += 1;
    // Mọi từ đều phải xuất hiện ở đâu đó, không thì "redis cache" sẽ trả về
    // cả trăm bài chỉ chứa "cache".
    if (s === 0) return 0;
    total += s;
  }
  return total;
}

/**
 * Nhận URL đầy đủ hoặc đường dẫn của một trang trên site, trả về URL bản
 * Markdown. Cùng luật với src/utils/markdownUrl.ts: bỏ tiền tố locale, bỏ `/`
 * ở cuối, route rỗng thành `index`.
 *
 * Chỉ chấp nhận host của site — tool này không được dùng để fetch URL tuỳ ý.
 */
function toMarkdownUrl(env: Env, input: string): string {
  const origin = new URL(env.SITE_ORIGIN);
  const url = new URL(input, origin);
  if (url.host !== origin.host && url.host !== `www.${origin.host}`) {
    throw new Error(`Chỉ đọc được trang trên ${origin.host}`);
  }
  let path = url.pathname;
  if (path.endsWith('.md')) return `${origin.origin}${path}`;

  let localePrefix = '';
  if (path === '/en' || path.startsWith('/en/')) {
    localePrefix = '/en';
    path = path.slice(3);
  }
  const route = path.replace(/^\//, '').replace(/\/$/, '');
  return `${origin.origin}${localePrefix}/md/${route || 'index'}.md`;
}

function formatEntry(e: IndexEntry): string {
  const meta = [e.type, e.date, e.tags?.length ? e.tags.join(', ') : null].filter(Boolean).join(' · ');
  return `- [${e.title}](${e.url})\n  ${meta}${e.description ? `\n  ${e.description}` : ''}`;
}

function createServer(env: Env): McpServer {
  const server = new McpServer(
    { name: serverCard.serverInfo.name, version: serverCard.serverInfo.version },
    {
      instructions:
        'Blog kỹ thuật của TienNHM (chủ yếu tiếng Việt): .NET backend, bảo mật web, database, AWS, ' +
        'k6, hệ điều hành, LeetCode, AI agent. Dùng search_content để tìm trang, rồi get_page để đọc ' +
        'toàn văn. Khi trích dẫn, ghi nguồn "TienNHM" và link về URL gốc của trang.',
    },
  );

  const localeSchema = z
    .enum(['vi', 'en'])
    .default('vi')
    .describe('Ngôn ngữ của site: vi (đầy đủ) hoặc en (chỉ một phần được dịch)');

  server.registerTool(
    'search_content',
    {
      title: 'Tìm bài viết và tài liệu',
      description:
        'Tìm trang trên tiennhm.io.vn theo từ khoá, khớp tiêu đề, tag, mô tả và URL. ' +
        'Không phân biệt dấu tiếng Việt. Mọi từ khoá đều phải khớp.',
      inputSchema: {
        query: z.string().min(1).describe('Từ khoá, ví dụ "jwt", "index sql", "bảo mật"'),
        type: z.enum(['all', 'docs', 'blog']).default('all').describe('Lọc theo loại trang'),
        locale: localeSchema,
        limit: z.number().int().min(1).max(25).default(10),
      },
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async ({ query, type, locale, limit }) => {
      const terms = normalize(query).split(/\s+/).filter(Boolean);
      const entries = await loadIndex(env, locale);
      const results = entries
        .filter((e) => type === 'all' || e.type === type)
        .map((e) => ({ e, s: score(e, terms) }))
        .filter((r) => r.s > 0)
        .sort((a, b) => b.s - a.s)
        .slice(0, limit)
        .map((r) => r.e);

      const text = results.length
        ? results.map(formatEntry).join('\n')
        : `Không có trang nào khớp "${query}". Thử từ khoá ngắn hơn hoặc bằng tiếng Anh.`;
      return { content: [{ type: 'text', text }] };
    },
  );

  server.registerTool(
    'get_page',
    {
      title: 'Đọc toàn văn một trang',
      description:
        'Lấy nội dung Markdown của một trang blog/docs trên tiennhm.io.vn. ' +
        'Nhận URL đầy đủ (lấy từ search_content) hoặc đường dẫn như /blog/markdown-cheat-sheet. Trang danh mục tự sinh (không có bài) thì không có bản Markdown.',
      inputSchema: {
        url: z.string().min(1).describe('URL hoặc đường dẫn của trang'),
      },
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async ({ url }) => {
      const mdUrl = toMarkdownUrl(env, url);
      const res = await fetch(mdUrl, { cf: { cacheTtl: 600, cacheEverything: true } });
      if (!res.ok) {
        return {
          isError: true,
          content: [
            {
              type: 'text',
              text: `Không đọc được ${mdUrl} (HTTP ${res.status}). Chỉ trang blog và docs có bản Markdown; dùng search_content để lấy đúng URL.`,
            },
          ],
        };
      }
      let text = await res.text();
      if (text.length > MAX_PAGE_CHARS) {
        text = `${text.slice(0, MAX_PAGE_CHARS)}\n\n[… đã cắt bớt, bản đầy đủ: ${mdUrl}]`;
      }
      return { content: [{ type: 'text', text }] };
    },
  );

  server.registerTool(
    'list_recent_posts',
    {
      title: 'Bài blog mới nhất',
      description: 'Liệt kê các bài blog mới nhất trên tiennhm.io.vn, mới trước.',
      inputSchema: {
        locale: localeSchema,
        limit: z.number().int().min(1).max(25).default(10),
      },
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async ({ locale, limit }) => {
      const entries = await loadIndex(env, locale);
      const posts = entries
        .filter((e) => e.type === 'blog')
        .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
        .slice(0, limit);
      return { content: [{ type: 'text', text: posts.map(formatEntry).join('\n') || 'Chưa có bài nào.' }] };
    },
  );

  server.registerResource(
    'llms-txt',
    `${env.SITE_ORIGIN}/llms.txt`,
    {
      title: 'llms.txt',
      description: 'Tổng quan site: các khoá học, trang chính và endpoint cho agent',
      mimeType: 'text/plain',
    },
    async (uri) => {
      const res = await fetch(uri.href, { cf: { cacheTtl: 600, cacheEverything: true } });
      return { contents: [{ uri: uri.href, mimeType: 'text/plain', text: await res.text() }] };
    },
  );

  return server;
}

// Cho phép client MCP chạy trong trình duyệt (MCP Inspector, playground…).
// Không có cookie hay dữ liệu riêng nên mở cho mọi origin là an toàn.
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept, Mcp-Session-Id, Mcp-Protocol-Version, Last-Event-ID',
  'Access-Control-Expose-Headers': 'Mcp-Session-Id, Mcp-Protocol-Version',
};

function withCors(res: Response): Response {
  const out = new Response(res.body, res);
  for (const [k, v] of Object.entries(CORS_HEADERS)) out.headers.set(k, v);
  return out;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    // Vị trí khuyến nghị của Server Card theo SEP-2127. Bản ở
    // /.well-known/mcp/server-card.json do GitHub Pages phục vụ là cùng một file.
    if (pathname === '/mcp/server-card' || pathname === '/mcp/server-card.json') {
      return withCors(Response.json(serverCard, { headers: { 'Cache-Control': 'public, max-age=3600' } }));
    }

    if (pathname !== '/mcp' && pathname !== '/mcp/') {
      return withCors(new Response('Not found', { status: 404 }));
    }

    const server = createServer(env);
    const transport = new WebStandardStreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
      enableJsonResponse: true,
    });
    await server.connect(transport);
    return withCors(await transport.handleRequest(request));
  },
};
