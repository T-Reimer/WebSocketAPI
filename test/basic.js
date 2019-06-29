const express = require("express");
const WebSocket = require("ws");
const path = require("path");

// load the api to test
const api = require("./../out/index");

// create the express server
const app = express();
const port = 3000;

app.use("/", express.static(path.join(__dirname, "./basic/")));

app.listen(port, () => console.log(`Express Listening on port > ${port}`));

// create the websocket server
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    ws.send('Connection');
    console.log("New Connection");
});