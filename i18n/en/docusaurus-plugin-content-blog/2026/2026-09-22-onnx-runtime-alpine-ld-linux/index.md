---
title: "ONNX Runtime Dies on Alpine: the ld-linux-x86-64.so.2 Error and Why libc6-compat Won't Save You"
slug: onnx-runtime-alpine-ld-linux-x86-64-so-2
description: "The Node.js container builds, starts, and then dies the moment it loads the model: Error loading shared library ld-linux-x86-64.so.2. This post dissects the cause with readelf against onnxruntime-node's own binary, proves that libc6-compat and gcompat merely move the error elsewhere, and compares four ways out along with what each really costs."
keywords: [ld-linux-x86-64.so.2, onnxruntime alpine, onnxruntime-node alpine, error loading shared library, musl vs glibc, alpine musl libc, libc6-compat, gcompat alpine, __vsnprintf_chk symbol not found, error relocating, native module alpine, docker node alpine, node bookworm-slim, transformers.js docker, huggingface transformers node, dt_needed readelf, prebuilt binary glibc, docker image size tradeoff, alpine linux docker, onnx runtime docker, node native addon musl, choosing a node base image]
tags: [docker, alpine, onnx, nodejs, linux, devops, troubleshooting]
authors: [tiennhm]
date: 2026-09-22
---

import { SummaryBox, FAQSection, Checklist } from '@site/src/components/SEO';

# ONNX Runtime dies on Alpine: the `ld-linux-x86-64.so.2` error

<SummaryBox>
`onnxruntime-node` ships prebuilt binaries built against glibc, and `libonnxruntime.so.1` carries a `DT_NEEDED` entry pointing directly at `ld-linux-x86-64.so.2` — glibc's own dynamic loader. Alpine uses musl, where that file does not exist, so `dlopen` fails at the library-loading step. Installing `libc6-compat` or `gcompat` **does not fix it**: they provide the loader file so you clear the first error, then die on the second one, `__vsnprintf_chk: symbol not found`. The practical answer is to change the base image to `node:22-bookworm-slim`, paying about 89 MB more for something that actually runs.
</SummaryBox>

At 21:30 I added a `Dockerfile` for ClubDay — an event web app whose drawing game is scored by an ONNX model running on the server itself. The base image was reflex: `node:22-alpine`, because it is small.

The image built cleanly. The container came up. `docker ps` was green. Then, at the moment the server loaded the model, everything collapsed with an error line that never mentions ONNX:

```
Error loading shared library ld-linux-x86-64.so.2: No such file or directory
(needed by /app/node_modules/onnxruntime-node/bin/napi-v6/linux/x64/libonnxruntime.so.1)
```

At 21:44 I changed one line in the `Dockerfile` and everything worked. But the fourteen minutes in between are worth writing down, because that error line names a file you never installed, never declared in `package.json`, and which is simply always there on your development machine.

<!-- truncate -->

## TL;DR {#tldr}

- **Symptom**: the build succeeds, the container runs, it dies while loading a native module.
- **Cause**: `libonnxruntime.so.1` has `DT_NEEDED: ld-linux-x86-64.so.2` — glibc's loader. Alpine uses musl (`ld-musl-x86_64.so.1`), which has no such file.
- **`libc6-compat` / `gcompat` do not fix it**: you clear the loading error and die on `Error relocating ...: __vsnprintf_chk: symbol not found`.
- **The fix**: change `node:22-alpine` → `node:22-bookworm-slim`. One line.
- **The price**: image goes from 238 MB to 327 MB, about 89 MB more.
- **Check before choosing a base image**: `readelf -d <file>.so | grep NEEDED`.

---

## What the real error looks like {#loi-that}

You do not need to rebuild the whole project to see it. Just mount the existing `onnxruntime-node` directory into an Alpine container and `dlopen` the binding file directly:

```bash
docker run --rm -v "$PWD/node_modules/onnxruntime-node:/ort:ro" node:22-alpine \
  node -e "process.dlopen({exports:{}}, '/ort/bin/napi-v6/linux/x64/onnxruntime_binding.node')"
```

The result, on `onnxruntime-node` 1.24.3:

