const express = require("express");
const WebSocket = require("ws");
const path = require("path");

// load the api to test
const api = require("./../out/index");

// create the express server
const app = express();
const port = 3000;

app.use("/", express.static(path.join(__dirname, "./basic/")));

// create the websocket server
const wss = new WebSocket.Server({ port: 8080 });

// register the api
api.register(app, wss, "api");

console.log("Register Event");
api.on("test", (event) => {
    console.log(event);
    event.send(1);
});

app.listen(port, () => console.log(`Express Listening on port > ${port}`));