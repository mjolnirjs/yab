import {
  YabRequestInit,
  YabFetcher,
  MethodType,
  CreateYabRequestInit
} from './types/index';
import { getYabRequestInit, getRequestInit } from './utils/index';

function defaultErrorHandler(err: Error): Error {
  // eslint-disable-next-line no-console
  console.error(`Error in yab-fetch`, err);
  throw err;
}

export function createFetch<TResponseType>(
  requestInit: CreateYabRequestInit
): YabFetcher<TResponseType> {
  const browserFetch = window.fetch;

  const currentFetch = ((url: string, directOptions?: YabRequestInit) => {
    const yabRequestInit = getYabRequestInit(
      {
        onError: defaultErrorHandler
      },
      requestInit,
      directOptions,
      { url }
    );

    return browserFetch(
      yabRequestInit.url,
      getRequestInit(yabRequestInit)
    ).then(yabRequestInit.resolveData, yabRequestInit.onError);
  }) as YabFetcher<TResponseType>;

  (['get', 'delete'] as MethodType[]).forEach((method) => {
    currentFetch[method] = (url: string, yabInit?: YabRequestInit) =>
      currentFetch(url, { method, ...yabInit });
  });

  (['post', 'put', 'patch'] as MethodType[]).forEach((method) => {
    currentFetch[method] = (
      url: string,
      data?: unknown,
      yabInit?: YabRequestInit
    ) => currentFetch(url, { method, data, ...yabInit });
  });

  return currentFetch;
}
