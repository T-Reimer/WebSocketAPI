import { Application } from "express";
import WebSocket from "ws";

import { Request } from "./Request";
import { getEvent, postEvent, putEvent, delEvent } from "./events/index";
console.log(getEvent, postEvent, putEvent, delEvent);

interface Settings {
    maxLength?: number, // the max upload length to automatically parse
    on: {
        error: Function
    }
}

/**
 * the default settings object
 */
const Settings = {
    maxLength: 10000,
    on: {}
}

/**
 * Register the default route with express
 * 
 * @param app Express app
 * @param wss the webwss connection
 * @param route the default route
 */
export default function register(app: Application, wss: WebSocket.Server, route: string, options: Settings) {

    let settings = Object.assign({}, Settings, options);

    registerExpress(app, route, settings);

    registerWS(wss, settings);

}

/**
 * Register a event listener for the name
 * 
 * @param name the event name
 * @param callback the callback to run
 */
export function on(name: string, callback: Function) {

    getEvent.on(name, callback);
    postEvent.on(name, callback);
    putEvent.on(name, callback);
    delEvent.on(name, callback);

    let obj = {
        get: (callback: Function) => {
            getEvent.on(name, callback);

            return obj;
        },
        post: (callback: Function) => {

            postEvent.on(name, callback);

            return obj;
        },
        put: (callback: Function) => {

            putEvent.on(name, callback);

            return obj;
        },
        delete: (callback: Function) => {

            delEvent.on(name, callback);

            return obj;
        }
    }
    return obj;
}

/**
 * Register the get and post requests from express
 * 
 * @param app The express app
 */
function registerExpress(app: Application, route: string, settings: Settings) {
    const url = `/${route.replace(/^\/|\/$/g, "")}/:api/:id`;

    app.get(url, (request, response) => {
        console.log(request);
        let event = createExpressRequest(request, response, "get", settings);

        getEvent.triggerEvent(event);
    });

    app.post(url, (request, response) => {
        console.log(request);
        let event = createExpressRequest(request, response, "post", settings);

        postEvent.triggerEvent(event);
    });

    app.put(url, (request, response) => {
        console.log(request);
        let event = createExpressRequest(request, response, "put", settings);

        putEvent.triggerEvent(event);
    });

    app.delete(url, (request, response) => {
        console.log(request);
        let event = createExpressRequest(request, response, "delete", settings);

        delEvent.triggerEvent(event);
    });
}


/**
 * Register the web wss server to use as api
 * 
 * @param wss The ws server object
 */
function registerWS(wss: WebSocket.Server, settings: Settings) {
    // on connection
    wss.on('connection', function connection(ws: WebSocket) {

        // on message
        ws.on('message', function incoming(message: string) {
            console.log('received: %s', message);

            try {
                if (settings.maxLength && message.length <= settings.maxLength) {

                    let data = JSON.parse(message);
                    let event = createWSRequest(ws, data.id, data.name, data.body, data.method, settings);

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

                    console.log(data);
                }
            } catch (err) {
                if (settings.on.error) {
                    settings.on.error(err, message);
                }
            }

        });

        ws.send('Connection');
        console.log("New Connection");
    });
}


/**
 * 
 * @param req the request
 * @param res the response
 * @param settings the settings
 */
function createExpressRequest(req: { params: { api: string, id: string }, body: object }, res: { status: Function }, method: string, settings: Settings) {

    let newRequest = new Request(req.params.id, req.params.api, req.body, method);

    newRequest._send = (value) => {
        res.status(newRequest._status).send(value);
    };

    return newRequest;
}


/**
 * Create the event for the web socket connection
 */
function createWSRequest(ws: WebSocket, id: string, name: string, body: any, method: string, settings: Settings) {
    let newRequest = new Request(id, name, body, method);

    newRequest._send = (value) => {
        // send the data to the client via ws
        ws.send(JSON.stringify(value));
    };

    return newRequest;
}