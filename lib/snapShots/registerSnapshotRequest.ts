import RequestData from "../RequestData";
import { Request } from "../Request";
import { ServerRequest } from "../ServerRequest";
import { SettingsInterface } from "..";
import { snapshotEvent } from "../events";

export const registeredListeners: SnapshotRequest[] = [];

export function registerSnapshotRequest(data: RequestData, event: ServerRequest, settings: SettingsInterface) {

    // create a snapshot request
    const snapshot = new SnapshotRequest(data, event);

    // push into the listeners list
    registeredListeners.push(snapshot);

    // execute the initial event
    snapshotEvent.triggerEvent(snapshot);

}

/**
 * Un register the given snapshot listener
 * 
 * @param data 
 */
export function unregisterSnapshotRequest(data: RequestData) {
    for (const listener of registeredListeners) {
        if (listener.data.id === data.id) {
            listener.unregister(false);
        }
    }
}

/**
 * A snapshot request data
 */
class SnapshotRequest extends Request {
    data: RequestData;
    event: ServerRequest;
    client: import("./../../lib/ws/wsClient").wsClient | null;
    extra: any;

    constructor(data: RequestData, event: ServerRequest) {
        super(data.id, data.name, data.body, "SNAPSHOT");

        this.data = data;
        this.event = event;
        this.client = event.client;

        /**
         * Any extra event data that is added on the trigger event
         */
        this.extra = null;

        // register the send handler
        this._send = (value: any) => {
            this.client?.WebSocket.send(JSON.stringify(value));
        };
    }

    /**
     * Un register the snapshot event
     */
    unregister(unregisterClient?: boolean) {
        unregisterClient = typeof unregisterClient === "boolean" ? unregisterClient : true;

        for (let i = registeredListeners.length - 1; i >= 0; i--) {
            if (registeredListeners[i] === this) {
                registeredListeners.splice(i, 1);
            }
        }

        // ask the client to un register the event
        if (this.client && unregisterClient) {
            this._send({
                id: this.id,
                status: this._status,
                body: null,
                error: false,
                unregister: true,
            });
        }
    }
}