import { Application, response } from "express";
import { Server } from "ws";

/**
 * Register the default route with express
 * 
 * @param app Express app
 * @param socket the websocket connection
 * @param route the default route
 */
export function register(app : Application, socket : Server, route : string){

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

/**
 * Register the web socket server to use as api
 * 
 * @param socket The ws server object
 */
function registerWS(socket : Server){

}