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
var globalFetch = window.fetch;
var socket_1 = require("./socket");
var increment = 0;
exports.setOptions = {
    fetchUrl: "/api",
    websocketUrl: "/api",
    websocketOnMessage: function (message) { console.group("Unregistered Event"); console.log(message); console.groupEnd(); },
    reconnect: true,
    url: {},
    maxSocketLength: 10000,
    reconnectTimeOut: 500,
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
    var _this = this;
    return {
        get: function (body, options) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = options ? options : {};
                        options.method = "GET";
                        return [4 /*yield*/, fetch(api, body, options)];
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
                        return [4 /*yield*/, fetch(api, body, options)];
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
                        return [4 /*yield*/, fetch(api, body, options)];
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
                        return [4 /*yield*/, fetch(api, body, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); }
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
        var id, method, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = ++increment;
                    method = options && options.method ? options.method : "GET";
                    _a = method;
                    switch (_a) {
                        case "POST": return [3 /*break*/, 1];
                        case "PUT": return [3 /*break*/, 3];
                        case "DELETE": return [3 /*break*/, 5];
                        case "GET": return [3 /*break*/, 7];
                    }
                    return [3 /*break*/, 7];
                case 1: return [4 /*yield*/, sendData(id, api, body, options)];
                case 2: return [2 /*return*/, _b.sent()];
                case 3: return [4 /*yield*/, sendData(id, api, body, options)];
                case 4: return [2 /*return*/, _b.sent()];
                case 5: return [4 /*yield*/, getData(id, api, body, options)];
                case 6: return [2 /*return*/, _b.sent()];
                case 7: return [4 /*yield*/, getData(id, api, body, options)];
                case 8: return [2 /*return*/, _b.sent()];
            }
        });
    });
}
exports.fetch = fetch;
/**
 * Request a get or delete
 *
 */
function getData(id, api, body, options) {
    return __awaiter(this, void 0, void 0, function () {
        var url, search, bodyString, request, data, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("id", id);
                    console.log("api", api);
                    console.log("body", id);
                    if (!((options && options.use === "http") || !socket_1.ready)) return [3 /*break*/, 3];
                    url = new URL(exports.setOptions.fetchUrl + "/" + encodeURIComponent(id) + "/" + encodeURIComponent(api));
                    search = url.search;
                    if (search) {
                        // append the body to the url
                        search += "&";
                    }
                    bodyString = encodeURIComponent(JSON.stringify(body));
                    if (bodyString.length + url.href.length > 2048) {
                        console.log(bodyString, url.href);
                        throw new Error("Body length to long. Please specify to use ws 'options.use = ws' or use a lesser body length. The max url length is 2048 characters.");
                    }
                    search += "body=" + bodyString;
                    url.search = search;
                    return [4 /*yield*/, globalFetch(url.href, {
                            method: options && options.method ? options.method : "GET"
                        })];
                case 1:
                    request = _a.sent();
                    return [4 /*yield*/, request.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data.body];
                case 3: return [4 /*yield*/, socket_1.fetch(id, api, body, options)];
                case 4:
                    data = _a.sent();
                    return [2 /*return*/, data.body];
            }
        });
    });
}
/**
 * Send any post or put data
 *
 */
function sendData(id, api, body, options) {
    return __awaiter(this, void 0, void 0, function () {
        var url, request, data, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!((options && options.use === "http") || !socket_1.ready)) return [3 /*break*/, 3];
                    url = exports.setOptions.fetchUrl + "/" + encodeURIComponent(id) + "/" + encodeURIComponent(api);
                    return [4 /*yield*/, globalFetch(url, {
                            method: options && options.method ? options.method : "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: body
                        })];
                case 1:
                    request = _a.sent();
                    return [4 /*yield*/, request.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data.body];
                case 3: return [4 /*yield*/, socket_1.fetch(id, api, body, options)];
                case 4:
                    data = _a.sent();
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
    // set ready state to false
    exports.ready = false;
    if (exports.socket && exports.socket.readyState === exports.socket.OPEN) {
        exports.socket.close();
    }
    exports.socket = new WebSocket(index_1.setOptions.websocketUrl);
    exports.socket.addEventListener("open", function () {
        if (exports.socket) {
            /**
             * Tell if the events are registered or not
             */
            var registered_1 = false;
            exports.socket.addEventListener("message", function (event) {
                // listen for the main start message
                if (!registered_1) {
                    try {
                        var data = JSON.parse(event.data);
                        if (data && data.event && data.event === "connection") {
                            // if the connection signal is received then send the data
                            // set the registered flag
                            registered_1 = true;
                            // set the ready flag. After this is set then the websocket will be used for message events
                            exports.ready = true;
                        }
                        else {
                            // if the data wasn't the correct format then patch to the event
                            index_1.setOptions.websocketOnMessage(event.data);
                        }
                    }
                    catch (err) {
                        // send the data to the before register event that was set in the options
                        index_1.setOptions.websocketOnMessage(event.data);
                    }
                }
                else {
                    //parse the message and trigger the events
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
                                    event_1.resolve(data);
                                }
                                // remove the event from list of waiting
                                events.splice(i, 1);
                                return;
                            }
                        }
                        // set the socket as ready
                        exports.ready = true;
                    }
                    catch (err) {
                        if (index_1.setOptions.unHandledWebSocketMessage) {
                            index_1.setOptions.unHandledWebSocketMessage(err, event.data);
                        }
                        throw err;
                    }
                }
            });
            exports.socket.addEventListener("error", function (error) {
                exports.ready = false;
                console.error(error);
            });
            exports.socket.addEventListener("close", function () {
                exports.ready = false;
                var timeout = typeof index_1.setOptions.reconnectTimeOut === "function" ? index_1.setOptions.reconnectTimeOut() : index_1.setOptions.reconnectTimeOut;
                // wait for a little before reconnecting
                // TODO: Set this time in the options
                setTimeout(createNewConnection, timeout);
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
