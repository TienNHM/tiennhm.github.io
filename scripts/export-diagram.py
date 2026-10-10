"""Xuất sơ đồ Diagram Design (file HTML) ra PNG để nhúng vào bài.

    python scripts/export-diagram.py <file.html> <file.png> [<file2.html> <file2.png> ...]

Chụp đúng thẻ <svg> đầu tiên, ở kích thước viewBox nhân 2, nên sơ đồ viewBox
960x600 ra ảnh 1920x1200. Phần eyebrow và tiêu đề h1 của trang HTML bị bỏ qua:
trong bài, chú thích ảnh và đoạn văn quanh nó đã làm việc đó.

Trước khi chụp, script đóng dấu bản quyền "© tiennhm" vào chính file HTML (nếu
chưa có): nới viewBox thêm một dải 24px ở đáy và đặt dòng chữ ở góc phải dải đó,
nên dấu không bao giờ đè lên chú giải hay node. Chạy lại nhiều lần vẫn chỉ có
một dấu.

Cần: pip install playwright && python -m playwright install chromium
Quy ước đặt file và cách nhúng: dev-docs/DIAGRAMS.md
"""

import pathlib
import re
import sys

from playwright.sync_api import sync_playwright

SCALE = 2

COPYRIGHT = "© tiennhm"
STAMP_ID = "tiennhm-copyright"
STAMP_STRIP = 24


def stamp(html: pathlib.Path) -> bool:
    """Thêm dấu bản quyền vào SVG của file HTML. Trả về True nếu có ghi file."""
    raw = html.read_bytes().decode("utf-8")
    if f'id="{STAMP_ID}"' in raw:
        return False
    head = re.search(r"<svg\s[^>]*>", raw)
    box = head and re.search(r'viewBox="([\d.\s-]+)"', head.group(0))
    if not box:
        raise SystemExit(f"{html}: thẻ <svg> đầu tiên không có viewBox")
    x, y, w, h = (float(v) for v in box.group(1).split())
    muted = re.search(r"--color-muted:\s*(#[0-9a-fA-F]{3,8})", raw)
    color = muted.group(1) if muted else "#525860"

    num = lambda v: f"{v:g}"
    new_head = head.group(0).replace(
        box.group(0), f'viewBox="{num(x)} {num(y)} {num(w)} {num(h + STAMP_STRIP)}"'
    )
    mark = (
        f'<text id="{STAMP_ID}" x="{num(x + w - 24)}" y="{num(y + h + 12)}"'
        f' text-anchor="end" fill="{color}" opacity="0.75" font-size="9"'
        f" font-family=\"'Geist Mono', monospace\" letter-spacing=\"0.08em\">"
        f"{COPYRIGHT}</text>\n"
    )
    end = raw.rindex("</svg>")
    out = raw[: head.start()] + new_head + raw[head.end() : end] + mark + raw[end:]
    html.write_bytes(out.encode("utf-8"))
    return True


def export(page, html: pathlib.Path, png: pathlib.Path) -> None:
    stamp(html)
    page.goto(html.resolve().as_uri())
    page.wait_for_load_state("networkidle")
    page.evaluate("document.fonts.ready")
    width, height = page.evaluate(
        "() => { const b = document.querySelector('svg').viewBox.baseVal;"
        " return [b.width, b.height]; }"
    )
    if not width:
        raise SystemExit(f"{html}: thẻ <svg> đầu tiên không có viewBox")
    # Ghim SVG đúng kích thước viewBox và đặt nó ở góc (0, 0): body căn giữa
    # bằng flex làm toạ độ lẻ, ảnh chụp bị dư 1–2px mép dưới.
    page.add_style_tag(
        content=f"svg {{ width: {width}px !important; height: {height}px !important;"
        " min-width: 0 !important; }"
        " body { display: block !important; padding: 0 !important; }"
        " body > :not(.frame), .frame > :not(.diagram-container) { display: none !important; }"
    )
    png.parent.mkdir(parents=True, exist_ok=True)
    page.locator("svg").first.screenshot(path=str(png))
    print(f"✓ {png}")


def main(argv: list[str]) -> None:
    if not argv or len(argv) % 2:
        raise SystemExit(__doc__)
    pairs = [
        (pathlib.Path(argv[i]), pathlib.Path(argv[i + 1]))
        for i in range(0, len(argv), 2)
    ]
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(
            viewport={"width": 2400, "height": 1600}, device_scale_factor=SCALE
        )
        for html, png in pairs:
            export(page, html, png)
        browser.close()


if __name__ == "__main__":
    main(sys.argv[1:])
