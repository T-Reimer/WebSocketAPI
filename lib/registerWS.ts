import WebSocket from "ws";
import { getEvent, postEvent, putEvent, delEvent } from "./events/index";
import { createWSRequest } from "./createWSRequest";
import { SettingsInterface } from "./index";
import { wsClient } from "./ws/wsClient";

/**
 * Register the web wss server to use as api
 *
 * @param wss The ws server object
 */
export function registerWS(wss: WebSocket.Server, settings: SettingsInterface) {
    // on connection
    wss.on('connection', function connection(ws: WebSocket, req?: any, cl?: any) {

        // create a new client
        const client = new wsClient(ws, req, cl);

        // send a Open connection event to tell the api on client side to start listening
        ws.send(JSON.stringify({ event: "connection" }));

        // register the on message event once the authentication is complete
        ws.on('message', function incoming(message: string) {
            try {
                if (settings.maxLength && message.length <= settings.maxLength) {

                    // parse the message to create a event
                    let data = JSON.parse(message);

                    if (data.method) {

                        // create a event to dispatch
                        let event = createWSRequest(client, data.id, data.name, data.body, data.method, settings);

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
                }
            }
        });
    });
}
