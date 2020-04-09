import { Request } from "./../Request";
import RequestData from "./../RequestData";

import { send } from "./socket";
import stripUrlSlashes from "../stripSlashes";

export function createRequest(data: RequestData) {

    const { id, name, body, method } = data;

    const req = new Request(id, stripUrlSlashes(name), body, method);

    req._send = (value) => {
        return send(value);
    };

    return req;

}