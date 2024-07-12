"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wsClient = void 0;
const timeoutError_1 = require("../errors/timeoutError");
class wsClient {
    constructor(ws, request, client) {
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
    api(api) {
        return {
            get: async (body, options) => {
                options = options ? options : {};
                options.method = "GET";
                return await this.fetch(api, body, options);
            },
            post: async (body, options) => {
                options = options ? options : {};
                options.method = "POST";
                return await this.fetch(api, body, options);
            },
            put: async (body, options) => {
                options = options ? options : {};
                options.method = "PUT";
                return await this.fetch(api, body, options);
            },
            delete: async (body, options) => {
                options = options ? options : {};
                options.method = "DELETE";
                return await this.fetch(api, body, options);
            }
        };
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
    fetch(api, body, options) {
        /**
        * The new index id to use for the transaction
        */
        let id = this.newIndex();
        return new Promise((resolve, reject) => {
            try {
                let data = {
                    id,
                    name: api,
                    body: body,
                    method: options && options.method ? options.method : "GET"
                };
                // send the data to the client
                this.WebSocket.send(JSON.stringify(data));
                let timeout = undefined;
                if (options && options.timeout) {
                    timeout = setTimeout(() => {
                        // reject the event if it hasn't run yet
                        reject(new timeoutError_1.TimeoutError("Request to client timed out!"));
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
                    reject: (err) => {
                        reject(err);
                        clearTimeout(timeout);
                    },
                    resolve: (args) => {
                        resolve(args);
                        clearTimeout(timeout);
                    }
                });
            }
            catch (err) {
                reject(err);
            }
        });
    }
    newIndex() {
        return ++this._index;
    }
}
exports.wsClient = wsClient;
//# sourceMappingURL=wsClient.js.map