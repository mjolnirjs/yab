import 'whatwg-fetch';

import { createFetch } from '../../src/core/fetch';

test('middleware: json', async () => {
  window.fetch = jest.fn(() =>
    Promise.resolve(new Response('{"data":"data"}'))
  );

  const fetcher = createFetch();

  const result: number[] = [];

  fetcher.use(async (context, next) => {
    result.push(1);
    await next();
    result.push(2);
  });

  fetcher.use(async (context, next) => {
    result.push(3);
    await next();
    result.push(4);
  });

  fetcher.use(async (context, next) => {
    result.push(5);
    await next();
    result.push(6);
  });

  await fetcher('github.com');

  expect(result).toEqual([1, 3, 5, 6, 4, 2]);
});
