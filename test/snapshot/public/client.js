const element = document.getElementById("ping-updates");


WebSocketAPI.setup({
    fetchUrl: "/api",
    websocketUrl: "ws://localhost:8090/"
});

WebSocketAPI.fetch("date")
    .then(response => {
        console.log({ response });
    });

let unregister = WebSocketAPI.onSnapshot("date/change", {}, (response) => {
    console.log("snapshot response", response);

    element.innerHTML = `<div>${response.data}</div>` + element.innerHTML;
});