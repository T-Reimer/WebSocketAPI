"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerRequest = void 0;
const Request_1 = require("./Request");
/**
 * A simple api request
 *
 */
class ServerRequest extends Request_1.Request {
    constructor(id, name, body, method, client) {
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
        }
        else {
            this.client = null;
            this.request = null;
            this.WebSocket = null;
        }
    }
}
exports.ServerRequest = ServerRequest;
//# sourceMappingURL=ServerRequest.js.map