// eslint-disable-next-line import/no-extraneous-dependencies
import { IYabFetchContext } from 'yab-fetch';
import { Logger } from './type';

export const logBeforeFetch = (logger: Logger, ctx: IYabFetchContext): void => {
  const {
    yabRequestInit,
    yabRequestInit: { url, method, data }
  } = ctx;
  logger.group('%cbefore fetch', 'color: #416eb6');
  logger.log('yabRequestInit:', yabRequestInit);
  logger.log('url:', url);
  logger.log('method:', method);
  if (method === 'post') logger.log('data:', data);
  logger.groupEnd();
};

export const logAfterFetch = (logger: Logger, ctx: IYabFetchContext): void => {
  const { response } = ctx;
  logger.group('%cafter fetch', 'color:#715ca8');
  logger.log('response:', response);
  logger.log('ctx:', ctx);
  logger.groupEnd();
};

export const logError = (logger: Logger, err: Error) => {
  logger.error(`Something wrong with fetch: ${err}`);
};
