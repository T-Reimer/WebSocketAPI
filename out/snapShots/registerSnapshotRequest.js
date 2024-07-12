"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registeredListeners = void 0;
exports.registerSnapshotRequest = registerSnapshotRequest;
exports.unregisterSnapshotRequest = unregisterSnapshotRequest;
const Request_1 = require("../Request");
const events_1 = require("../events");
exports.registeredListeners = [];
function registerSnapshotRequest(data, event, settings) {
    var _a;
    // create a snapshot request
    const snapshot = new SnapshotRequest(data, event, settings);
    // push into the listeners list
    exports.registeredListeners.push(snapshot);
    // execute the initial event
    events_1.snapshotEvent.triggerEvent(snapshot);
    (_a = event.WebSocket) === null || _a === void 0 ? void 0 : _a.on("close", unRegister);
    // remove the close event listener if the snapshot gets unregistered at any point
    snapshot.onUnregister(() => {
        var _a;
        (_a = event.WebSocket) === null || _a === void 0 ? void 0 : _a.removeEventListener("close", unRegister);
    });
    function unRegister() {
        snapshot.unregister(true);
    }
}
/**
 * Un register the given snapshot listener
 *
 * @param data
 */
function unregisterSnapshotRequest(data) {
    for (const listener of exports.registeredListeners) {
        if (listener.data.id === data.id) {
            listener.unregister(false);
        }
    }
}
/**
 * A snapshot request data
 */
class SnapshotRequest extends Request_1.Request {
    constructor(data, event, settings) {
        super(data.id, data.name, data.body, "SNAPSHOT");
        this.data = data;
        this.event = event;
        this.settings = settings;
        this.client = event.client;
        this._onUnregister = [];
        /**
         * Any extra event data that is added on the trigger event
         */
        this.extra = null;
        // register the send handler
        this._send = (value) => {
            var _a, _b, _c, _d;
            try {
                // try to send the message to client
                (_a = this.client) === null || _a === void 0 ? void 0 : _a.WebSocket.send(JSON.stringify(value));
            }
            catch (err) {
                // if failed to send check if the ready state is closed... If so then unregister anything for that client
                if (((_b = this.client) === null || _b === void 0 ? void 0 : _b.WebSocket.readyState) === ((_c = this.client) === null || _c === void 0 ? void 0 : _c.WebSocket.CLOSED)) {
                    // the client connection is closed already
                    try {
                        // make sure that disconnect events are called
                        (_d = this.client) === null || _d === void 0 ? void 0 : _d.WebSocket.terminate();
                        //ignore any errors
                    }
                    catch (err) { }
                }
                else {
                    // call the on error handler
                    if (this.settings.on.error) {
                        this.settings.on.error(err);
                    }
                }
            }
        };
    }
    /**
     * Un register the snapshot event
     */
    unregister(unregisterClient) {
        unregisterClient = typeof unregisterClient === "boolean" ? unregisterClient : true;
        for (let i = exports.registeredListeners.length - 1; i >= 0; i--) {
            if (exports.registeredListeners[i] === this) {
                exports.registeredListeners.splice(i, 1);
            }
        }
        // ask the client to un register the event
        if (this.client && unregisterClient) {
            this._send({
                id: this.id,
                status: this._status,
                body: null,
                error: false,
                unregister: true,
            });
        }
        this._onUnregister.forEach(callback => callback());
    }
    /**
     * Add a event listener to run when the event get's un registered
     */
    onUnregister(callback) {
        this._onUnregister.push(callback);
    }
}
//# sourceMappingURL=registerSnapshotRequest.js.map