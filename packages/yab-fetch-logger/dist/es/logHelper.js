export var logBeforeFetch = function(logger, ctx) {
  var yabRequestInit = ctx.yabRequestInit,
    _a = ctx.yabRequestInit,
    url = _a.url,
    method = _a.method,
    data = _a.data;
  logger.group('%cbefore fetch', 'color: #33b9f9');
  logger.log('yabRequestInit:', yabRequestInit);
  logger.log('url:', url);
  logger.log('method:', method);
  if (method === 'post') logger.log('data:', data);
  logger.groupEnd();
};
export var logAfterFetch = function(logger, ctx) {
  var response = ctx.response;
  logger.group('%cafter fetch', 'color:#61bb64');
  logger.log('response:', response);
  logger.log('ctx:', ctx);
  logger.groupEnd();
};
export var logError = function(logger, err) {
  logger.error('Something wrong with fetch: ' + err);
};
