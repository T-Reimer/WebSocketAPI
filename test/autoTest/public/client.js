mocha.setup({
    ui: 'tdd',
    globals: [
        "getFrameLocation", "handler", "WebSocketAPI"
    ]
});

const {
    assert,
    expect
} = chai;

describe("browser", () => {

    before((done) => {
        WebSocketAPI.setup({
            fetchUrl: "http://localhost:3030/api",
            websocketUrl: "ws://localhost:8090/"
        });
        setTimeout(() => {
            done();
        }, 1000);
    });

    after((done) => {

        WebSocketAPI.fetch("stop")
            .then(() => {
                done();
            })
            .catch(err => done(err));

    });

    // ---------------------------------------------------------------------------------------
    // GET FROM SERVER
    // ---------------------------------------------------------------------------------------

    describe("get", () => {
        debugger;
        // WEBSOCKET REQUESTS

        describe("websocket", () => {

            it("should respond with matching records", async function () {
                const response = await WebSocketAPI.fetch("todo/mine", undefined, {
                    use: "ws"
                });

                assert.deepEqual(response, {
                    "userId": 1,
                    "id": 1,
                    // cspell: disable-next-line
                    "title": "delectus aut autem",
                    "completed": false
                });
            });

            it("nested api request", async function () {
                const response = await WebSocketAPI.fetch("nested/api/request/", undefined, {
                    use: "ws"
                });

                assert.equal("nested/api/request", response);
            });

            it("should throw error with 'Unknown api request.'", function (done) {

                WebSocketAPI.fetch("something404", undefined, {
                        use: "ws"
                    })
                    .then(_ => done(new Error("Was supposed to throw a error.")))
                    .catch(err => {
                        try {
                            assert.throws(() => {
                                throw err;
                            }, Error, "Unknown api request");
                            done();
                        } catch (err) {
                            done(err);
                        }
                    });

            });

            it("should throw error with 'test error'", function (done) {

                WebSocketAPI.fetch("error", undefined, {
                        use: "ws"
                    })
                    .then(_ => done(new Error("Was supposed to throw a error.")))
                    .catch(err => {
                        try {
                            assert.throws(() => {
                                throw err;
                            }, Error, "test error");
                            done();
                        } catch (err) {
                            done(err);
                        }
                    });

            });

            it("should throw timeout error with 'Timeout Error'", function (done) {

                WebSocketAPI.fetch("timeout", undefined, {
                        use: "ws",
                        timeout: 150
                    })
                    .then(_ => done(new Error("Was supposed to throw a timeout error.")))
                    .catch(err => {
                        try {
                            assert.throws(() => {
                                throw err;
                            }, Error, "Request to server timed out");
                            done();
                        } catch (err) {
                            done(err);
                        }
                    });
                this.timeout(200);
            });

        });


        // HTTP REQUESTS

        describe("http", () => {

            it("should respond with matching records", async function () {
                const response = await WebSocketAPI.fetch("todo/mine", undefined, {
                    use: "http"
                });

                assert.deepEqual(response, {
                    "userId": 1,
                    "id": 1,
                    // cspell: disable-next-line
                    "title": "delectus aut autem",
                    "completed": false
                });
            });

            it("should throw error with 'Unknown api request.'", function (done) {

                WebSocketAPI.fetch("something404", undefined, {
                        use: "http"
                    })
                    .then(_ => done(new Error("Was supposed to throw a error.")))
                    .catch(err => {
                        try {
                            assert.throws(() => {
                                throw err;
                            }, Error, "Unknown api request");
                            done();
                        } catch (err) {
                            done(err);
                        }
                    });

            });

            it("should throw error with 'test error'", function (done) {

                WebSocketAPI.fetch("error", undefined, {
                        use: "http"
                    })
                    .then(_ => done(new Error("Was supposed to throw a error.")))
                    .catch(err => {
                        try {
                            assert.throws(() => {
                                throw err;
                            }, Error, "test error");
                            done();
                        } catch (err) {
                            done(err);
                        }
                    });

            });

            it("should throw timeout error with 'Timeout Error'", function (done) {

                WebSocketAPI.fetch("timeout", undefined, {
                        use: "http",
                        timeout: 150
                    })
                    .then(_ => done(new Error("Was supposed to throw a timeout error.")))
                    .catch(err => {
                        try {
                            assert.throws(() => {
                                throw err;
                            }, Error, "Request to server timed out");
                            done();
                        } catch (err) {
                            done(err);
                        }
                    });
                this.timeout(200);
            });

        });

    });


    // ---------------------------------------------------------------------------------------
    // POST TO SERVER
    // ---------------------------------------------------------------------------------------

    describe("post", () => {

        const postData = {
            "userId": 1,
            "id": 1,
            // cspell: disable-next-line
            "title": "delectus aut autem",
            "completed": false
        };

        // WEBSOCKET REQUESTS

        describe("websocket", () => {

            it("should respond with matching records", async function () {
                const response = await WebSocketAPI.fetch("echo", postData, {
                    use: "ws",
                    method: "POST",
                });

                assert.deepEqual(response, postData);
            });

            it("should throw error with 'Unknown api request.'", function (done) {

                WebSocketAPI.fetch("something404", undefined, {
                        use: "ws",
                        method: "POST",
                    })
                    .then(_ => done(new Error("Was supposed to throw a error.")))
                    .catch(err => {
                        try {
                            assert.throws(() => {
                                throw err;
                            }, Error, "Unknown api request");
                            done();
                        } catch (err) {
                            done(err);
                        }
                    });

            });

            it("should throw error with 'test error'", function (done) {

                WebSocketAPI.fetch("error", postData, {
                        use: "ws",
                        method: "POST",
                    })
                    .then(_ => done(new Error("Was supposed to throw a error.")))
                    .catch(err => {
                        try {
                            assert.throws(() => {
                                throw err;
                            }, Error, "test error");
                            done();
                        } catch (err) {
                            done(err);
                        }
                    });

            });

            it("should throw timeout error with 'Timeout Error'", function (done) {

                WebSocketAPI.fetch("timeout", postData, {
                        use: "ws",
                        timeout: 150,
                        method: "POST",
                    })
                    .then(_ => done(new Error("Was supposed to throw a timeout error.")))
                    .catch(err => {
                        try {
                            assert.throws(() => {
                                throw err;
                            }, Error, "Request to server timed out");
                            done();
                        } catch (err) {
                            done(err);
                        }
                    });
                this.timeout(200);
            });

        });


        // HTTP REQUESTS

        describe("http", () => {

            it("should respond with matching records", async function () {
                const response = await WebSocketAPI.fetch("echo", postData, {
                    use: "http",
                    method: "POST",
                });

                assert.deepEqual(response, postData);
            });

            it("should throw error with 'Unknown api request.'", function (done) {

                WebSocketAPI.fetch("something404", postData, {
                        use: "http",
                        method: "POST",
                    })
                    .then(_ => done(new Error("Was supposed to throw a error.")))
                    .catch(err => {
                        try {
                            assert.throws(() => {
                                throw err;
                            }, Error, "Unknown api request");
                            done();
                        } catch (err) {
                            done(err);
                        }
                    });

            });

            it("should throw error with 'test error'", function (done) {

                WebSocketAPI.fetch("error", postData, {
                        use: "http",
                        method: "POST",
                    })
                    .then(_ => done(new Error("Was supposed to throw a error.")))
                    .catch(err => {
                        try {
                            assert.throws(() => {
                                throw err;
                            }, Error, "test error");
                            done();
                        } catch (err) {
                            done(err);
                        }
                    });

            });

            it("should throw timeout error with 'Timeout Error'", function (done) {

                WebSocketAPI.fetch("timeout", postData, {
                        use: "http",
                        timeout: 150,
                        method: "POST",
                    })
                    .then(_ => done(new Error("Was supposed to throw a timeout error.")))
                    .catch(err => {
                        try {
                            assert.throws(() => {
                                throw err;
                            }, Error, "Request to server timed out");
                            done();
                        } catch (err) {
                            done(err);
                        }
                    });
                this.timeout(200);
            });

        });

    });


    // ---------------------------------------------------------------------------------------
    // PUT TO SERVER
    // ---------------------------------------------------------------------------------------

    describe("put", () => {

        const postData = {
            "userId": 1,
            "id": 1,
            // cspell: disable-next-line
            "title": "delectus aut autem",
            "completed": false
        };

        // WEBSOCKET REQUESTS

        describe("websocket", () => {

            it("should respond with matching records", async function () {
                const response = await WebSocketAPI.fetch("echo", postData, {
                    use: "ws",
                    method: "PUT",
                });

                assert.deepEqual(response, postData);
            });

            it("should throw error with 'Unknown api request.'", function (done) {

                WebSocketAPI.fetch("something404", undefined, {
                        use: "ws",
                        method: "PUT",
                    })
                    .then(_ => done(new Error("Was supposed to throw a error.")))
                    .catch(err => {
                        try {
                            assert.throws(() => {
                                throw err;
                            }, Error, "Unknown api request");
                            done();
                        } catch (err) {
                            done(err);
                        }
                    });

            });

            it("should throw error with 'test error'", function (done) {

                WebSocketAPI.fetch("error", postData, {
                        use: "ws",
                        method: "PUT",
                    })
                    .then(_ => done(new Error("Was supposed to throw a error.")))
                    .catch(err => {
                        try {
                            assert.throws(() => {
                                throw err;
                            }, Error, "test error");
                            done();
                        } catch (err) {
                            done(err);
                        }
                    });

            });

            it("should throw timeout error with 'Timeout Error'", function (done) {

                WebSocketAPI.fetch("timeout", postData, {
                        use: "ws",
                        timeout: 150,
                        method: "PUT",
                    })
                    .then(_ => done(new Error("Was supposed to throw a timeout error.")))
                    .catch(err => {
                        try {
                            assert.throws(() => {
                                throw err;
                            }, Error, "Request to server timed out");
                            done();
                        } catch (err) {
                            done(err);
                        }
                    });
                this.timeout(200);
            });

        });


        // HTTP REQUESTS

        describe("http", () => {

            it("should respond with matching records", async function () {
                const response = await WebSocketAPI.fetch("echo", postData, {
                    use: "http",
                    method: "PUT",
                });

                assert.deepEqual(response, postData);
            });

            it("should throw error with 'Unknown api request.'", function (done) {

                WebSocketAPI.fetch("something404", postData, {
                        use: "http",
                        method: "PUT",
                    })
                    .then(_ => done(new Error("Was supposed to throw a error.")))
                    .catch(err => {
                        try {
                            assert.throws(() => {
                                throw err;
                            }, Error, "Unknown api request");
                            done();
                        } catch (err) {
                            done(err);
                        }
                    });

            });

            it("should throw error with 'test error'", function (done) {

                WebSocketAPI.fetch("error", postData, {
                        use: "http",
                        method: "PUT",
                    })
                    .then(_ => done(new Error("Was supposed to throw a error.")))
                    .catch(err => {
                        try {
                            assert.throws(() => {
                                throw err;
                            }, Error, "test error");
                            done();
                        } catch (err) {
                            done(err);
                        }
                    });

            });

            it("should throw timeout error with 'Timeout Error'", function (done) {

                WebSocketAPI.fetch("timeout", postData, {
                        use: "http",
                        timeout: 150,
                        method: "PUT",
                    })
                    .then(_ => done(new Error("Was supposed to throw a timeout error.")))
                    .catch(err => {
                        try {
                            assert.throws(() => {
                                throw err;
                            }, Error, "Request to server timed out");
                            done();
                        } catch (err) {
                            done(err);
                        }
                    });
                this.timeout(200);
            });

        });

    });

    // ---------------------------------------------------------------------------------------
    // DELETE FROM SERVER
    // ---------------------------------------------------------------------------------------

    describe("delete", () => {

        // WEBSOCKET REQUESTS

        describe("websocket", () => {

            it("should respond with matching records", async function () {
                const response = await WebSocketAPI.fetch("todo/mine", undefined, {
                    use: "ws",
                    method: "DELETE"
                });

                assert.deepEqual(response, {
                    deleted: true
                });
            });

            it("should throw error with 'Unknown api request.'", function (done) {

                WebSocketAPI.fetch("something404", undefined, {
                        use: "ws"
                    })
                    .then(_ => done(new Error("Was supposed to throw a error.")))
                    .catch(err => {
                        try {
                            assert.throws(() => {
                                throw err;
                            }, Error, "Unknown api request");
                            done();
                        } catch (err) {
                            done(err);
                        }
                    });

            });

            it("should throw error with 'test error'", function (done) {

                WebSocketAPI.fetch("error", undefined, {
                        use: "ws",
                        method: "DELETE"
                    })
                    .then(_ => done(new Error("Was supposed to throw a error.")))
                    .catch(err => {
                        try {
                            assert.throws(() => {
                                throw err;
                            }, Error, "test error");
                            done();
                        } catch (err) {
                            done(err);
                        }
                    });

            });

            it("should throw timeout error with 'Timeout Error'", function (done) {

                WebSocketAPI.fetch("timeout", undefined, {
                        use: "ws",
                        timeout: 150,
                        method: "DELETE"
                    })
                    .then(_ => done(new Error("Was supposed to throw a timeout error.")))
                    .catch(err => {
                        try {
                            assert.throws(() => {
                                throw err;
                            }, Error, "Request to server timed out");
                            done();
                        } catch (err) {
                            done(err);
                        }
                    });
                this.timeout(200);
            });

        });


        // HTTP REQUESTS

        describe("http", () => {

            it("should respond with matching records", async function () {
                const response = await WebSocketAPI.fetch("todo/mine", undefined, {
                    use: "http",
                    method: "DELETE"
                });

                assert.deepEqual(response, {
                    deleted: true,
                });
            });

            it("should throw error with 'Unknown api request.'", function (done) {

                WebSocketAPI.fetch("something404", undefined, {
                        use: "http",
                        method: "DELETE"
                    })
                    .then(_ => done(new Error("Was supposed to throw a error.")))
                    .catch(err => {
                        try {
                            assert.throws(() => {
                                throw err;
                            }, Error, "Unknown api request");
                            done();
                        } catch (err) {
                            done(err);
                        }
                    });

            });

            it("should throw error with 'test error'", function (done) {

                WebSocketAPI.fetch("error", undefined, {
                        use: "http",
                        method: "DELETE"
                    })
                    .then(_ => done(new Error("Was supposed to throw a error.")))
                    .catch(err => {
                        try {
                            assert.throws(() => {
                                throw err;
                            }, Error, "test error");
                            done();
                        } catch (err) {
                            done(err);
                        }
                    });

            });

            it("should throw timeout error with 'Timeout Error'", function (done) {

                WebSocketAPI.fetch("timeout", undefined, {
                        use: "http",
                        timeout: 150,
                        method: "DELETE"
                    })
                    .then(_ => done(new Error("Was supposed to throw a timeout error.")))
                    .catch(err => {
                        try {
                            assert.throws(() => {
                                throw err;
                            }, Error, "Request to server timed out");
                            done();
                        } catch (err) {
                            done(err);
                        }
                    });
                this.timeout(200);
            });

        });

    });

});