```
Error loading shared library ld-linux-x86-64.so.2: No such file or directory
(needed by /ort/bin/napi-v6/linux/x64/libonnxruntime.so.1)
```

Two details in that line are worth noticing.

First, **the missing thing is not an ordinary library but the dynamic loader**. `ld-linux-x86-64.so.2` is the program the kernel invokes to load every other library of a glibc binary. Without it, nothing can be loaded at all.

Second, **the culprit is not the file you called**. You loaded `onnxruntime_binding.node` (376 KB), but the file that fails is `libonnxruntime.so.1` (34 MB) — the thing the binding pulls in. This is why searching by package name usually turns up nothing: the failure sits in a transitive dependency, two layers below your `package.json`.

In ClubDay that chain is `@huggingface/transformers` → `onnxruntime-node` → `libonnxruntime.so.1` → glibc. No line in `package.json` mentions ONNX, and none mentions glibc either.

---

## Why Alpine cannot run glibc binaries {#musl-vs-glibc}

Alpine does not use glibc; it uses **musl**, a different libc implementation and a far leaner one. This is not an old-versus-new version issue — they are two different things, right down to the filenames:

| | glibc (Debian, Ubuntu, RHEL) | musl (Alpine) |
|---|---|---|
| Dynamic loader | `/lib64/ld-linux-x86-64.so.2` | `/lib/ld-musl-x86_64.so.1` |
| C library | `libc.so.6` | `libc.musl-x86_64.so.1` |
| Runs prebuilt glibc binaries? | Yes | **No** |

Verified inside the `node:22-alpine` image itself:

```
/lib/libc.musl-x86_64.so.1
/lib/ld-musl-x86_64.so.1
(no ld-linux-x86-64.so.2)
```

Now look at the binary side. `readelf` shows what `libonnxruntime.so.1` requires:

```bash
readelf -d node_modules/onnxruntime-node/bin/napi-v6/linux/x64/libonnxruntime.so.1 | grep NEEDED
```

```
(NEEDED) Shared library: [libdl.so.2]
(NEEDED) Shared library: [librt.so.1]
(NEEDED) Shared library: [libpthread.so.0]
(NEEDED) Shared library: [libstdc++.so.6]
(NEEDED) Shared library: [libm.so.6]
(NEEDED) Shared library: [libgcc_s.so.1]
(NEEDED) Shared library: [libc.so.6]
(NEEDED) Shared library: [ld-linux-x86-64.so.2]      ← here
```

That last line is the crux, and it also explains why the error message names that exact file. `DT_NEEDED` is the list of libraries the loader must load. Here glibc's own loader is listed as if it were an ordinary library — so when musl reads that list, it goes looking for a file called `ld-linux-x86-64.so.2`, does not find it, and stops.

There is more. The binary also demands versioned glibc symbols:

```bash
readelf -V libonnxruntime.so.1 | grep -o "GLIBC_[0-9.]*" | sort -uV | tail -3
```

```
GLIBC_2.17
GLIBC_2.27
```

So even with a loader present, it would still need a libc providing exactly those versioned symbols. musl does not, because musl does not use glibc's symbol versioning scheme at all.

---

## Why `libc6-compat` and `gcompat` do not save you {#libc6-compat-khong-cuu-duoc}

The answer you meet most often when searching this error is "just install `libc6-compat`". I tried it, and here is the real result.

**After `apk add libc6-compat`**, the loader file appears:

```
-rwxr-xr-x 1 root root 22728 /lib/ld-linux-x86-64.so.2
```

The old error does disappear. It is replaced by a new one:

```
Error relocating /ort/bin/napi-v6/linux/x64/libonnxruntime.so.1:
__vsnprintf_chk: symbol not found
```

**Trying `gcompat` instead**, the more complete shim usually recommended over `libc6-compat`, gives **exactly the same result**: still `__vsnprintf_chk: symbol not found`.

The difference between the two messages tells the whole story:

| Stage | Message | Meaning |
|---|---|---|
| Loading libraries | `Error loading shared library` | The file was not found |
| Symbol resolution | `Error relocating` | The file was found, but a symbol inside is missing |

Moving from the first error to the second **is progress, not a fix**. The shim supplies the shell — a file with the right name — but it cannot supply glibc's entire API surface.

