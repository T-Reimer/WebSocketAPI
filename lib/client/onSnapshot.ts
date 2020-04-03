import { registerSnapshot, ready as socketReady, stateChangeEvents, stateChangeEvent, send } from "./socket";
import { newIndex } from ".";
import RequestData, { SnapshotResponse } from "../RequestData";


/**
 * Register a new snapshot event to the server. This event will automatically re-register if the connection gets disconnected.
 * 
 * @param api the api end point to call
 * @param requestHead any information to send to server. This info gets used when matching the snapshot type. So don't use a large payload here
 * @param callback the callback to run the the snapshot data
 */
export function onSnapshot(api: string, requestHead: any, callback: (snapshot: SnapshotResponse) => void): () => void {

    // create a index number to use for all of the transactions
    let id = newIndex();
    let unregister = () => { };
    const unregisterState = (unregisterServer?: boolean) => {
        unregisterServer = typeof unregisterServer === "boolean" ? unregisterServer : true;

        unregister();

        for (let i = stateChangeEvents.length - 1; i >= 0; i--) {
            if (stateChangeEvents[i] === onStateChange) {
                stateChangeEvents.splice(i, 1);
            }
        }

        if (socketReady && unregisterServer) {
            // unregister event server side
            let data: RequestData = {
                id,
                name: api,
                body: null,
                method: "SNAPSHOT",
                unregister: true,
            };

            send(data);
        }

    };

    // save the previous response in a variable
    let lastResponse: SnapshotResponse | null = null;

    const createSnapshot = (response: RequestData) => {

        // if a unregister event is received from server then unregister the callback
        if (response.unregister) {
            unregisterState(false);
            return;
        }

        // create the snapshot response to send to callback
        const snapshot: SnapshotResponse = {
            last: lastResponse,
            data: response.body,
            timestamp: new Date(),
            requestHead: requestHead,
        };

        callback(snapshot);

        lastResponse = snapshot;
        lastResponse.last = null;
    };

    // check if the web socket is open.. If it is then register
    if (socketReady) {
        unregister = registerSnapshot(id, api, requestHead, createSnapshot);
    }

    const onStateChange = (state: stateChangeEvent) => {
        if (state === "READY") {

            // unregister the previous event listeners before registering again
            unregister();

            // register for updates from the server
            unregister = registerSnapshot(id, api, requestHead, createSnapshot);
        }
    };

    // add a listener for when the state of the websocket changes
    stateChangeEvents.push(onStateChange);

    // return the function to unregister the snapshot listener
    return unregisterState;
}