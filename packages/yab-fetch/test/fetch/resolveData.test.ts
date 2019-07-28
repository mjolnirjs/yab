import 'whatwg-fetch';

import { createFetch } from '../../src/core/fetch';
import { IYabFetchContext, YabRequestInit } from '../../src/types';

test('auto json resolveData', async () => {
  window.fetch = jest.fn(() =>
    Promise.resolve(new Response('{"data":"data"}'))
  );

  const fetcher = createFetch<{ data: string }>({
    resolveData: async (context: IYabFetchContext) => {
      return context.json;
    }
  });

  const result = await fetcher('github.com');

  expect(fetcher).toBeInstanceOf(Function);
  expect(result).toEqual({ data: 'data' });
});

test('responseType json', async () => {
  window.fetch = jest.fn(() =>
    Promise.resolve(new Response('{"data":"data"}'))
  );

  const fetcher = createFetch<{ data: string }>({
    responseType: 'json'
  });

  const result = await fetcher('github.com');

  expect(fetcher).toBeInstanceOf(Function);
  expect(result).toEqual({ data: 'data' });
});

test('responseType text', async () => {
  window.fetch = jest.fn(() =>
    Promise.resolve(new Response('{"data":"data"}'))
  );

  const fetcher = createFetch<string>({
    responseType: 'text'
  });

  const result = await fetcher('github.com');

  expect(fetcher).toBeInstanceOf(Function);
  expect(result).toEqual('{"data":"data"}');
});

test('responseType blob', async () => {
  window.fetch = jest.fn(() =>
    Promise.resolve(new Response('{"data":"data"}'))
  );

  const fetcher = createFetch<string>({
    responseType: 'blob'
  });

  const result = await fetcher('github.com');

  expect(fetcher).toBeInstanceOf(Function);
  expect(result).toBeInstanceOf(Blob);
});

test('responseType arrayBuffer', async () => {
  window.fetch = jest.fn(() =>
    Promise.resolve(new Response('{"data":"data"}'))
  );

  const fetcher = createFetch<string>({
    responseType: 'arrayBuffer'
  });

  const result = await fetcher('github.com');

  expect(fetcher).toBeInstanceOf(Function);
  expect(result).toBeInstanceOf(ArrayBuffer);
});

test('responseType formData', async () => {
  window.fetch = jest.fn(() =>
    Promise.resolve(new Response('{"data":"data"}'))
  );

  const fetcher = createFetch<string>({
    responseType: 'formData'
  });

  const result = await fetcher('github.com');

  expect(fetcher).toBeInstanceOf(Function);
  expect(result).toBeInstanceOf(FormData);
});

test('responseType text', async () => {
  window.fetch = jest.fn(() =>
    Promise.resolve(new Response('{"data":"data"}'))
  );

  const fetcher = createFetch<string>({
    responseType: 'text'
  });

  const result = await fetcher('github.com');

  expect(fetcher).toBeInstanceOf(Function);
  expect(result).toEqual('{"data":"data"}');
});

test('custom text resolveData', async () => {
  window.fetch = jest.fn(() =>
    Promise.resolve(new Response('{"data":"data"}'))
  );

  const fetcher = createFetch<string>({
    responseType: 'text',
    resolveData: async (context: IYabFetchContext) => {
      return context.text as string;
    }
  });

  const result = await fetcher('github.com');

  expect(fetcher).toBeInstanceOf(Function);
  expect(result).toEqual('{"data":"data"}');
});

test('custom before & after', async () => {
  window.fetch = jest.fn(() =>
    Promise.resolve(new Response('{"data":"data"}'))
  );

  const fetcher = createFetch({
    before: (init: YabRequestInit) => {
      return {
        ...init,
        cache: 'force-cache'
      };
    },
    after: () => {
      return new Response('{"data":1}');
    }
  });

  const result = await fetcher.post('github.com');

  expect((window.fetch as any).mock.calls[0]).toEqual([
    'github.com',
    { method: 'post', cache: 'force-cache' }
  ]);
  expect(result.json).toEqual({ data: 1 });
});

test('custom json resolveData', async () => {
  window.fetch = jest.fn(() =>
    Promise.resolve(new Response('{"data":"data"}'))
  );

  const fetcher = createFetch<{ data: string }>({
    resolveData: async (context: IYabFetchContext) => {
      const json = await context.response.json();
      return json;
    }
  });

  const result = await fetcher('github.com');

  expect(fetcher).toBeInstanceOf(Function);
  expect(result).toEqual({ data: 'data' });
});

test('custom json resolveData with type inference', async () => {
  window.fetch = jest.fn(() => Promise.resolve(new Response('{"a":1}')));

  const fetcher = createFetch({
    resolveData: async (context: IYabFetchContext) => {
      const data = await context.response.json();
      return { data };
    }
  });

  const result = await fetcher('github.com');

  expect(fetcher).toBeInstanceOf(Function);
  expect(result.data).toEqual({ a: 1 });
});
