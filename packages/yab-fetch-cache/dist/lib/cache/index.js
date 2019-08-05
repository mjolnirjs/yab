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
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var idb_1 = __importDefault(require('./idb'));
function setCtxFromCache(ctx, cache, key) {
  return __awaiter(this, void 0, void 0, function() {
    var cacheData;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/, cache.get(key)];
        case 1:
          cacheData = _a.sent();
          if (cacheData) {
            ctx.json = cacheData.data;
          }
          return [2 /*return*/, !!cacheData];
      }
    });
  });
}
function createCacheMiddleware(options) {
  var _this = this;
  if (options === void 0) {
    options = {};
  }
  var _a = options.cache,
    cache = _a === void 0 ? idb_1.default() : _a,
    _b = options.strategy,
    strategy = _b === void 0 ? 'fallback' : _b;
  return function(ctx, next) {
    return __awaiter(_this, void 0, void 0, function() {
      var url, result, e_1, result;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            url = ctx.yabRequestInit.url;
            if (!(strategy === 'always')) return [3 /*break*/, 2];
            return [4 /*yield*/, setCtxFromCache(ctx, cache, url)];
          case 1:
            result = _a.sent();
            if (result) {
              return [2 /*return*/];
            }
            _a.label = 2;
          case 2:
            _a.trys.push([2, 4, , 7]);
            return [4 /*yield*/, next()];
          case 3:
            _a.sent();
            return [3 /*break*/, 7];
          case 4:
            e_1 = _a.sent();
            if (!(strategy === 'fallback')) return [3 /*break*/, 6];
            return [4 /*yield*/, setCtxFromCache(ctx, cache, url)];
          case 5:
            result = _a.sent();
            if (result) {
              return [2 /*return*/];
            }
            _a.label = 6;
          case 6:
            // otherwise, rethrow error
            throw e_1;
          case 7:
            // update cache
            cache.set(url, ctx.json);
            return [2 /*return*/];
        }
      });
    });
  };
}
exports.default = createCacheMiddleware;
