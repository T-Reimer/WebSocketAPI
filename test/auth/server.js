const express = require("express");
const bodyParser = require("body-parser");
const WebSocket = require("ws");
const path = require("path");
const http = require("http");

// load the api to test
const api = require("./../../out/index");

// create the express server
const app = express();
const port = 3000;

// create the websocket server
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use("/", express.static(path.join(__dirname, "./public/")));
app.use("/static", express.static(path.join(__dirname, "./../../static")));
app.use(bodyParser.json());


// register the api
api.register(app, wss, "api", {
    onAuthKey: async(key, client, ws, req) => {
        console.log("---------------------".split().join(" "));
        console.log(key, client);

        // this is used to test disconnecting the last client from vscode debug terminal
        global.client = ws;

        return key === "this-is-my-fancy-pants-auth-key";
    }
});

api.on("ping", (request) => {
    console.log(request);

    request.send("pong");
});


server.listen(port, () => console.log(`Express Listening on port > ${port}`));