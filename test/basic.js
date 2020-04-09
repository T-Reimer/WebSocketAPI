const express = require("express");
const bodyParser = require("body-parser");
const WebSocket = require("ws");
const path = require("path");

// load the api to test
const api = require("./../out/index");

// create the express server
const app = express();
const port = 3000;

app.use("/", express.static(path.join(__dirname, "./basic/")));
app.use("/static", express.static(path.join(__dirname, "./../static")));
app.use(bodyParser.json());

// create the websocket server
const wss = new WebSocket.Server({
    port: 8080
});

// register the api
api.register(app, wss, "api");

api.on("test", (event, next) => {
        console.log(event);
        next();
    })
    .get((event) => {
        event.send(`Get: ${Math.floor(Math.random() * 1000)}`);
    })
    .post((event) => {
        event.send(`Post: ${Math.floor(Math.random() * 1000)}`);
    });

api.on("ping", (event, next) => {
    console.log("- - - - - - -");
    console.log("Received a Request from Client with data", event);

    console.log("Responding to Client Response");
    event.send("pong");

    console.log("- - - - - - -");

    setTimeout(() => {
        console.log("- - - - - - -");
        console.log("Sending a Server Event to Client");

        if (event.client) {
            // the client is connected with websocket
            event.client.fetch("ping", {
                    randomNumber: Math.random()
                })
                .then(data => {

                    console.log("Client Responded with", data);

                    console.log("- - - - - -");
                })
                .catch(console.warn);

        }

    }, 2000);

});

api.on("date/timestamp")
    .get((event) => event.send((new Date()).toLocaleTimeString()));


app.listen(port, () => console.log(`Express Listening on port > ${port}`));