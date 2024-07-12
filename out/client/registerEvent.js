"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerEvent = registerEvent;
const index_1 = require("./../events/index");
const stripSlashes_1 = __importDefault(require("../stripSlashes"));
/**
 * Register a event listener for events sent from the server
 *
 * @param name The api name
 * @param callback the callback function
 */
function registerEvent(name, callback) {
    // remove the leading and trailing slashes from the url
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
        }
    };
    return obj;
}
//# sourceMappingURL=registerEvent.js.map