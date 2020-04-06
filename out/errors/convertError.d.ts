import { InvalidRequest } from "./InvalidRequest";
interface Error {
    name: string;
    message: string;
    status?: number;
}
export interface RequestError {
    name: string;
    message: string;
    status?: number;
}
/**
 * Convert any error to a object to send to client
 *
 * @param error the error to convert to object
 */
export declare function convertError(error: InvalidRequest | Error): RequestError;
export {};
