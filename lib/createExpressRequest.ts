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
    let newRequest = new ServerRequest(req.params.id, name, req.body, method, null);

    newRequest.request = req;

    newRequest._send = (value: any) => {
        res.status(newRequest._status).send(value);
    };
    return newRequest;
}
