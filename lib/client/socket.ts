import { setOptions, requestOptions } from "./index";
import RequestData, { ResponseData } from "./../RequestData";
import { createRequest } from "./createRequest";
import { getEvent, postEvent, putEvent, delEvent } from "./../events/index";
import { TimeoutError } from "../errors/timeoutError";

interface FetchEvent {
    id: number,
    unregister: boolean,
    resolve: (data: RequestData) => void,
    reject: Function
}

let events: FetchEvent[] = [];

// list of functions to fire when the state of the websocket changes
export type stateChangeEvent = "CONNECTED" | "DISCONNECTED" | "ERROR" | "READY";
export const stateChangeEvents: ((state: stateChangeEvent) => void)[] = [];

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

                            stateChangeEvents.forEach(callback => callback("READY"));
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
                        let data = <RequestData>JSON.parse(event.data);

                        if (!data.id) {
                            throw new Error("Event id not found");
                        }

                        if (data.method) {
                            // if a method was received with the request then its a server side request
                            // create a event to dispatch
                            let event = createRequest(data);

                            switch (data.method) {
                                case "GET":
                                    getEvent.triggerEvent(event);
                                    break;
                                case "POST":
                                    postEvent.triggerEvent(event);
                                    break;
                                case "PUT":
                                    putEvent.triggerEvent(event);
                                    break;
                                case "DELETE":
                                    delEvent.triggerEvent(event);
                                    break;
                            }

                        } else {
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

                                    if (event.unregister) {
                                        // remove the event from list of waiting
                                        events.splice(i, 1);
                                    }

                                    return;
                                }
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

                stateChangeEvents.forEach(callback => callback("ERROR"));
            });

            socket.addEventListener("close", () => {
                ready = false;
                const timeout: number = typeof setOptions.reconnectTimeOut === "function" ? setOptions.reconnectTimeOut() : setOptions.reconnectTimeOut;

                // wait for a little before reconnecting
                // TODO: Set this time in the options
                setTimeout(createNewConnection, timeout);
                stateChangeEvents.forEach(callback => callback("DISCONNECTED"));
            });

            stateChangeEvents.forEach(callback => callback("CONNECTED"));
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

        // set a timeout
        if (options?.timeout) {
            setTimeout(() => {
                reject(new TimeoutError("Request to server timed out!"));
            }, options.timeout);
        }

        try {
            // create the request to send to websocket server
            let data: RequestData = {
                id,
                name: api,
                body: body,
                method: options && options.method ? options.method : "GET"
            };

            // send the data to server
            send(data);

            // register the event listener for the fetch return value
            events.push({
                id,
                unregister: true,
                reject,
                resolve
            });

        } catch (err) {
            reject(err);
        }
    });
}


/**
 * Register a event to fire each time that id gets sent
 * 
 * Returns a function to unregister the event
 * 
 * @param id the event id to use
 * @param api the api string
 * @param body the request body to send to the server
 * @param callback the callback to run on each message
 */
export function registerSnapshot(id: number, api: string, body: any, callback: (data: RequestData) => void) {

    let data: RequestData = {
        id,
        name: api,
        body: body,
        method: "SNAPSHOT",
    };

    send(data);

    const unregister = () => {
        for (let i = events.length - 1; i >= 0; i--) {
            if (events[i].id === id) {
                events.splice(i, 1);
            }
        }
    };

    events.push({
        id,
        unregister: false,
        reject: () => { },
        resolve: (data) => {
            callback(data);
        },
    });

    // return a function to unregister
    return unregister;
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