import { Request as ExpressRequest, Response as ExpressResponse } from "express";
import { SettingsInterface } from "./index";
import { ServerRequest } from "./ServerRequest";
/**
 *
 * @param req the request
 * @param res the response
 * @param settings the settings
 */
export declare function createExpressRequest(req: ExpressRequest, res: ExpressResponse, method: string, settings: SettingsInterface): ServerRequest;
