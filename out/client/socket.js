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
//# sourceMappingURL=socket.js.map