`__vsnprintf_chk` is not an arbitrary symbol either. It belongs to the family of `_chk` functions GCC emits when compiling with `_FORTIFY_SOURCE`, a glibc buffer-overflow mitigation. musl has no `_FORTIFY_SOURCE` of that kind, so it has no such symbols, and gcompat does not emulate them.

The important part: **`__vsnprintf_chk` is merely the first missing symbol**. Patch it and the next error appears at the next symbol. This is whack-a-mole, and the table is very large — `libonnxruntime.so.1` weighs 34 MB.

---

## Four ways out, and what each really costs {#cac-huong-xu-ly}

| Approach | Does it work | What it costs |
|---|---|---|
| **Change base image to a glibc one** | Yes | Image grows by ~89 MB |
| Install `libc6-compat` / `gcompat` | **No** | Wasted time; the error just moves |
| Build ONNX Runtime on musl yourself | In theory | A C++ toolchain, tens of minutes of build, maintenance forever |
| Switch to `onnxruntime-web` (WASM) | Yes | Slower than native, and the model-loading code changes |

For ClubDay the choice was not difficult. This is an app for a one-day event, running on exactly one machine, needing to score drawings in real time. Spending hours standing up a toolchain to build ONNX Runtime for musl in order to save 89 MB of image is a bad trade on every axis.

### The fix

**Before:**

```dockerfile
FROM node:22-alpine
```

**After:**

```dockerfile
FROM node:22-bookworm-slim
```

`node:22-bookworm-slim` ships glibc 2.36, comfortably above the `GLIBC_2.27` the binary demands. Run the original test again:

```bash
docker run --rm -v "$PWD/node_modules/onnxruntime-node:/ort:ro" node:22-bookworm-slim \
  node -e "process.dlopen({exports:{}}, '/ort/bin/napi-v6/linux/x64/onnxruntime_binding.node')"
```

No error. Nothing extra to install.

On size, the real figures:

| Image | Size |
|---|---|
| `node:22-alpine` | 238 MB |
| `node:22-bookworm-slim` | 327 MB |

An 89 MB difference. Worth noting that this gap is far smaller than the usual mental image of "Alpine is dramatically lighter", because most of the size is Node.js itself rather than the distro. And in this project `node_modules` alone runs to about 350 MB, most of it `onnxruntime-node` — so those 89 MB decide nothing.

---

## How to check before choosing a base image {#cach-tu-kiem-tra}

<Checklist
  title="A procedure for vetting native modules"
  items={[
    { text: "Find the binaries: find node_modules -name '*.node' -o -name '*.so*'" },
    { text: "See what they require: readelf -d path-to-file.so | grep NEEDED" },
    { text: "Seeing ld-linux-x86-64.so.2 or libc.so.6 means a glibc binary — Alpine will not run it" },
    { text: "Check whether the package ships a musl build: look at optionalDependencies" },
    { text: "Try dlopen inside a container before writing the whole Dockerfile", checked: true }
  ]}
/>

That last step saves the most time. Mounting an already-installed package directory into a container and calling `dlopen` takes seconds, whereas building a whole image only to discover it is broken costs minutes per attempt.

On checking for musl builds, there is a very clear comparison inside this project's own `package-lock.json`:

```
node_modules/@img/sharp-libvips-linuxmusl-x64      ← sharp DOES ship musl
node_modules/@img/sharp-linuxmusl-x64
```

`sharp` publishes separate binaries for musl, so it runs fine on Alpine. `onnxruntime-node` has an empty `optionalDependencies` and its `bin/napi-v6/linux/` contains only `x64` and `arm64`, both built for glibc. In other words, **"native module" is not a uniform category** — in the same image one package works and another does not, and the only way to know is to check each one.

---

## Why this error is hard to guess {#vi-sao-kho-doan}

Three characteristics make it cost more time than it should.

**The build still succeeds.** `npm ci` installs `onnxruntime-node` normally because the `.so` files download intact — they simply cannot run. No step of the build checks whether a binary can load against the current libc.

**The container still comes up.** The error only fires when code reaches the model-loading path. If that happens lazily, on the first request, `docker ps` stays green while the feature is already dead. This is the same family as what I wrote about [Server GC eating container RAM](/blog/dotnet-workstation-gc-giam-ram-container): every default is right for some situation, and a container is rarely that situation.

