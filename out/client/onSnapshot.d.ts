import { SnapshotResponse } from "../RequestData";
/**
 * Register a new snapshot event to the server. This event will automatically re-register if the connection gets disconnected.
 *
 * @param api the api end point to call
 * @param requestHead any information to send to server. This info gets used when matching the snapshot type. So don't use a large payload here
 * @param callback the callback to run the the snapshot data
 */
export declare function onSnapshot(api: string, requestHead: any, callback: (snapshot: SnapshotResponse) => void): () => void;
