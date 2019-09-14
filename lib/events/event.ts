import { Request } from "../Request";
import { InvalidRequest } from "./../errors/InvalidRequest";


export class Events {
    events: { [key: string]: Function[] };

    constructor() {
        /**
         * The registered events
         */
        this.events = {};

    }


    triggerEvent(event: Request) {
        // the caller index
        let index = 0;
        const { name } = event;

        /**
         * Call this function to run the next function
         */
        const callEvent: Function = () => {
            // check if the callback exists
            if (this.events[name][index]) {
                // run the callback
                this.events[name][index](event, () => {
                    index++;
                    callEvent();
                });
            }
        };

        if (this.events[name]) {
            callEvent();
        } else {
            // the event is not registered and send a error back to client so the request can be closed
            const error: InvalidRequest = new InvalidRequest("Unknown api request. Please register the endpoint before using it.");
            error.name = "Invalid Request";
            error.status = 404;

            throw error;
        }
    }

    /**
     * Add a Event listener to the event name
     * 
     * @param name The event name
     * @param callback The callback function.
     */
    on(name: string, callback: Function) {
        if (!this.events[name]) {
            this.events[name] = [];
        }

        // add the callback to the event listeners
        this.events[name].push(callback);
    }

    /**
     * Remove the event from the list
     * 
     * @param name The event name
     * @param callback the callback to remove
     */
    remove(name: string, callback: Function) {

        // check if the list exists
        if (this.events[name]) {
            // look for the function in the list
            for (let i = this.events[name].length - 1; i >= 0; i--) {

                // match the callback function
                if (this.events[name][i] === callback) {
                    // remove the function from the list
                    this.events[name].splice(i, 1);
                }
            }
        }
    }
}