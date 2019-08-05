export function createError(options) {
  var error = options.error || new Error(options.errorMessage);
  Object.assign(error, {
    yabRequestInit: options.yabRequestInit,
    requestInit: options.requestInit,
    response: options.response
  });
  return error;
}
