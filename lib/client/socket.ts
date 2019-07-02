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
    if (socket && socket.readyState === socket.OPEN) {
        socket.close();
    }
    socket = new WebSocket(setOptions.websocketUrl);

    socket.addEventListener("open", () => {
        if (socket) {
            ready = true;
            socket.addEventListener("message", (event) => {

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
                                event.resolve(data.body);
                            }

                            // remove the event from list of waiting
                            events.splice(i, 1);

                            return;
                        }
                    }
                } catch (err) {
                    if (setOptions.unHandledWebSocketMessage) {
                        setOptions.unHandledWebSocketMessage(err, event.data);
                    }
                    throw err;
                }
            });

            socket.addEventListener("error", (error) => {
                ready = false;
                console.error(error);
            });

            socket.addEventListener("close", () => {
                ready = false;
                createNewConnection();
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
export function fetch(id: number, api: string, body?: any, options?: requestOptions) {
    return new Promise((resolve, reject) => {
        try {
            let data: RequestData = {
                id,
                name: api,
                body: body,
                method: "GET"
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