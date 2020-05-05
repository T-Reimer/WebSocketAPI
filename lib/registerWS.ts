import WebSocket from "ws";
import { getEvent, postEvent, putEvent, delEvent, snapshotEvent } from "./events/index";
import { createWSRequest } from "./createWSRequest";
import { SettingsInterface } from "./index";
import { wsClient } from "./ws/wsClient";
import RequestData, { ResponseData } from "./RequestData";
import { registerSnapshotRequest, unregisterSnapshotRequest } from "./snapShots/registerSnapshotRequest";
import { convertError } from "./errors/convertError";
import AuthEventMessage, { AuthFailedMessage } from "./authRequest";
import stripUrlSlashes from "./stripSlashes";

/**
 * Register the web wss server to use as api
 *
 * @param wss The ws server object
 */
export function registerWS(wss: WebSocket.Server, settings: SettingsInterface) {
    // on connection
    wss.on('connection', function connection(ws: WebSocket, req, cl?: any) {
        // create a new client
        const client = new wsClient(ws, <any>req, cl);

        if (!settings.onAuthKey) {
            // if there is no auth key function then register messages right away
            sendOpenMessage(ws, client, settings);
        } else {
            ws.on("message", async function onMessage(message: string) {
                try {
                    // parse the message
                    const data = <AuthEventMessage>JSON.parse(message);

                    if (data.event === "auth") {
                        if (await settings.onAuthKey(data.key, client, ws, req)) {
                            // register the api to start receiving events
                            sendOpenMessage(ws, client, settings);

                            ws.removeEventListener("message", <any>onMessage);
                        } else {
                            // disconnect. Authentication error
                            return sendAuthFailed(ws);
                        }
                    } else {
                        // disconnect. Authentication error
                        return sendAuthFailed(ws);
                    }

                } catch (err) {
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
function sendAuthFailed(ws: WebSocket) {
    const failed: AuthFailedMessage = { event: "auth-failed" };
    try {
        ws.send(JSON.stringify(failed));
    } catch (err) { }
    ws.terminate();
}

function sendOpenMessage(ws: WebSocket, client: wsClient, settings: SettingsInterface) {
    // send a Open connection event to tell the api on client side to start listening
    try {
        ws.send(JSON.stringify({ event: "connection" }));
    } catch (err) {
        // disconnect the client
        ws.terminate();
    }

    // register the on message event once the authentication is complete
    ws.on('message', function incoming(message: string) {
        let request: RequestData | null = null;

        try {
            if (settings.maxLength && message.length <= settings.maxLength) {

                // parse the message to create a event
                let data: RequestData = JSON.parse(message);
                request = data;

                if (data.method) {

                    // create a event to dispatch
                    let event = createWSRequest(client, data.id, stripUrlSlashes(data.name), data.body, data.method, settings);

                    switch (data.method) {
                        case "GET":
                            getEvent.triggerEvent(event);
                            break;
                        case "POST":
                            postEvent.triggerEvent(event);
                            break;
                        case "PUT":
                            putEvent.triggerEvent(event);
                            break;
                        case "DELETE":
                            delEvent.triggerEvent(event);
                            break;
                        case "SNAPSHOT":
                            if (data.unregister) {
                                unregisterSnapshotRequest(data);
                            } else {
                                registerSnapshotRequest(data, event, settings);

                            }
                            break;
                    }
                } else {
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
                            } else {
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
            } else {

                /**
                 * Set the status number for the error
                 */
                let status: number = 500;

                // convert the error into an object to send to client
                const error = convertError(err);

                if (error.status) {
                    status = error.status;
                } else {
                    error.status = status;
                }

                const response: ResponseData = {
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