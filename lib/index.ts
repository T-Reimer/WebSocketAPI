import { Application } from "express";
import WebSocket from "ws";

import { getEvent, postEvent, putEvent, delEvent } from "./events/index";
import { registerExpress } from "./registerExpress";
import { registerWS } from "./registerWS";

export interface SettingsInterface {
    maxLength?: number, // the max upload length to automatically parse
    on: {
        error: Function
    }
}

/**
 * the default settings object
 */
export const Settings = {
    maxLength: 10000,
    on: {}
}

/**
 * Register the default route with express
 * 
 * @param app Express app
 * @param wss the web-wss connection
 * @param route the default route
 */
export function register(app: Application, wss: WebSocket.Server, route: string, options: SettingsInterface) {

    let settings = Object.assign({}, Settings, options);

    registerExpress(app, route, settings);

    registerWS(wss, settings);

}

interface eventObject {
    get: Function;
    post: Function;
    put: Function;
    delete: Function;
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
export function on(name: string, callback?: Function) {

    // if a callback function is given register it for each of the categories
    if (callback) {
        getEvent.on(name, callback);
        postEvent.on(name, callback);
        putEvent.on(name, callback);
        delEvent.on(name, callback);
    }

    // return a object to register listeners for specific event types
    let obj: eventObject = {
        get: (callback: Function) => {
            getEvent.on(name, callback);

            return obj;
        },
        post: (callback: Function) => {

            postEvent.on(name, callback);

            return obj;
        },
        put: (callback: Function) => {

            putEvent.on(name, callback);

            return obj;
        },
        delete: (callback: Function) => {

            delEvent.on(name, callback);

            return obj;
        }
    }
    return obj;
}