const ws = new WebSocket("ws://localhost:8080/");

ws.addEventListener("message", function(event) {
    const p = document.getElementById("socketMessages");

    p.innerHTML = `<pre style="text-align: right; background-color: #EEEEEE;">${event.data}</pre>` + p.innerHTML;

});
window.addEventListener("load", function() {
    this.document.getElementById("sendMessage").addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            // send the message and clear the text area
            const p = document.getElementById("socketMessages");
            p.innerHTML = `<pre style="text-align: left; background-color: #BDBDBD;">${event.target.value}</pre>` + p.innerHTML;

            ws.send(event.target.value.replace(/\n$/, ""));
            event.target.value = "";
        }
    });
});