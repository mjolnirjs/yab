import * as qs from 'qs';
import omit from 'lodash.omit';

import {
  YabRequestInit,
  RequestHeaders,
  ExcutableYabRequestInit
} from '../types/index';

export function appendURLParams(url: string, paramString: string): string {
  return url + (url.includes('?') ? '&' : '?') + paramString;
}

export function createURL(
  url: string,
  params?: Record<string, unknown>
): string {
  if (params == null) {
    return url;
  }

  return appendURLParams(url, qs.stringify(params));
}

export function isAbsoluteURL(url: string): boolean {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

export function getYabRequestInit(
  ...sources: (Partial<YabRequestInit> | undefined)[]
): ExcutableYabRequestInit {
  let headers: RequestHeaders;

  sources.forEach((sourceItem): void => {
    if (sourceItem && sourceItem.headers) {
      headers = headers || {};
      Object.assign(headers, sourceItem.headers);
    }
  });

  const init: ExcutableYabRequestInit = Object.assign({}, ...sources, {
    headers
  });

  const url = createURL(init.url, init.params);

  return { ...init, url };
}

export function getRequestInit(yabRequestInit: YabRequestInit): RequestInit {
  return omit(yabRequestInit, ['onError', 'url', 'resolveData']);
}
