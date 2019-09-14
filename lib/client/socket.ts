import { setOptions, requestOptions } from "./index";
import RequestData from "./../RequestData";

interface FetchEvent {
    id: number,
    resolve: Function,
    reject: Function
}

let events: FetchEvent[] = [];

export let socket: WebSocket | null = null;
export let ready: Boolean = false;

export function setup() {
    createNewConnection();
}

function createNewConnection() {
    // set ready state to false
    ready = false;
    if (socket && socket.readyState === socket.OPEN) {
        socket.close();
    }
    socket = new WebSocket(setOptions.websocketUrl);

    socket.addEventListener("open", () => {
        if (socket) {
            /**
             * Tell if the events are registered or not
             */
            let registered = false;
            socket.addEventListener("message", (event) => {

                // listen for the main start message
                if (!registered) {
                    try {
                        let data: { event: string } = JSON.parse(event.data);

                        if (data && data.event && data.event === "connection") {
                            // if the connection signal is received then send the data
                            // set the registered flag
                            registered = true;
                            // set the ready flag. After this is set then the websocket will be used for message events
                            ready = true;
                        } else {
                            // if the data wasn't the correct format then patch to the event
                            setOptions.websocketOnMessage(event.data);

                        }

                    } catch (err) {
                        // send the data to the before register event that was set in the options
                        setOptions.websocketOnMessage(event.data);
                    }

                } else {

                    //parse the message and trigger the events
                    try {
                        let data: RequestData = JSON.parse(event.data);

                        if (!data.id) {
                            throw new Error("Event id not found");
                        }

                        for (let i = 0; i < events.length; i++) {
                            let event = events[i];
                            if (event.id === data.id) {
                                if (data.error) {
                                    let error = new Error(data.error.message);
                                    error.name = data.error.name;
                                    event.reject(error);
                                } else {
                                    event.resolve(data);
                                }

                                // remove the event from list of waiting
                                events.splice(i, 1);

                                return;
                            }
                        }

                        // set the socket as ready
                        ready = true;

                    } catch (err) {
                        if (setOptions.unHandledWebSocketMessage) {
                            setOptions.unHandledWebSocketMessage(err, event.data);
                        }
                        throw err;
                    }
                }
            });

            socket.addEventListener("error", (error) => {
                ready = false;
                console.error(error);
            });

            socket.addEventListener("close", () => {
                ready = false;
                const timeout: number = typeof setOptions.reconnectTimeOut === "function" ? setOptions.reconnectTimeOut() : setOptions.reconnectTimeOut;

                // wait for a little before reconnecting
                // TODO: Set this time in the options
                setTimeout(createNewConnection, timeout);
            });
        } else {
            createNewConnection();
        }
    })
}

/**
 * Create a fetch request from the server
 * 
 * @param id The data request id
 * @param api the api endpoint
 * @param body the body to send to the server
 * @param options options for the request
 */
export function fetch(id: number, api: string, body?: any, options?: requestOptions): Promise<RequestData> {
    return new Promise((resolve, reject) => {
        try {
            let data: RequestData = {
                id,
                name: api,
                body: body,
                method: options && options.method ? options.method : "GET"
            };

            send(data);

            // register the event listener for the fetch return value
            events.push({
                id,
                reject,
                resolve
            });

        } catch (err) {
            reject(err);
        }
    });
}

/**
 * Send a payload to the server
 * 
 * @param body The data to send to the server
 */
export function send(body: object) {
    if (ready && socket) {
        socket.send(JSON.stringify(body));
    } else {
        throw new Error("Could not send the data");
    }
}