import {
  IYabFetchContext,
  YabFetchError,
  ExecutableYabRequestInit
} from '../types/index';
import { createError } from './error';

export class YabFetchContext implements IYabFetchContext {
  private _yabRequestInit: ExecutableYabRequestInit;

  private _requestInit?: RequestInit;

  private _response?: Response;

  private _error: YabFetchError | undefined;

  public constructor(init: ExecutableYabRequestInit) {
    this._yabRequestInit = init;
  }

  public get yabRequestInit() {
    return this._yabRequestInit;
  }

  public set yabRequestInit(init: ExecutableYabRequestInit) {
    this._yabRequestInit = init;
  }

  public get requestInit() {
    if (this._requestInit == null) {
      throw new Error('RequestInit is not ready');
    }
    return this._requestInit;
  }

  public set requestInit(init: RequestInit) {
    this._requestInit = init;
  }

  public get response() {
    if (this._response == null) {
      throw new Error('Response is not ready');
    }

    return this._response.clone();
  }

  public set response(response: Response) {
    this._response = response;
  }

  public get error() {
    return this._error;
  }

  public set error(error: YabFetchError | undefined) {
    this._error = error;
  }

  public throw(message: string) {
    throw createError({
      errorMessage: message,
      yabRequestInit: this._yabRequestInit,
      requestInit: this._requestInit,
      response: this._response
    });
  }
}
