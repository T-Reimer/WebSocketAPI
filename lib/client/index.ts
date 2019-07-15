const globalFetch = window.fetch;

import { setup as socketSetup, ready as socketReady, fetch as socketFetch, socket, send } from "./socket";
import RequestData from "./../RequestData";

interface Options {
    fetchUrl: string,
    websocketUrl: string,
    websocketOnMessage: Function,
    reconnect: boolean | null | Function,
    url: object,
    maxSocketLength: number, // the max length that the request is sent over websocket vs fetch request
    reconnectTimeOut: number | Function, // set the function to only return a number
    unHandledWebSocketMessage?: Function
}

let increment = 0;
export const setOptions: Options = {
    fetchUrl: "/api",
    websocketUrl: "/api",
    websocketOnMessage: (message: string) => { console.group("Unregistered Event"); console.log(message); console.groupEnd(); },
    reconnect: true,
    url: {},
    maxSocketLength: 10000,
    reconnectTimeOut: 500,
    unHandledWebSocketMessage: (err: Error, message: string) => {
        console.group("Web Socket unhandled message");
        console.error(err);
        console.warn(message);
        console.groupEnd();
    }
};


/**
 * Setup the client side api with the correct parameters
 * 
 * @param options the options for the client side application
 */
export function setup(options: Options) {
    Object.assign(setOptions, options);

    const fetchUrl = new URL(setOptions.fetchUrl, location.href);
    const websocketUrl = new URL(setOptions.websocketUrl, location.href);

    // if the given url is a secure socket or if the main page is secure then use that protocol 
    if ((setOptions.websocketUrl && /^wss:/.test(setOptions.websocketUrl)) || location.protocol === "https:") {
        websocketUrl.protocol = "wss:"; // set to a secure protocol
    } else {
        websocketUrl.protocol = "ws:";
    }

    // set the modified urls
    setOptions.fetchUrl = fetchUrl.href;
    setOptions.websocketUrl = websocketUrl.href;

    socketSetup();
}

export interface requestOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE",
    use?: "ws" | "http"
}

export function api(api: string) {
    return {
        get: async (body: any, options?: requestOptions) => {
            options = options ? options : {};
            options.method = "GET";

            return await fetch(api, body, options);
        },
        post: async (body: any, options?: requestOptions) => {
            options = options ? options : {};
            options.method = "POST";

            return await fetch(api, body, options);
        },
        put: async (body: any, options?: requestOptions) => {
            options = options ? options : {};
            options.method = "PUT";

            return await fetch(api, body, options);
        },
        delete: async (body: any, options?: requestOptions) => {
            options = options ? options : {};
            options.method = "DELETE";

            return await fetch(api, body, options);
        }
    }
}

/**
 * Make a new api request
 * 
 * @param api the api endpoint to call
 * @param body the data to include in the fetch call
 * @param options any options for the request
 */
export async function fetch(api: string, body?: any, options?: requestOptions): Promise<any> {
    let id = ++increment;
    let method = options && options.method ? options.method : "GET";

    switch (method) {

        case "POST":
            return await sendData(id, api, body, options);

        case "PUT":
            return await sendData(id, api, body, options);

        case "DELETE":
            return await getData(id, api, body, options);

        case "GET":
        default:
            return await getData(id, api, body, options);
    }

}

/**
 * Request a get or delete
 * 
 */
async function getData(id: number, api: string, body?: any, options?: requestOptions): Promise<any> {

    console.log("id", id);
    console.log("api", api);
    console.log("body", id);

    if ((options && options.use === "http") || !socketReady) {
        let url = new URL(`${setOptions.fetchUrl}/${encodeURIComponent(id)}/${encodeURIComponent(api)}`);
        let search = url.search;

        if (search) {
            // append the body to the url
            search += "&";
        }
        let bodyString = encodeURIComponent(JSON.stringify(body));
        if (bodyString.length + url.href.length > 2048) {
            console.log(bodyString, url.href);
            throw new Error("Body length to long. Please specify to use ws 'options.use = ws' or use a lesser body length. The max url length is 2048 characters.");
        }
        search += `body=${bodyString}`;
        url.search = search;

        // send the request to the server
        let request = await globalFetch(url.href, {
            method: options && options.method ? options.method : "GET"
        });

        let data: RequestData = await request.json();
        return data.body;
    } else {

        // get from web socket
        let data: RequestData = await socketFetch(id, api, body, options);
        return data.body;
    }

}

/**
 * Send any post or put data
 * 
 */
async function sendData(id: number, api: string, body?: any, options?: requestOptions): Promise<any> {

    if ((options && options.use === "http") || !socketReady) {
        // use the http request instead of web socket
        const url = `${setOptions.fetchUrl}/${encodeURIComponent(id)}/${encodeURIComponent(api)}`;

        let request = await globalFetch(url, {
            method: options && options.method ? options.method : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: body
        });

        let data: RequestData = await request.json();
        return data.body;
    } else {

        // get from web socket
        let data: RequestData = await socketFetch(id, api, body, options);
        return data.body;
    }
}