import 'whatwg-fetch';

import { createFetch } from '../src/yabFetch';

test('createFetch', () => {
  window.fetch = jest.fn(() => Promise.resolve(new Response()));

  const fetcher = createFetch();

  fetcher('github.com');

  expect(fetcher).toBeInstanceOf(Function);
  expect((window.fetch as any).mock.calls[0]).toEqual(['github.com', {}]);
});
