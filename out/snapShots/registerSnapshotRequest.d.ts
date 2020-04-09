import RequestData from "../RequestData";
import { Request } from "../Request";
import { ServerRequest } from "../ServerRequest";
import { SettingsInterface } from "..";
export declare const registeredListeners: SnapshotRequest[];
export declare function registerSnapshotRequest(data: RequestData, event: ServerRequest, settings: SettingsInterface): void;
/**
 * Un register the given snapshot listener
 *
 * @param data
 */
export declare function unregisterSnapshotRequest(data: RequestData): void;
/**
 * A snapshot request data
 */
declare class SnapshotRequest extends Request {
    data: RequestData;
    event: ServerRequest;
    client: import("./../../lib/ws/wsClient").wsClient | null;
    extra: any;
    constructor(data: RequestData, event: ServerRequest);
    /**
     * Un register the snapshot event
     */
    unregister(unregisterClient?: boolean): void;
}
export {};
