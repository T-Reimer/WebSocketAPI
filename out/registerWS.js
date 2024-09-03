"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerWS = registerWS;
const index_1 = require("./events/index");
const createWSRequest_1 = require("./createWSRequest");
const wsClient_1 = require("./ws/wsClient");
const registerSnapshotRequest_1 = require("./snapShots/registerSnapshotRequest");
const convertError_1 = require("./errors/convertError");
const stripSlashes_1 = __importDefault(require("./stripSlashes"));
/**
 * Register the web wss server to use as api
 *
 * @param wss The ws server object
 */
function registerWS(wss, settings) {
    // on connection
    wss.on('connection', function connection(ws, req, cl) {
        // create a new client
        const client = new wsClient_1.wsClient(ws, req, cl);
        if (!settings.onAuthKey) {
            // if there is no auth key function then register messages right away
            sendOpenMessage(ws, client, settings);
        }
        else {
            ws.on("message", async function onMessage(message) {
                try {
                    // parse the message
                    const data = JSON.parse(message);
                    if (data.event === "auth") {
                        if (settings.onAuthKey && await settings.onAuthKey(data.key, client, ws, req)) {
                            // register the api to start receiving events
                            sendOpenMessage(ws, client, settings);
                            ws.removeListener("message", onMessage);
                        }
                        else {
                            // disconnect. Authentication error
                            return sendAuthFailed(ws);
                        }
                    }
                    else {
                        // disconnect. Authentication error
                        return sendAuthFailed(ws);
                    }
                }
                catch (err) {
                    // disconnect. Authentication error
                    return sendAuthFailed(ws);
                }
            });
        }
    });
}
/**
 * Send the auth failed event and terminate the connection
 *
 * @param ws
 */
function sendAuthFailed(ws) {
    const failed = { event: "auth-failed" };
    try {
        ws.send(JSON.stringify(failed));
    }
    catch (err) { }
    ws.terminate();
}
function sendOpenMessage(ws, client, settings) {
    // send a Open connection event to tell the api on client side to start listening
    try {
        ws.send(JSON.stringify({ event: "connection" }));
    }
    catch (err) {
        // disconnect the client
        ws.terminate();
    }
    // register the on message event once the authentication is complete
    ws.on('message', function incoming(message) {
        let request = null;
        try {
            if (settings.maxLength && message.length <= settings.maxLength) {
                // parse the message to create a event
                let data = JSON.parse(message);
                request = data;
                if (data.method) {
                    // create a event to dispatch
                    let event = (0, createWSRequest_1.createWSRequest)(client, data.id, (0, stripSlashes_1.default)(data.name), data.body, data.method, settings);
                    switch (data.method) {
                        case "GET":
                            index_1.getEvent.triggerEvent(event);
                            break;
                        case "POST":
                            index_1.postEvent.triggerEvent(event);
                            break;
                        case "PUT":
                            index_1.putEvent.triggerEvent(event);
                            break;
                        case "DELETE":
                            index_1.delEvent.triggerEvent(event);
                            break;
                        case "SNAPSHOT":
                            if (data.unregister) {
                                (0, registerSnapshotRequest_1.unregisterSnapshotRequest)(data);
                            }
                            else {
                                (0, registerSnapshotRequest_1.registerSnapshotRequest)(data, event, settings);
                            }
                            break;
                    }
                }
                else {
                    // if the method is not set then its a return data event
                    for (let i = 0; i < client.events.length; i++) {
                        let event = client.events[i];
                        // find the event with the same id
                        if (event.id === data.id) {
                            // if there is an error then reject the promise
                            if (data.error) {
                                let error = new Error(data.error.message);
                                error.name = data.error.name;
                                event.reject(error);
                            }
                            else {
                                // resolve the promise with supplied data
                                event.resolve(data);
                            }
                            // remove the event from list of waiting
                            client.events.splice(i, 1);
                            // exit out
                            return;
                        }
                    }
                }
            }
        }
        catch (err) {
            if (settings.on.error) {
                settings.on.error(err, message);
            }
            else {
                /**
                 * Set the status number for the error
                 */
                let status = 500;
                // convert the error into an object to send to client
                const error = (0, convertError_1.convertError)(err);
                if (error.status) {
                    status = error.status;
                }
                else {
                    error.status = status;
                }
                const response = {
                    id: request && request.id || 0,
                    name: request && request.name || "",
                    error,
                    status
                };
                ws.send(JSON.stringify(response));
            }
        }
    });
}
//# sourceMappingURL=registerWS.js.map