import { Application } from "express";
import WebSocket from "ws";

import { getEvent, postEvent, putEvent, delEvent, snapshotEvent } from "./events/index";
import { registerExpress } from "./registerExpress";
import { registerWS } from "./registerWS";
import { ServerRequest } from "./ServerRequest";
import { registeredListeners } from "./snapShots/registerSnapshotRequest";
import { SnapshotResponse } from "./RequestData";
import AuthEventMessage from "./authRequest";
import { wsClient } from "./ws/wsClient";
import stripUrlSlashes from "./stripSlashes";

export interface SettingsInterface {
    maxLength: number, // the max upload length to automatically parse
    /**
     * If the onAuthKey is set as a function then the request must be authenticated before more api calls will be answered
     * 
     * This function can be async and if it throws an error or returns false the client will be disconnected.
     * A truthy response will register the api.
     */
    onAuthKey?: (key: AuthEventMessage["key"], client: wsClient, ws: WebSocket, req: any) => Promise<boolean>,
    on: {
        /**
         * The error is always a instance of an error
         * 
         * The message is the incoming string message if failed to parse
         */
        error?: (err: Error, message?: string) => void,

        /**
         * Function gets called as soon as the event is created but before any of the hooks are executed.
         * 
         * This allows for collecting metrics in code performance
         */
        eventReceived: (event: ServerRequest) => void,

        /**
         * Function gets run as soon as the event.send function is called to respond to a api request.
         * 
         * Use in conjuction with `eventReceived` to collect usage metrics.
         */
        eventCompleted: (event: ServerRequest) => void,
    }
}

/**
 * the default settings object
 */
export const Settings: SettingsInterface = {
    maxLength: 100000,// default max string length to convert into an object
    on: {
        // add noop functions to the code as a default
        eventReceived: () => { },
        eventCompleted: () => { },
    },
}

/**
 * Register the default route with express
 * 
 * @param app Express app
 * @param wss the web-wss connection
 * @param route the default route
 */
export function register(app: Application, wss: WebSocket.Server, route: string, options: Partial<SettingsInterface>) {

    let settings: SettingsInterface = Object.assign({}, Settings, options);

    registerExpress(app, route, settings);

    registerWS(wss, settings);

}

interface eventObject {
    get: (callback: (request: ServerRequest) => void) => eventObject;
    post: (callback: (request: ServerRequest) => void) => eventObject;
    put: (callback: (request: ServerRequest) => void) => eventObject;
    delete: (callback: (request: ServerRequest) => void) => eventObject;
    snapshot: (callback: (request: SnapshotResponse) => void) => eventObject;
}


/**
 * Register a event listener for the name.
 * 
 * Events are called when a event gets dispatched with that same name
 * 
 * @param name the event name
 * @param callback the callback to run
 * 
 * @example on("test", () => {\/*Always run *\/}).get(() => {\/** Get request *\/}).post(() => {\/** post request *\/})
 */
export function on(name: string, callback?: (request: ServerRequest) => void | Promise<void>) {

    // remove leading and trailing slashes in the url
    name = stripUrlSlashes(name);

    // if a callback function is given register it for each of the categories
    if (callback) {
        getEvent.on(name, callback);
        postEvent.on(name, callback);
        putEvent.on(name, callback);
        delEvent.on(name, callback);
    }

    // return a object to register listeners for specific event types
    let obj: eventObject = {
        get: (callback): eventObject => {
            getEvent.on(name, callback);

            return obj;
        },
        post: (callback) => {

            postEvent.on(name, callback);

            return obj;
        },
        put: (callback) => {

            putEvent.on(name, callback);

            return obj;
        },
        delete: (callback) => {

            delEvent.on(name, callback);

            return obj;
        },
        snapshot: (callback) => {

            snapshotEvent.on(name, callback);

            return obj;
        }
    }
    return obj;
}

/**
 * Trigger a update event for any registered listeners
 * 
 * @param api the api name to update for
 * @param extra the data to add
 */
export function triggerSnapshot(api: string, extra: any) {
    // remove leading and trailing slashes from url
    api = stripUrlSlashes(api);

    registeredListeners.forEach(listener => {
        if (listener.name === api) {

            // set the extra event data
            listener.extra = extra;

            // trigger the event
            snapshotEvent.triggerEvent(listener);
        }
    });
}