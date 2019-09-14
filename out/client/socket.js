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
            // send the data to server
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
//# sourceMappingURL=socket.js.map