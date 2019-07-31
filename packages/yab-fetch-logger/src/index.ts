// eslint-disable-next-line import/no-extraneous-dependencies
import { IYabFetchContext, YabFetchMiddleware } from 'yab-fetch';
import { Options, Logger } from './type';
import { logBeforeFetch, logAfterFetch, logError } from './logHelper';

export const createLogger = (options?: Options): YabFetchMiddleware => {
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production') {
    console.warn('[yab-logger]: warning.');
  }

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

    logger.group(
      `📖 yab: %c${method} %c${url} %c@ ${new Date()}`,
      'color: #6f42c1;font-size: 14px;',
      'color: #005cc5;font-size: 14px;',
      'color: #666'
    );

    logBeforeFetch(logger, ctx);

    try {
      await next();
      logAfterFetch(logger, ctx);
    } catch (e) {
      logError(logger, e);
    } finally {
      logger.groupEnd();
    }
  };
};
