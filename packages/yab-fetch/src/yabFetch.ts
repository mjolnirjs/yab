import { YabRequestInit, YabFetcher } from './types/index';
import { getYabRequestIniit, createURL, getRequestInit } from './utils/index';

function defaultErrorHandler(err: Error): Error {
  // eslint-disable-next-line no-console
  console.error(`Error in yab-fetch`, err);
  throw err;
}

export function createFetch(requestInit?: YabRequestInit): YabFetcher {
  const browserFetch = window.fetch;

  const currentFetch: YabFetcher = (directURL, directOptions) => {
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
  };

  return currentFetch;
}
