import compose from 'koa-compose';

import {
  YabRequestInit,
  IYabFetcher,
  RequestMethodType,
  YabFetchMiddleware,
  IYabFetchContext
} from '../types/index';
import { getYabRequestInit } from '../utils';
import { YabFetchContext } from './context';
import { DEFAULT_YAB_REQUEST_INIT } from '../defaults';
import { createFetchMiddleware } from './fetchMiddleware';
import { RequestMethod } from '../enums';

export class YabFetcher {
  private _requestInit?: YabRequestInit;

  private _middlewares: YabFetchMiddleware[];

  public constructor(requestInit?: YabRequestInit) {
    this._middlewares = [];
    this._requestInit = requestInit;
  }

  public async fetch(url: string, directOptions?: YabRequestInit) {
    const yabRequestInit = getYabRequestInit(
      { ...DEFAULT_YAB_REQUEST_INIT },
      this._requestInit,
      directOptions,
      { url }
    );

    const context = new YabFetchContext(yabRequestInit);

    const fetchMiddleware = createFetchMiddleware(yabRequestInit);

    const callback = compose([...this._middlewares, fetchMiddleware]);

    try {
      await callback(context);
    } catch (error) {
      if (yabRequestInit.onError) {
        yabRequestInit.onError(error);
      }
      throw error;
    }

    return yabRequestInit.resolveData(context);
  }

  public use(middleware: YabFetchMiddleware | YabFetchMiddleware[]) {
    if (Array.isArray(middleware)) {
      this._middlewares.push(...middleware);
    } else {
      this._middlewares.push(middleware);
    }
    return this;
  }

  /**
   * Performs a request with `get` http method.
   */
  public get<T>(url: string, yabInit?: YabRequestInit): Promise<T> {
    return this.fetch(url, {
      method: RequestMethod.get,
      ...yabInit
    });
  }

  /**
   * Performs a request with `post` http method.
   */
  public post<T>(
    url: string,
    data?: unknown,
    yabInit?: YabRequestInit
  ): Promise<T> {
    return this.fetch(url, {
      method: RequestMethod.post,
      data,
      ...yabInit
    });
  }

  /**
   * Performs a request with `put` http method.
   */
  public put(url: string, data?: unknown, yabInit?: YabRequestInit) {
    return this.fetch(url, {
      method: RequestMethod.put,
      data,
      ...yabInit
    });
  }

  /**
   * Performs a request with `delete` http method.
   */
  public delete(url: string, yabInit?: YabRequestInit) {
    return this.fetch(url, {
      method: RequestMethod.delete,
      ...yabInit
    });
  }

  /**
   * Performs a request with `patch` http method.
   */
  public patch(url: string, data?: unknown, yabInit?: YabRequestInit) {
    return this.fetch(url, {
      method: RequestMethod.patch,
      data,
      ...yabInit
    });
  }

  /**
   * Performs a request with `head` http method.
   */
  public head(url: string, yabInit?: YabRequestInit) {
    return this.fetch(url, {
      method: RequestMethod.head,
      ...yabInit
    });
  }
}

export function createYab(
  requestInit?: YabRequestInit & {
    resolveData?(context: IYabFetchContext): Promise<unknown>;
  }
) {
  return new YabFetcher(requestInit);
}
