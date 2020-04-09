"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Request_1 = require("./../Request");
var socket_1 = require("./socket");
var stripSlashes_1 = __importDefault(require("../stripSlashes"));
function createRequest(data) {
    var id = data.id, name = data.name, body = data.body, method = data.method;
    var req = new Request_1.Request(id, stripSlashes_1.default(name), body, method);
    req._send = function (value) {
        return socket_1.send(value);
    };
    return req;
}
exports.createRequest = createRequest;
//# sourceMappingURL=createRequest.js.map