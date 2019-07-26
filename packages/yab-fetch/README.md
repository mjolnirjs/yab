# yab-fetch

A fetch library.

## Table of Content
- [Introduction](#introduction)
- [Features](#features)
- [Browser Support](#browser-support)
- [Install](#install)
- [Useage](#useage)
  - [Basic](#basic)
- [API](#api)
- [TypeScript](#typescript)
- [Liscense](#liscense)

## Introduction

## Features

- xxxx
- yyyy
- zzzz

## Browser Support
You will also need to provide your own polyfill for the fetch API if you're working in older browsers.

whatwg-fetch is recommended. so-fetch does not provide a fetch polyfill.

## Install
**npm**:
`npm install yab-fetch --save`

**yarn**:
`yarn add yab-fetch --save`

**CDN**:
```html
<script src="xxx"></script>
```

## Useage

### instance

### createFetch(url[, options])
options:

```js
{
  baseUrl: '', // base url
  data: {},
  use: [], // middlewares
}
```


### Instance methods

```ts
import { createFetch } from 'yab-fetch';
const instance = createFetch();

instance.get(url[, options]); // HTTP GET
instace.post(url[, options]); // HTTP POST
```

### Middleware
#### yab.use(middleware)
```ts
import { createFetch } from 'yab-fetch';
const instance = createFetch();

instance.use(async (ctx, next)=> {
  await next();
})
```

#### middleware function


## Type usage with TypeScript
This module is written in TypeScript and the types are published to npm;

## Liscense

[MIT](http://opensource.org/licenses/MIT)
