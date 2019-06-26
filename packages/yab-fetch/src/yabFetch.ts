import { RequestOptions } from './types/index';
import { mergeRequestOptions, createURL } from './utils/index';

const browserFetch = window.fetch;

function defaultErrorHandler(err: Error): Error {
  // eslint-disable-next-line no-console
  console.error(`Error in yab-fetch`, err);
  throw err;
}

export function createFetch(
  requestOptions: RequestOptions
): (url: string, fetchOptions: RequestOptions) => Promise<unknown> {
  function currentFetch(
    directURL: string,
    directOptions: RequestOptions
  ): Promise<unknown> {
    const actualOptions = mergeRequestOptions(
      {
        onError: defaultErrorHandler
      },
      requestOptions,
      directOptions
    );

    const url = createURL(directURL, actualOptions.params);

    return browserFetch(url, actualOptions).catch(defaultErrorHandler);
  }

  return currentFetch;
}
