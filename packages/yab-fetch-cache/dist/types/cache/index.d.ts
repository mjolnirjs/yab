import { YabFetchMiddleware } from 'yab-fetch';
import { CacheOptions } from './types/index';
declare function createCacheMiddleware(options?: CacheOptions): YabFetchMiddleware;
export default createCacheMiddleware;
