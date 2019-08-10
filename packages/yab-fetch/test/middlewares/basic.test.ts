import 'whatwg-fetch';

import { createYab } from '../../src/core/fetch';
import { IYabFetchContext } from '../../src/types';

test('resolve: json', async () => {
  window.fetch = jest.fn(() =>
    Promise.resolve(new Response('{"data":"data"}'))
  );

  const fetcher = createYab({
    resolveData: async (context: IYabFetchContext) => {
      return context.json;
    }
  });

  const result = await fetcher.get('github.com');

  expect(result).toEqual({ data: 'data' });
});

test('get/set context inside middleware', async () => {
  window.fetch = jest.fn(() =>
    Promise.resolve(new Response('{"data":"data"}'))
  );

  const fetcher = createYab();

  fetcher.use(async (context, next) => {
    expect(context.yabRequestInit).toBeDefined();
    expect(context.yabRequestInit.url).toEqual('github.com');

    context.yabRequestInit = {
      ...context.yabRequestInit,
      responseType: 'json'
    };

    expect(context.yabRequestInit.responseType).toEqual('json');

    await next();

    expect(context.requestInit).toBeDefined();
    expect(context.requestInit.method).toEqual('get');
    expect(context.json).toEqual({ data: 'data' });

    context.success = true;
    expect(context.success).toEqual(true);
  });

  await fetcher.get('github.com');
});

test('requestInit is not ready exception', async () => {
  window.fetch = jest.fn(() =>
    Promise.resolve(new Response('{"data":"data"}'))
  );

  const fetcher = createYab({
    resolveData: async (context: IYabFetchContext) => {
      return context.json;
    }
  });

  fetcher.use(async (context, next) => {
    context.requestInit = context.requestInit;
    await next();
  });

  try {
    await fetcher.get('github.com');
  } catch (err) {
    expect(err.message).toEqual('RequestInit is not ready');
  }
});

test('ctx.throw', async () => {
  window.fetch = jest.fn(() =>
    Promise.resolve(new Response('{"data":"data"}'))
  );

  const fetcher = createYab({
    resolveData: async (context: IYabFetchContext) => {
      return context.json;
    }
  });

  fetcher.use(async (context, next) => {
    await next();
    context.throw('Middleware throw an error');
  });

  try {
    await fetcher.get('github.com');
  } catch (err) {
    expect(err.message).toEqual('Middleware throw an error');
  }
});

test('response is not ready exception', async () => {
  window.fetch = jest.fn(() =>
    Promise.resolve(new Response('{"data":"data"}'))
  );

  const fetcher = createYab({
    resolveData: async (context: IYabFetchContext) => {
      return context.json;
    }
  });

  fetcher.use(async (context, next) => {
    context.json = await context.response.json();
    await next();
  });

  try {
    await fetcher.get('github.com');
  } catch (err) {
    expect(err.message).toEqual('Response is not ready');
  }
});

test('middleware: json', async () => {
  window.fetch = jest.fn(() =>
    Promise.resolve(new Response('{"data":"data"}'))
  );

  const fetcher = createYab({
    resolveData: async (context: IYabFetchContext) => {
      return context.json;
    }
  });

  fetcher.use(async (context, next) => {
    await next();
    context.json = await context.response.json();
  });

  const result = await fetcher.get('github.com');

  expect(result).toEqual({ data: 'data' });
});

test('middleware: data', async () => {
  window.fetch = jest.fn(() =>
    Promise.resolve(new Response('{"data":"data"}'))
  );

  const fetcher = createYab({
    async resolveData(context: IYabFetchContext) {
      return context.data;
    }
  });

  fetcher.use(async (context, next) => {
    await next();
    const json = await context.response.json();
    context.data = json.data;
  });

  const result = await fetcher.get('github.com');

  expect(result).toEqual('data');
});
