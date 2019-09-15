import { wsClient } from "./ws/wsClient";
import { Request as ExpressRequest } from "express";
import WebSocket from "ws";
import { Request } from "./Request";

/**
 * A simple api request
 * 
 */
export class ServerRequest extends Request {
    request: ExpressRequest | null;
    WebSocket: WebSocket | null;
    client: wsClient | null;

    constructor(id: number, name: string, body: object, method: string, client: wsClient | null) {

        super(id, name, body, method);

        if (client) {
            /**
             * Set the client var
             */
            this.client = client;

            /**
             * the express request for the api request
             */
            this.request = client.request;

            /**
             * the web socket request for the api request
             */
            this.WebSocket = client.WebSocket;
        } else {
            this.client = null;
            this.request = null;
            this.WebSocket = null;
        }
    }
}