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

If there is the first time you deploy the website, you need to update permissions for `Workflow permissions` in `Settings` tab of your repository. You must enable `Write` permission for `Workflows` section.

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

### Build Android
```ps
keytool -genkey -v -keystore TienNHM.keystore -alias TienNHM -keyalg RSA -keysize 2048 -validity 10000 -storetype pkcs12
```
