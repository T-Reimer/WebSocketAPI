"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var socket_1 = require("./socket");
var increment = 0;
exports.setOptions = {
    fetchUrl: "/api",
    websocketUrl: "/api",
    reconnect: true,
    url: {},
    maxSocketLength: 10000,
    unHandledWebSocketMessage: function (err, message) {
        console.group("Web Socket unhandled message");
        console.error(err);
        console.warn(message);
        console.groupEnd();
    }
};
/**
 * Setup the client side api with the correct parameters
 *
 * @param options the options for the client side application
 */
function setup(options) {
    Object.assign(exports.setOptions, options);
    var fetchUrl = new URL(exports.setOptions.fetchUrl, location.href);
    var websocketUrl = new URL(exports.setOptions.websocketUrl, location.href);
    // if the given url is a secure socket or if the main page is secure then use that protocol 
    if ((exports.setOptions.websocketUrl && /^wss:/.test(exports.setOptions.websocketUrl)) || location.protocol === "https:") {
        websocketUrl.protocol = "wss:"; // set to a secure protocol
    }
    else {
        websocketUrl.protocol = "ws:";
    }
    // set the modified urls
    exports.setOptions.fetchUrl = fetchUrl.href;
    exports.setOptions.websocketUrl = websocketUrl.href;
    socket_1.setup();
}
exports.setup = setup;
/**
 * Make a new api request
 *
 * @param api the api endpoint to call
 * @param body the data to include in the fetch call
 * @param options any options for the request
 */
function fetch(api, body, options) {
    return __awaiter(this, void 0, void 0, function () {
        var id, method;
        return __generator(this, function (_a) {
            id = ++increment;
            method = options && options.method ? options.method : "GET";
            switch (method) {
                case "GET":
                    return [2 /*return*/, get(id, api, body, options)];
                case "POST":
                    break;
                case "PUT":
                    break;
                case "DELETE":
                    break;
            }
            return [2 /*return*/];
        });
    });
}
exports.fetch = fetch;
function get(id, api, body, options) {
    return __awaiter(this, void 0, void 0, function () {
        var url, search, bodyString;
        return __generator(this, function (_a) {
            if ((options && options.use === "http") || !socket_1.ready) {
                url = new URL(exports.setOptions.fetchUrl + "/" + encodeURIComponent(id) + "/" + encodeURIComponent(api));
                search = url.search;
                if (search) {
                    // append the body to the url
                    search += "&";
                }
                bodyString = encodeURIComponent(JSON.stringify(body));
                if (bodyString.length + url.href.length > 2048) {
                    throw new Error("Body length to long. Please specify to use ws 'options.use = ws' or use a lesser body length. The max url length is 2048 characters.");
                }
                search += "body=" + bodyString;
                url.search = search;
                fetch(url.href, {
                    method: "GET"
                });
            }
            else {
            }
            return [2 /*return*/];
        });
    });
}
exports.get = get;
//# sourceMappingURL=index.js.map