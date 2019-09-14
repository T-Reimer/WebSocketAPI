let logElement = null;

window.addEventListener("load", () => {
    logElement = document.getElementById("logOutput");

    let button = document.getElementById("submitButton");
    /**
     * @type {HTMLTextAreaElement}
     */
    let text = document.getElementById("sendMessage");
    /**
     * @type {HTMLInputElement}
     */
    let name = document.getElementById("sendAPI");

    button.addEventListener("click", () => {
        sendData(name.value, text.value);
    });

    WebSocketAPI.setup({
        fetchUrl: "/api",
        websocketUrl: "ws://localhost:8080/"
    });
});



/**
 * Send data to the server
 * 
 * @param {String} name 
 * @param {String|Number} value 
 */
function sendData(name, value) {

    console.log(WebSocketAPI.fetch("test", 152));

}