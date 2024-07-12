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
//# sourceMappingURL=index.js.map