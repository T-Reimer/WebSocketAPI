let logElement = document.getElementById("output");

let fancyKey = "this-is-my-fancy-pants-auth-key";

// setup the websocket api
WebSocketAPI.setup({
    fetchUrl: "/api",
    websocketUrl: "ws://localhost:3000/",
    authKey: async() => {
        return fancyKey;
    }
});