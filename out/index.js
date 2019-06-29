"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./events/index");
var registerExpress_1 = require("./registerExpress");
var registerWS_1 = require("./registerWS");
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
 * @param wss the webwss connection
 * @param route the default route
 */
function register(app, wss, route, options) {
    var settings = Object.assign({}, exports.Settings, options);
    registerExpress_1.registerExpress(app, route, settings);
    registerWS_1.registerWS(wss, settings);
}
exports.register = register;
/**
 * Register a event listener for the name
 *
 * @param name the event name
 * @param callback the callback to run
 */
function on(name, callback) {
    index_1.getEvent.on(name, callback);
    index_1.postEvent.on(name, callback);
    index_1.putEvent.on(name, callback);
    index_1.delEvent.on(name, callback);
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
        }
    };
    return obj;
}
exports.on = on;
//# sourceMappingURL=index.js.map