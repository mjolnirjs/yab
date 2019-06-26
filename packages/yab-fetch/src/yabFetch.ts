import { RequestOptions } from './types/index';
import { mergeRequestOptions, createURL } from './utils/index';

function defaultErrorHandler(err: Error): Error {
  // eslint-disable-next-line no-console
  console.error(`Error in yab-fetch`, err);
  throw err;
}

export function createFetch(
  requestOptions?: RequestOptions
): (url: string, fetchOptions?: RequestOptions) => Promise<unknown> {
  const browserFetch = window.fetch;

  function currentFetch(
    directURL: string,
    directOptions?: RequestOptions
  ): Promise<unknown> {
    const actualOptions = mergeRequestOptions(
      {
        onError: defaultErrorHandler
      },
      requestOptions,
      directOptions
    );

    const url = createURL(directURL, actualOptions.params);

    // TODO: Pick all valid options
    const rawOptions = {
      ...actualOptions
    };
    delete rawOptions.onError;

    return browserFetch(url, rawOptions).catch(defaultErrorHandler);
  }

  return currentFetch;
}
