export interface CacheOptions {
  cache?: CacheStorage;
  strategy?: 'always' | 'fallback';
}

export interface CacheObject {
  url: string;
  data: unknown;
}

export interface CacheStorage {
  init(): Promise<void>;
  get(key: string): Promise<CacheObject>;
  set(key: string, value: object): Promise<unknown>;
}
