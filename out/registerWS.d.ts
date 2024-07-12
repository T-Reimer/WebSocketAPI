import WebSocket from "ws";
import { SettingsInterface } from "./index";
/**
 * Register the web wss server to use as api
 *
 * @param wss The ws server object
 */
export declare function registerWS(wss: WebSocket.Server, settings: SettingsInterface): void;
