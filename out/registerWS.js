"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./events/index");
var createWSRequest_1 = require("./createWSRequest");
var wsClient_1 = require("./ws/wsClient");
var registerSnapshotRequest_1 = require("./snapShots/registerSnapshotRequest");
var convertError_1 = require("./errors/convertError");
var stripSlashes_1 = __importDefault(require("./stripSlashes"));
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
        if (!settings.onAuthKey) {
            // if there is no auth key function then register messages right away
            sendOpenMessage(ws, client, settings);
        }
        else {
            ws.on("message", function onMessage(message) {
                return __awaiter(this, void 0, void 0, function () {
                    var data, err_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 4, , 5]);
                                data = JSON.parse(message);
                                if (!(data.event === "auth")) return [3 /*break*/, 2];
                                return [4 /*yield*/, settings.onAuthKey(data.key, client, ws, req)];
                            case 1:
                                if (_a.sent()) {
                                    // register the api to start receiving events
                                    sendOpenMessage(ws, client, settings);
                                    ws.removeEventListener("message", onMessage);
                                }
                                else {
                                    // disconnect. Authentication error
                                    return [2 /*return*/, sendAuthFailed(ws)];
                                }
                                return [3 /*break*/, 3];
                            case 2: 
                            // disconnect. Authentication error
                            return [2 /*return*/, sendAuthFailed(ws)];
                            case 3: return [3 /*break*/, 5];
                            case 4:
                                err_1 = _a.sent();
                                // disconnect. Authentication error
                                return [2 /*return*/, sendAuthFailed(ws)];
                            case 5: return [2 /*return*/];
                        }
                    });
                });
            });
        }
    });
}
exports.registerWS = registerWS;
/**
 * Send the auth failed event and terminate the connection
 *
 * @param ws
 */
function sendAuthFailed(ws) {
    var failed = { event: "auth-failed" };
    try {
        ws.send(JSON.stringify(failed));
    }
    catch (err) { }
    ws.terminate();
}
function sendOpenMessage(ws, client, settings) {
    // send a Open connection event to tell the api on client side to start listening
    try {
        ws.send(JSON.stringify({ event: "connection" }));
    }
    catch (err) {
        // disconnect the client
        ws.terminate();
    }
    // register the on message event once the authentication is complete
    ws.on('message', function incoming(message) {
        var request = null;
        try {
            if (settings.maxLength && message.length <= settings.maxLength) {
                // parse the message to create a event
                var data = JSON.parse(message);
                request = data;
                if (data.method) {
                    // create a event to dispatch
                    var event_1 = createWSRequest_1.createWSRequest(client, data.id, stripSlashes_1.default(data.name), data.body, data.method, settings);
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
                        case "SNAPSHOT":
                            if (data.unregister) {
                                registerSnapshotRequest_1.unregisterSnapshotRequest(data);
                            }
                            else {
                                registerSnapshotRequest_1.registerSnapshotRequest(data, event_1, settings);
                            }
                            break;
                    }
                }
                else {
                    // if the method is not set then its a return data event
                    for (var i = 0; i < client.events.length; i++) {
                        var event_2 = client.events[i];
                        // find the event with the same id
                        if (event_2.id === data.id) {
                            // if there is an error then reject the promise
                            if (data.error) {
                                var error = new Error(data.error.message);
                                error.name = data.error.name;
                                event_2.reject(error);
                            }
                            else {
                                // resolve the promise with supplied data
                                event_2.resolve(data);
                            }
                            // remove the event from list of waiting
                            client.events.splice(i, 1);
                            // exit out
                            return;
                        }
                    }
                }
            }
        }
        catch (err) {
            if (settings.on.error) {
                settings.on.error(err, message);
            }
            else {
                /**
                 * Set the status number for the error
                 */
                var status_1 = 500;
                // convert the error into an object to send to client
                var error = convertError_1.convertError(err);
                if (error.status) {
                    status_1 = error.status;
                }
                else {
                    error.status = status_1;
                }
                var response = {
                    id: request && request.id || 0,
                    name: request && request.name || "",
                    error: error,
                    status: status_1
                };
                ws.send(JSON.stringify(response));
            }
        }
    });
}
//# sourceMappingURL=registerWS.js.map