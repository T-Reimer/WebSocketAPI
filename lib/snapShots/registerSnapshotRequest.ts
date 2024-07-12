import RequestData from "../RequestData";
import { Request } from "../Request";
import { ServerRequest } from "../ServerRequest";
import { SettingsInterface, Settings } from "..";
import { snapshotEvent } from "../events";

export const registeredListeners: SnapshotRequest[] = [];

export function registerSnapshotRequest(data: RequestData, event: ServerRequest, settings: SettingsInterface) {

    // create a snapshot request
    const snapshot = new SnapshotRequest(data, event, settings);

    // push into the listeners list
    registeredListeners.push(snapshot);

    // execute the initial event
    snapshotEvent.triggerEvent(snapshot);

    event.WebSocket?.on("close", unRegister);

    // remove the close event listener if the snapshot gets unregistered at any point
    snapshot.onUnregister(() => {
        event.WebSocket?.removeEventListener("close", unRegister);
    });

    function unRegister() {
        snapshot.unregister(true);
    }
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
    client: import("./../../lib/ws/wsClient").wsClient | null;
    extra: any;
    _onUnregister: (() => void)[];

    constructor(public data: RequestData, public event: ServerRequest, private settings: SettingsInterface) {
        super(data.id, data.name, data.body, "SNAPSHOT");

        this.client = event.client;
        this._onUnregister = [];

        /**
         * Any extra event data that is added on the trigger event
         */
        this.extra = null;

        // register the send handler
        this._send = (value: any) => {
            try {
                // try to send the message to client
                this.client?.WebSocket.send(JSON.stringify(value));

            } catch (err: any) {

                // if failed to send check if the ready state is closed... If so then unregister anything for that client
                if (this.client?.WebSocket.readyState === this.client?.WebSocket.CLOSED) {
                    // the client connection is closed already
                    try {
                        // make sure that disconnect events are called
                        this.client?.WebSocket.terminate();
                        //ignore any errors
                    } catch (err: any) { }
                } else {

                    // call the on error handler
                    if (this.settings.on.error) {
                        this.settings.on.error(err);
                    }
                }
            }
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

        this._onUnregister.forEach(callback => callback());
    }

    /**
     * Add a event listener to run when the event get's un registered
     */
    onUnregister(callback: () => void) {
        this._onUnregister.push(callback);
    }
}