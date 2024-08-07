import { Request as ExpressRequest, Response as ExpressResponse } from "express";
import { SettingsInterface } from "./index";

import { ServerRequest } from "./ServerRequest";
import stripUrlSlashes from "./stripSlashes";

/**
 *
 * @param req the request
 * @param res the response
 * @param settings the settings
 */
export function createExpressRequest(req: ExpressRequest, res: ExpressResponse, method: string, settings: SettingsInterface) {

    const name = stripUrlSlashes(req.params['0']);

    // get the request body contents
    const body = (req.method === "GET" || req.method === "DELETE") && req.query.body ? (req.query.body === "undefined" ? undefined : JSON.parse(req.query.body as string)) : req.body;

    // create the new request
    let newRequest = new ServerRequest(parseInt(req.params.id), name, body, method, null);
    // call the metric start function
    settings.on.eventReceived(newRequest);

    newRequest.request = req;

    newRequest._send = (value: any) => {
        res.status(newRequest._status).send(value);

        // ping a event completed value
        settings.on.eventCompleted(newRequest);
    };
    return newRequest;
}
