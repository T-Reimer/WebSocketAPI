import { Application } from "express";
import { Server } from "ws";
import {Request} from "./Request";

import { getEvent } from "./events/index";

/**
 * Register the default route with express
 * 
 * @param app Express app
 * @param socket the websocket connection
 * @param route the default route
 */
export default function register(app : Application, socket : Server, route : string){

    registerExpress(app, route);

    registerWS(socket);

}

/**
 * Register the get and post requests from express
 * 
 * @param app The express app
 */
function registerExpress(app : Application, route : string){
    const url = `/${route.replace(/^\/|\/$/g, "")}/:api`;

    app.get(url, (request, response) => {
        let event = createExpressRequest(request, response);

        getEvent.triggerEvent(event);
    });

    app.post(url, (request, response) => {

    });

    app.put(url, (request, response) => {

    });

    app.post(url, (request, response) => {

    });

    app.delete(url, (request, response) => {

    });
}

function createExpressRequest(req: { body: { id: string; content: object; }; }, res: { status: (arg0: number) => { send: (arg0: any) => void; }; }){

    let newRequest = new Request(req.body.id, "", req.body.content, "get");

    newRequest._send = (value) => {
        res.status(newRequest._status).send(value);
    };

    return newRequest;
}

/**
 * Register the web socket server to use as api
 * 
 * @param socket The ws server object
 */
function registerWS(socket : Server){

}