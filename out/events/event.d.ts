import { Request } from "../Request";
export declare class Events {
    events: {
        [key: string]: Function[];
    };
    constructor();
    /**
     * Trigger a event
     *
     * @param event
     */
    triggerEvent(event: Request): void;
    /**
     * Add a Event listener to the event name
     *
     * @param name The event name
     * @param callback The callback function.
     */
    on(name: string, callback: Function): void;
    /**
     * Remove the event from the list
     *
     * @param name The event name
     * @param callback the callback to remove
     */
    remove(name: string, callback: Function): void;
}
