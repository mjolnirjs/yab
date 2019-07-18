import 'whatwg-fetch';

import { createFetch } from '../../src/core/fetch';

test('createFetch', async () => {
  window.fetch = jest.fn(() => Promise.resolve(new Response('{}')));

  const fetcher = createFetch();

  fetcher('github.com');

  expect(fetcher).toBeInstanceOf(Function);
  expect((window.fetch as any).mock.calls[0]).toEqual(['github.com', {}]);
});

test('fetcher.get', () => {
  window.fetch = jest.fn(() => Promise.resolve(new Response('{}')));

  const fetcher = createFetch();

  fetcher.get('github.com');

  expect(fetcher).toBeInstanceOf(Function);
  expect((window.fetch as any).mock.calls[0]).toEqual([
    'github.com',
    { method: 'get' }
  ]);
});

test('fetcher.delete', () => {
  window.fetch = jest.fn(() => Promise.resolve(new Response('{}')));

  const fetcher = createFetch();

  fetcher.delete('github.com');

  expect(fetcher).toBeInstanceOf(Function);
  expect((window.fetch as any).mock.calls[0]).toEqual([
    'github.com',
    { method: 'delete' }
  ]);
});
