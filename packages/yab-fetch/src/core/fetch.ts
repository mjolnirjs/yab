import compose from 'koa-compose';

import {
  YabRequestInit,
  YabFetcher,
  MethodType,
  YabFetchMiddleware,
  IYabFetchContext
} from '../types/index';
import { getYabRequestInit } from '../utils';
import { YabFetchContext } from './context';
import { DEFAULT_YAB_REQUEST_INIT } from '../defaults';
import { createFetchMiddleware } from './fetchMiddleware';

export class YabFetch {
  private _requestInit?: YabRequestInit;

  private _middlewares: YabFetchMiddleware[];

  public constructor(requestInit?: YabRequestInit) {
    this._middlewares = [];
    this._requestInit = requestInit;
  }

  public fetch = async (url: string, directOptions?: YabRequestInit) => {
    const yabRequestInit = getYabRequestInit(
      { ...DEFAULT_YAB_REQUEST_INIT },
      this._requestInit,
      directOptions,
      { url }
    );

    const context = new YabFetchContext(yabRequestInit);

    const fetchMiddleware = createFetchMiddleware(yabRequestInit);

    const callback = compose([...this._middlewares, fetchMiddleware]);

    await callback(context);

    return yabRequestInit.resolveData(context);
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

export function createFetch<TFetchResult = IYabFetchContext>(
  requestInit?: YabRequestInit & {
    resolveData?(context: IYabFetchContext): Promise<TFetchResult>;
  }
): YabFetcher<TFetchResult> {
  const yabFetch = new YabFetch(requestInit);

  const currentFetch = yabFetch.fetch as YabFetcher<TFetchResult>;

  (['get', 'head', 'delete'] as MethodType[]).forEach((method) => {
    currentFetch[method] = (url: string, yabInit?: YabRequestInit) =>
      currentFetch(url, { method, responseType: 'json', ...yabInit });
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
