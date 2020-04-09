/**
 * A simple api request
 *
 */
export declare class Request {
    id: number;
    name: string;
    body: object;
    method: string;
    _status: number;
    _send: (value: any) => void;
    constructor(id: number, name: string, body: object, method: string);
    /**
     * Set the request status code
     *
     * @param code The status code
     */
    status(code: number): this;
    /**
     * Send a response to the client
     *
     * @param value The value to send to client
     */
    send(value: any): this;
}
