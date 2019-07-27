import {
  appendURLParams,
  createURL,
  isAbsoluteURL,
  getYabRequestInit,
  isJSONObject,
  isFormData,
  getRequestInit,
  combineURL
} from '../../src/utils/index';

test('appendURLParams', () => {
  expect(appendURLParams('aaa.com', 'a=1')).toEqual('aaa.com?a=1');
  expect(appendURLParams('aaa.com?', 'a=1')).toEqual('aaa.com?&a=1');
  expect(appendURLParams('aaa.com?a=1', 'b=1')).toEqual('aaa.com?a=1&b=1');
  expect(appendURLParams('aaa.com?a=1', 'b=1&c=1')).toEqual(
    'aaa.com?a=1&b=1&c=1'
  );
});

test('combineURL', () => {
  expect(combineURL('', '')).toEqual('/');
  expect(combineURL('/', '/')).toEqual('/');
  expect(combineURL('aaa.com/', '/bbb')).toEqual('aaa.com/bbb');
  expect(combineURL('aaa.com', '/bbb')).toEqual('aaa.com/bbb');
  expect(combineURL('aaa.com/', 'bbb')).toEqual('aaa.com/bbb');
  expect(combineURL('aaa.com', 'bbb')).toEqual('aaa.com/bbb');
});

test('createURL', () => {
  expect(createURL({ url: 'aaa.com' })).toEqual('aaa.com');
  expect(createURL({ url: 'aaa.com', params: { a: '1' } })).toEqual(
    'aaa.com?a=1'
  );
  expect(createURL({ url: 'aaa.com?a=1', params: { b: '1' } })).toEqual(
    'aaa.com?a=1&b=1'
  );
  expect(
    createURL({ url: 'aaa?a=1', baseURL: 'bbb.com', params: { b: '1' } })
  ).toEqual('bbb.com/aaa?a=1&b=1');
});

test('isAbsoluteURL', () => {
  expect(isAbsoluteURL('http://aaa.com')).toEqual(true);
  expect(isAbsoluteURL('https://aaa.com')).toEqual(true);

  expect(isAbsoluteURL('aaa.com')).toEqual(false);
  expect(isAbsoluteURL('/aaa')).toEqual(false);
});

test('isJSONObject', () => {
  expect(isJSONObject({})).toEqual(true);
  expect(isJSONObject([])).toEqual(true);

  expect(isJSONObject(1)).toEqual(false);
  expect(isJSONObject('1')).toEqual(false);
  expect(isJSONObject(null)).toEqual(false);
});

test('getYabRequestInit', () => {
  expect(
    getYabRequestInit(
      { url: 'aaa.com', headers: { a: '1' }, params: { a: '1' } },
      { url: 'bbb.com', headers: { b: '1' }, params: { b: '1' } }
    )
  ).toEqual({
    // TODO: need to change the name `url`?
    url: 'bbb.com?b=1',
    params: {
      b: '1'
    },
    headers: {
      a: '1',
      b: '1'
    }
  });
});

test('isFormData', () => {
  expect(isFormData(new FormData())).toEqual(true);

  expect(isFormData(null)).toEqual(false);
  expect(isFormData({})).toEqual(false);
});

test('getRequestInit', () => {
  expect(getRequestInit({})).toEqual({});

  expect(
    getRequestInit({
      cache: 'default',
      a: null
    } as any)
  ).toEqual({
    cache: 'default'
  });

  expect(
    getRequestInit({
      data: {}
    }).body
  ).toEqual('{}');

  expect(
    getRequestInit({
      data: { a: 1 }
    }).body
  ).toEqual('{"a":1}');

  expect(
    getRequestInit({
      data: new FormData()
    }).body
  ).toBeInstanceOf(FormData);
});
