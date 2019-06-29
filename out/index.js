"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Request_1 = require("./Request");
var index_1 = require("./events/index");
/**
 * Register the default route with express
 *
 * @param app Express app
 * @param socket the websocket connection
 * @param route the default route
 */
function register(app, socket, route) {
    registerExpress(app, route);
    registerWS(socket);
}
exports.default = register;
/**
 * Register the get and post requests from express
 *
 * @param app The express app
 */
function registerExpress(app, route) {
    var url = "/" + route.replace(/^\/|\/$/g, "") + "/:api";
    app.get(url, function (request, response) {
        var event = createExpressRequest(request, response);
        index_1.get.triggerEvent("test", event);
    });
    app.post(url, function (request, response) {
    });
    app.put(url, function (request, response) {
    });
    app.post(url, function (request, response) {
    });
    app.delete(url, function (request, response) {
    });
}
function createExpressRequest(req, res) {
    var newRequest = new Request_1.Request(req.body.id, req.body.content, "get");
    newRequest._send = function (value) {
        res.status(newRequest._status).send(value);
    };
    return newRequest;
}
/**
 * Register the web socket server to use as api
 *
 * @param socket The ws server object
 */
function registerWS(socket) {
}
//# sourceMappingURL=index.js.map