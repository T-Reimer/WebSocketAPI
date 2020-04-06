import { Request } from "./../Request";
import { getEvent, postEvent, putEvent, delEvent } from "./../events/index";

export interface eventObject {
    get: (callback: (data: any) => void) => eventObject;
    post: (callback: (data: any) => void) => eventObject;
    put: (callback: (data: any) => void) => eventObject;
    delete: (callback: (data: any) => void) => eventObject;
}


/**
 * Register a event listener for events sent from the server
 * 
 * @param name The api name
 * @param callback the callback function
 */
export function registerEvent(name: string, callback: (event: Request) => void) {
    // if a callback function is given register it for each of the categories
    if (callback) {
        getEvent.on(name, callback);
        postEvent.on(name, callback);
        putEvent.on(name, callback);
        delEvent.on(name, callback);
    }

    // return a object to register listeners for specific event types
    let obj: eventObject = {
        get: (callback: Function) => {
            getEvent.on(name, callback);
            return obj;
        },
        post: (callback: Function) => {

            postEvent.on(name, callback);
            return obj;
        },
        put: (callback: Function) => {

            putEvent.on(name, callback);
            return obj;
        },
        delete: (callback: Function) => {

            delEvent.on(name, callback);
            return obj;
        }
    }
    return obj;
}