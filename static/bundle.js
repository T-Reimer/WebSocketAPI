(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.WebSocketAPI = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
/**
 * A simple api request
 *
 */
class Request {
    constructor(id, name, body, method) {
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
        this._send = (value) => { };
    }
    /**
     * Set the request status code
     *
     * @param code The status code
     */
    status(code) {
        this._status = code;
        return this;
    }
    /**
     * Send a response to the client
     *
     * @param value The value to send to client
     */
    send(value) {
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
    }
}
exports.Request = Request;

},{}],2:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRequest = createRequest;
const Request_1 = require("./../Request");
const socket_1 = require("./socket");
const stripSlashes_1 = __importDefault(require("../stripSlashes"));
function createRequest(data) {
    const { id, name, body, method } = data;
    const req = new Request_1.Request(id, (0, stripSlashes_1.default)(name), body, method);
    req._send = (value) => {
        return (0, socket_1.send)(value);
    };
    return req;
}

},{"../stripSlashes":11,"./../Request":1,"./socket":6}],3:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setOptions = exports.onSnapshot = void 0;
exports.newIndex = newIndex;
exports.setup = setup;
exports.api = api;
exports.getData = getData;
exports.sendData = sendData;
exports.fetch = fetch;
exports.on = on;
exports.getCurrentConnection = getCurrentConnection;
exports.getCurrentState = getCurrentState;
exports.reconnect = reconnect;
const socket_1 = require("./socket");
const registerEvent_1 = require("./registerEvent");
const onSnapshot_1 = require("./onSnapshot");
const timeoutError_1 = require("../errors/timeoutError");
const stripSlashes_1 = __importDefault(require("../stripSlashes"));
var onSnapshot_2 = require("./onSnapshot");
Object.defineProperty(exports, "onSnapshot", { enumerable: true, get: function () { return onSnapshot_2.onSnapshot; } });
const globalFetch = async (input, init) => {
    init = typeof init !== "object" ? {} : init;
    // create a abort controller to abort the fetch request on timeout
    const controller = new AbortController();
    init.signal = controller.signal;
    // make the request to server
    const fetchPromise = globalThis.fetch(input, init);
    // set the timeout
    let timeoutId = null;
    if (init.timeout) {
        timeoutId = setTimeout(() => controller.abort(), init.timeout);
    }
    try {
        // wait for the server response
        const result = await fetchPromise;
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        return result;
    }
    catch (err) {
        // check if it's an abort error
        if (err.name === "AbortError") {
            throw new timeoutError_1.TimeoutError("Request to server timed out!");
        }
        throw err;
    }
};
/**
 * The incremental id used when fetching requests
 */
let increment = 0;
let currentWebSocketState = "CLOSED";
function newIndex() {
    return ++increment;
}
/**
 * The currently using options object
 */
exports.setOptions = {
    fetchUrl: "/api",
    websocketUrl: "/api",
    websocketOnMessage: (message) => {
        // debug logging to console if not set
        console.group("Unregistered Event");
        console.log(message);
        console.groupEnd();
    },
    reconnect: true,
    url: {},
    maxSocketLength: 10000,
    reconnectTimeOut: 500,
    unHandledWebSocketMessage: (err, message) => {
        console.group("Web Socket unhandled message");
        console.error(err);
        console.warn(message);
        console.groupEnd();
    },
    stateChange: () => { },
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
    const fetchUrl = new URL(exports.setOptions.fetchUrl, location.href);
    const websocketUrl = new URL(exports.setOptions.websocketUrl, location.href);
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
    if (typeof options.stateChange === "function") {
        socket_1.stateChangeEvents.push(options.stateChange);
    }
    (0, socket_1.setup)();
}
function api(api) {
    // remove the leading and trailing slashes from the url
    api = (0, stripSlashes_1.default)(api);
    return {
        get: async (body, options) => {
            options = options ? options : {};
            options.method = "GET";
            return await fetch(api, body, options);
        },
        post: async (body, options) => {
            options = options ? options : {};
            options.method = "POST";
            return await fetch(api, body, options);
        },
        put: async (body, options) => {
            options = options ? options : {};
            options.method = "PUT";
            return await fetch(api, body, options);
        },
        delete: async (body, options) => {
            options = options ? options : {};
            options.method = "DELETE";
            return await fetch(api, body, options);
        },
        snapshot: (body, callback) => {
            return (0, onSnapshot_1.onSnapshot)(api, body, callback);
        },
    };
}
/**
 * Request a get or delete
 *
 */
