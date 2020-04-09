import { wsClient } from "./ws/wsClient";
import { Request as ExpressRequest } from "express";
import WebSocket from "ws";
import { Request } from "./Request";
/**
 * A simple api request
 *
 */
export declare class ServerRequest extends Request {
    request: ExpressRequest | null;
    WebSocket: WebSocket | null;
    client: wsClient | null;
    constructor(id: number, name: string, body: object, method: string, client: wsClient | null);
}
