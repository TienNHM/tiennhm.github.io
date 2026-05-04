# -*- coding: utf-8 -*-
"""Wrap <!-- geoseo-curriculum-nav --> ... semantic hooks block in <HiddenContent>."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CUR = ROOT / "docs" / "09-dotnet-backend-zero-to-senior"

# From marker through end of "Từ khóa chỉ mục" section, stop before next markdown H2
WRAP_PAT = re.compile(
    r"(<!-- geoseo-curriculum-nav -->\s*\n)"
    r"([\s\S]*?## Từ khóa chỉ mục \(semantic hooks\)[\s\S]*?)"
    r"(\n\n## )",
    re.MULTILINE,
)

IMPORT_FROM = re.compile(
    r"import\s*\{\s*SummaryBox\s*\}\s*from\s*['\"]@site/src/components/SEO['\"];"
)
IMPORT_BOTH = "import { SummaryBox, HiddenContent } from '@site/src/components/SEO';"


def process(text: str) -> str | None:
    if "<HiddenContent>" in text:
        return None
    if "<!-- geoseo-curriculum-nav -->" not in text:
        return None

    def repl(m: re.Match[str]) -> str:
        inner = m.group(1) + m.group(2).rstrip() + "\n"
        return f"<HiddenContent>\n\n{inner}\n</HiddenContent>{m.group(3)}"

    new_body, n = WRAP_PAT.subn(repl, text, count=1)
    if n != 1:
        return None

    new_body = IMPORT_FROM.sub(IMPORT_BOTH, new_body, count=1)
    return new_body


def main() -> None:
    for path in sorted(CUR.rglob("*.mdx")):
        raw = path.read_text(encoding="utf-8")
        out = process(raw)
        if out is None:
            continue
        path.write_text(out, encoding="utf-8", newline="\n")
        print("wrapped:", path.relative_to(ROOT))


if __name__ == "__main__":
    main()
