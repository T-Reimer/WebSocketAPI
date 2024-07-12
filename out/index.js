"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = void 0;
exports.register = register;
exports.on = on;
exports.triggerSnapshot = triggerSnapshot;
const index_1 = require("./events/index");
const registerExpress_1 = require("./registerExpress");
const registerWS_1 = require("./registerWS");
const registerSnapshotRequest_1 = require("./snapShots/registerSnapshotRequest");
const stripSlashes_1 = __importDefault(require("./stripSlashes"));
/**
 * the default settings object
 */
exports.Settings = {
    maxLength: 100000, // default max string length to convert into an object
    on: {
        // add noop functions to the code as a default
        eventReceived: () => { },
        eventCompleted: () => { },
    },
};
/**
 * Register the default route with express
 *
 * @param app Express app
 * @param wss the web-wss connection
 * @param route the default route
 */
function register(app, wss, route, options) {
    let settings = Object.assign({}, exports.Settings, options);
    (0, registerExpress_1.registerExpress)(app, route, settings);
    (0, registerWS_1.registerWS)(wss, settings);
}
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
    // remove leading and trailing slashes in the url
    name = (0, stripSlashes_1.default)(name);
    // if a callback function is given register it for each of the categories
    if (callback) {
        index_1.getEvent.on(name, callback);
        index_1.postEvent.on(name, callback);
        index_1.putEvent.on(name, callback);
        index_1.delEvent.on(name, callback);
    }
    // return a object to register listeners for specific event types
    let obj = {
        get: (callback) => {
            index_1.getEvent.on(name, callback);
            return obj;
        },
        post: (callback) => {
            index_1.postEvent.on(name, callback);
            return obj;
        },
        put: (callback) => {
            index_1.putEvent.on(name, callback);
            return obj;
        },
        delete: (callback) => {
            index_1.delEvent.on(name, callback);
            return obj;
        },
        snapshot: (callback) => {
            index_1.snapshotEvent.on(name, callback);
            return obj;
        }
    };
    return obj;
}
/**
 * Trigger a update event for any registered listeners
 *
 * @param api the api name to update for
 * @param extra the data to add
 */
function triggerSnapshot(api, extra) {
    // remove leading and trailing slashes from url
    api = (0, stripSlashes_1.default)(api);
    registerSnapshotRequest_1.registeredListeners.forEach(listener => {
        if (listener.name === api) {
            // set the extra event data
            listener.extra = extra;
            // trigger the event
            index_1.snapshotEvent.triggerEvent(listener);
        }
    });
}
//# sourceMappingURL=index.js.map