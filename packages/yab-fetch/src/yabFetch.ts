import { YabRequestInit, YabFetcher, MethodType } from './types/index';
import { getYabRequestIniit, createURL, getRequestInit } from './utils/index';

function defaultErrorHandler(err: Error): Error {
  // eslint-disable-next-line no-console
  console.error(`Error in yab-fetch`, err);
  throw err;
}

export function createFetch(requestInit?: YabRequestInit): YabFetcher {
  const browserFetch = window.fetch;

  const currentFetch = ((directURL: string, directOptions?: YabRequestInit) => {
    const yabRequestInit = getYabRequestIniit(
      {
        onError: defaultErrorHandler
      },
      requestInit,
      directOptions
    );

    const url = createURL(directURL, yabRequestInit.params);

    return browserFetch(url, getRequestInit(yabRequestInit)).catch(
      defaultErrorHandler
    );
  }) as YabFetcher;

  (['get', 'delete'] as MethodType[]).forEach((method) => {
    currentFetch[method] = (url: string, yabInit?: YabRequestInit) =>
      currentFetch(url, getYabRequestIniit({ method }, yabInit));
  });

  (['post', 'put', 'patch'] as MethodType[]).forEach((method) => {
    currentFetch[method] = (
      url: string,
      data?: unknown,
      yabInit?: YabRequestInit
    ) => currentFetch(url, getYabRequestIniit({ method, data }, yabInit));
  });

  return currentFetch;
}
