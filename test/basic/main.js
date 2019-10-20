let logElement = null;

window.addEventListener("load", () => {
    logElement = document.getElementById("logOutput");

    let button = document.getElementById("ping");

    button.addEventListener("click", () => {
        console.log("- - - - - - -");
        console.log("Sending Request to Server");
        WebSocketAPI.fetch("ping", { randomNumber: Math.random() }).then(response => {
            console.log("Server Responded with", response);

            console.log("- - - - - - -");
        });
    });

    WebSocketAPI.setup({
        fetchUrl: "/api",
        websocketUrl: "ws://localhost:8080/"
    });

    WebSocketAPI.on("ping", (event) => {
        console.log("- - - - - - -");
        console.log("Got a Server Request with data", event);
        console.log("Sending back a response.");
        event.send("pong");
        console.log("- - - - -");
    });
});