import { setup as socketSetup, ready as socketReady } from "./socket";

interface Options {
    fetchUrl: string,
    websocketUrl: string,
    reconnect: boolean | null | Function,
    url: object,
    maxSocketLength: number, // the max length that the request is sent over websocket vs fetch request
    unHandledWebSocketMessage?: Function
}

let increment = 0;
export const setOptions: Options = {
    fetchUrl: "/api",
    websocketUrl: "/api",
    reconnect: true,
    url: {},
    maxSocketLength: 10000,
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

/**
 * Make a new api request
 * 
 * @param api the api endpoint to call
 * @param body the data to include in the fetch call
 * @param options any options for the request
 */
export async function fetch(api: string, body?: any, options?: requestOptions) {
    let id = ++increment;
    let method = options && options.method ? options.method : "GET";

    switch (method) {

        case "GET":
            return get(id, api, body, options);

        case "POST":

            break;

        case "PUT":

            break;

        case "DELETE":

            break;

    }

}


export async function get(id: number, api: string, body?: any, options?: requestOptions) {

    if ((options && options.use === "http") || !socketReady) {
        let url = new URL(`${setOptions.fetchUrl}/${encodeURIComponent(id)}/${encodeURIComponent(api)}`);
        let search = url.search;

        if (search) {
            // append the body to the url
            search += "&";
        }
        let bodyString = encodeURIComponent(JSON.stringify(body));
        if (bodyString.length + url.href.length > 2048) {
            throw new Error("Body length to long. Please specify to use ws 'options.use = ws' or use a lesser body length. The max url length is 2048 characters.");
        }
        search += `body=${bodyString}`;

        url.search = search;

        fetch(url.href, {
            method: "GET"
        })
    } else {


    }

}