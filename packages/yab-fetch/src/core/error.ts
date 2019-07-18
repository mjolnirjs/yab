import { YabFetchErrorOptions, YabFetchError } from '../types';

export function createError(options: YabFetchErrorOptions): YabFetchError {
  const error = (options.error ||
    new Error(options.errorMessage)) as YabFetchError;

  Object.assign(error, {
    yabRequestInit: options.yabRequestInit,
    requestInit: options.requestInit,
    response: options.response
  });

  return error;
}
