import { CacheStorage, CacheObject } from './types/index';
import { promisifyRequest } from './utils';

const DB_NAME = 'YabDB';
const STORE_NAME = 'IDBCache';

export class IDBCacheStorage implements CacheStorage {
  private _databaseName: string;

  private _request!: IDBRequest;

  private _db!: IDBDatabase;

  public constructor(databaseName = DB_NAME) {
    this._databaseName = databaseName;
  }

  public get request() {
    return this._request;
  }

  public async init() {
    const openRequest = indexedDB.open(this._databaseName);

    openRequest.addEventListener('upgradeneeded', (): void => {
      const db: IDBDatabase = openRequest.result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'url' });
      }
    });

    await promisifyRequest(openRequest);

    this._request = openRequest;
    this._db = openRequest.result;
  }

  protected getObjectStore(
    mode: IDBTransactionMode = 'readwrite'
  ): IDBObjectStore {
    return this._db.transaction([STORE_NAME], mode).objectStore(STORE_NAME);
  }

  public async get(key: string): Promise<CacheObject> {
    if (!this._db) {
      await this.init();
    }

    const request = this.getObjectStore('readonly').get(key);
    return promisifyRequest(request);
  }

  public async set(key: string, value: object): Promise<unknown> {
    if (!this._db) {
      await this.init();
    }

    const request = this.getObjectStore('readwrite').put({
      url: key,
      data: value
    });

    return promisifyRequest(request);
  }
}

function createIDBCache(): IDBCacheStorage {
  const idbCache = new IDBCacheStorage();

  return idbCache;
}

export default createIDBCache;
