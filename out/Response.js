"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Response = /** @class */ (function () {
    function Response(setStatus, setSend) {
        // set the status function
        this._status = setStatus;
        this._send = setSend;
    }
    Response.prototype.status = function (val) {
        this._status(val);
        return this;
    };
    Response.prototype.send = function (val) {
        this._send(val);
        return this;
    };
    return Response;
}());
exports.Response = Response;
//# sourceMappingURL=Response.js.map