"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./events/index");
var createExpressRequest_1 = require("./createExpressRequest");
var convertError_1 = require("./errors/convertError");
/**
 * Register the get and post requests from express
 *
 * @param app The express app
 */
function registerExpress(app, route, settings) {
    var url = "/" + route.replace(/^\/|\/$/g, "") + "/:id/:name";
    // register the Express js listeners
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
            // convert the error into an object to send to client
            var error = convertError_1.convertError(err);
            if (error.status) {
                status_1 = error.status;
            }
            // send the status and error
            response.status(status_1)
                .send(error);
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
            // convert the error into an object to send to client
            var error = convertError_1.convertError(err);
            if (error.status) {
                status_2 = error.status;
            }
            // send the status and error
            response.status(status_2)
                .send(error);
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
            // convert the error into an object to send to client
            var error = convertError_1.convertError(err);
            if (error.status) {
                status_3 = error.status;
            }
            // send the status and error
            response.status(status_3)
                .send(error);
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
            // convert the error into an object to send to client
            var error = convertError_1.convertError(err);
            if (error.status) {
                status_4 = error.status;
            }
            // send the status and error
            response.status(status_4)
                .send(error);
        }
    });
}
exports.registerExpress = registerExpress;
//# sourceMappingURL=registerExpress.js.map