**The error message points at the wrong place.** It names a system file, not a package, and not the `Dockerfile` line that caused it. A first-time reader very reasonably goes looking for how to install `ld-linux-x86-64.so.2` — which is precisely the dead end that leads straight to `libc6-compat`.

---

<FAQSection
  title="Frequently asked questions"
  items={[
    {
      question: "What does 'Error loading shared library ld-linux-x86-64.so.2' mean?",
      answer: "It means a library compiled for glibc is running on a musl-based system, usually Alpine Linux. The file ld-linux-x86-64.so.2 is glibc's dynamic loader; musl uses ld-musl-x86_64.so.1, so that file does not exist. With onnxruntime-node, the file declaring that dependency is libonnxruntime.so.1, which you can verify with readelf -d libonnxruntime.so.1 | grep NEEDED."
    },
    {
      question: "Does installing libc6-compat on Alpine fix the ONNX Runtime error?",
      answer: "No. I tried both libc6-compat and gcompat against onnxruntime-node 1.24.3 and both failed the same way. They create the file /lib/ld-linux-x86-64.so.2 so the library-loading error disappears, but a new one immediately appears: Error relocating libonnxruntime.so.1: __vsnprintf_chk: symbol not found. That symbol belongs to glibc's _FORTIFY_SOURCE _chk family, which musl does not have, and it is only the first missing symbol in a 34 MB file."
    },
    {
      question: "Which base image should I use for a Node.js app with onnxruntime-node?",
      answer: "Use a glibc-based image such as node:22-bookworm-slim, which ships glibc 2.36, comfortably above the GLIBC_2.27 the binary requires. Nothing extra needs installing. The size difference against node:22-alpine is about 89 MB, 327 MB versus 238 MB, and that figure is usually far smaller than the node_modules of a project using ONNX in the first place."
    },
    {
      question: "Why does sharp work on Alpine when onnxruntime-node does not?",
      answer: "Because sharp publishes separate binaries for musl, visible as the @img/sharp-linuxmusl-x64 and @img/sharp-libvips-linuxmusl-x64 packages in package-lock.json. onnxruntime-node publishes no musl variant: its optionalDependencies is empty and bin/napi-v6/linux/ contains only x64 and arm64 built for glibc. In other words, whether a native module runs on Alpine depends on whether its publisher built for musl, not on some general property of native modules."
    },
    {
      question: "How do I check whether a native module will run on Alpine before building the image?",
      answer: "Run readelf -d on the .so or .node file and filter for NEEDED lines. Seeing ld-linux-x86-64.so.2 or libc.so.6 means it is a glibc binary and Alpine will not run it. An even faster check is to mount the installed package directory into an Alpine container and call process.dlopen on the .node file directly — that takes seconds, whereas building a whole image only to find it broken costs minutes per attempt."
    },
    {
      question: "Is there a way to genuinely run ONNX Runtime on Alpine?",
      answer: "There are two routes, both more expensive than changing the base image. One is building ONNX Runtime from source with a musl toolchain, which means standing up a C++ build environment and maintaining that build across every version bump. The other is switching to onnxruntime-web running on WASM, which does not depend on the system libc, at the cost of lower performance than native and changes to the model-loading code. If your only reason for choosing Alpine was image size, neither is worth it."
    }
  ]}
/>

## Conclusion {#ket-luan}

Alpine is small because it replaces glibc with musl, and that is a real trade rather than a free gift. With pure JavaScript you never see the cost. With a package that drags in 34 MB of C++ prebuilt against glibc, you pay it immediately.

Three things I took away:

1. **Read `DT_NEEDED` before choosing a base image.** One `readelf -d` takes a second and definitively answers the question that fourteen minutes of trial and error did not.
2. **`Error loading` and `Error relocating` are two different layers.** Moving from the first to the second means the shim did its job, and also means the shim is not enough. Do not mistake progress for a fix.
3. **Weigh image size with real numbers.** 89 MB sounds like a price until you put it next to the same project's 350 MB of `node_modules`.

The final fix was one line. What matters is not that line but knowing why it is right — otherwise the next native module will cost you the same fourteen minutes.

---

**Last updated**: September 2026
