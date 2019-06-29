"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Request_1 = require("./Request");
/**
 *
 * @param req the request
 * @param res the response
 * @param settings the settings
 */
function createExpressRequest(req, res, method, settings) {
    var newRequest = new Request_1.Request(req.params.id, req.params.api, req.body, method);
    newRequest._send = function (value) {
        res.status(newRequest._status).send(value);
    };
    return newRequest;
}
exports.createExpressRequest = createExpressRequest;
//# sourceMappingURL=createExpressRequest.js.map