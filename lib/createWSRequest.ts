import WebSocket from "ws";
import { Request } from "./Request";
import { SettingsInterface } from "./index";
/**
 * Create the event for the web socket connection
 */
export function createWSRequest(ws: WebSocket, id: string, name: string, body: any, method: string, settings: SettingsInterface) {
    let newRequest = new Request(id, name, body, method);
    newRequest._send = (value) => {
        // send the data to the client via ws
        ws.send(JSON.stringify(value));
    };
    return newRequest;
}
