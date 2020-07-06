import { Application } from "express";
import { getEvent, postEvent, putEvent, delEvent } from "./events/index";
import { SettingsInterface } from "./index";
import { createExpressRequest } from "./createExpressRequest";
import { convertError } from "./errors/convertError";
import { ResponseData } from "./RequestData";
import stripUrlSlashes from "./stripSlashes";
/**
 * Register the get and post requests from express
 *
 * @param app The express app
 */
export function registerExpress(app: Application, route: string, settings: SettingsInterface) {
    const url = `/${stripUrlSlashes(route)}/:id/*`;

    // register the Express js listeners
    app.get(url, (request, response) => {
        let { id } = request.params;

        try {
            let event = createExpressRequest(request, response, "get", settings);
            getEvent.triggerEvent(event);
        } catch (err) {

            /**
             * Set the status number for the error
             */
            let status: number = 500;
            // convert the error into an object to send to client
            const error = convertError(err);
            if (error.status) {
                status = error.status;
            }

            const responseData: ResponseData = {
                id: id || 0,
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
            let event = createExpressRequest(request, response, "post", settings);
            postEvent.triggerEvent(event);
        } catch (err) {

            /**
             * Set the status number for the error
             */
            let status: number = 500;
            // convert the error into an object to send to client
            const error = convertError(err);
            if (error.status) {
                status = error.status;
            }

            const responseData: ResponseData = {
                id: id || 0,
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
            let event = createExpressRequest(request, response, "put", settings);
            putEvent.triggerEvent(event);
        } catch (err) {

            /**
             * Set the status number for the error
             */
            let status: number = 500;
            // convert the error into an object to send to client
            const error = convertError(err);
            if (error.status) {
                status = error.status;
            }

            const responseData: ResponseData = {
                id: id || 0,
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
            let event = createExpressRequest(request, response, "delete", settings);
            delEvent.triggerEvent(event);
        } catch (err) {

            /**
             * Set the status number for the error
             */
            let status: number = 500;
            // convert the error into an object to send to client
            const error = convertError(err);
            if (error.status) {
                status = error.status;
            }

            const responseData: ResponseData = {
                id: id || 0,
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