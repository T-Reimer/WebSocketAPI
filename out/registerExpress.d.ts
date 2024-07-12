import { Application } from "express";
import { SettingsInterface } from "./index";
/**
 * Register the get and post requests from express
 *
 * @param app The express app
 */
export declare function registerExpress(app: Application, route: string, settings: SettingsInterface): void;
