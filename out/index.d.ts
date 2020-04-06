import { Application } from "express";
import WebSocket from "ws";
import { ServerRequest } from "./ServerRequest";
import { SnapshotResponse } from "./RequestData";
export interface SettingsInterface {
    maxLength?: number;
    on: {
        error: Function;
    };
}
/**
 * the default settings object
 */
export declare const Settings: {
    maxLength: number;
    on: {};
};
/**
 * Register the default route with express
 *
 * @param app Express app
 * @param wss the web-wss connection
 * @param route the default route
 */
export declare function register(app: Application, wss: WebSocket.Server, route: string, options: SettingsInterface): void;
interface eventObject {
    get: (callback: (request: ServerRequest) => void) => void;
    post: (callback: (request: ServerRequest) => void) => void;
    put: (callback: (request: ServerRequest) => void) => void;
    delete: (callback: (request: ServerRequest) => void) => void;
    snapshot: (callback: (request: SnapshotResponse) => void) => void;
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
export declare function on(name: string, callback?: Function): eventObject;
/**
 * Trigger a update event for any registered listeners
 *
 * @param api the api name to update for
 * @param extra the data to add
 */
export declare function triggerSnapshot(api: string, extra: any): void;
export {};
