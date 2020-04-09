import { Request } from "./../Request";
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
export declare function registerEvent(name: string, callback: (event: Request) => void): eventObject;
