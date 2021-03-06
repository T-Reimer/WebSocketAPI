"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./events/index");
var createExpressRequest_1 = require("./createExpressRequest");
var convertError_1 = require("./errors/convertError");
var stripSlashes_1 = __importDefault(require("./stripSlashes"));
/**
 * Register the get and post requests from express
 *
 * @param app The express app
 */
function registerExpress(app, route, settings) {
    var url = "/" + stripSlashes_1.default(route) + "/:id/*";
    // register the Express js listeners
    app.get(url, function (request, response) {
        var id = request.params.id;
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
            var responseData = {
                id: id || 0,
                name: "",
                error: error,
                status: status_1
            };
            // send the status and error
            response.status(status_1)
                .send(responseData);
        }
    });
    app.post(url, function (request, response) {
        var id = request.params.id;
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
            var responseData = {
                id: id || 0,
                name: "",
                error: error,
                status: status_2
            };
            // send the status and error
            response.status(status_2)
                .send(responseData);
        }
    });
    app.put(url, function (request, response) {
        var id = request.params.id;
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
            var responseData = {
                id: id || 0,
                name: "",
                error: error,
                status: status_3
            };
            // send the status and error
            response.status(status_3)
                .send(responseData);
        }
    });
    app.delete(url, function (request, response) {
        var id = request.params.id;
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
            var responseData = {
                id: id || 0,
                name: "",
                error: error,
                status: status_4
            };
            // send the status and error
            response.status(status_4)
                .send(responseData);
        }
    });
}
exports.registerExpress = registerExpress;
//# sourceMappingURL=registerExpress.js.map