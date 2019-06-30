const ws = new WebSocket("ws://localhost:8080/");
let id = 0;
let pElement = null;
let fElement = null;

ws.addEventListener("message", function(event) {
    let message = null;
    try {
        const data = JSON.parse(event.data);
        message = JSON.stringify(data, null, 4).replace(/\n/g, "<br>");
    } catch (err) {
        message = event.data;
    }

    if (!pElement) {
        pElement = document.getElementById("socketMessages");
    }

    pElement.innerHTML = `<pre style="text-align: right; background-color: #EEEEEE;">${message}</pre>` + pElement.innerHTML;

});

function sendData(name, body) {
    id++;
    try {
        body = JSON.parse(body);
    } catch (err) {}

    const data = {
        id: id,
        body: body,
        name: name,
        method: "GET"
    };

    ws.send(JSON.stringify(data));
    pElement.innerHTML = `<pre style="text-align: left; background-color: #BDBDBD;">${JSON.stringify(data, null, 4).replace(/\n/g, "<br>")}</pre>` + pElement.innerHTML;


    fElement.innerHTML = `<pre style="text-align: left; background-color: #BDBDBD;">/api/${id}/${name}</pre>` + fElement.innerHTML;
    fetch(`/api/${id}/${name}`).then(response => response.json()).then(data => {
        let message = JSON.stringify(data, null, 4).replace(/\n/g, "<br>");
        fElement.innerHTML = `<pre style="text-align: right; background-color: #EEEEEE;">${message}</pre>` + fElement.innerHTML;
    });
}

window.addEventListener("load", function() {
    pElement = document.getElementById("socketMessages");
    fElement = document.getElementById("fetchMessages");

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
});