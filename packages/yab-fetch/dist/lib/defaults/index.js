'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function validateResponseStatus(response) {
  return response.ok;
}
exports.validateResponseStatus = validateResponseStatus;
function resolveData(ctx) {
  var yabRequestInit = ctx.yabRequestInit;
  switch (yabRequestInit.responseType) {
    case 'json': {
      return ctx.json;
    }
    case 'text': {
      return ctx.text;
    }
    case 'blob': {
      return ctx.blob;
    }
    case 'arrayBuffer': {
      return ctx.arrayBuffer;
    }
    case 'formData': {
      return ctx.formData;
    }
    case 'auto':
    default: {
      return ctx;
    }
  }
}
exports.resolveData = resolveData;
exports.DEFAULT_YAB_REQUEST_INIT = {
  responseType: 'json',
  resolveData: resolveData,
  validateResponseStatus: validateResponseStatus
};
