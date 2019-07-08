import 'whatwg-fetch';

import { createFetch } from '../src/yabFetch';

test('createFetch', async () => {
  window.fetch = jest.fn(() =>
    Promise.resolve(new Response('{"data":"data"}'))
  );

  const fetcher = createFetch<{ data: string }>({
    resolveData: (response: Response) => response.json()
  });

  const result = await fetcher('github.com');

  expect(fetcher).toBeInstanceOf(Function);
  expect((window.fetch as any).mock.calls[0]).toEqual(['github.com', {}]);
  expect(result).toEqual({ data: 'data' });
});

test('fetcher.get', () => {
  window.fetch = jest.fn(() => Promise.resolve(new Response()));

  const fetcher = createFetch({
    resolveData: (response: Response) => response.json()
  });

  fetcher.get('github.com');

  expect(fetcher).toBeInstanceOf(Function);
  expect((window.fetch as any).mock.calls[0]).toEqual([
    'github.com',
    { method: 'get' }
  ]);
});

test('fetcher.delete', () => {
  window.fetch = jest.fn(() => Promise.resolve(new Response('{}')));

  const fetcher = createFetch({
    resolveData: (response: Response) => response.json()
  });

  fetcher.delete('github.com');

  expect(fetcher).toBeInstanceOf(Function);
  expect((window.fetch as any).mock.calls[0]).toEqual([
    'github.com',
    { method: 'delete' }
  ]);
});
