"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServerRequest_1 = require("./ServerRequest");
/**
 *
 * @param req the request
 * @param res the response
 * @param settings the settings
 */
function createExpressRequest(req, res, method, settings) {
    var newRequest = new ServerRequest_1.ServerRequest(req.params.id, req.params.name, req.body, method, null);
    newRequest.request = req;
    newRequest._send = function (value) {
        res.status(newRequest._status).send(value);
    };
    return newRequest;
}
exports.createExpressRequest = createExpressRequest;
//# sourceMappingURL=createExpressRequest.js.map