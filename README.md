# Website

[![Deploy to GitHub Pages](https://github.com/TienNHM/tiennhm.github.io/actions/workflows/deploy.yml/badge.svg?branch=master)](https://github.com/TienNHM/tiennhm.github.io/actions/workflows/deploy.yml)

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Deploy chạy tự động qua GitHub Actions (`.github/workflows/deploy.yml`) mỗi khi push lên `master`.

Không deploy tay. Lệnh `docusaurus deploy` đã được gỡ khỏi `package.json` vì nó đẩy thẳng lên
`gh-pages`, ghi đè bản mà CI vừa build.

Lần đầu bật, vào `Settings` của repo, mục `Workflow permissions`, bật quyền `Write`.

### Kiểm tra trước khi push

```
$ npm run check              # cấu hình, tag redirect, cú pháp MDX
$ npm run check -- mdx       # chỉ một mục
```

Không cần build, chạy trong vài giây.

### Build Android
```ps
keytool -genkey -v -keystore TienNHM.keystore -alias TienNHM -keyalg RSA -keysize 2048 -validity 10000 -storetype pkcs12
```

### Contributors

<a href="https://github.com/TienNHM/TienNHM.github.io/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=TienNHM/TienNHM.github.io" />
</a>

## Giấy phép

Kho mã này dùng **hai giấy phép tách biệt**:

| Phần | Giấy phép | Phạm vi |
|---|---|---|
| Mã nguồn | [MIT](LICENSE) | `src/`, `plugins/`, `scripts/`, `config/`, tệp cấu hình |
| Nội dung | [Bảo lưu bản quyền](LICENSE-CONTENT) | `blog/`, `docs/`, `notes/`, `i18n/`, hình ảnh đi kèm |

GitHub chỉ hiển thị nhãn MIT vì nó đọc tệp `LICENSE`. Bài viết và giáo trình
**không** thuộc MIT — muốn đăng lại hãy đọc [LICENSE-CONTENT](LICENSE-CONTENT)
hoặc gửi email. Tôi đồng ý với hầu hết yêu cầu hợp lý.

## Đóng góp

Xem [CONTRIBUTING.md](.github/CONTRIBUTING.md). Loại đóng góp quý nhất là **chỉ
ra chỗ tôi viết sai**, kèm cách bạn đo.

Trước khi mở pull request, chạy `npm run check` — năm mục kiểm tra tĩnh, vài
giây, không cần build.
