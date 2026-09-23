# Can an HTTP Header Carry Vietnamese? ASCII, obs-text, and Where .NET Draws the Line

> Nguồn: https://tiennhm.io.vn/en/blog/http-header-unicode-ascii-dotnet
> The short answer is no, and the reason is more interesting than it looks. The HTTP specification permits bytes 0x80-0xFF in header values through obs-text, but defines no charset for interpreting them. This post dissects the field-value grammar in RFC 9110, shows why 'í' gets through while 'ồ' does not, and covers three correct ways to encode non-ASCII data in a header.

> Short answer: **no, not if you want it to survive every layer**. The HTTP specification defines header values in terms of printable ASCII, plus an obsolete branch called **obs-text** that allows bytes `0x80–0xFF` but **defines no charset** for interpreting them. The consequence is that a Vietnamese string can get through partially: `í` lives inside Latin-1 and is representable, while `ồ` is not, because it is `U+1ED3` — beyond `0xFF`. .NET takes a decisive stance: `HttpClient` refuses to send any non-ASCII header value. To carry text with diacritics you must **encode** it, using percent-encoding, RFC 8187 or Base64.

This post branches off [a production incident](https://tiennhm.io.vn/blog/cloudflare-header-broke-dotnet-httpclient) where the header `cf-ipcity: Hồ Chí Minh`, injected by Cloudflare, made `HttpClient` throw. There I stopped at the symptom. Here I answer the question that symptom raises: **what exactly is an HTTP header allowed to contain?**

## TL;DR
- An HTTP header value is fundamentally a **sequence of bytes**, not a Unicode string.
- RFC 9110 allows `0x80–0xFF` through **obs-text**, but **defines no charset** — so no party knows how to decode it reliably.
- In practice each side picks a different encoding and you get **mojibake**.
- Vietnamese gets through **partially** via Latin-1: `í` yes, `ồ` no.
- .NET does not gamble: `HttpClient` throws rather than emitting bytes it cannot guarantee.
- The correct approaches: **percent-encoding**, **RFC 8187**, or **Base64**.

---

## What a header value actually is, grammatically
Open [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110#name-field-values) and the definition of a header field value reduces to this:

```abnf
field-value    = *field-content
field-content  = field-vchar [ 1*( SP / HTAB / field-vchar ) field-vchar ]
field-vchar    = VCHAR / obs-text
VCHAR          = %x21-7E        ; printable ASCII
obs-text       = %x80-FF        ; non-ASCII bytes, obsolete
```

Those last two lines are the whole story.

`VCHAR` is printable ASCII, `0x21` through `0x7E`. That part everyone agrees on.

`obs-text` is bytes from `0x80` to `0xFF`. The `obs` stands for **obsolete**. It exists in the specification not for you to use, but to describe things that already ended up on the Internet and cannot be removed.

And here is the decisive point: **the specification does not say which charset those bytes belong to.** Not "it is UTF-8", not "it is Latin-1". Just bytes, with no interpretation attached.

A format that lets you send bytes without telling the receiver what they mean is not a data channel — it is an invitation to misunderstand.

---

## Why `í` gets through and `ồ` does not
This is the detail I find most interesting, and it explains why this class of bug shows up **intermittently** — breaking for some customers and not others.

Take the exact string from the incident and look at its bytes in two encodings:

```
String : Hồ Chí Minh

UTF-8  : 48 E1 BB 93 20 43 68 C3 AD 20 4D 69 6E 68
Latin-1: 48 3F       20 43 68 ED    20 4D 69 6E 68
            ^^                ^^
            'ồ' → 0x3F        'í' → 0xED
```

Read character by character:

| Character | Unicode code point | UTF-8 | Latin-1 |
|---|---|---|---|
| `H` | U+0048 | `48` | `48` |
| `ồ` | **U+1ED3** | `E1 BB 93` | **not representable** → `3F` (`?`) |
| `í` | U+00ED | `C3 AD` | `ED` |

`í` is `U+00ED`, comfortably inside `0x00–0xFF`, so Latin-1 carries it in a single byte. `ồ` is `U+1ED3` — far beyond `0xFF` — so Latin-1 **has no room for it** and substitutes a question mark.

Vietnamese therefore straddles the boundary: simple accented vowels such as `á à í ò ú` fall inside Latin-1, while compound forms like `ồ ậ ữ ợ ẩ` do not. A system passing headers around as Latin-1 will appear to work for **Hải** and break on **Hồ** — same code, different data.

That is the worst kind of bug: it depends on **content**, so it sails past every test you did not deliberately design for it.

---

## What happens when two sides pick different encodings
Suppose one side writes the header as UTF-8 and the other reads it as Latin-1 — the default situation in a great many stacks.

The sender writes `ồ` as three bytes, `E1 BB 93`. The receiver reads each byte as Latin-1 and gets three characters: `á`, `»`, `“`. The string `Hồ` becomes `Há»“`.

This is **mojibake**, and it is nobody's fault. Both sides did the right thing according to the encoding they chose. The problem is that the specification never made them choose the same one.

What matters is that mojibake is **silent**. No exception, no warning — just wrong data flowing quietly onward into logs, databases and reports. Compared with .NET throwing an exception outright, silently corrupting data is considerably worse.

---

## Where .NET draws the line
In the [incident post](https://tiennhm.io.vn/blog/cloudflare-header-broke-dotnet-httpclient) I measured this specifically on .NET 9.0.4, and the results are worth repeating because they show .NET taking a clear position:

| Operation | Result |
|---|---|
| `DefaultRequestHeaders.Add(name, "Hồ Chí Minh")` | **no exception** |
| `TryAddWithoutValidation(name, "Hồ Chí Minh")` | returns `true` |
| `SendAsync(request)` | **throws** `HttpRequestException: Request headers must contain only ASCII characters.` |
| Bytes on the wire | **none** |

This tells us two things.

**First, `HttpHeaders` validation is not where encoding is checked.** It checks structure: control characters, line breaks, per-header format. Whether the value fits in ASCII belongs to the serialisation layer, all the way at send time.

**Second, .NET refuses to play the obs-text lottery.** It could have chosen to write Latin-1 and let `ồ` become `?`, or to write UTF-8 and let the other side guess. Both lead to silent data corruption. Throwing an exception is the louder choice, but the more honest one.

If .NET's strictness here annoys you, remember that the alternative is not "it works correctly" but "it works incorrectly without telling you".

---

## Three correct ways to put diacritics in a header
When you genuinely need text with diacritics in a header — a filename, a city, a username — the answer is always to **encode it into ASCII and decode on the receiving side**.

### 1. Percent-encoding

The most common approach, and the easiest to read in logs:

```csharp
// Sender
var encoded = Uri.EscapeDataString("Hồ Chí Minh");
// => H%E1%BB%93%20Ch%C3%AD%20Minh
request.Headers.TryAddWithoutValidation("X-City", encoded);

// Receiver
var city = Uri.UnescapeDataString(raw);
```

The whole result is ASCII, so it survives every layer. `Uri.EscapeDataString` encodes as UTF-8 and `Uri.UnescapeDataString` decodes as UTF-8, so both ends agree when both are .NET.

### 2. RFC 8187 — the standard when you define a new header

[RFC 8187](https://www.rfc-editor.org/rfc/rfc8187) defines a syntax that carries the charset **inside the value itself**:

```http
X-City*=UTF-8''H%E1%BB%93%20Ch%C3%AD%20Minh
```

Three parts: the charset name, an optional language tag, then the percent-encoded string. You meet this every day without noticing — it is exactly how `filename*` works in `Content-Disposition` when you download a file with a non-ASCII name.

Its advantage over bare percent-encoding: the receiver does not have to **guess** the charset, because it is declared in place.

### 3. Base64

Suitable when the data is not plain text, or when you want one uniform rule for every value:

```csharp
var encoded = Convert.ToBase64String(Encoding.UTF8.GetBytes("Hồ Chí Minh"));
// => SOG7kyBDaMOtIE1pbmg=
```

The trade-off: logs are no longer human-readable, and the size grows by roughly a third.

### Comparison

| Approach | Readable in logs | Self-describing charset | When to use |
|---|:---:|:---:|---|
| Percent-encoding | ✅ | ❌ | The default, when both ends share a convention |
| RFC 8187 | ✅ | ✅ | When you define a new header for several consumers |
| Base64 | ❌ | ❌ | Binary data, or when you want one uniform rule |

**The most common wrong approach** is putting the raw Unicode string in and hoping it survives. It will survive in dev, it will survive with `Hải`, and it will break on `Hồ` in production.

---

## Do HTTP/2 and HTTP/3 change any of this?
A fair question, since HTTP/2 no longer sends headers as text but compresses them with HPACK, and HTTP/3 uses QPACK.

They **do not** change this story. HPACK and QPACK compress **byte strings**; they do not redefine header values as Unicode text. The semantics still come from RFC 9110, and the obs-text constraint is unchanged.

Moving to HTTP/2 therefore does not fix the problem, and should not be expected to.

---

## Frequently asked questions

### Can HTTP headers contain Unicode characters?

In practice no, not if you want them to survive every layer. RFC 9110 defines header values as printable ASCII from 0x21 to 0x7E, plus the obs-text branch for bytes 0x80 to 0xFF. But obs-text is marked obsolete and the specification defines NO charset for interpreting those bytes, so two parties can decode them differently. The correct approach is to encode the data into ASCII using percent-encoding, RFC 8187 or Base64.

### What is obs-text in RFC 9110?

obs-text is the grammar branch allowing bytes from 0x80 to 0xFF to appear in a header value. The 'obs' stands for obsolete: it exists in the specification not to encourage use but to describe what already ended up on the Internet. The crucial point is that the specification never says which charset those bytes belong to, so being able to send them does not mean the other side will interpret them correctly.

### Why do some Vietnamese characters survive in a header while others do not?

Because Vietnamese straddles the Latin-1 boundary. The character í is U+00ED, inside the 0x00 to 0xFF range, so Latin-1 carries it in one byte. The character ồ is U+1ED3, far beyond 0xFF, so Latin-1 cannot represent it and typically substitutes a question mark. The result is that a system passing headers as Latin-1 appears to work for the name Hải and breaks on the name Hồ — the same code, only different data.

### Should I use percent-encoding, RFC 8187 or Base64 for headers?

Percent-encoding is a sensible default because the result stays readable in logs and both ends only need to agree on UTF-8; in .NET that is Uri.EscapeDataString and Uri.UnescapeDataString. RFC 8187 is better when you define a new header for several consumers, because the UTF-8''... syntax declares the charset so the receiver never has to guess — this is exactly how filename* in Content-Disposition works. Base64 suits binary data or a single uniform rule, at the cost of unreadable logs and roughly a third more size.

### Does switching to HTTP/2 or HTTP/3 fix non-ASCII header errors?

No. HTTP/2 compresses headers with HPACK and HTTP/3 uses QPACK, but both compress byte strings rather than redefining header values as Unicode text. The semantics still come from RFC 9110 and the obs-text constraint is unchanged, so upgrading the protocol version does not address the encoding problem.

### Why does .NET throw instead of just sending the non-ASCII bytes?

Because both alternatives lead to silent data corruption. If .NET wrote Latin-1, characters such as ồ would turn into question marks with nobody noticing. If it wrote UTF-8, the receiver might decode it as Latin-1 and get mojibake. Throwing HttpRequestException at send time is the louder choice but the more honest one: you find out immediately, instead of discovering corrupted data weeks later in a report.

## Conclusion
"Can an HTTP header carry Vietnamese" sounds like a question about a technical limit, but it is really a question about **the contract between two parties**.

The bytes can be sent. What is missing is an agreement about what those bytes mean. The specification deliberately does not supply that agreement, and every remedy — percent-encoding, RFC 8187, Base64 — is you building the agreement yourself and placing it inside the ASCII range that both sides definitely read the same way.

Read on: [the production incident that led here](https://tiennhm.io.vn/blog/cloudflare-header-broke-dotnet-httpclient), and [how to forward headers safely in ASP.NET Core](https://tiennhm.io.vn/blog/forward-http-header-an-toan-aspnet-core).

---

**Last updated**: September 2026
