import { YabRequestInit } from '../types';

export function validateResponseStatus(status: Response['status']) {
  return status >= 200 && status < 300;
}

export const DEFAULT_INIT: YabRequestInit = {
  contentType: 'auto',

  validateResponseStatus
};
