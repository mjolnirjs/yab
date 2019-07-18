import 'whatwg-fetch';

import { createFetch } from '../../src/core/fetch';
import { IYabFetchContext } from '../../src/types';

test('simple resolveData', async () => {
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
  expect((window.fetch as any).mock.calls[0]).toEqual(['github.com', {}]);
  expect(result).toEqual({ data: 'data' });
});

test('resolveData with type inference', async () => {
  window.fetch = jest.fn(() => Promise.resolve(new Response('{"a":1}')));

  const fetcher = createFetch({
    resolveData: async (context: IYabFetchContext) => {
      const data = await context.response.json();
      return { data };
    }
  });

  const result = await fetcher('github.com');

  expect(fetcher).toBeInstanceOf(Function);
  expect((window.fetch as any).mock.calls[0]).toEqual(['github.com', {}]);
  expect(result.data).toEqual({ a: 1 });
});
