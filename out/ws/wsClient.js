"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var wsClient = /** @class */ (function () {
    function wsClient(ws, request, client) {
        this._index = 0;
        /**
         * The first variable `ws` from the web socket connection event.
         *
         * This is the ws connection where we can send data
         */
        this.WebSocket = ws;
        /**
         * The original request that was passed in from the server
         */
        this.request = request;
        /**
         * the client that was passed in on connection
         */
        this.client = client;
        /**
         * Create a list of events that are waiting to be resolved
         */
        this.events = [];
    }
    /**
     * Send a api request to the client
     *
     * @param api The event name to send to client
     */
    wsClient.prototype.api = function (api) {
        var _this = this;
        return {
            get: function (body, options) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            options = options ? options : {};
                            options.method = "GET";
                            return [4 /*yield*/, this.fetch(api, body, options)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); },
            post: function (body, options) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            options = options ? options : {};
                            options.method = "POST";
                            return [4 /*yield*/, this.fetch(api, body, options)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); },
            put: function (body, options) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            options = options ? options : {};
                            options.method = "PUT";
                            return [4 /*yield*/, this.fetch(api, body, options)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); },
            delete: function (body, options) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            options = options ? options : {};
                            options.method = "DELETE";
                            return [4 /*yield*/, this.fetch(api, body, options)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); }
        };
    };
    /**
     * Send a reverse fetch to the client.
     *
     * This allows you to make a request to the connected client from the server or send updated data to the client when it comes available
     *
     * @param api The api event name to send
     * @param body the payload to send with the request
     * @param options the options for the request
     */
    wsClient.prototype.fetch = function (api, body, options) {
        var _this = this;
        /**
        * The new index id to use for the transaction
        */
        var id = this.newIndex();
        return new Promise(function (resolve, reject) {
            try {
                var data = {
                    id: id,
                    name: api,
                    body: body,
                    method: options && options.method ? options.method : "GET"
                };
                // send the data to the client
                _this.WebSocket.send(JSON.stringify(data));
                // register the event listener for the fetch return value
                _this.events.push({
                    id: id,
                    reject: reject,
                    resolve: resolve
                });
            }
            catch (err) {
                reject(err);
            }
        });
    };
    wsClient.prototype.newIndex = function () {
        return ++this._index;
    };
    return wsClient;
}());
exports.wsClient = wsClient;
//# sourceMappingURL=wsClient.js.map