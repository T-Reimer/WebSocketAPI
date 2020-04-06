import { ServerRequest } from "./ServerRequest";
import { SettingsInterface } from "./index";
import { wsClient } from "./ws/wsClient";
/**
 * Create the event for the web socket connection
 */
export declare function createWSRequest(client: wsClient, id: number, name: string, body: any, method: string, settings: SettingsInterface): ServerRequest;
