import 'whatwg-fetch';

import { createYab } from '../../src/core/fetch';

test('fetch TypeError', async () => {
  window.fetch = jest.fn(() =>
    Promise.reject(new Error('TypeError: failed to fetch'))
  );

  const fetcher = createYab();

  try {
    await fetcher.get('github.com');
  } catch (error) {
    expect(error.message).toEqual('TypeError: failed to fetch');
    expect(error.response).toEqual(undefined);
    expect(error.yabRequestInit.url).toEqual('github.com');
  }
});

test('fetch onError TypeError', async () => {
  const error = new Error('TypeError: failed to fetch');

  window.fetch = jest.fn(() => Promise.reject(error));

  const onError = jest.fn();

  const fetcher = createYab({
    onError
  });

  try {
    await fetcher.get('github.com');
  } catch (err) {
    // Ignore
  }

  expect(onError).toBeCalledWith(error);
});

test('fetch status 200', async () => {
  window.fetch = jest.fn(() =>
    Promise.resolve(new Response('{}', { status: 200 }))
  );

  const fetcher = createYab();

  const result = await fetcher.get('github.com');

  expect(result).toBeDefined();
});

test('fetch status 301', async () => {
  window.fetch = jest.fn(() =>
    Promise.resolve(new Response('', { status: 301 }))
  );

  const fetcher = createYab();

  try {
    await fetcher.get('github.com');
  } catch (error) {
    expect(error.message).toEqual('Request failed with status code 301');
    expect(error.yabRequestInit.url).toEqual('github.com');
  }
});
