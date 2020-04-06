(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.WebSocketAPI = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A simple api request
 *
 */
var Request = /** @class */ (function () {
    function Request(id, name, body, method) {
        /**
         * The event id
         */
        this.id = id;
        /**
         * The name of the event
         */
        this.name = name;
        /**
         * The main body for the request
         */
        this.body = body;
        /**
         * Set the request method
         */
        this.method = method.toUpperCase();
        /**
         * the main status for the request
         */
        this._status = 200;
        this._send = function (value) { };
    }
    /**
     * Set the request status code
     *
     * @param code The status code
     */
    Request.prototype.status = function (code) {
        this._status = code;
        return this;
    };
    /**
     * Send a response to the client
     *
     * @param value The value to send to client
     */
    Request.prototype.send = function (value) {
        if (value instanceof Error) {
            this._send({
                id: this.id,
                status: this._status === 200 ? 500 : this._status,
                body: null,
                error: {
                    name: value.name,
                    message: value.message
                }
            });
        }
        else {
            this._send({
                id: this.id,
                status: this._status,
                body: value,
                error: false
            });
        }
        return this;
    };
    return Request;
}());
exports.Request = Request;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Request_1 = require("./../Request");
var socket_1 = require("./socket");
function createRequest(data) {
    var id = data.id, name = data.name, body = data.body, method = data.method;
    var req = new Request_1.Request(id, name, body, method);
    req._send = function (value) {
        return socket_1.send(value);
    };
    return req;
}
exports.createRequest = createRequest;

},{"./../Request":1,"./socket":6}],3:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
var registerEvent_1 = require("./registerEvent");
var onSnapshot_1 = require("./onSnapshot");
var timeoutError_1 = require("../errors/timeoutError");
var onSnapshot_2 = require("./onSnapshot");
exports.onSnapshot = onSnapshot_2.onSnapshot;
var globalFetch = function (input, init) { return __awaiter(void 0, void 0, void 0, function () {
    var controller, fetchPromise, timeoutId, result, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                init = typeof init !== "object" ? {} : init;
                controller = new AbortController();
                init.signal = controller.signal;
                fetchPromise = globalThis.fetch(input, init);
                timeoutId = null;
                if (init.timeout) {
                    timeoutId = setTimeout(function () { return controller.abort(); }, init.timeout);
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, fetchPromise];
            case 2:
                result = _a.sent();
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                return [2 /*return*/, result];
            case 3:
                err_1 = _a.sent();
                // check if it's an abort error
                if (err_1.name === "AbortError") {
                    throw new timeoutError_1.TimeoutError("Request to server timed out!");
                }
                throw err_1;
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 * The incremental id used when fetching requests
 */
var increment = 0;
function newIndex() {
    return ++increment;
}
exports.newIndex = newIndex;
/**
 * The currently using options object
 */
exports.setOptions = {
    fetchUrl: "/api",
    websocketUrl: "/api",
    websocketOnMessage: function (message) {
        // debug logging to console if not set
        console.group("Unregistered Event");
        console.log(message);
        console.groupEnd();
    },
    reconnect: true,
    url: {},
    maxSocketLength: 10000,
    reconnectTimeOut: 500,
    unHandledWebSocketMessage: function (err, message) {
        console.group("Web Socket unhandled message");
        console.error(err);
        console.warn(message);
        console.groupEnd();
    },
    stateChange: function () { },
};
/**
 * Setup the client side api with the correct parameters
 *
 * @param options the options for the client side application
 */
function setup(options) {
    // merge the new options with the defaults
    Object.assign(exports.setOptions, options);
    // create the url objects
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
        }); },
        snapshot: function (body, callback) {
            return onSnapshot_1.onSnapshot(api, body, callback);
        },
    };
}
exports.api = api;
/**
 * Request a get or delete
 *
 */
