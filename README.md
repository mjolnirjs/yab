<p align="center"><img width="300" src="resources/logo.png" alt="logo" /></p>
<div align="center">
<p>A simple fetch library.</p>
<a href="https://circleci.com/gh/mjolnirjs/yab/tree/master"><img src="https://circleci.com/gh/mjolnirjs/yab/tree/master.svg?style=shield&circle-token=0386ba2e8d3d98f85b0c5e61977a8ded9cf95332" /></a>
<a href="https://codecov.io/gh/mjolnirjs/yab"><img src="https://codecov.io/gh/mjolnirjs/yab/branch/master/graph/badge.svg?token=d1CXXZJLby" /></a>
</div>

---

## Introduction

Yab is a high-level HTTP client based on Fetch API and `koa-like` middlewares.

## Features

- **Middleware**: [koa](https://koajs.com/)-like middleware.
- **Fetch**: base on browser [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) API.
- **TypeScript**: Everything in Typescript.

## Browser Support

This library can only be used in modern browser environment. [Polyfill](https://github.com/github/fetch) may be needed.

## Install

### npm

`npm install yab-fetch`

### yarn

`yarn add yab-fetch`

### CDN

```html
<script src="https://unpkg.com/yab-fetch.min.js"></script>
```

## Useage

<details open>
<summary><b>Basic Usage</b></summary>

```ts
import { createFetch } from "yab-fetch";

const request = createFetch();
request.get("https://example.com");
```

</details>

<details open>
<summary><b>Middleware Usage</b></summary>

```ts
import { createFetch } from "yab-fetch";
import { createCache } from "yab-fetch-cache";

const request = createFetch();
request.use(createCache());

request.get("https://example.com");
```

</details>

## Documents

See full documents, please read [Yab-fetch](./packages/yab-fetch/README.md).

## Packages

This repository is a monorepo that we manage using Lerna. That means that we actually publish several packages to npm from the same codebase, including:

| Package                                                              | Version                                                                                                         | Description                                              |
| -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| [`yab-fetch`](/packages/yab-fetch)                                   | [![npm](https://img.shields.io/npm/v/yab-fetch.svg?style=flat-square)](https://www.npmjs.com/package/yab-fetch) | The fetch library.                                       |
| [`yab-fetch-cache`](/packages/yab-fetch-cache) | [![npm](https://img.shields.io/npm/v/yab-fetch-cache.svg?style=flat-square)](https://www.npmjs.com/package/yab-fetch-cache) | A yab middleware, focus on cache response using IndexDB. |

## Changelog

Detailed changes for each release are documented in [CHANGELOG.md](./CHANGELOG.md).

## Contributors

Thanks goes to the wonderful people.

## License

[MIT](http://opensource.org/licenses/MIT)
