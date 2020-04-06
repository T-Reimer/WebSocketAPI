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
//# sourceMappingURL=socket.js.map