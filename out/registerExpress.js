"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerExpress = registerExpress;
const index_1 = require("./events/index");
const createExpressRequest_1 = require("./createExpressRequest");
const convertError_1 = require("./errors/convertError");
const stripSlashes_1 = __importDefault(require("./stripSlashes"));
/**
 * Register the get and post requests from express
 *
 * @param app The express app
 */
function registerExpress(app, route, settings) {
    const url = `/${(0, stripSlashes_1.default)(route)}/:id/*`;
    // register the Express js listeners
    app.get(url, (request, response) => {
        let { id } = request.params;
        try {
            let event = (0, createExpressRequest_1.createExpressRequest)(request, response, "get", settings);
            index_1.getEvent.triggerEvent(event);
        }
        catch (err) {
            /**
             * Set the status number for the error
             */
            let status = 500;
            // convert the error into an object to send to client
            const error = (0, convertError_1.convertError)(err);
            if (error.status) {
                status = error.status;
            }
            const responseData = {
                id: parseInt(id) || 0,
                name: "",
                error,
                status
            };
            // send the status and error
            response.status(status)
                .send(responseData);
        }
    });
    app.post(url, (request, response) => {
        let { id } = request.params;
        try {
            let event = (0, createExpressRequest_1.createExpressRequest)(request, response, "post", settings);
            index_1.postEvent.triggerEvent(event);
        }
        catch (err) {
            /**
             * Set the status number for the error
             */
            let status = 500;
            // convert the error into an object to send to client
            const error = (0, convertError_1.convertError)(err);
            if (error.status) {
                status = error.status;
            }
            const responseData = {
                id: parseInt(id) || 0,
                name: "",
                error,
                status
            };
            // send the status and error
            response.status(status)
                .send(responseData);
        }
    });
    app.put(url, (request, response) => {
        let { id } = request.params;
        try {
            let event = (0, createExpressRequest_1.createExpressRequest)(request, response, "put", settings);
            index_1.putEvent.triggerEvent(event);
        }
        catch (err) {
            /**
             * Set the status number for the error
             */
            let status = 500;
            // convert the error into an object to send to client
            const error = (0, convertError_1.convertError)(err);
            if (error.status) {
                status = error.status;
            }
            const responseData = {
                id: parseInt(id) || 0,
                name: "",
                error,
                status
            };
            // send the status and error
            response.status(status)
                .send(responseData);
        }
    });
    app.delete(url, (request, response) => {
        let { id } = request.params;
        try {
            let event = (0, createExpressRequest_1.createExpressRequest)(request, response, "delete", settings);
            index_1.delEvent.triggerEvent(event);
        }
        catch (err) {
            /**
             * Set the status number for the error
             */
            let status = 500;
            // convert the error into an object to send to client
            const error = (0, convertError_1.convertError)(err);
            if (error.status) {
                status = error.status;
            }
            const responseData = {
                id: parseInt(id) || 0,
                name: "",
                error,
                status
            };
            // send the status and error
            response.status(status)
                .send(responseData);
        }
    });
}
//# sourceMappingURL=registerExpress.js.map