async function getData(id, api, body, options) {
    // remove leading and trailing slashes from request
    api = (0, stripSlashes_1.default)(api);
    if ((options && options.use === "http") || !socket_1.ready) {
        let url = new URL(`${exports.setOptions.fetchUrl}/${id}/${api}`);
        let search = url.search;
        if (search) {
            // append the body to the url
            search += "&";
        }
        let bodyString = encodeURIComponent(JSON.stringify(body));
        if (bodyString.length + url.href.length > 2048) {
            throw new Error("Body length to long. Please specify to use ws 'options.use = ws' or use a lesser body length. The max url length is 2048 characters.");
        }
        search += `body=${bodyString}`;
        url.search = search;
        // send the request to the server
        let request = await globalFetch(url.href, {
            method: options && options.method ? options.method : "GET",
            timeout: options && options.timeout,
        });
        let data = await request.json();
        if (data.error) {
            // compile an error based on the data and throw it
            const error = new Error(data.error.message);
            error.name = data.error.name;
            if (data.error.status) {
                error.status = data.error.status;
            }
            throw error;
        }
        else {
            // return the data that was sent
            return data.body;
        }
    }
    else {
        // get from web socket
        let data = await (0, socket_1.fetch)(id, api, body, options);
        return data.body;
    }
}
/**
 * Send any post or put data
 *
 * @todo Add the timeout error
 */
async function sendData(id, api, body, options) {
    // remove leading and trailing slashes from request
    api = (0, stripSlashes_1.default)(api);
    if ((options && options.use === "http") || !socket_1.ready) {
        // use the http request instead of web socket
        const url = `${exports.setOptions.fetchUrl}/${id}/${api}`;
        let request = await globalFetch(url, {
            method: options && options.method ? options.method : "POST",
            timeout: options && options.timeout,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body) // stringify the content
        });
        let data = await request.json();
        if (data.error) {
            // compile an error based on the data and throw it
            const error = new Error(data.error.message);
            error.name = data.error.name;
            if (data.error.status) {
                error.status = data.error.status;
            }
            throw error;
        }
        else {
            // return the data that was sent
            return data.body;
        }
    }
    else {
        // get from web socket
        let data = await (0, socket_1.fetch)(id, api, body, options);
        return data.body;
    }
}
/**
 * Make a new api request
 *
 * @param api the api endpoint to call
 * @param body the data to include in the fetch call
 * @param options any options for the request
 */
async function fetch(api, body, options) {
    /**
     * The new index id to use for the transaction
     */
    let id = newIndex();
    let method = options && options.method ? options.method : "GET";
    try {
        switch (method) {
            case "POST":
                return await sendData(id, api, body, options);
            case "PUT":
                return await sendData(id, api, body, options);
            case "DELETE":
                return await getData(id, api, body, options);
            case "GET":
            default:
                return await getData(id, api, body, options);
        }
    }
    catch (err) {
        if (err instanceof Error) {
            err.api = api;
        }
        throw err;
    }
}
/**
 * Register a event listener for events sent from the server
 *
 * @param api The api name
 * @param callback the callback function
 */
function on(api, callback) {
    return (0, registerEvent_1.registerEvent)(api, callback);
}
/**
 * Returns the current web socket connection. This will be null if there isn't a active connection
 */
function getCurrentConnection() {
    return socket_1.socket;
}
// register a event to keep the current state var fresh
socket_1.stateChangeEvents.push(state => currentWebSocketState = state);
/**
 * Returns the current state of the web socket
 */
function getCurrentState() {
    return currentWebSocketState;
}
/**
 * Attempt to reconnect to the server
 */
