import * as qs from 'qs';

import {
  YabRequestInit,
  RequestHeaders,
  ExecutableYabRequestInit
} from '../types/index';

export function combineURL(left: string, right: string) {
  return `${left.replace(/\/$/, '')}/${right.replace(/^\//, '')}`;
}

export function appendURLParams(url: string, paramString: string): string {
  return url + (url.includes('?') ? '&' : '?') + paramString;
}

export function isAbsoluteURL(url: string): boolean {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

export function createURL(
  init: Pick<ExecutableYabRequestInit, 'url' | 'baseURL' | 'params'>
): string {
  const fullURL =
    isAbsoluteURL(init.url) || init.baseURL == null
      ? init.url
      : combineURL(init.baseURL, init.url);

  return init.params == null
    ? fullURL
    : appendURLParams(fullURL, qs.stringify(init.params));
}

export function getYabRequestInit(
  ...sources: (Partial<YabRequestInit> | undefined)[]
): ExecutableYabRequestInit {
  let headers: RequestHeaders;

  sources.forEach((sourceItem): void => {
    if (sourceItem && sourceItem.headers) {
      headers = headers || {};
      Object.assign(headers, sourceItem.headers);
    }
  });

  const init: ExecutableYabRequestInit = Object.assign({}, ...sources, {
    headers
  });

  const url = createURL(init);

  return { ...init, url };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isJSONObject(val: any) {
  return val !== null && typeof val === 'object';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isFormData(val: any) {
  return typeof FormData !== 'undefined' && val instanceof FormData;
}

export function getRequestInit(yabRequestInit: YabRequestInit): RequestInit {
  const requestInit: RequestInit = {};

  const { data } = yabRequestInit;

  if (data != null) {
    // TODO: handle all request body types
    if (isFormData(data)) {
      requestInit.body = data;
    } else if (isJSONObject(data)) {
      requestInit.body = JSON.stringify(data);
    }
  }

  ([
    'cache',
    'credentials',
    'headers',
    'integrity',
    'keepalive',
    'method',
    'mode',
    'redirect',
    'referrer',
    'referrerPolicy',
    'signal',
    'window',
    'body'
  ] as (keyof RequestInit)[]).forEach((nativeRequestInitKey) => {
    if (yabRequestInit[nativeRequestInitKey]) {
      requestInit[nativeRequestInitKey] = yabRequestInit[nativeRequestInitKey];
    }
  });

  return requestInit;
}
