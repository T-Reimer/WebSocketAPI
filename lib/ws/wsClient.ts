import WebSocket from "ws";
import { Request as ExpressRequest } from "express";
import RequestData from "../RequestData";
import { getEvent, postEvent, putEvent, delEvent } from "./../events/index";

export interface requestOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE",
    use?: "ws" | "http",
    timeout?: number
}


export class wsClient {
    WebSocket: WebSocket;
    request: ExpressRequest;
    client: any;
    _index: number;

    constructor(ws: WebSocket, request: ExpressRequest, client?: any) {

        this._index = 0;

        /**
         * The first variable `ws` from the web socket connection event.
         * 
         * This is the ws connection where we can send data
         */
        this.WebSocket = ws;

        /**
         * The original request that was passed in from the server
         */
        this.request = request;

        /**
         * the client that was passed in on connection
         */
        this.client = client;
    }

    /**
     * Send a api request to the client
     * 
     * @param api The event name to send to client
     */
    api(api: string) {

        return {
            get: async (body: any, options?: requestOptions) => {
                options = options ? options : {};
                options.method = "GET";

                return await this.fetch(api, body, options);
            },
            post: async (body: any, options?: requestOptions) => {
                options = options ? options : {};
                options.method = "POST";

                return await this.fetch(api, body, options);
            },
            put: async (body: any, options?: requestOptions) => {
                options = options ? options : {};
                options.method = "PUT";

                return await this.fetch(api, body, options);
            },
            delete: async (body: any, options?: requestOptions) => {
                options = options ? options : {};
                options.method = "DELETE";

                return await this.fetch(api, body, options);
            }
        }

    }

    /**
     * Send a reverse fetch to the client. 
     * 
     * This allows you to make a request to the connected client from the server or send updated data to the client when it comes available
     * 
     * @param api The api event name to send
     * @param body the payload to send with the request
     * @param options the options for the request
     */
    fetch(api: string, body?: any, options?: requestOptions) {

        /**
        * The new index id to use for the transaction
        */
        let id = this.newIndex();

        return new Promise((resolve, reject) => {
            try {
                let data: RequestData = {
                    id,
                    name: api,
                    body: body,
                    method: options && options.method ? options.method : "GET"
                };

                // send the data to the client
                this.WebSocket.send(JSON.stringify(data));

                // register the event listener for the fetch return value



                // events.push({
                //     id,
                //     reject,
                //     resolve
                // });

            } catch (err) {
                reject(err);
            }
        });
    }

    newIndex() {
        return ++this._index;
    }
}