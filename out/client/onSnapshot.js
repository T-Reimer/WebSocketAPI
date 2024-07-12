"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onSnapshot = onSnapshot;
const socket_1 = require("./socket");
const _1 = require(".");
const stripSlashes_1 = __importDefault(require("../stripSlashes"));
/**
 * Register a new snapshot event to the server. This event will automatically re-register if the connection gets disconnected.
 *
 * @param api the api end point to call
 * @param requestHead any information to send to server. This info gets used when matching the snapshot type. So don't use a large payload here
 * @param callback the callback to run the the snapshot data
 */
function onSnapshot(api, requestHead, callback) {
    // remove leading and trailing slashes from the url
    api = (0, stripSlashes_1.default)(api);
    // create a index number to use for all of the transactions
    let id = (0, _1.newIndex)();
    let unregister = () => { };
    const unregisterState = (unregisterServer) => {
        unregisterServer = typeof unregisterServer === "boolean" ? unregisterServer : true;
        unregister();
        for (let i = socket_1.stateChangeEvents.length - 1; i >= 0; i--) {
            if (socket_1.stateChangeEvents[i] === onStateChange) {
                socket_1.stateChangeEvents.splice(i, 1);
            }
        }
        if (socket_1.ready && unregisterServer) {
            // unregister event server side
            let data = {
                id,
                name: api,
                body: null,
                method: "SNAPSHOT",
                unregister: true,
            };
            (0, socket_1.send)(data);
        }
    };
    // save the previous response in a variable
    let lastResponse = null;
    const createSnapshot = (response) => {
        // if a unregister event is received from server then unregister the callback
        if (response.unregister) {
            unregisterState(false);
            return;
        }
        // create the snapshot response to send to callback
        const snapshot = {
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
        unregister = (0, socket_1.registerSnapshot)(id, api, requestHead, createSnapshot);
    }
    const onStateChange = (state) => {
        if (state === "READY") {
            // unregister the previous event listeners before registering again
            unregister();
            // register for updates from the server
            unregister = (0, socket_1.registerSnapshot)(id, api, requestHead, createSnapshot);
        }
    };
    // add a listener for when the state of the websocket changes
    socket_1.stateChangeEvents.push(onStateChange);
    // return the function to unregister the snapshot listener
    return unregisterState;
}
//# sourceMappingURL=onSnapshot.js.map