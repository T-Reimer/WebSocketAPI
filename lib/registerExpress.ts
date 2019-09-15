import { Application } from "express";
import { getEvent, postEvent, putEvent, delEvent } from "./events/index";
import { SettingsInterface } from "./index";
import { createExpressRequest } from "./createExpressRequest";
import { convertError } from "./errors/convertError";
/**
 * Register the get and post requests from express
 *
 * @param app The express app
 */
export function registerExpress(app: Application, route: string, settings: SettingsInterface) {
    const url = `/${route.replace(/^\/|\/$/g, "")}/:id/:name`;

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

            // set the id if its available
            if (id) {
                error.id = id;
            }

            // send the status and error
            response.status(status)
                .send(error);
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

            // set the id if its available
            if (id) {
                error.id = id;
            }

            // send the status and error
            response.status(status)
                .send(error);
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

            // set the id if its available
            if (id) {
                error.id = id;
            }

            // send the status and error
            response.status(status)
                .send(error);
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

            // set the id if its available
            if (id) {
                error.id = id;
            }

            // send the status and error
            response.status(status)
                .send(error);
        }
    });
}