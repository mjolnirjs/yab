export interface YabRequestInit extends RequestInit {
  params?: Record<string, string | string[]>;
  onError?: unknown;
}

export type RequestHeaders = Record<string, string> | undefined;

export type YabFetcher = (
  url: string,
  init?: YabRequestInit
) => Promise<unknown>;
