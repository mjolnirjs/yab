import 'fake-indexeddb/auto';
import EventEmitter from 'events';

// import createIDBStore from '../src/cache/idb';
import { promisifyRequest } from '../src/cache/utils';

describe('promisifyRequest', () => {
  // TODO: can't trigger fakeIndexDB error....

  // test('getRequest error', async () => {
  //   const idbStore = createIDBStore();
  //   await idbStore.init();

  //   const db = idbStore.request.result;

  //   const objectStore = db
  //     .transaction('IDBCache', 'readwrite')
  //     .objectStore('IDBCache');

  //   const request = objectStore.get('aaae');

  //   try {
  //     await promisifyRequest(request);
  //   } catch (e) {
  //     expect(e).toThrowError();
  //   }
  // });

  test('promisifyRequest error', async () => {
    const myEmitter = new EventEmitter();

    const request = {
      error: new Error('mock request error'),
      emit: myEmitter.emit,
      addEventListener: myEmitter.addListener,
      removeEventListener: myEmitter.removeListener
    };

    setTimeout(() => {
      request.emit('error');
    }, 100);

    try {
      await promisifyRequest(request as any);
    } catch (e) {
      expect(e.message).toBe('mock request error');
    }
  });
});
