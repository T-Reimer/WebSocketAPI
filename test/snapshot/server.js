const express = require("express");
const bodyParser = require("body-parser");
const WebSocket = require("ws");
const path = require("path");

// load the api to test
const api = require("./../../out/index");

// create the express server
const app = express();
const port = 3030;

app.use("/", express.static(path.join(__dirname, "./public/")));
app.use("/static", express.static(path.join(__dirname, "./../../static")));
app.use(bodyParser.json());

// create the websocket server
const wss = new WebSocket.Server({ port: 8090 });

// register the api
api.register(app, wss, "api");

api.on("date")
    .get((event) => {
        event.send((new Date()).toLocaleTimeString());
    });

api.on("date/change")
    .snapshot((request) => {
        console.log(request);
        if (!request.number) {
            request.number = 1;
        } else {
            request.number++;
        }
        request.send((new Date()).toLocaleTimeString());

        if (request.number > 2) {
            // request.unregister();
        }
    });

setInterval(() => {
    api.triggerSnapshot("date/change");

}, 1000);

app.listen(port, () => console.log(`Express Listening on port > ${port}. WebSocket on port > 8090`));