import { Method } from '../utils/method';

export type RequestHeaders = Record<string, string> | undefined;

export type RequestParams = Record<string, string> | undefined;

export interface YabRequestInit extends RequestInit {
  params?: RequestParams;
  data?: unknown;
  onError?: unknown;
}

export interface YabFetcher {
  (url: string, init?: YabRequestInit): Promise<unknown>;
  get(url: string, config?: YabRequestInit): Promise<unknown>;
  delete(url: string, config?: YabRequestInit): Promise<unknown>;
  post(url: string, data?: unknown, config?: YabRequestInit): Promise<unknown>;
  put(url: string, data?: unknown, config?: YabRequestInit): Promise<unknown>;
  patch(url: string, data?: unknown, config?: YabRequestInit): Promise<unknown>;
}

export type MethodType = keyof typeof Method;
