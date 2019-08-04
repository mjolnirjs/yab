import 'whatwg-fetch';

import { createYab } from '../../src/core/fetch';

test('createFetch return a fetcher contain all request methods', () => {
  window.fetch = jest.fn(() => Promise.resolve(new Response('{}')));

  const fetcher = createYab();

  expect(fetcher.get).toBeInstanceOf(Function);
  expect(fetcher.post).toBeInstanceOf(Function);
  expect(fetcher.delete).toBeInstanceOf(Function);
  expect(fetcher.put).toBeInstanceOf(Function);
  expect(fetcher.patch).toBeInstanceOf(Function);

  expect(fetcher.use).toBeInstanceOf(Function);
});

test('createFetch return a fetcher contain `fetch` method', async () => {
  window.fetch = jest.fn(() => Promise.resolve(new Response('{}')));

  const yab = createYab();

  yab.fetch('github.com');

  expect(yab.get).toBeInstanceOf(Function);
  expect((window.fetch as any).mock.calls[0]).toEqual(['github.com', {}]);
});

test('fetcher.get', () => {
  window.fetch = jest.fn(() => Promise.resolve(new Response('{}')));

  const fetcher = createYab();

  fetcher.get('github.com');

  expect((window.fetch as any).mock.calls[0]).toEqual([
    'github.com',
    { method: 'get' }
  ]);
});

test('fetcher.delete', () => {
  window.fetch = jest.fn(() => Promise.resolve(new Response('{}')));

  const fetcher = createYab();

  fetcher.delete('github.com');

  expect((window.fetch as any).mock.calls[0]).toEqual([
    'github.com',
    { method: 'delete' }
  ]);
});

test('fetcher.post', () => {
  window.fetch = jest.fn(() => Promise.resolve(new Response('{}')));

  const fetcher = createYab();

  fetcher.post('github.com');

  expect((window.fetch as any).mock.calls[0]).toEqual([
    'github.com',
    { method: 'post' }
  ]);
});
