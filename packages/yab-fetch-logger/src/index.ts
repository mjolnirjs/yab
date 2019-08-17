// eslint-disable-next-line import/no-extraneous-dependencies
import { IYabFetchContext, YabFetchMiddleware } from 'yab-fetch';
import { Options, Logger } from './type';
import { parseUrl } from './utils';

export const createLogger = (options?: Options): YabFetchMiddleware => {
  const { collapsed = true } = options || {};

  const { log, error, groupCollapsed, group, groupEnd } = console;

  const logger: Logger = {
    log,
    group: collapsed ? groupCollapsed : group,
    groupEnd,
    error
  };

  return async (ctx: IYabFetchContext, next: () => Promise<unknown>) => {
    const {
      yabRequestInit,
      yabRequestInit: { url, method, data }
    } = ctx;

    const startTime = new Date();
    try {
      await next();
      const endTime = new Date();
      const costTime = endTime.getTime() - startTime.getTime();

      const { origin, pathname, search } = parseUrl(url);

      logger.group(
        `%c${method.toUpperCase()} %c${origin}${pathname} %c@ ${startTime.toLocaleTimeString()}, cost: ${costTime} ms`,
        'color: #61bd4f',
        'color: #324856',
        'color: #50697d'
      );

      // ------before fetch --------
      logger.group('%cbefore fetch', 'color: #416eb6');
      logger.log('method:', method);
      logger.log('url:', url);
      if (method === 'post') logger.log('data:', data);
      if (method === 'get') logger.log('data:', search);
      logger.log('yabRequestInit:', yabRequestInit);
      logger.groupEnd();

      // ----- after fetch --------
      const { response } = ctx;
      logger.group('%cafter fetch', 'color:#715ca8');
      logger.log('response:', response);
      logger.log('ctx:', ctx);
      logger.groupEnd();
    } catch (e) {
      // logError(logger, e);
      throw e;
    }

    logger.groupEnd();
  };
};