function getData(id, api, body, options) {
    return __awaiter(this, void 0, void 0, function () {
        var url, search, bodyString, request, data, error, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
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
                    return [4 /*yield*/, globalFetch(url.href, {
                            method: options && options.method ? options.method : "GET",
                            timeout: options && options.timeout,
                        })];
                case 1:
                    request = _a.sent();
                    return [4 /*yield*/, request.json()];
                case 2:
                    data = _a.sent();
                    if (data.error) {
                        error = new Error(data.error.message);
                        error.name = data.error.name;
                        if (data.error.status) {
                            error.status = data.error.status;
                        }
                        throw error;
                    }
                    else {
                        // return the data that was sent
                        return [2 /*return*/, data.body];
                    }
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, socket_1.fetch(id, api, body, options)];
                case 4:
                    data = _a.sent();
                    return [2 /*return*/, data.body];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getData = getData;
/**
 * Send any post or put data
 *
 * @todo Add the timeout error
 */
function sendData(id, api, body, options) {
    return __awaiter(this, void 0, void 0, function () {
        var url, request, data, error, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!((options && options.use === "http") || !socket_1.ready)) return [3 /*break*/, 3];
                    url = exports.setOptions.fetchUrl + "/" + encodeURIComponent(id) + "/" + encodeURIComponent(api);
                    return [4 /*yield*/, globalFetch(url, {
                            method: options && options.method ? options.method : "POST",
                            timeout: options && options.timeout,
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(body) // stringify the content
                        })];
                case 1:
                    request = _a.sent();
                    return [4 /*yield*/, request.json()];
                case 2:
                    data = _a.sent();
                    if (data.error) {
                        error = new Error(data.error.message);
                        error.name = data.error.name;
                        if (data.error.status) {
                            error.status = data.error.status;
                        }
                        throw error;
                    }
                    else {
                        // return the data that was sent
                        return [2 /*return*/, data.body];
                    }
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, socket_1.fetch(id, api, body, options)];
                case 4:
                    data = _a.sent();
                    return [2 /*return*/, data.body];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.sendData = sendData;
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
                    id = newIndex();
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
 * Register a event listener for events sent from the server
 *
 * @param api The api name
 * @param callback the callback function
 */
function on(api, callback) {
    return registerEvent_1.registerEvent(api, callback);
}
exports.on = on;

},{"../errors/timeoutError":8,"./onSnapshot":4,"./registerEvent":5,"./socket":6}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socket_1 = require("./socket");
var _1 = require(".");
/**
 * Register a new snapshot event to the server. This event will automatically re-register if the connection gets disconnected.
 *
 * @param api the api end point to call
 * @param requestHead any information to send to server. This info gets used when matching the snapshot type. So don't use a large payload here
 * @param callback the callback to run the the snapshot data
 */
function onSnapshot(api, requestHead, callback) {
    // create a index number to use for all of the transactions
    var id = _1.newIndex();
    var unregister = function () { };
    var unregisterState = function (unregisterServer) {
        unregisterServer = typeof unregisterServer === "boolean" ? unregisterServer : true;
        unregister();
        for (var i = socket_1.stateChangeEvents.length - 1; i >= 0; i--) {
            if (socket_1.stateChangeEvents[i] === onStateChange) {
                socket_1.stateChangeEvents.splice(i, 1);
            }
        }
        if (socket_1.ready && unregisterServer) {
            // unregister event server side
            var data = {
                id: id,
                name: api,
                body: null,
                method: "SNAPSHOT",
                unregister: true,
            };
            socket_1.send(data);
        }
    };
    // save the previous response in a variable
    var lastResponse = null;
    var createSnapshot = function (response) {
        // if a unregister event is received from server then unregister the callback
        if (response.unregister) {
            unregisterState(false);
            return;
        }
        // create the snapshot response to send to callback
        var snapshot = {
            last: lastResponse,
            data: response.body,
            timestamp: new Date(),
            requestHead: requestHead,
        };
        callback(snapshot);
        lastResponse = snapshot;
        lastResponse.last = null;
    };
    // check if the web socket is open.. If it is then register
    if (socket_1.ready) {
        unregister = socket_1.registerSnapshot(id, api, requestHead, createSnapshot);
    }
    var onStateChange = function (state) {
        if (state === "READY") {
            // unregister the previous event listeners before registering again
            unregister();
            // register for updates from the server
            unregister = socket_1.registerSnapshot(id, api, requestHead, createSnapshot);
        }
    };
    // add a listener for when the state of the websocket changes
    socket_1.stateChangeEvents.push(onStateChange);
    // return the function to unregister the snapshot listener
    return unregisterState;
}
exports.onSnapshot = onSnapshot;

},{".":3,"./socket":6}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./../events/index");
/**
 * Register a event listener for events sent from the server
 *
 * @param name The api name
 * @param callback the callback function
 */
function registerEvent(name, callback) {
    // if a callback function is given register it for each of the categories
    if (callback) {
        index_1.getEvent.on(name, callback);
        index_1.postEvent.on(name, callback);
        index_1.putEvent.on(name, callback);
        index_1.delEvent.on(name, callback);
    }
    // return a object to register listeners for specific event types
    var obj = {
        get: function (callback) {
            index_1.getEvent.on(name, callback);
            return obj;
        },
        post: function (callback) {
            index_1.postEvent.on(name, callback);
            return obj;
        },
        put: function (callback) {
            index_1.putEvent.on(name, callback);
            return obj;
        },
        delete: function (callback) {
            index_1.delEvent.on(name, callback);
            return obj;
        }
    };
    return obj;
}
exports.registerEvent = registerEvent;

},{"./../events/index":10}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var createRequest_1 = require("./createRequest");
var index_2 = require("./../events/index");
var timeoutError_1 = require("../errors/timeoutError");
var events = [];
exports.stateChangeEvents = [];
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
                            exports.stateChangeEvents.forEach(function (callback) { return callback("READY"); });
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
                        if (data.method) {
                            // if a method was received with the request then its a server side request
                            // create a event to dispatch
                            var event_1 = createRequest_1.createRequest(data);
                            switch (data.method) {
                                case "GET":
                                    index_2.getEvent.triggerEvent(event_1);
                                    break;
                                case "POST":
                                    index_2.postEvent.triggerEvent(event_1);
                                    break;
                                case "PUT":
                                    index_2.putEvent.triggerEvent(event_1);
                                    break;
                                case "DELETE":
                                    index_2.delEvent.triggerEvent(event_1);
                                    break;
                            }
                        }
                        else {
                            for (var i = 0; i < events.length; i++) {
                                var event_2 = events[i];
                                if (event_2.id === data.id) {
                                    if (data.error) {
                                        var error = new Error(data.error.message);
                                        error.name = data.error.name;
                                        event_2.reject(error);
                                    }
                                    else {
                                        event_2.resolve(data);
                                    }
                                    if (event_2.unregister) {
                                        // remove the event from list of waiting
                                        events.splice(i, 1);
                                    }
                                    return;
                                }
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
                exports.stateChangeEvents.forEach(function (callback) { return callback("ERROR"); });
            });
            exports.socket.addEventListener("close", function () {
                exports.ready = false;
                var timeout = typeof index_1.setOptions.reconnectTimeOut === "function" ? index_1.setOptions.reconnectTimeOut() : index_1.setOptions.reconnectTimeOut;
                // wait for a little before reconnecting
                // TODO: Set this time in the options
                setTimeout(createNewConnection, timeout);
                exports.stateChangeEvents.forEach(function (callback) { return callback("DISCONNECTED"); });
            });
            exports.stateChangeEvents.forEach(function (callback) { return callback("CONNECTED"); });
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
        // set a timeout
        if (options === null || options === void 0 ? void 0 : options.timeout) {
            setTimeout(function () {
                reject(new timeoutError_1.TimeoutError("Request to server timed out!"));
            }, options.timeout);
        }
        try {
            // create the request to send to websocket server
            var data = {
                id: id,
                name: api,
                body: body,
                method: options && options.method ? options.method : "GET"
            };
            // send the data to server
            send(data);
            // register the event listener for the fetch return value
            events.push({
                id: id,
                unregister: true,
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
 * Register a event to fire each time that id gets sent
 *
 * Returns a function to unregister the event
 *
 * @param id the event id to use
 * @param api the api string
 * @param body the request body to send to the server
 * @param callback the callback to run on each message
 */
function registerSnapshot(id, api, body, callback) {
    var data = {
        id: id,
        name: api,
        body: body,
        method: "SNAPSHOT",
    };
    send(data);
    var unregister = function () {
        for (var i = events.length - 1; i >= 0; i--) {
            if (events[i].id === id) {
                events.splice(i, 1);
            }
        }
    };
    events.push({
        id: id,
        unregister: false,
        reject: function () { },
        resolve: function (data) {
            callback(data);
        },
    });
    // return a function to unregister
    return unregister;
}
exports.registerSnapshot = registerSnapshot;
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

},{"../errors/timeoutError":8,"./../events/index":10,"./createRequest":2,"./index":3}],7:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Create a new Invalid Request Error
 */
var InvalidRequest = /** @class */ (function (_super) {
    __extends(InvalidRequest, _super);
    function InvalidRequest(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "Invalid Request";
        _this.status = 500;
        return _this;
    }
    return InvalidRequest;
}(Error));
exports.InvalidRequest = InvalidRequest;

},{}],8:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var TimeoutError = /** @class */ (function (_super) {
    __extends(TimeoutError, _super);
    function TimeoutError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "Timeout Error";
        return _this;
    }
    return TimeoutError;
}(Error));
exports.TimeoutError = TimeoutError;

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InvalidRequest_1 = require("./../errors/InvalidRequest");
var Events = /** @class */ (function () {
    function Events() {
        /**
         * The registered events
         */
        this.events = {};
    }
    /**
     * Trigger a event
     *
     * @param event
     */
    Events.prototype.triggerEvent = function (event) {
        var _this = this;
        // the caller index
        var index = 0;
        var name = event.name;
        /**
         * Call this function to run the next function
         */
        var callEvent = function () {
            // check if the callback exists
            if (_this.events[name][index]) {
                // run the callback
                _this.events[name][index](event, function () {
                    index++;
                    callEvent();
                });
            }
        };
        if (this.events[name]) {
            callEvent();
        }
        else {
            // the event is not registered and send a error back to client so the request can be closed
            var error = new InvalidRequest_1.InvalidRequest("Unknown api request. Please register the endpoint before using it.");
            error.name = "Invalid Request";
            error.status = 404;
            throw error;
        }
    };
    /**
     * Add a Event listener to the event name
     *
     * @param name The event name
     * @param callback The callback function.
     */
    Events.prototype.on = function (name, callback) {
        if (!this.events[name]) {
            this.events[name] = [];
        }
        // add the callback to the event listeners
        this.events[name].push(callback);
    };
    /**
     * Remove the event from the list
     *
     * @param name The event name
     * @param callback the callback to remove
     */
    Events.prototype.remove = function (name, callback) {
        // check if the list exists
        if (this.events[name]) {
            // look for the function in the list
            for (var i = this.events[name].length - 1; i >= 0; i--) {
                // match the callback function
                if (this.events[name][i] === callback) {
                    // remove the function from the list
                    this.events[name].splice(i, 1);
                }
            }
        }
    };
    return Events;
}());
exports.Events = Events;

},{"./../errors/InvalidRequest":7}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_1 = require("./event");
exports.getEvent = new event_1.Events();
exports.postEvent = new event_1.Events();
exports.putEvent = new event_1.Events();
exports.delEvent = new event_1.Events();
exports.snapshotEvent = new event_1.Events();

},{"./event":9}]},{},[3])(3)
});
