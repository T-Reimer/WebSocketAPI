"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ServerRequest_1 = require("./ServerRequest");
var stripSlashes_1 = __importDefault(require("./stripSlashes"));
/**
 *
 * @param req the request
 * @param res the response
 * @param settings the settings
 */
function createExpressRequest(req, res, method, settings) {
    var name = stripSlashes_1.default(req.params['0']);
    var newRequest = new ServerRequest_1.ServerRequest(req.params.id, name, req.body, method, null);
    newRequest.request = req;
    newRequest._send = function (value) {
        res.status(newRequest._status).send(value);
    };
    return newRequest;
}
exports.createExpressRequest = createExpressRequest;
//# sourceMappingURL=createExpressRequest.js.map