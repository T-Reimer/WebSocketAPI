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
        try {
            var event_1 = createExpressRequest_1.createExpressRequest(request, response, "get", settings);
            index_1.getEvent.triggerEvent(event_1);
        }
        catch (err) {
            /**
             * Set the status number for the error
             */
            var status_1 = 500;
            if (err.status) {
                status_1 = err.status;
            }
            response.status(status_1)
                .send({
                name: err.name,
                message: err.message
            });
        }
    });
    app.post(url, function (request, response) {
        try {
            var event_2 = createExpressRequest_1.createExpressRequest(request, response, "post", settings);
            index_1.postEvent.triggerEvent(event_2);
        }
        catch (err) {
            /**
             * Set the status number for the error
             */
            var status_2 = 500;
            if (err.status) {
                status_2 = err.status;
            }
            response.status(status_2)
                .send({
                name: err.name,
                message: err.message
            });
        }
    });
    app.put(url, function (request, response) {
        try {
            var event_3 = createExpressRequest_1.createExpressRequest(request, response, "put", settings);
            index_1.putEvent.triggerEvent(event_3);
        }
        catch (err) {
            /**
             * Set the status number for the error
             */
            var status_3 = 500;
            if (err.status) {
                status_3 = err.status;
            }
            response.status(status_3)
                .send({
                name: err.name,
                message: err.message
            });
        }
    });
    app.delete(url, function (request, response) {
        try {
            var event_4 = createExpressRequest_1.createExpressRequest(request, response, "delete", settings);
            index_1.delEvent.triggerEvent(event_4);
        }
        catch (err) {
            /**
             * Set the status number for the error
             */
            var status_4 = 500;
            if (err.status) {
                status_4 = err.status;
            }
            response.status(status_4)
                .send({
                name: err.name,
                message: err.message
            });
        }
    });
}
exports.registerExpress = registerExpress;
//# sourceMappingURL=registerExpress.js.map