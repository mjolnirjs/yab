'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : new P(function(resolve) {
              resolve(result.value);
            }).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function() {
          return this;
        }),
      g
    );
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
Object.defineProperty(exports, '__esModule', { value: true });
var utils_1 = require('../utils');
var error_1 = require('./error');
function settleResponse(ctx) {
  return __awaiter(this, void 0, void 0, function() {
    var yabRequestInit, response, _a, _b, _c, _d, _e, _f, _g, _h;
    return __generator(this, function(_j) {
      switch (_j.label) {
        case 0:
          (yabRequestInit = ctx.yabRequestInit), (response = ctx.response);
          _a = yabRequestInit.responseType;
          switch (_a) {
            case 'json':
              return [3 /*break*/, 1];
            case 'text':
              return [3 /*break*/, 3];
            case 'blob':
              return [3 /*break*/, 5];
            case 'arrayBuffer':
              return [3 /*break*/, 7];
            case 'formData':
              return [3 /*break*/, 9];
            case 'auto':
              return [3 /*break*/, 11];
          }
          return [3 /*break*/, 11];
        case 1:
          _b = ctx;
          return [4 /*yield*/, response.json()];
        case 2:
          _b.json = _j.sent();
          return [3 /*break*/, 15];
        case 3:
          _c = ctx;
          return [4 /*yield*/, response.text()];
        case 4:
          _c.text = _j.sent();
          return [3 /*break*/, 15];
        case 5:
          _d = ctx;
          return [4 /*yield*/, response.blob()];
        case 6:
          _d.blob = _j.sent();
          return [3 /*break*/, 15];
        case 7:
          _e = ctx;
          return [4 /*yield*/, response.arrayBuffer()];
        case 8:
          _e.arrayBuffer = _j.sent();
          return [3 /*break*/, 15];
        case 9:
          _f = ctx;
          return [4 /*yield*/, response.formData()];
        case 10:
          _f.formData = _j.sent();
          return [3 /*break*/, 15];
        case 11:
          _j.trys.push([11, 13, , 14]);
          _g = ctx;
          return [4 /*yield*/, response.json()];
        case 12:
          _g.json = _j.sent();
          return [3 /*break*/, 14];
        case 13:
          _h = _j.sent();
          return [3 /*break*/, 14];
        case 14:
          return [3 /*break*/, 15];
        case 15:
          return [2 /*return*/];
      }
    });
  });
}
exports.settleResponse = settleResponse;
function createFetchMiddleware(yabRequestInit) {
  var _this = this;
  // TODO:
  var browserFetch = window.fetch;
  return function(ctx) {
    return __awaiter(_this, void 0, void 0, function() {
      var requestInit, response, nativefetchError_1, error_2;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 6, , 7]);
            requestInit = utils_1.getRequestInit(yabRequestInit);
            if (yabRequestInit.before) {
              requestInit = yabRequestInit.before(requestInit);
            }
            ctx.requestInit = requestInit;
            response = void 0;
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, , 4]);
            return [4 /*yield*/, browserFetch(yabRequestInit.url, requestInit)];
          case 2:
            // >_ Send fetch Request
            response = _a.sent();
            if (yabRequestInit.after) {
              response = yabRequestInit.after(response);
            }
            ctx.response = response;
            return [3 /*break*/, 4];
          case 3:
            nativefetchError_1 = _a.sent();
            throw error_1.createError({
              error: nativefetchError_1,
              yabRequestInit: yabRequestInit,
              requestInit: requestInit
            });
          case 4:
            // invalid response status
            if (
              yabRequestInit.validateResponseStatus &&
              !yabRequestInit.validateResponseStatus(response)
            ) {
              throw error_1.createError({
                errorMessage:
                  'Request failed with status code ' + response.status,
                yabRequestInit: yabRequestInit,
                requestInit: requestInit,
                response: response
              });
            }
            return [4 /*yield*/, settleResponse(ctx)];
          case 5:
            _a.sent();
            return [3 /*break*/, 7];
          case 6:
            error_2 = _a.sent();
            throw error_2;
          case 7:
            return [2 /*return*/];
        }
      });
    });
  };
}
exports.createFetchMiddleware = createFetchMiddleware;
