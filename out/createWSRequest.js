"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Request_1 = require("./Request");
/**
 * Create the event for the web socket connection
 */
function createWSRequest(ws, id, name, body, method, settings) {
    var newRequest = new Request_1.Request(id, name, body, method);
    newRequest._send = function (value) {
        // send the data to the client via ws
        ws.send(JSON.stringify(value));
    };
    return newRequest;
}
exports.createWSRequest = createWSRequest;
//# sourceMappingURL=createWSRequest.js.map