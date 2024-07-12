"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRequest = createRequest;
const Request_1 = require("./../Request");
const socket_1 = require("./socket");
const stripSlashes_1 = __importDefault(require("../stripSlashes"));
function createRequest(data) {
    const { id, name, body, method } = data;
    const req = new Request_1.Request(id, (0, stripSlashes_1.default)(name), body, method);
    req._send = (value) => {
        return (0, socket_1.send)(value);
    };
    return req;
}
//# sourceMappingURL=createRequest.js.map