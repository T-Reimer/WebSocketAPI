
## This Package is Still in dev stage

I am working on this project in my spare time. So if you'd like to contribute then check me out on bitbucket.

https://bitbucket.org/t-reimer/websocketapi/src/master/


# Web Socket Api
Web Socket API is a new way to interact with data from an Express JS web server to the client built on top of [Express](https://www.npmjs.com/package/express) and [WS](https://www.npmjs.com/package/ws). Register for both endpoints with a single event listener and effortlessly pick your preferred protocol on request. 

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
      .get((event, next) => {}) // the method was set to get on client side
      .post((event, next) => {}) // method was set to post
      .put((event, next) => {}) // method was set to put
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
    api.register(app, wss, "api");
    
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
	    error:  Function // an error callback function
	  }
	}

# Client Setup

## Setup

## Options

## Make a request

## Listen for a Server Event

*Contrary to a lot of other WS packages this package does not support or use http polling. If that is what you are looking for then this is not the package for you.*
