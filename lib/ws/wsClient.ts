import WebSocket from "ws";
import { Request as ExpressRequest } from "express";
import RequestData from "../RequestData";
import { getEvent, postEvent, putEvent, delEvent } from "./../events/index";
import { TimeoutError } from "../errors/timeoutError";

export interface requestOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE",
    use?: "ws" | "http",
    timeout?: number
}

interface FetchEvent {
    id: number,
    resolve: Function,
    reject: Function
}


export class wsClient {
    WebSocket: WebSocket;
    request: ExpressRequest;
    client: any;
    _index: number;
    events: FetchEvent[];

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
         * 
         * This is the third var that comes on on a wss.connection event.
         */
        this.client = client;

        /**
         * Create a list of events that are waiting to be resolved
         */
        this.events = [];

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

                let timeout: number | undefined = undefined;
                if (options && options.timeout) {
                    timeout = <any>setTimeout(() => {
                        // reject the event if it hasn't run yet
                        reject(new TimeoutError("Request to client timed out!"));

                        // remove the event from the list
                        for (let i = this.events.length - 1; i >= 0; i--) {
                            if (this.events[i].id === id) {
                                this.events.splice(i, 1);
                            }
                        }
                    }, options.timeout);
                }

                // register the event listener for the fetch return value
                this.events.push({
                    id,
                    reject: (err: Error) => {
                        reject(err);
                        clearTimeout(timeout);
                    },
                    resolve: (args: any) => {
                        resolve(args);
                        clearTimeout(timeout);
                    }
                });

            } catch (err: any) {
                reject(err);
            }
        });
    }

    newIndex() {
        return ++this._index;
    }
}