(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.WebSocketAPI = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
var socket_1 = require("./socket");
var increment = 0;
exports.setOptions = {
    fetchUrl: "/api",
    websocketUrl: "/api",
    reconnect: true,
    url: {},
    maxSocketLength: 10000,
    unHandledWebSocketMessage: function (err, message) {
        console.group("Web Socket unhandled message");
        console.error(err);
        console.warn(message);
        console.groupEnd();
    }
};
/**
 * Setup the client side api with the correct parameters
 *
 * @param options the options for the client side application
 */
function setup(options) {
    Object.assign(exports.setOptions, options);
    var fetchUrl = new URL(exports.setOptions.fetchUrl, location.href);
    var websocketUrl = new URL(exports.setOptions.websocketUrl, location.href);
    // if the given url is a secure socket or if the main page is secure then use that protocol 
    if ((exports.setOptions.websocketUrl && /^wss:/.test(exports.setOptions.websocketUrl)) || location.protocol === "https:") {
        websocketUrl.protocol = "wss:"; // set to a secure protocol
    }
    else {
        websocketUrl.protocol = "ws:";
    }
    // set the modified urls
    exports.setOptions.fetchUrl = fetchUrl.href;
    exports.setOptions.websocketUrl = websocketUrl.href;
    socket_1.setup();
}
exports.setup = setup;
function api(api) {
    return {
        get: function (body, options) {
            options = options ? options : {};
            options.method = "GET";
            return fetch(api, body, options);
        },
        post: function (body, options) {
            options = options ? options : {};
            options.method = "POST";
            return fetch(api, body, options);
        },
        put: function (body, options) {
            options = options ? options : {};
            options.method = "PUT";
            return fetch(api, body, options);
        },
        delete: function (body, options) {
            options = options ? options : {};
            options.method = "DELETE";
            return fetch(api, body, options);
        }
    };
}
exports.api = api;
/**
 * Make a new api request
 *
 * @param api the api endpoint to call
 * @param body the data to include in the fetch call
 * @param options any options for the request
 */
function fetch(api, body, options) {
    return __awaiter(this, void 0, void 0, function () {
        var id, method;
        return __generator(this, function (_a) {
            id = ++increment;
            method = options && options.method ? options.method : "GET";
            switch (method) {
                case "POST":
                    return [2 /*return*/, sendData({ id: id, api: api, body: body, options: options })];
                case "PUT":
                    return [2 /*return*/, sendData({ id: id, api: api, body: body, options: options })];
                case "DELETE":
                    return [2 /*return*/, getData({ id: id, api: api, body: body, options: options })];
                case "GET":
                default:
                    return [2 /*return*/, getData({ id: id, api: api, body: body, options: options })];
            }
            return [2 /*return*/];
        });
    });
}
exports.fetch = fetch;
/**
 * Request a get or delete
 *
 */
function getData(_a) {
    var id = _a.id, api = _a.api, body = _a.body, options = _a.options;
    return __awaiter(this, void 0, void 0, function () {
        var url, search, bodyString, request, data, data;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!((options && options.use === "http") || !socket_1.ready)) return [3 /*break*/, 3];
                    url = new URL(exports.setOptions.fetchUrl + "/" + encodeURIComponent(id) + "/" + encodeURIComponent(api));
                    search = url.search;
                    if (search) {
                        // append the body to the url
                        search += "&";
                    }
                    bodyString = encodeURIComponent(JSON.stringify(body));
                    if (bodyString.length + url.href.length > 2048) {
                        throw new Error("Body length to long. Please specify to use ws 'options.use = ws' or use a lesser body length. The max url length is 2048 characters.");
                    }
                    search += "body=" + bodyString;
                    url.search = search;
                    return [4 /*yield*/, fetch(url.href, {
                            method: options && options.method ? options.method : "GET"
                        })];
                case 1:
                    request = _b.sent();
                    return [4 /*yield*/, request.json()];
                case 2:
                    data = _b.sent();
                    return [2 /*return*/, data.body];
                case 3: return [4 /*yield*/, socket_1.fetch(id, api, body, options)];
                case 4:
                    data = _b.sent();
                    return [2 /*return*/, data.body];
            }
        });
    });
}
/**
 * Send any post or put data
 *
 */
function sendData(_a) {
    var id = _a.id, api = _a.api, body = _a.body, options = _a.options;
    return __awaiter(this, void 0, void 0, function () {
        var url, request, data, data;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!((options && options.use === "http") || !socket_1.ready)) return [3 /*break*/, 3];
                    url = exports.setOptions.fetchUrl + "/" + encodeURIComponent(id) + "/" + encodeURIComponent(api);
                    return [4 /*yield*/, fetch(url, {
                            method: options && options.method ? options.method : "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: body
                        })];
                case 1:
                    request = _b.sent();
                    return [4 /*yield*/, request.json()];
                case 2:
                    data = _b.sent();
                    return [2 /*return*/, data.body];
                case 3: return [4 /*yield*/, socket_1.fetch(id, api, body, options)];
                case 4:
                    data = _b.sent();
                    return [2 /*return*/, data.body];
            }
        });
    });
}

},{"./socket":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var events = [];
exports.socket = null;
exports.ready = false;
function setup() {
    createNewConnection();
}
exports.setup = setup;
function createNewConnection() {
    if (exports.socket && exports.socket.readyState === exports.socket.OPEN) {
        exports.socket.close();
    }
    exports.socket = new WebSocket(index_1.setOptions.websocketUrl);
    exports.socket.addEventListener("open", function () {
        if (exports.socket) {
            exports.ready = true;
            exports.socket.addEventListener("message", function (event) {
                try {
                    var data = JSON.parse(event.data);
                    if (!data.id) {
                        throw new Error("Event id not found");
                    }
                    for (var i = 0; i < events.length; i++) {
                        var event_1 = events[i];
                        if (event_1.id === data.id) {
                            if (data.error) {
                                var error = new Error(data.error.message);
                                error.name = data.error.name;
                                event_1.reject(error);
                            }
                            else {
                                event_1.resolve(data.body);
                            }
                            // remove the event from list of waiting
                            events.splice(i, 1);
                            return;
                        }
                    }
                }
                catch (err) {
                    if (index_1.setOptions.unHandledWebSocketMessage) {
                        index_1.setOptions.unHandledWebSocketMessage(err, event.data);
                    }
                    throw err;
                }
            });
            exports.socket.addEventListener("error", function (error) {
                exports.ready = false;
                console.error(error);
            });
            exports.socket.addEventListener("close", function () {
                exports.ready = false;
                createNewConnection();
            });
        }
        else {
            createNewConnection();
        }
    });
}
/**
 * Create a fetch request from the server
 *
 * @param id The data request id
 * @param api the api endpoint
 * @param body the body to send to the server
 * @param options options for the request
 */
function fetch(id, api, body, options) {
    return new Promise(function (resolve, reject) {
        try {
            var data = {
                id: id,
                name: api,
                body: body,
                method: options && options.method ? options.method : "GET"
            };
            send(data);
            // register the event listener for the fetch return value
            events.push({
                id: id,
                reject: reject,
                resolve: resolve
            });
        }
        catch (err) {
            reject(err);
        }
    });
}
exports.fetch = fetch;
/**
 * Send a payload to the server
 *
 * @param body The data to send to the server
 */
function send(body) {
    if (exports.ready && exports.socket) {
        exports.socket.send(JSON.stringify(body));
    }
    else {
        throw new Error("Could not send the data");
    }
}
exports.send = send;

},{"./index":1}]},{},[1])(1)
});
