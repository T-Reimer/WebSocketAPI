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
                                event_1.resolve(data);
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
//# sourceMappingURL=socket.js.map