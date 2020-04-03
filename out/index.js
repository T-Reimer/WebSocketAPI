"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./events/index");
var registerExpress_1 = require("./registerExpress");
var registerWS_1 = require("./registerWS");
var registerSnapshotRequest_1 = require("./snapShots/registerSnapshotRequest");
/**
 * the default settings object
 */
exports.Settings = {
    maxLength: 10000,
    on: {}
};
/**
 * Register the default route with express
 *
 * @param app Express app
 * @param wss the web-wss connection
 * @param route the default route
 */
function register(app, wss, route, options) {
    var settings = Object.assign({}, exports.Settings, options);
    registerExpress_1.registerExpress(app, route, settings);
    registerWS_1.registerWS(wss, settings);
}
exports.register = register;
/**
 * Register a event listener for the name.
 *
 * Events are called when a event gets dispatched with that same name
 *
 * @param name the event name
 * @param callback the callback to run
 *
 * @example on("test", () => {\/*Always run *\/}).get(() => {\/** Get request *\/}).post(() => {\/** post request *\/})
 */
function on(name, callback) {
    // if a callback function is given register it for each of the categories
    if (callback) {
        index_1.getEvent.on(name, callback);
        index_1.postEvent.on(name, callback);
        index_1.putEvent.on(name, callback);
        index_1.delEvent.on(name, callback);
    }
    // return a object to register listeners for specific event types
    var obj = {
        get: function (callback) {
            index_1.getEvent.on(name, callback);
            return obj;
        },
        post: function (callback) {
            index_1.postEvent.on(name, callback);
            return obj;
        },
        put: function (callback) {
            index_1.putEvent.on(name, callback);
            return obj;
        },
        delete: function (callback) {
            index_1.delEvent.on(name, callback);
            return obj;
        },
        snapshot: function (callback) {
            index_1.snapshotEvent.on(name, callback);
            return obj;
        }
    };
    return obj;
}
exports.on = on;
/**
 * Trigger a update event for any registered listeners
 *
 * @param api the api name to update for
 * @param extra the data to add
 */
function triggerSnapshot(api, extra) {
    registerSnapshotRequest_1.registeredListeners.forEach(function (listener) {
        if (listener.name === api) {
            // set the extra event data
            listener.extra = extra;
            // trigger the event
            index_1.snapshotEvent.triggerEvent(listener);
        }
    });
}
exports.triggerSnapshot = triggerSnapshot;
//# sourceMappingURL=index.js.map