import compose from 'koa-compose';

import {
  YabRequestInit,
  YabFetcher,
  MethodType,
  YabFetchMiddleware,
  IYabFetchContext,
  ExcutableYabRequestInit
} from '../types/index';
import { getYabRequestInit, getRequestInit } from '../utils';
import { YabFetchContext } from './context';
import { DEFAULT_INIT } from '../defaults';
import { createError } from './error';

function createFetchMiddleware(yabRequestInit: ExcutableYabRequestInit) {
  // TODO:
  const browserFetch = window.fetch;

  return async (ctx: IYabFetchContext) => {
    try {
      // generate native fetch request init
      let requestInit = getRequestInit(yabRequestInit);

      if (yabRequestInit.before) {
        requestInit = yabRequestInit.before(requestInit);
      }

      // fetch
      let response;
      try {
        // >_ Send fetch Request
        response = await browserFetch(yabRequestInit.url, requestInit);

        if (yabRequestInit.after) {
          response = yabRequestInit.after(response);
        }
      } catch (nativefetchError) {
        throw createError({
          error: nativefetchError,
          yabRequestInit,
          requestInit
        });
      }

      ctx.response = response;

      // invalid response status
      if (
        yabRequestInit.validateResponseStatus &&
        !yabRequestInit.validateResponseStatus(response.status)
      ) {
        throw createError({
          errorMessage: `Request failed with status code ${response.status}`,
          yabRequestInit,
          requestInit,
          response
        });
      }

      // TODO: Handle all response types & maybe rename to responseType
      if (yabRequestInit.contentType === 'auto') {
        try {
          ctx.json = await response.json();
        } catch {
          /* ignore */
        }
      } else if (yabRequestInit.contentType === 'json') {
        ctx.json = await response.json();
      } else if (yabRequestInit.contentType === 'text') {
        ctx.text = await response.text();
      }
    } catch (error) {
      ctx.error = error;
    }
  };
}

export class YabFetch {
  private _requestInit?: YabRequestInit;

  private _middlewares: YabFetchMiddleware[];

  public constructor(requestInit?: YabRequestInit) {
    this._middlewares = [];
    this._requestInit = requestInit;
  }

  public fetch = async (url: string, directOptions?: YabRequestInit) => {
    const yabRequestInit = getYabRequestInit(
      { ...DEFAULT_INIT },
      this._requestInit,
      directOptions,
      { url }
    );

    const context = new YabFetchContext(yabRequestInit);

    const fetchMiddleware = createFetchMiddleware(yabRequestInit);

    const callback = compose([...this._middlewares, fetchMiddleware]);

    await callback(context);

    if (context.error) {
      throw context.error;
    }

    if (yabRequestInit.resolveData) {
      return yabRequestInit.resolveData(context);
    }

    return context;
  };

  public use = (middleware: YabFetchMiddleware | YabFetchMiddleware[]) => {
    if (Array.isArray(middleware)) {
      this._middlewares.push(...middleware);
    } else {
      this._middlewares.push(middleware);
    }
    return this;
  };
}

export function createFetch<TFetchResult>(
  requestInit?: YabRequestInit & {
    resolveData?(context: IYabFetchContext): Promise<TFetchResult>;
  }
): YabFetcher<TFetchResult> {
  const yabFetch = new YabFetch(requestInit);

  const currentFetch = yabFetch.fetch as YabFetcher<TFetchResult>;

  (['get', 'head', 'delete'] as MethodType[]).forEach((method) => {
    currentFetch[method] = (url: string, yabInit?: YabRequestInit) =>
      currentFetch(url, { method, contentType: 'json', ...yabInit });
  });

  (['post', 'put', 'patch'] as MethodType[]).forEach((method) => {
    currentFetch[method] = (
      url: string,
      data?: unknown,
      yabInit?: YabRequestInit
    ) => currentFetch(url, { method, data, ...yabInit });
  });

  currentFetch.use = yabFetch.use;

  return currentFetch;
}
