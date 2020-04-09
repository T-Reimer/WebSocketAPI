import { requestOptions } from "./index";
import RequestData from "./../RequestData";
export declare type stateChangeEvent = "OPEN" | "CLOSED" | "ERROR" | "READY" | "AUTHFAILED";
export declare const stateChangeEvents: ((state: stateChangeEvent) => void)[];
export declare let socket: WebSocket | null;
export declare let ready: Boolean;
export declare function setup(): void;
/**
 * Create a fetch request from the server
 *
 * @param id The data request id
 * @param api the api endpoint
 * @param body the body to send to the server
 * @param options options for the request
 */
export declare function fetch(id: number, api: string, body?: any, options?: requestOptions): Promise<RequestData>;
/**
 * Register a event to fire each time that id gets sent
 *
 * Returns a function to unregister the event
 *
 * @param id the event id to use
 * @param api the api string
 * @param body the request body to send to the server
 * @param callback the callback to run on each message
 */
export declare function registerSnapshot(id: number, api: string, body: any, callback: (data: RequestData) => void): () => void;
/**
 * Send a payload to the server
 *
 * @param body The data to send to the server
 */
export declare function send(body: object): void;
