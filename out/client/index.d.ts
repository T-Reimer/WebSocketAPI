import { stateChangeEvent } from "./socket";
import { Request } from "./../Request";
import { eventObject } from "./registerEvent";
export { onSnapshot } from "./onSnapshot";
interface Options {
    fetchUrl: string;
    websocketUrl: string;
    websocketOnMessage: Function;
    reconnect: boolean | null | Function;
    url: object;
    maxSocketLength: number;
    reconnectTimeOut: number | Function;
    unHandledWebSocketMessage?: Function;
    stateChange: (state: stateChangeEvent) => void;
}
export declare function newIndex(): number;
/**
 * The currently using options object
 */
export declare const setOptions: Options;
/**
 * Setup the client side api with the correct parameters
 *
 * @param options the options for the client side application
 */
export declare function setup(options: Options): void;
export interface requestOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "SNAPSHOT";
    use?: "ws" | "http";
    timeout?: number;
}
export declare function api(api: string): {
    get: (body: any, options?: requestOptions | undefined) => Promise<any>;
    post: (body: any, options?: requestOptions | undefined) => Promise<any>;
    put: (body: any, options?: requestOptions | undefined) => Promise<any>;
    delete: (body: any, options?: requestOptions | undefined) => Promise<any>;
    snapshot: (body: any, callback: () => void) => () => void;
};
/**
 * Request a get or delete
 *
 */
export declare function getData(id: number, api: string, body?: any, options?: requestOptions): Promise<any>;
/**
 * Send any post or put data
 *
 * @todo Add the timeout error
 */
export declare function sendData(id: number, api: string, body?: any, options?: requestOptions): Promise<any>;
/**
 * Make a new api request
 *
 * @param api the api endpoint to call
 * @param body the data to include in the fetch call
 * @param options any options for the request
 */
export declare function fetch(api: string, body?: any, options?: requestOptions): Promise<any>;
/**
 * Register a event listener for events sent from the server
 *
 * @param api The api name
 * @param callback the callback function
 */
export declare function on(api: string, callback: (event: Request) => void): eventObject;
