import { ServerRequest } from "./ServerRequest";
import { SettingsInterface } from "./index";
import { wsClient } from "./ws/wsClient";

/**
 * Create the event for the web socket connection
 */
export function createWSRequest(client: wsClient, id: number, name: string, body: any, method: string, settings: SettingsInterface) {

    let newRequest = new ServerRequest(id, name, body, method, client);

    newRequest._send = (value) => {

        // send the data to the client via ws
        client.WebSocket.send(JSON.stringify(value));
    };
    return newRequest;
}
