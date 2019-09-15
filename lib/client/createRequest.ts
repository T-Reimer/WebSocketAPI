import { Request } from "./../Request";
import RequestData from "./../RequestData";

import { send } from "./socket";

export function createRequest(data: RequestData) {

    const { id, name, body, method } = data;

    const req = new Request(id, name, body, method);

    req._send = (value) => {
        return send(value);
    };

    return req;

}