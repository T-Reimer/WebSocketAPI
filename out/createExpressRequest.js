"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExpressRequest = createExpressRequest;
const ServerRequest_1 = require("./ServerRequest");
const stripSlashes_1 = __importDefault(require("./stripSlashes"));
/**
 *
 * @param req the request
 * @param res the response
 * @param settings the settings
 */
function createExpressRequest(req, res, method, settings) {
    const name = (0, stripSlashes_1.default)(req.params['0']);
    // get the request body contents
    const body = (req.method === "GET" || req.method === "DELETE") && req.query.body ? (req.query.body === "undefined" ? undefined : JSON.parse(req.query.body)) : req.body;
    // create the new request
    let newRequest = new ServerRequest_1.ServerRequest(parseInt(req.params.id), name, body, method, null);
    // call the metric start function
    settings.on.eventReceived(newRequest);
    newRequest.request = req;
    newRequest._send = (value) => {
        res.status(newRequest._status).send(value);
        // ping a event completed value
        settings.on.eventCompleted(newRequest);
    };
    return newRequest;
}
//# sourceMappingURL=createExpressRequest.js.map