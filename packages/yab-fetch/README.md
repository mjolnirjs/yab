# yab-fetch

A fetch library.

## Table of Content

- [Features](#features)
- [Browser Support](#browser-support)
- [Install](#install)
  - [npm](#npm)
  - [yarn](#yarn)
  - [CDN](#cdn)
- [Useage](#useage)
  - [createYab(url[, options])](#createYaburl-options)
  - [Instance methods](#yab-methods)
  - [Middleware](#middleware)
    - [yab.use(middleware)](#yabusemiddleware)
    - [middleware function](#middleware-function)
- [Type usage with TypeScript](#type-usage-with-typescript)
- [Liscense](#liscense)

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

### createYab(url[, init])

init:

```js
{
  baseUrl: '', // base url
  data: {}, // post data
  use: [], // middlewares
  resolveData: (ctx) => {} // resolve data from ctx
  responseType: 'json'|'text'| 'arrayBuffer' | 'blob' // auto resolve
  before: (request) => {} // handle request before fetch
  after: (response) => {} // handle response after fetch
}
```

### Instance methods

```ts
import { createYab } from 'yab-fetch';
const yab = createYab();

yab.get(url[, init]);
yab.post(url[, init]);
// ...
```

### Middlewares

#### yab.use(middleware)

```ts
import { createYab } from 'yab-fetch';

const yab = createYab();

yab.use(async (ctx, next) => {
  await next();
});
```

#### middleware function

## Type usage with TypeScript

This module is written in TypeScript and the types are published to npm;

## Liscense

[MIT](http://opensource.org/licenses/MIT)
