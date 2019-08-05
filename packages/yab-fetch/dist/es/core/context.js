import { createError } from './error';
var YabFetchContext = /** @class */ (function() {
  function YabFetchContext(init) {
    this._yabRequestInit = init;
  }
  Object.defineProperty(YabFetchContext.prototype, 'yabRequestInit', {
    get: function() {
      return this._yabRequestInit;
    },
    set: function(init) {
      this._yabRequestInit = init;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(YabFetchContext.prototype, 'requestInit', {
    get: function() {
      if (this._requestInit == null) {
        throw new Error('RequestInit is not ready');
      }
      return this._requestInit;
    },
    set: function(init) {
      this._requestInit = init;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(YabFetchContext.prototype, 'response', {
    get: function() {
      if (this._response == null) {
        throw new Error('Response is not ready');
      }
      return this._response.clone();
    },
    set: function(response) {
      this._response = response;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(YabFetchContext.prototype, 'error', {
    get: function() {
      return this._error;
    },
    set: function(error) {
      this._error = error;
    },
    enumerable: true,
    configurable: true
  });
  YabFetchContext.prototype.throw = function(message) {
    throw createError({
      errorMessage: message,
      yabRequestInit: this._yabRequestInit,
      requestInit: this._requestInit,
      response: this._response
    });
  };
  return YabFetchContext;
})();
export { YabFetchContext };
