// eslint-disable-next-line import/no-extraneous-dependencies
import { IYabFetchContext, YabFetchMiddleware } from 'yab-fetch';
import { Options, Logger } from './type';
import { logBeforeFetch, logAfterFetch, logError } from './logHelper';

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
      yabRequestInit: { url, method }
    } = ctx;

    const startTime = new Date();
    try {
      await next();
      const endTime = new Date();
      const costTime = endTime.getTime() - startTime.getTime();

      logger.group(
        `%c${method.toUpperCase()} %c${url} %c@ ${startTime.toLocaleTimeString()}, cost: ${costTime} ms`,
        'color: #61bd4f',
        'color: #324856',
        'color: #50697d'
      );

      logBeforeFetch(logger, ctx);
      logAfterFetch(logger, ctx);
    } catch (e) {
      // logError(logger, e);
      throw e;
    }

    logger.groupEnd();
  };
};
