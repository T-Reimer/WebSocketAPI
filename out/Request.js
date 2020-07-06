"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A simple api request
 *
 */
var Request = /** @class */ (function () {
    function Request(id, name, body, method) {
        /**
         * The event id
         */
        this.id = id;
        /**
         * The name of the event
         */
        this.name = name;
        /**
         * The main body for the request
         */
        this.body = body;
        /**
         * Set the request method
         */
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
     * Send a response to the client
     *
     * @param value The value to send to client
     */
    Request.prototype.send = function (value) {
        if (value instanceof Error) {
            this._send({
                id: this.id,
                status: this._status === 200 ? 500 : this._status,
                body: null,
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
                body: value,
                error: false
            });
        }
        return this;
    };
    return Request;
}());
exports.Request = Request;
//# sourceMappingURL=Request.js.map