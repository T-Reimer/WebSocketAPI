"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socket_1 = require("./socket");
var _1 = require(".");
/**
 * Register a new snapshot event to the server. This event will automatically re-register if the connection gets disconnected.
 *
 * @param api the api end point to call
 * @param requestHead any information to send to server. This info gets used when matching the snapshot type. So don't use a large payload here
 * @param callback the callback to run the the snapshot data
 */
function onSnapshot(api, requestHead, callback) {
    // create a index number to use for all of the transactions
    var id = _1.newIndex();
    var unregister = function () { };
    var unregisterState = function (unregisterServer) {
        unregisterServer = typeof unregisterServer === "boolean" ? unregisterServer : true;
        unregister();
        for (var i = socket_1.stateChangeEvents.length - 1; i >= 0; i--) {
            if (socket_1.stateChangeEvents[i] === onStateChange) {
                socket_1.stateChangeEvents.splice(i, 1);
            }
        }
        if (socket_1.ready && unregisterServer) {
            // unregister event server side
            var data = {
                id: id,
                name: api,
                body: null,
                method: "SNAPSHOT",
                unregister: true,
            };
            socket_1.send(data);
        }
    };
    // save the previous response in a variable
    var lastResponse = null;
    var createSnapshot = function (response) {
        // if a unregister event is received from server then unregister the callback
        if (response.unregister) {
            unregisterState(false);
            return;
        }
        // create the snapshot response to send to callback
        var snapshot = {
            last: lastResponse,
            data: response.body,
            timestamp: new Date(),
            requestHead: requestHead,
        };
        callback(snapshot);
        lastResponse = snapshot;
        lastResponse.last = null;
    };
    // check if the web socket is open.. If it is then register
    if (socket_1.ready) {
        unregister = socket_1.registerSnapshot(id, api, requestHead, createSnapshot);
    }
    var onStateChange = function (state) {
        if (state === "READY") {
            // unregister the previous event listeners before registering again
            unregister();
            // register for updates from the server
            unregister = socket_1.registerSnapshot(id, api, requestHead, createSnapshot);
        }
    };
    // add a listener for when the state of the websocket changes
    socket_1.stateChangeEvents.push(onStateChange);
    // return the function to unregister the snapshot listener
    return unregisterState;
}
exports.onSnapshot = onSnapshot;
//# sourceMappingURL=onSnapshot.js.map