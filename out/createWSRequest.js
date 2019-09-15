"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServerRequest_1 = require("./ServerRequest");
/**
 * Create the event for the web socket connection
 */
function createWSRequest(client, id, name, body, method, settings) {
    var newRequest = new ServerRequest_1.ServerRequest(id, name, body, method, client);
    newRequest._send = function (value) {
        // send the data to the client via ws
        client.WebSocket.send(JSON.stringify(value));
    };
    return newRequest;
}
exports.createWSRequest = createWSRequest;
//# sourceMappingURL=createWSRequest.js.map