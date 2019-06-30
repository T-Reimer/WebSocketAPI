"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./events/index");
var createExpressRequest_1 = require("./createExpressRequest");
/**
 * Register the get and post requests from express
 *
 * @param app The express app
 */
function registerExpress(app, route, settings) {
    var url = "/" + route.replace(/^\/|\/$/g, "") + "/:id/:name";
    app.get(url, function (request, response) {
        var event = createExpressRequest_1.createExpressRequest(request, response, "get", settings);
        index_1.getEvent.triggerEvent(event);
    });
    app.post(url, function (request, response) {
        var event = createExpressRequest_1.createExpressRequest(request, response, "post", settings);
        index_1.postEvent.triggerEvent(event);
    });
    app.put(url, function (request, response) {
        var event = createExpressRequest_1.createExpressRequest(request, response, "put", settings);
        index_1.putEvent.triggerEvent(event);
    });
    app.delete(url, function (request, response) {
        var event = createExpressRequest_1.createExpressRequest(request, response, "delete", settings);
        index_1.delEvent.triggerEvent(event);
    });
}
exports.registerExpress = registerExpress;
//# sourceMappingURL=registerExpress.js.map