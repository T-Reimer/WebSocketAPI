"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./events/index");
var createWSRequest_1 = require("./createWSRequest");
var wsClient_1 = require("./ws/wsClient");
/**
 * Register the web wss server to use as api
 *
 * @param wss The ws server object
 */
function registerWS(wss, settings) {
    // on connection
    wss.on('connection', function connection(ws, req, cl) {
        // create a new client
        var client = new wsClient_1.wsClient(ws, req, cl);
        // send a Open connection event to tell the api on client side to start listening
        ws.send(JSON.stringify({ event: "connection" }));
        // register the on message event once the authentication is complete
        ws.on('message', function incoming(message) {
            console.log('received: %s', message);
            try {
                if (settings.maxLength && message.length <= settings.maxLength) {
                    // parse the message to create a event
                    var data = JSON.parse(message);
                    // create a event to dispatch
                    var event_1 = createWSRequest_1.createWSRequest(client, data.id, data.name, data.body, data.method, settings);
                    switch (data.method) {
                        case "GET":
                            index_1.getEvent.triggerEvent(event_1);
                            break;
                        case "POST":
                            index_1.postEvent.triggerEvent(event_1);
                            break;
                        case "PUT":
                            index_1.putEvent.triggerEvent(event_1);
                            break;
                        case "DELETE":
                            index_1.delEvent.triggerEvent(event_1);
                            break;
                    }
                    console.log(data);
                }
            }
            catch (err) {
                if (settings.on.error) {
                    settings.on.error(err, message);
                }
            }
        });
    });
}
exports.registerWS = registerWS;
//# sourceMappingURL=registerWS.js.map