function reconnect() {
    // close the current connection
    if (socket_1.socket) {
        socket_1.socket.close();
    }
    // if auto reconnect is turned off then trigger a new connection
    if (!exports.setOptions.reconnect) {
        (0, socket_1.setup)();
    }
}

},{"../errors/timeoutError":8,"../stripSlashes":11,"./onSnapshot":4,"./registerEvent":5,"./socket":6}],4:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onSnapshot = onSnapshot;
const socket_1 = require("./socket");
const _1 = require(".");
const stripSlashes_1 = __importDefault(require("../stripSlashes"));
/**
 * Register a new snapshot event to the server. This event will automatically re-register if the connection gets disconnected.
 *
 * @param api the api end point to call
 * @param requestHead any information to send to server. This info gets used when matching the snapshot type. So don't use a large payload here
 * @param callback the callback to run the the snapshot data
 */
function onSnapshot(api, requestHead, callback) {
    // remove leading and trailing slashes from the url
    api = (0, stripSlashes_1.default)(api);
    // create a index number to use for all of the transactions
    let id = (0, _1.newIndex)();
    let unregister = () => { };
    const unregisterState = (unregisterServer) => {
        unregisterServer = typeof unregisterServer === "boolean" ? unregisterServer : true;
        unregister();
        for (let i = socket_1.stateChangeEvents.length - 1; i >= 0; i--) {
            if (socket_1.stateChangeEvents[i] === onStateChange) {
                socket_1.stateChangeEvents.splice(i, 1);
            }
        }
        if (socket_1.ready && unregisterServer) {
            // unregister event server side
            let data = {
                id,
                name: api,
                body: null,
                method: "SNAPSHOT",
                unregister: true,
            };
            (0, socket_1.send)(data);
        }
    };
    // save the previous response in a variable
    let lastResponse = null;
    const createSnapshot = (response) => {
        // if a unregister event is received from server then unregister the callback
        if (response.unregister) {
            unregisterState(false);
            return;
        }
        // create the snapshot response to send to callback
        const snapshot = {
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
        unregister = (0, socket_1.registerSnapshot)(id, api, requestHead, createSnapshot);
    }
    const onStateChange = (state) => {
        if (state === "READY") {
            // unregister the previous event listeners before registering again
            unregister();
            // register for updates from the server
            unregister = (0, socket_1.registerSnapshot)(id, api, requestHead, createSnapshot);
        }
    };
    // add a listener for when the state of the websocket changes
    socket_1.stateChangeEvents.push(onStateChange);
    // return the function to unregister the snapshot listener
    return unregisterState;
}

},{".":3,"../stripSlashes":11,"./socket":6}],5:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerEvent = registerEvent;
const index_1 = require("./../events/index");
const stripSlashes_1 = __importDefault(require("../stripSlashes"));
/**
 * Register a event listener for events sent from the server
 *
 * @param name The api name
 * @param callback the callback function
 */
