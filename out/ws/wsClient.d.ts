import WebSocket from "ws";
import { Request as ExpressRequest } from "express";
export interface requestOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    use?: "ws" | "http";
    timeout?: number;
}
interface FetchEvent {
    id: number;
    resolve: Function;
    reject: Function;
}
export declare class wsClient {
    WebSocket: WebSocket;
    request: ExpressRequest;
    client: any;
    _index: number;
    events: FetchEvent[];
    constructor(ws: WebSocket, request: ExpressRequest, client?: any);
    /**
     * Send a api request to the client
     *
     * @param api The event name to send to client
     */
    api(api: string): {
        get: (body: any, options?: requestOptions) => Promise<unknown>;
        post: (body: any, options?: requestOptions) => Promise<unknown>;
        put: (body: any, options?: requestOptions) => Promise<unknown>;
        delete: (body: any, options?: requestOptions) => Promise<unknown>;
    };
    /**
     * Send a reverse fetch to the client.
     *
     * This allows you to make a request to the connected client from the server or send updated data to the client when it comes available
     *
     * @param api The api event name to send
     * @param body the payload to send with the request
     * @param options the options for the request
     */
    fetch(api: string, body?: any, options?: requestOptions): Promise<unknown>;
    newIndex(): number;
}
export {};
