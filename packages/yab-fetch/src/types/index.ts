import { RequestMethod } from '../enums';

export type RequestHeaders = Record<string, string> | undefined;

export type RequestParams = Record<string, string> | undefined;

export type ResponseType =
  | 'auto'
  | 'json'
  | 'text'
  | 'arrayBuffer'
  | 'blob'
  | 'formData';

export interface YabRequestInit extends RequestInit {
  baseURL?: string;
  params?: RequestParams;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  url?: string;
  responseType?: ResponseType;
  resolveData?(context: IYabFetchContext): Promise<any>;
  validateResponseStatus?(response: Response): boolean;
  before?(requestInit: RequestInit): RequestInit;
  after?(response: Response): Response;
}

export interface ExecutableYabRequestInit extends YabRequestInit {
  url: string;
  responseType: ResponseType;
  resolveData(context: IYabFetchContext): Promise<any>;
}

export interface IYabFetcher {
  (url: string, init?: YabRequestInit): Promise<unknown>;
  get(url: string, config?: YabRequestInit): Promise<unknown>;
  post(url: string, data?: unknown, config?: YabRequestInit): Promise<unknown>;
  put(url: string, data?: unknown, config?: YabRequestInit): Promise<unknown>;
  delete(url: string, config?: YabRequestInit): Promise<unknown>;
  patch(url: string, data?: unknown, config?: YabRequestInit): Promise<unknown>;
  head(url: string, config?: YabRequestInit): Promise<unknown>;
  use(middleware: YabFetchMiddleware | YabFetchMiddleware[]): void;
}

export type RequestMethodType = keyof typeof RequestMethod;

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
