import { Application } from "express";
import WebSocket from "ws";
import { ServerRequest } from "./ServerRequest";
import { SnapshotResponse } from "./RequestData";
import AuthEventMessage from "./authRequest";
import { wsClient } from "./ws/wsClient";
export interface SettingsInterface {
    maxLength?: number;
    /**
     * If the onAuthKey is set as a function then the request must be authenticated before more api calls will be answered
     *
     * This function can be async and if it throws an error or returns false the client will be disconnected.
     * A truthy response will register the api.
     */
    onAuthKey?: (key: AuthEventMessage["key"], client: wsClient, ws: WebSocket, req: any) => Promise<boolean>;
    on: {
        /**
         * The error is always a instance of an error
         *
         * The message is the incoming string message if failed to parse
         */
        error?: (err: Error, message?: string) => void;
    };
}
/**
 * the default settings object
 */
export declare const Settings: SettingsInterface;
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
export declare function on(name: string, callback?: (request: ServerRequest) => void | Promise<void>): eventObject;
/**
 * Trigger a update event for any registered listeners
 *
 * @param api the api name to update for
 * @param extra the data to add
 */
export declare function triggerSnapshot(api: string, extra: any): void;
export {};
