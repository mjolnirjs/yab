# yab-fetch-logger

## Install

`npm i yab-fetch-logger`

## Useage
> **must be the last middleware in chain.**


```ts
import { createFetch } from 'yab-fetch';
import { createLogger } from 'yab-fetch-logger';

const logger = createLogger({
  // options
});

const request = createFetch({
  middleware: [logger],
});
```

## Example

![example](assets/log-example.png)
