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
const wss = new WebSocket.Server({ port: 8080 });

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
    console.log("Received Ping");
    event.send("pong");

    setTimeout(() => {
        console.log("Sending Ping");
        event.client.fetch("ping")
            .then(data => {
                console.log("Ping Response", data);
            })
            .catch(console.warn);
    }, 2000);
});

app.listen(port, () => console.log(`Express Listening on port > ${port}`));