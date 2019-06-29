"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A simple api request
 *
 */
var Request = /** @class */ (function () {
    function Request(id, body, method) {
        this.id = id;
        // set the body 
        this.body = body;
        // set the method
        this.method = method.toUpperCase();
        /**
         * the main status for the request
         */
        this._status = 200;
        this._send = function (value) { };
    }
    /**
     * Set the request status code
     *
     * @param code The status code
     */
    Request.prototype.status = function (code) {
        this._status = code;
        return this;
    };
    /**
     * Send a repsonse to the client
     *
     * @param value The value to send to client
     */
    Request.prototype.send = function (value) {
        if (value instanceof Error) {
            this._send({
                id: this.id,
                status: this._status === 200 ? 500 : this._status,
                content: null,
                error: {
                    name: value.name,
                    message: value.message
                }
            });
        }
        else {
            this._send({
                id: this.id,
                status: this._status,
                content: value,
                error: false
            });
        }
        return this;
    };
    return Request;
}());
exports.Request = Request;
//# sourceMappingURL=Request.js.map