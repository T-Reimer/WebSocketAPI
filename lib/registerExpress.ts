import { Application } from "express";
import { getEvent, postEvent, putEvent, delEvent } from "./events/index";
import { SettingsInterface } from "./index";
import { createExpressRequest } from "./createExpressRequest";
/**
 * Register the get and post requests from express
 *
 * @param app The express app
 */
export function registerExpress(app: Application, route: string, settings: SettingsInterface) {
    const url = `/${route.replace(/^\/|\/$/g, "")}/:id/:name`;
    app.get(url, (request, response) => {
        try {
            let event = createExpressRequest(request, response, "get", settings);
            getEvent.triggerEvent(event);
        } catch (err) {

            /**
             * Set the status number for the error
             */
            let status: number = 500;

            if (err.status) {
                status = err.status;
            }

            response.status(status)
                .send({
                    name: err.name,
                    message: err.message
                });
        }
    });
    app.post(url, (request, response) => {
        try {
            let event = createExpressRequest(request, response, "post", settings);
            postEvent.triggerEvent(event);
        } catch (err) {

            /**
             * Set the status number for the error
             */
            let status: number = 500;

            if (err.status) {
                status = err.status;
            }

            response.status(status)
                .send({
                    name: err.name,
                    message: err.message
                });
        }
    });
    app.put(url, (request, response) => {
        try {
            let event = createExpressRequest(request, response, "put", settings);
            putEvent.triggerEvent(event);
        } catch (err) {

            /**
             * Set the status number for the error
             */
            let status: number = 500;

            if (err.status) {
                status = err.status;
            }

            response.status(status)
                .send({
                    name: err.name,
                    message: err.message
                });
        }

    });
    app.delete(url, (request, response) => {
        try {
            let event = createExpressRequest(request, response, "delete", settings);
            delEvent.triggerEvent(event);
        } catch (err) {

            /**
             * Set the status number for the error
             */
            let status: number = 500;

            if (err.status) {
                status = err.status;
            }

            response.status(status)
                .send({
                    name: err.name,
                    message: err.message
                });
        }
    });
}