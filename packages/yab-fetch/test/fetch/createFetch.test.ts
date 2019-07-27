import 'whatwg-fetch';

import { createFetch } from '../../src/core/fetch';

test('createFetch', async () => {
  window.fetch = jest.fn(() => Promise.resolve(new Response('{}')));

  const fetcher = createFetch();

  fetcher('github.com');

  expect(fetcher).toBeInstanceOf(Function);
  expect((window.fetch as any).mock.calls[0]).toEqual(['github.com', {}]);
});

test('all methods on fetcher', () => {
  window.fetch = jest.fn(() => Promise.resolve(new Response('{}')));

  const fetcher = createFetch();

  expect(fetcher).toBeInstanceOf(Function);
  expect(fetcher.get).toBeInstanceOf(Function);
  expect(fetcher.post).toBeInstanceOf(Function);
  expect(fetcher.delete).toBeInstanceOf(Function);
  expect(fetcher.put).toBeInstanceOf(Function);
  expect(fetcher.patch).toBeInstanceOf(Function);
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

test('fetcher.post', () => {
  window.fetch = jest.fn(() => Promise.resolve(new Response('{}')));

  const fetcher = createFetch();

  fetcher.post('github.com');

  expect(fetcher).toBeInstanceOf(Function);
  expect((window.fetch as any).mock.calls[0]).toEqual([
    'github.com',
    { method: 'post' }
  ]);
});
