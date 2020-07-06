[WebSocketAPI - v1.1.5-1](README.md) › [Globals](globals.md)

# WebSocketAPI - v1.1.5-1

# Web Socket Api

[TypeDoc](./docs/globals.md)

Web Socket API is a new way to interact with data from an Express JS web server to the client built on top of [Express](https://www.npmjs.com/package/express) and [WS](https://www.npmjs.com/package/ws). Register for both endpoints with a single event listener and effortlessly pick your preferred protocol on request. 

## This Package is Still in dev stage

I am working on this project in my spare time. So if you'd like to contribute then check it out on [https://github.com/T-Reimer/WebSocketAPI](https://github.com/T-Reimer/WebSocketAPI)

## Register Server
To get started you need to register both Express and WS with the api. 
**ROUTE** is the express route to register. Example: if you want your main express api calls to go to `/api` then set `route = 'api'`.
**OPTIONS** See below for a list of server side options.

    api.register(EXPRESS, WS, ROUTE, OPTIONS);

## Register Server Endpoint
To register an api endpoint call the on event register function. The event is the event string name.
**Event** the event name to match requests to `ping/test`
**Callback** This callback is not required, but it will run for each of the `.get|.post|.put|.delete` events. The callback will give you 2 parameters.  The first event is the event data sent from the client. If you handle the request then no further action is needed. If you need further functions to run then call the `next()` function.

    api.on(Event, (event, next) => {})

You can also listen for specific types of requests.

    api.on(Event)
      .get((event, next) => {})     // the method was set to get on client side
      .post((event, next) => {})    // method was set to post
      .put((event, next) => {})     // method was set to put
      .delete((event, next) => {}); // method was set to delete

## Server Setup Code

    const  express  =  require("express");
    const  bodyParser  =  require("body-parser");
    const  WebSocket  =  require("ws");
    const  path  =  require("path");
    
    // load the api to test
    const  api  =  require("websocketapi");
    
    // create the express server
    const  app  =  express();
    const  port  =  3000;
    
    app.use(bodyParser.json());
    
    // create the websocket server
    const  wss  =  new  WebSocket.Server({ port:  8080 });
    
    // register the api
    api.register(app, wss, "api", ServerOptions);
    
    api.on("test", (event, next) => {
        next();
    })
    .get((event) => {
        event.send(`Get: ${Math.floor(Math.random() * 1000)}`);
    })
    .post((event) => {
        event.send(`Post: ${Math.floor(Math.random() * 1000)}`);
    });
    
    api.on("ping", (event, next) => {
        console.log(event);
        event.send("pong");
    });
    
    app.listen(port, () =>  console.log(`Express Listening on port > ${port}`));

## Server Options

    {
      maxLength?:  number, // the max upload length to automatically parse
	  on: {
	    error:  (err: Error, message?: string) => void, // an error callback function
        // the event for *Received* and *Completed* is the same object that is fed into the listener events
        eventReceived: (event: ServerRequest) => void, 
        eventCompleted: (event: ServerRequest) => void,
	  }
	}

# Client Setup

## Setup
To load the API on the browser you can load `static/bundle.min.js` or if using a compiler you can `require('websocketapi/out/client')`. For typescript you can import `'websocketapi/lib/client'`

To setup the client call the `WebSocketAPI.setup` function. Set the fetchUrl to the same endpoint that is used in the express route. The websocketUrl should point the the WS server that was previously setup.

    WebSocketAPI.setup({
	    fetchUrl:  "/api", // the api endpoint registered in express
	    websocketUrl:  "ws://localhost:8080/"
    });

## [Options](modules/_client_index_.md)

    {
		fetchUrl:  string,
		websocketUrl:  string,
		websocketOnMessage:  Function,
		reconnect:  boolean  |  null  |  Function,
		url:  object,
		maxSocketLength:  number, // the max length that the request is sent over websocket vs fetch request
		reconnectTimeOut:  number  |  Function, // set the function to only return a number
		unHandledWebSocketMessage?:  Function
	}

 - **fetchUrl** Set the fetchUrl to the same endpoint that is used in the express route
 
 - **websocketUrl** The websocketUrl should point the the WS server that was previously setup.
 
 - **websocketOnMessage** This is a function that will on when a new websocket message comes in. This can be used to intercept other traffic then for the WebSocketAPI.
 
 - **reconnect** tell if the api should attempt to reconnect Web socket on failure or not
 
 - **maxSocketLength** The max length of a payload to send via websockets. Above this limit then a http request will be made. *Please note that setting this will still put a 2048 url length cap on get requests.*
 
 - **reconnectTimeout** The amount of time to wait to reconnect. This can be a function to calculate a timeout period instead of a fixed number.
 
 - **unHandledWebSocketMessage** This will get called if there is a unhandled event or web socket message from the server. Use this if you are making calls over the websocket outside of this api.

## Make a request
Make a request to the server with the fetch function. Input the event name, payload and optional options and wait for the Promise to complete.

    WebSocketAPI.fetch("test", 150, Options)
	    .then(data => console.log("Response", data))
	    .catch(err => console.error(err));

An alternative way exists as well to make requests.

	WebSocketAPI.api("test").get(callback);
	WebSocketAPI.api("test").post(callback);
	WebSocketAPI.api("test").put(callback);
	WebSocketAPI.api("test").delete(callback);

**Request Options**

 - **method** the method to use to transfer the payload or make the request. 
 `"GET"  |  "POST"  |  "PUT"  |  "DELETE"`
 
 - **use** the mode to use to send the data.
 `"ws"  |  "http"`
 
 - **timeout** The amount of ms to wait for a response. **TODO**

## Websocket Snapshot API

You can register listeners *(called snaphots in this package)* to listen to web-socket messages. This feature only works when you have a ws connection established. Any listeners that you register will get re-registered if the connection was lost at any time. The `onSnapshot` function returns a `unregister` function to use to unregister the snapshot. The unregister call sends a event to the server to stop sending those events to the client.

    let unregister = WebSocketAPI.onSnapshot(API, BODY, (response)  =>  {
	    console.log(response.last.data);
        console.log(response.data);
    });

 - **API** is the api string that the server will register to.
 - **Body** is any additional data that you want to use server side when creating the data for the client. The body can be read using `request.data`

Listen for snapshot hooks on the server using. This snapshot function will be called anytime that the client needs data. When the client registers a snapshot it will always request the latest data for that api end point.

    api.on(API)
        .snapshot(async (request) => {
			// respond with
			request.send(request.extra || await getFromDatabase());
	    });

To trigger the snapshot to update you call `api.triggerSnapshot(API, EXTRA)` to fire the snapshot events. The extra can be the data that you wish to send to the clients or it can be ignored and each snapshot function would have to create the data. If the `EXTRA` is set then that can be accessed via `request.extra` and then  it's your discretion per client how to send the data. This is helpful if the data needs to filtered differently based on user permissions.

## Listen for a Server Event from Client

You can make a request to the client from the server using the client object from a client event. This is the exact reverse of the normal request to the server.

### Server:

    event.client.fetch(API, REQUEST)
    .then(data  => {
	    // received the data back from client
    })

### Client:

    WebSocketAPI.on(API, (event) => {
	    // event.body == REQUEST
		// respond back to server
		event.send(DATA); 
    });

When the client receives the Server event you can respond back to the server with `event.send(DATA)` to resolve the server side fetch Promise.

## Notes
*Contrary to a lot of other WS packages this package does not support or use http polling. If that is what you are looking for then this is not the package for you.*

> Created with [https://stackedit.io/app#](https://stackedit.io/app#)
