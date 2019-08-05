'use strict';
var __assign =
  (this && this.__assign) ||
  function() {
    __assign =
      Object.assign ||
      function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __importStar =
  (this && this.__importStar) ||
  function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result['default'] = mod;
    return result;
  };
Object.defineProperty(exports, '__esModule', { value: true });
var qs = __importStar(require('qs'));
function combineURL(left, right) {
  return left.replace(/\/$/, '') + '/' + right.replace(/^\//, '');
}
exports.combineURL = combineURL;
function appendURLParams(url, paramString) {
  return url + (url.includes('?') ? '&' : '?') + paramString;
}
exports.appendURLParams = appendURLParams;
function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}
exports.isAbsoluteURL = isAbsoluteURL;
function createURL(init) {
  var fullURL =
    isAbsoluteURL(init.url) || init.baseURL == null
      ? init.url
      : combineURL(init.baseURL, init.url);
  return init.params == null
    ? fullURL
    : appendURLParams(fullURL, qs.stringify(init.params));
}
exports.createURL = createURL;
function getYabRequestInit() {
  var sources = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    sources[_i] = arguments[_i];
  }
  var headers;
  sources.forEach(function(sourceItem) {
    if (sourceItem && sourceItem.headers) {
      headers = headers || {};
      Object.assign(headers, sourceItem.headers);
    }
  });
  var init = Object.assign.apply(
    Object,
    [{}].concat(sources, [
      {
        headers: headers
      }
    ])
  );
  var url = createURL(init);
  return __assign({}, init, { url: url });
}
exports.getYabRequestInit = getYabRequestInit;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isJSONObject(val) {
  return val !== null && typeof val === 'object';
}
exports.isJSONObject = isJSONObject;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isFormData(val) {
  return typeof FormData !== 'undefined' && val instanceof FormData;
}
exports.isFormData = isFormData;
function getRequestInit(yabRequestInit) {
  var requestInit = {};
  var data = yabRequestInit.data;
  if (data != null) {
    // TODO: handle all request body types
    if (isFormData(data)) {
      requestInit.body = data;
    } else if (isJSONObject(data)) {
      requestInit.body = JSON.stringify(data);
    }
  }
  [
    'cache',
    'credentials',
    'headers',
    'integrity',
    'keepalive',
    'method',
    'mode',
    'redirect',
    'referrer',
    'referrerPolicy',
    'signal',
    'window',
    'body'
  ].forEach(function(nativeRequestInitKey) {
    if (yabRequestInit[nativeRequestInitKey]) {
      requestInit[nativeRequestInitKey] = yabRequestInit[nativeRequestInitKey];
    }
  });
  return requestInit;
}
exports.getRequestInit = getRequestInit;