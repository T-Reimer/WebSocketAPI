/**
 * A simple api request
 * 
 */
export class Request {
    id: number;
    name: string;
    body: object;
    method: string;
    _status: number;
    _send: (value: any) => void;

    constructor(id: number, name: string, body: object, method: string) {

        /**
         * The event id
         */
        this.id = id;

        /**
         * The name of the event
         */
        this.name = name;

        /**
         * The main body for the request
         */
        this.body = body;

        /**
         * Set the request method
         */
        this.method = method.toUpperCase();

        /**
         * the main status for the request
         */
        this._status = 200;

        this._send = (value: any) => { };

    }

    /**
     * Set the request status code
     * 
     * @param code The status code
     */
    status(code: number) {
        this._status = code;
        return this;
    }

    /**
     * Send a response to the client
     * 
     * @param value The value to send to client
     */
    send(value: any) {

        if (value instanceof Error) {
            this._send({
                id: this.id,
                status: this._status === 200 ? 500 : this._status,
                body: null,
                error: {
                    name: value.name,
                    message: value.message
                }
            });
        } else {
            this._send({
                id: this.id,
                status: this._status,
                body: value,
                error: false
            });
        }
        return this;
    }
}