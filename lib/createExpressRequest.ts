import { Request } from "./Request";
import { SettingsInterface } from "./index";
/**
 *
 * @param req the request
 * @param res the response
 * @param settings the settings
 */
export function createExpressRequest(req: {
    params: {
        api: string;
        id: string;
    };
    body: object;
}, res: {
    status: Function;
}, method: string, settings: SettingsInterface) {

    let newRequest = new Request(req.params.id, req.params.api, req.body, method);
    newRequest._send = (value) => {
        res.status(newRequest._status).send(value);
    };
    return newRequest;
}
