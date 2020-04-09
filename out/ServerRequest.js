"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Request_1 = require("./Request");
/**
 * A simple api request
 *
 */
var ServerRequest = /** @class */ (function (_super) {
    __extends(ServerRequest, _super);
    function ServerRequest(id, name, body, method, client) {
        var _this = _super.call(this, id, name, body, method) || this;
        if (client) {
            /**
             * Set the client var
             */
            _this.client = client;
            /**
             * the express request for the api request
             */
            _this.request = client.request;
            /**
             * the web socket request for the api request
             */
            _this.WebSocket = client.WebSocket;
        }
        else {
            _this.client = null;
            _this.request = null;
            _this.WebSocket = null;
        }
        return _this;
    }
    return ServerRequest;
}(Request_1.Request));
exports.ServerRequest = ServerRequest;
//# sourceMappingURL=ServerRequest.js.map