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
    private settings;
    client: import("./../../lib/ws/wsClient").wsClient | null;
    extra: any;
    _onUnregister: (() => void)[];
    constructor(data: RequestData, event: ServerRequest, settings: SettingsInterface);
    /**
     * Un register the snapshot event
     */
    unregister(unregisterClient?: boolean): void;
    /**
     * Add a event listener to run when the event get's un registered
     */
    onUnregister(callback: () => void): void;
}
export {};
