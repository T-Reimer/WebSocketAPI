"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Request_1 = require("./Request");
var index_1 = require("./events/index");
console.log(index_1.getEvent, index_1.postEvent, index_1.putEvent, index_1.delEvent);
/**
 * the default settings object
 */
var Settings = {
    maxLength: 10000,
    on: {}
};
/**
 * Register the default route with express
 *
 * @param app Express app
 * @param wss the webwss connection
 * @param route the default route
 */
function register(app, wss, route, options) {
    var settings = Object.assign({}, Settings, options);
    registerExpress(app, route, settings);
    registerWS(wss, settings);
}
exports.default = register;
/**
 * Register a event listener for the name
 *
 * @param name the event name
 * @param callback the callback to run
 */
function on(name, callback) {
    index_1.getEvent.on(name, callback);
    index_1.postEvent.on(name, callback);
    index_1.putEvent.on(name, callback);
    index_1.delEvent.on(name, callback);
    var obj = {
        get: function (callback) {
            index_1.getEvent.on(name, callback);
            return obj;
        },
        post: function (callback) {
            index_1.postEvent.on(name, callback);
            return obj;
        },
        put: function (callback) {
            index_1.putEvent.on(name, callback);
            return obj;
        },
        delete: function (callback) {
            index_1.delEvent.on(name, callback);
            return obj;
        }
    };
    return obj;
}
exports.on = on;
/**
 * Register the get and post requests from express
 *
 * @param app The express app
 */
function registerExpress(app, route, settings) {
    var url = "/" + route.replace(/^\/|\/$/g, "") + "/:api/:id";
    app.get(url, function (request, response) {
        console.log(request);
        var event = createExpressRequest(request, response, "get", settings);
        index_1.getEvent.triggerEvent(event);
    });
    app.post(url, function (request, response) {
        console.log(request);
        var event = createExpressRequest(request, response, "post", settings);
        index_1.postEvent.triggerEvent(event);
    });
    app.put(url, function (request, response) {
        console.log(request);
        var event = createExpressRequest(request, response, "put", settings);
        index_1.putEvent.triggerEvent(event);
    });
    app.delete(url, function (request, response) {
        console.log(request);
        var event = createExpressRequest(request, response, "delete", settings);
        index_1.delEvent.triggerEvent(event);
    });
}
/**
 * Register the web wss server to use as api
 *
 * @param wss The ws server object
 */
function registerWS(wss, settings) {
    // on connection
    wss.on('connection', function connection(ws) {
        // on message
        ws.on('message', function incoming(message) {
            console.log('received: %s', message);
            try {
                if (settings.maxLength && message.length <= settings.maxLength) {
                    var data = JSON.parse(message);
                    var event_1 = createWSRequest(ws, data.id, data.name, data.body, data.method, settings);
                    switch (data.method) {
                        case "GET":
                            index_1.getEvent.triggerEvent(event_1);
                            break;
                        case "POST":
                            index_1.postEvent.triggerEvent(event_1);
                            break;
                        case "PUT":
                            index_1.putEvent.triggerEvent(event_1);
                            break;
                        case "DELETE":
                            index_1.delEvent.triggerEvent(event_1);
                            break;
                    }
                    console.log(data);
                }
            }
            catch (err) {
                if (settings.on.error) {
                    settings.on.error(err, message);
                }
            }
        });
        ws.send('Connection');
        console.log("New Connection");
    });
}
/**
 *
 * @param req the request
 * @param res the response
 * @param settings the settings
 */
function createExpressRequest(req, res, method, settings) {
    var newRequest = new Request_1.Request(req.params.id, req.params.api, req.body, method);
    newRequest._send = function (value) {
        res.status(newRequest._status).send(value);
    };
    return newRequest;
}
/**
 * Create the event for the web socket connection
 */
function createWSRequest(ws, id, name, body, method, settings) {
    var newRequest = new Request_1.Request(id, name, body, method);
    newRequest._send = function (value) {
        // send the data to the client via ws
        ws.send(JSON.stringify(value));
    };
    return newRequest;
}
//# sourceMappingURL=index.js.map