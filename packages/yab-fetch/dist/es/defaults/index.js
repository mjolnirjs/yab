export function validateResponseStatus(response) {
  return response.ok;
}
export function resolveData(ctx) {
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
export var DEFAULT_YAB_REQUEST_INIT = {
  responseType: 'json',
  resolveData: resolveData,
  validateResponseStatus: validateResponseStatus
};
