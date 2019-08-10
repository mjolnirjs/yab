import { RequestMethod } from '../enums';

/**
 * YabFetch Request Headers
 *
 * TODO: extends fetch's `Headers`
 */
export type RequestHeaders = Record<string, string> | undefined;

/**
 * YabFetch Request Params
 */
export type RequestParams = Record<string, string> | undefined;

/**
 * YabFetch's request method type
 */
export type RequestMethodType = keyof typeof RequestMethod;

/**
 * YabFetch Response Type
 */
export type ResponseType =
  | 'auto'
  | 'json'
  | 'text'
  | 'arrayBuffer'
  | 'blob'
  | 'formData';

/**
 * YabRequestInit
 *
 * - extends fetch's `RequestInit`
 */
export interface YabRequestInit extends RequestInit {
  baseURL?: string;
  params?: RequestParams;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  url?: string;
  responseType?: ResponseType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolveData?(context: IYabFetchContext): Promise<any>;
  validateResponseStatus?(response: Response): boolean;
  before?(requestInit: RequestInit): RequestInit;
  after?(response: Response): Response;
  onError?(error: YabFetchError): void;
}

/**
 * ExecutableYabRequestInit
 *
 * - RequestInit in yabFetch's context, with `url`, `responseType` and `resolveData` required
 */
export interface ExecutableYabRequestInit extends YabRequestInit {
  url: string;
  responseType: ResponseType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolveData(context: IYabFetchContext): Promise<any>;
}

export interface IYabFetchContext {
  // **Request**
  yabRequestInit: ExecutableYabRequestInit;
  requestInit: RequestInit;

  // **Response**
  response: Response;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  json?: any;
  text?: string;
  blob?: Blob;
  arrayBuffer?: ArrayBuffer;
  formData?: FormData;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export type YabFetchMiddleware = (
  context: IYabFetchContext,
  next: () => Promise<unknown>
) => void;

export interface YabFetchErrorOptions {
  error?: Error;
  errorMessage?: string;
  yabRequestInit: ExecutableYabRequestInit;
  requestInit?: RequestInit;
  response?: Response;
}

export interface YabFetchError extends Error {
  yabRequestInit: ExecutableYabRequestInit;
  requestInit: RequestInit;
  response?: Response;
}
