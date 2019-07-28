export function promisifyRequest<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const unlisten = () => {
      /* eslint-disable */
      request.removeEventListener('success', success);
      request.removeEventListener('error', error);
      /* eslint-enable */
    };
    const success = () => {
      resolve(request.result);
      unlisten();
    };
    const error = () => {
      reject(request.error);
      unlisten();
    };

    request.addEventListener('success', success);
    request.addEventListener('error', error);
  });
}
