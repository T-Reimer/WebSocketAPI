import { ServerRequest } from "./ServerRequest";
import { SettingsInterface } from "./index";
import { wsClient } from "./ws/wsClient";

/**
 * Create the event for the web socket connection
 */
export function createWSRequest(client: wsClient, id: number, name: string, body: any, method: string, settings: SettingsInterface) {

    let newRequest = new ServerRequest(id, name, body, method, client);

    // call the metric start function
    settings.on.eventReceived(newRequest);

    newRequest._send = (value) => {

        try {
            // send the data to the client via ws
            client.WebSocket.send(JSON.stringify(value));
        } catch (err: any) {

            // if failed to send check if the ready state is closed... If so then unregister anything for that client
            if (client.WebSocket.readyState === client.WebSocket.CLOSED) {
                // the client connection is closed already
                try {
                    // make sure that disconnect events are called
                    client.WebSocket.terminate();
                    //ignore any errors
                } catch (err: any) { }
            } else {

                // call the on error handler
                if (settings.on.error) {
                    settings.on.error(err);
                }
            }
        }

        // ping a event completed value
        settings.on.eventCompleted(newRequest);
    };
    return newRequest;
}
