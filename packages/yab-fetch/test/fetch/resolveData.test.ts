import 'whatwg-fetch';

import { createYab } from '../../src/core/fetch';
import { IYabFetchContext, YabRequestInit } from '../../src/types';

test('auto json resolveData', async () => {
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

test('responseType json', async () => {
  window.fetch = jest.fn(() =>
    Promise.resolve(new Response('{"data":"data"}'))
  );

  const fetcher = createYab({
    responseType: 'json'
  });

  const result = await fetcher.get('github.com');

  expect(result).toEqual({ data: 'data' });
});

test('responseType text', async () => {
  window.fetch = jest.fn(() =>
    Promise.resolve(new Response('{"data":"data"}'))
  );

  const fetcher = createYab({
    responseType: 'text'
  });

  const result = await fetcher.get('github.com');

  expect(result).toEqual('{"data":"data"}');
});

test('responseType blob', async () => {
  window.fetch = jest.fn(() =>
    Promise.resolve(new Response('{"data":"data"}'))
  );

  const fetcher = createYab({
    responseType: 'blob'
  });

  const result = await fetcher.get('github.com');

  expect(result).toBeInstanceOf(Blob);
});

test('responseType arrayBuffer', async () => {
  window.fetch = jest.fn(() =>
    Promise.resolve(new Response('{"data":"data"}'))
  );

  const fetcher = createYab({
    responseType: 'arrayBuffer'
  });

  const result = await fetcher.get('github.com');

  expect(result).toBeInstanceOf(ArrayBuffer);
});

test('responseType formData', async () => {
  window.fetch = jest.fn(() =>
    Promise.resolve(new Response('{"data":"data"}'))
  );

  const fetcher = createYab({
    responseType: 'formData'
  });

  const result = await fetcher.get('github.com');

  expect(result).toBeInstanceOf(FormData);
});

test('responseType text', async () => {
  window.fetch = jest.fn(() =>
    Promise.resolve(new Response('{"data":"data"}'))
  );

  const fetcher = createYab({
    responseType: 'text'
  });

  const result = await fetcher.get('github.com');

  expect(result).toEqual('{"data":"data"}');
});

test('custom text resolveData', async () => {
  window.fetch = jest.fn(() =>
    Promise.resolve(new Response('{"data":"data"}'))
  );

  const fetcher = createYab({
    responseType: 'text',
    resolveData: async (context: IYabFetchContext) => {
      return context.text as string;
    }
  });

  const result = await fetcher.get('github.com');

  expect(result).toEqual('{"data":"data"}');
});

test('custom before & after', async () => {
  window.fetch = jest.fn(() =>
    Promise.resolve(new Response('{"data":"data"}'))
  );

  const fetcher = createYab({
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
  expect(result).toEqual({ data: 1 });
});

test('custom json resolveData', async () => {
  window.fetch = jest.fn(() =>
    Promise.resolve(new Response('{"data":"data"}'))
  );

  const fetcher = createYab({
    resolveData: async (context: IYabFetchContext) => {
      const json = await context.response.json();
      return json;
    }
  });

  const result = await fetcher.get('github.com');

  expect(result).toEqual({ data: 'data' });
});

test('custom json resolveData with type inference', async () => {
  window.fetch = jest.fn(() => Promise.resolve(new Response('{"a":1}')));

  const fetcher = createYab({
    resolveData: async (context: IYabFetchContext) => {
      const data = await context.response.json();
      return { data };
    }
  });

  const result = await fetcher.get<{ data: number }>('github.com');

  expect(result.data).toEqual({ a: 1 });
});
