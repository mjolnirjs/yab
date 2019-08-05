import { CacheStorage, CacheObject } from './types/index';
export declare class IDBCacheStorage implements CacheStorage {
    private _databaseName;
    private _request;
    private _store;
    constructor(databaseName?: string);
    readonly request: IDBRequest<any>;
    init(): Promise<void>;
    get(key: string): Promise<CacheObject>;
    set(key: string, value: object): Promise<unknown>;
}
declare function createIDBCache(): IDBCacheStorage;
export default createIDBCache;
