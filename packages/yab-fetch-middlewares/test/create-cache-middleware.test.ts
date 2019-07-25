import 'fake-indexeddb/auto';
import 'whatwg-fetch';
import { IYabFetchContext } from 'yab-fetch';
import createIDBStore, { IDBCacheStorage } from '../src/cache/idb';
import { createCacheMiddleware } from '../src/index';
import { promisifyRequest } from '../src/cache/utils';

describe('IDB Store', () => {
  let idbStore: IDBCacheStorage;

  beforeEach(() => {
    idbStore = createIDBStore();
  });

  afterEach(() => {
    idbStore.request.result.close();
  });

  test('init IDB correctly', async () => {
    await idbStore.init();
    const db = idbStore.request.result;

    expect(db.name).toBe('YabDB');
    expect(db.objectStoreNames.contains('IDBCache')).toBeTruthy();
  });

  test('set data correctly', async () => {
    const url = '/github';
    const data = { id: 1, username: 'yabfetch' };
    await idbStore.set(url, data);

    const getRequest = idbStore.request.result
      .transaction('IDBCache')
      .objectStore('IDBCache')
      .get('/github');
    const result = await promisifyRequest(getRequest);

    expect(result).toMatchObject({ url, data });
  });

  test('get data correctly', async () => {
    const url = '/github';
    const data = { id: 2, username: 'yabfetch' };
    await idbStore.set(url, data);
    const result = await idbStore.get(url);

    expect(result).toMatchObject({ url, data });
  });
});

describe('Cache Middleware', () => {
  const url = '/github';
  const data = { id: 1, username: 'yabfetch' };
  let idbStore: IDBCacheStorage;

  beforeAll(async () => {
    idbStore = createIDBStore();
  });

  beforeEach(async () => {
    await idbStore.init();
    await idbStore.set(url, data);
  });

  afterAll(async () => {
    idbStore.request.result.close();
  });

  test('strategy: always, get data from cache directly', async () => {
    const cacheMiddleware = createCacheMiddleware({ strategy: 'always' });
    const fakeNext = jest.fn();
    const fakeCtx: IYabFetchContext = {
      yabRequestInit: { url, contentType: 'json' },
      response: new Response(),
      error: undefined
    };

    await cacheMiddleware(fakeCtx, fakeNext);

    expect(fakeCtx.json).toMatchObject(data);
    expect(fakeNext.mock.calls.length).toBe(0);
  });

  test('strategy: fallback, set cache after fetch', async () => {
    const cacheMiddleware = createCacheMiddleware({ strategy: 'fallback' });
    const fakeNext = jest.fn();
    const fakeCtx: IYabFetchContext = {
      yabRequestInit: { url, contentType: 'json' },
      response: new Response('{"id":"3"}'),
      json: { id: 3 },
      error: undefined
    };

    await cacheMiddleware(fakeCtx, fakeNext);

    await idbStore.init();
    const cache = await idbStore.get(url);
    expect(cache.data).toMatchObject({ id: 3 });
    expect(fakeNext.mock.calls.length).toBe(1);
  });

  test('strategy: fallback, get data from cache if fetch failed', async () => {
    const cacheMiddleware = createCacheMiddleware({ strategy: 'fallback' });
    const fakeNext = jest.fn(() => {
      throw new Error('fetch error');
    });
    const fakeCtx: IYabFetchContext = {
      yabRequestInit: { url, contentType: 'json' },
      response: new Response(),
      error: undefined
    };

    await cacheMiddleware(fakeCtx, fakeNext);

    expect(fakeCtx.json).toMatchObject(data);
    expect(fakeNext.mock.calls.length).toBe(1);
  });

  test('strategy: fallback, throw error if fetch failed and no cache data exist', async () => {
    const cacheMiddleware = createCacheMiddleware({ strategy: 'fallback' });
    const fakeError = new Error('fetch error');
    const fakeNext = jest.fn(() => {
      throw fakeError;
    });
    const fakeCtx: IYabFetchContext = {
      yabRequestInit: { url: '/react', contentType: 'json' },
      response: new Response(),
      error: undefined
    };

    let error;
    try {
      await cacheMiddleware(fakeCtx, fakeNext);
    } catch (e) {
      error = e;
    }

    expect(error).toBe(fakeError);
    expect(fakeNext.mock.calls.length).toBe(1);
  });
});
