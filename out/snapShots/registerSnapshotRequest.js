"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Request_1 = require("../Request");
var events_1 = require("../events");
exports.registeredListeners = [];
function registerSnapshotRequest(data, event, settings) {
    var _a;
    // create a snapshot request
    var snapshot = new SnapshotRequest(data, event, settings);
    // push into the listeners list
    exports.registeredListeners.push(snapshot);
    // execute the initial event
    events_1.snapshotEvent.triggerEvent(snapshot);
    (_a = event.WebSocket) === null || _a === void 0 ? void 0 : _a.on("close", unRegister);
    // remove the close event listener if the snapshot gets unregistered at any point
    snapshot.onUnregister(function () {
        var _a;
        (_a = event.WebSocket) === null || _a === void 0 ? void 0 : _a.removeEventListener("close", unRegister);
    });
    function unRegister() {
        snapshot.unregister(true);
    }
}
exports.registerSnapshotRequest = registerSnapshotRequest;
/**
 * Un register the given snapshot listener
 *
 * @param data
 */
function unregisterSnapshotRequest(data) {
    for (var _i = 0, registeredListeners_1 = exports.registeredListeners; _i < registeredListeners_1.length; _i++) {
        var listener = registeredListeners_1[_i];
        if (listener.data.id === data.id) {
            listener.unregister(false);
        }
    }
}
exports.unregisterSnapshotRequest = unregisterSnapshotRequest;
/**
 * A snapshot request data
 */
var SnapshotRequest = /** @class */ (function (_super) {
    __extends(SnapshotRequest, _super);
    function SnapshotRequest(data, event, settings) {
        var _this = _super.call(this, data.id, data.name, data.body, "SNAPSHOT") || this;
        _this.data = data;
        _this.event = event;
        _this.settings = settings;
        _this.client = event.client;
        _this._onUnregister = [];
        /**
         * Any extra event data that is added on the trigger event
         */
        _this.extra = null;
        // register the send handler
        _this._send = function (value) {
            var _a, _b, _c, _d;
            try {
                // try to send the message to client
                (_a = _this.client) === null || _a === void 0 ? void 0 : _a.WebSocket.send(JSON.stringify(value));
            }
            catch (err) {
                // if failed to send check if the ready state is closed... If so then unregister anything for that client
                if (((_b = _this.client) === null || _b === void 0 ? void 0 : _b.WebSocket.readyState) === ((_c = _this.client) === null || _c === void 0 ? void 0 : _c.WebSocket.CLOSED)) {
                    // the client connection is closed already
                    try {
                        // make sure that disconnect events are called
                        (_d = _this.client) === null || _d === void 0 ? void 0 : _d.WebSocket.terminate();
                        //ignore any errors
                    }
                    catch (err) { }
                }
                else {
                    // call the on error handler
                    if (_this.settings.on.error) {
                        _this.settings.on.error(err);
                    }
                }
            }
        };
        return _this;
    }
    /**
     * Un register the snapshot event
     */
    SnapshotRequest.prototype.unregister = function (unregisterClient) {
        unregisterClient = typeof unregisterClient === "boolean" ? unregisterClient : true;
        for (var i = exports.registeredListeners.length - 1; i >= 0; i--) {
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
        this._onUnregister.forEach(function (callback) { return callback(); });
    };
    /**
     * Add a event listener to run when the event get's un registered
     */
    SnapshotRequest.prototype.onUnregister = function (callback) {
        this._onUnregister.push(callback);
    };
    return SnapshotRequest;
}(Request_1.Request));
//# sourceMappingURL=registerSnapshotRequest.js.map