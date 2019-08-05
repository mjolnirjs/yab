export function promisifyRequest(request) {
  return new Promise(function(resolve, reject) {
    var unlisten = function() {
      /* eslint-disable */
      request.removeEventListener('success', success);
      request.removeEventListener('error', error);
      /* eslint-enable */
    };
    var success = function() {
      resolve(request.result);
      unlisten();
    };
    var error = function() {
      reject(request.error);
      unlisten();
    };
    request.addEventListener('success', success);
    request.addEventListener('error', error);
  });
}
