// eslint-disable-next-line import/no-extraneous-dependencies
import { IYabFetchContext, YabFetchMiddleware } from 'yab-fetch';
import { CacheOptions, CacheStorage } from './types/index';
import createIDBCache from './idb';

async function setCtxFromCache(
  ctx: IYabFetchContext,
  cache: CacheStorage,
  key: string
): Promise<boolean> {
  const cacheData = await cache.get(key);

  if (cacheData) {
    ctx.json = cacheData.data;
  }

  return !!cacheData;
}

function createCacheMiddleware(options: CacheOptions = {}): YabFetchMiddleware {
  const { cache = createIDBCache(), strategy = 'fallback' } = options;

  return async (ctx: IYabFetchContext, next: () => Promise<unknown>) => {
    const { url } = ctx.yabRequestInit;

    // strategy: always, just set json from cache.
    if (strategy === 'always') {
      const result = await setCtxFromCache(ctx, cache, url);

      if (result) {
        return;
      }
    }

    try {
      await next();
    } catch (e) {
      // strategy: fallback, set json from cache.
      if (strategy === 'fallback') {
        const result = await setCtxFromCache(ctx, cache, url);

        if (result) {
          return;
        }
      }

      // otherwise, rethrow error
      throw e;
    }

    // update cache
    cache.set(url, ctx.json);
  };
}

export default createCacheMiddleware;
