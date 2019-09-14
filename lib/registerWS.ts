import WebSocket from "ws";
import { getEvent, postEvent, putEvent, delEvent } from "./events/index";
import { createWSRequest } from "./createWSRequest";
import { SettingsInterface } from "./index";
/**
 * Register the web wss server to use as api
 *
 * @param wss The ws server object
 */
export function registerWS(wss: WebSocket.Server, settings: SettingsInterface) {
    // on connection
    wss.on('connection', function connection(ws: WebSocket) {

        // TODO: Register a event that can be run to authenticate the user before allowing any other communication
        // send a Open connection event to tell the api on client side to start listening
        ws.send(JSON.stringify({ event: "connection" }));

        // register the on message event once the authentication is complete
        ws.on('message', function incoming(message: string) {
            console.log('received: %s', message);
            try {
                if (settings.maxLength && message.length <= settings.maxLength) {
                    let data = JSON.parse(message);
                    let event = createWSRequest(ws, data.id, data.name, data.body, data.method, settings);
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
                    console.log(data);
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
