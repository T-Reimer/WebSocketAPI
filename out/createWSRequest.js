"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServerRequest_1 = require("./ServerRequest");
/**
 * Create the event for the web socket connection
 */
function createWSRequest(client, id, name, body, method, settings) {
    var newRequest = new ServerRequest_1.ServerRequest(id, name, body, method, client);
    // call the metric start function
    settings.on.eventReceived(newRequest);
    newRequest._send = function (value) {
        try {
            // send the data to the client via ws
            client.WebSocket.send(JSON.stringify(value));
        }
        catch (err) {
            // if failed to send check if the ready state is closed... If so then unregister anything for that client
            if (client.WebSocket.readyState === client.WebSocket.CLOSED) {
                // the client connection is closed already
                try {
                    // make sure that disconnect events are called
                    client.WebSocket.terminate();
                    //ignore any errors
                }
                catch (err) { }
            }
            else {
                // call the on error handler
                if (settings.on.error) {
                    settings.on.error(err);
                }
            }
        }
        // ping a event completed value
        settings.on.eventCompleted(newRequest);
    };
    return newRequest;
}
exports.createWSRequest = createWSRequest;
//# sourceMappingURL=createWSRequest.js.map