function registerEvent(name, callback) {
    // remove the leading and trailing slashes from the url
    name = (0, stripSlashes_1.default)(name);
    // if a callback function is given register it for each of the categories
    if (callback) {
        index_1.getEvent.on(name, callback);
        index_1.postEvent.on(name, callback);
        index_1.putEvent.on(name, callback);
        index_1.delEvent.on(name, callback);
    }
    // return a object to register listeners for specific event types
    let obj = {
        get: (callback) => {
            index_1.getEvent.on(name, callback);
            return obj;
        },
        post: (callback) => {
            index_1.postEvent.on(name, callback);
            return obj;
        },
        put: (callback) => {
            index_1.putEvent.on(name, callback);
            return obj;
        },
        delete: (callback) => {
            index_1.delEvent.on(name, callback);
            return obj;
        }
    };
    return obj;
}

},{"../stripSlashes":11,"./../events/index":10}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ready = exports.socket = exports.stateChangeEvents = void 0;
exports.setup = setup;
exports.fetch = fetch;
exports.registerSnapshot = registerSnapshot;
exports.send = send;
const index_1 = require("./index");
const createRequest_1 = require("./createRequest");
const index_2 = require("./../events/index");
const timeoutError_1 = require("../errors/timeoutError");
let events = [];
exports.stateChangeEvents = [];
exports.socket = null;
exports.ready = false;
function setup() {
    createNewConnection();
}
function createNewConnection() {
    // set ready state to false
    exports.ready = false;
    if (exports.socket && exports.socket.readyState === exports.socket.OPEN) {
        exports.socket.close();
    }
    exports.socket = new WebSocket(index_1.setOptions.websocketUrl);
    exports.socket.addEventListener("open", () => {
        if (exports.socket) {
            // if the auth method is set in settings then the first message to the server should be the auth token
            if (index_1.setOptions.authKey) {
                index_1.setOptions.authKey(exports.socket)
                    .then(key => {
                    const keyData = { event: "auth", key };
                    exports.socket === null || exports.socket === void 0 ? void 0 : exports.socket.send(JSON.stringify(keyData));
                })
                    .catch(err => {
                    // if the auth key errors then disconnect from server
                    exports.ready = false;
                    exports.socket === null || exports.socket === void 0 ? void 0 : exports.socket.close();
                    exports.socket = null;
                    console.error(err);
                    exports.stateChangeEvents.forEach(callback => callback("ERROR"));
                });
            }
            /**
             * Tell if the events are registered or not
             */
            let registered = false;
            exports.socket.addEventListener("message", (event) => {
                // listen for the main start message
                if (!registered) {
                    try {
                        let data = JSON.parse(event.data);
                        if (data && data.event && data.event === "connection") {
                            // if the connection signal is received then send the data
                            // set the registered flag
                            registered = true;
                            // set the ready flag. After this is set then the websocket will be used for message events
                            exports.ready = true;
                            exports.stateChangeEvents.forEach(callback => callback("READY"));
                        }
                        else if (data && data.event === "auth-failed") {
                            // if authentication failed
                            exports.stateChangeEvents.forEach(callback => callback("AUTHFAILED"));
                            // register a listener for READY event to turn on the reconnect again
                            if (index_1.setOptions.reconnect) {
                                exports.stateChangeEvents.push(function stateReady(state) {
                                    if (state === "READY") {
                                        // reset the set options reconnect value
                                        index_1.setOptions.reconnect = true;
                                        // unregister this listner
                                        for (let i = exports.stateChangeEvents.length - 1; i >= 0; i--) {
                                            if (exports.stateChangeEvents[i] === stateReady) {
                                                exports.stateChangeEvents.splice(i, 1);
                                            }
                                        }
                                    }
                                });
                                index_1.setOptions.reconnect = false;
                            }
                            return;
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
                        let data = JSON.parse(event.data);
                        if (!data.id) {
                            throw new Error("Event id not found");
                        }
                        if (data.method) {
                            // if a method was received with the request then its a server side request
                            // create a event to dispatch
                            let event = (0, createRequest_1.createRequest)(data);
                            switch (data.method) {
                                case "GET":
                                    index_2.getEvent.triggerEvent(event);
                                    break;
                                case "POST":
                                    index_2.postEvent.triggerEvent(event);
                                    break;
                                case "PUT":
                                    index_2.putEvent.triggerEvent(event);
                                    break;
                                case "DELETE":
                                    index_2.delEvent.triggerEvent(event);
                                    break;
                            }
                        }
                        else {
                            for (let i = 0; i < events.length; i++) {
                                let event = events[i];
                                if (event.id === data.id) {
                                    if (data.error) {
                                        let error = new Error(data.error.message);
                                        error.name = data.error.name;
                                        event.reject(error);
                                    }
                                    else {
                                        event.resolve(data);
                                    }
                                    if (event.unregister) {
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
            exports.stateChangeEvents.forEach(callback => callback("OPEN"));
        }
        else {
            createNewConnection();
        }
    });
    exports.socket.addEventListener("error", (error) => {
        exports.ready = false;
        console.error(error);
        exports.stateChangeEvents.forEach(callback => callback("ERROR"));
    });
    exports.socket.addEventListener("close", () => {
        exports.ready = false;
        const timeout = typeof index_1.setOptions.reconnectTimeOut === "function" ? index_1.setOptions.reconnectTimeOut() : index_1.setOptions.reconnectTimeOut;
        // wait for a little before reconnecting
        if (index_1.setOptions.reconnect) {
            setTimeout(createNewConnection, timeout);
        }
        // if the previous state wasn't auth failed then send a closed message
        if ((0, index_1.getCurrentState)() !== "AUTHFAILED") {
            exports.stateChangeEvents.forEach(callback => callback("CLOSED"));
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
    return new Promise((resolve, reject) => {
        // set a timeout
        if (options === null || options === void 0 ? void 0 : options.timeout) {
            setTimeout(() => {
                reject(new timeoutError_1.TimeoutError("Request to server timed out!"));
            }, options.timeout);
        }
        try {
            // create the request to send to websocket server
            let data = {
                id,
                name: api,
                body: body,
                method: options && options.method ? options.method : "GET"
            };
            // send the data to server
            send(data);
            // register the event listener for the fetch return value
            events.push({
                id,
                unregister: true,
                reject,
                resolve
            });
        }
        catch (err) {
            reject(err);
        }
    });
}
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
    let data = {
        id,
        name: api,
        body: body,
        method: "SNAPSHOT",
    };
    send(data);
    const unregister = () => {
        for (let i = events.length - 1; i >= 0; i--) {
            if (events[i].id === id) {
                events.splice(i, 1);
            }
        }
    };
    events.push({
        id,
        unregister: false,
        reject: () => { },
        resolve: (data) => {
            callback(data);
        },
    });
    // return a function to unregister
    return unregister;
}
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

},{"../errors/timeoutError":8,"./../events/index":10,"./createRequest":2,"./index":3}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidRequest = void 0;
/**
 * Create a new Invalid Request Error
 */
class InvalidRequest extends Error {
    constructor(message) {
        super(message);
        this.name = "Invalid Request";
        this.status = 500;
    }
}
exports.InvalidRequest = InvalidRequest;

},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeoutError = void 0;
class TimeoutError extends Error {
    constructor(message) {
        super(message);
        this.name = "Timeout Error";
    }
}
exports.TimeoutError = TimeoutError;

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Events = void 0;
const InvalidRequest_1 = require("./../errors/InvalidRequest");
class Events {
    constructor() {
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
    triggerEvent(event) {
        // the caller index
        let index = 0;
        const { name } = event;
        /**
         * Call this function to run the next function
         */
        const callEvent = () => {
            // check if the callback exists
            if (this.events[name][index]) {
                // run the callback
                this.events[name][index](event, () => {
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
            const error = new InvalidRequest_1.InvalidRequest("Unknown api request. Please register the endpoint before using it.");
            error.name = "Invalid Request";
            error.status = 404;
            throw error;
        }
    }
    /**
     * Add a Event listener to the event name
     *
     * @param name The event name
     * @param callback The callback function.
     */
    on(name, callback) {
        if (!this.events[name]) {
            this.events[name] = [];
        }
        // add the callback to the event listeners
        this.events[name].push(callback);
    }
    /**
     * Remove the event from the list
     *
     * @param name The event name
     * @param callback the callback to remove
     */
    remove(name, callback) {
        // check if the list exists
        if (this.events[name]) {
            // look for the function in the list
            for (let i = this.events[name].length - 1; i >= 0; i--) {
                // match the callback function
                if (this.events[name][i] === callback) {
                    // remove the function from the list
                    this.events[name].splice(i, 1);
                }
            }
        }
    }
}
exports.Events = Events;

},{"./../errors/InvalidRequest":7}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.snapshotEvent = exports.delEvent = exports.putEvent = exports.postEvent = exports.getEvent = void 0;
const event_1 = require("./event");
exports.getEvent = new event_1.Events();
exports.postEvent = new event_1.Events();
exports.putEvent = new event_1.Events();
exports.delEvent = new event_1.Events();
exports.snapshotEvent = new event_1.Events();

},{"./event":9}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = stripUrlSlashes;
/**
 * Removes any leading or following slashes in the endpoint url
 *
 * @param url
 */
function stripUrlSlashes(url) {
    return url.replace(/^\/|\/$/g, "");
}

},{}]},{},[3])(3)
});
