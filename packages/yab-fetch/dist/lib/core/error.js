'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function createError(options) {
  var error = options.error || new Error(options.errorMessage);
  Object.assign(error, {
    yabRequestInit: options.yabRequestInit,
    requestInit: options.requestInit,
    response: options.response
  });
  return error;
}
exports.createError = createError;
