import { InvalidRequest } from "./InvalidRequest";

interface Error {
    name: string;
    message: string;
    status?: number;
}

export interface RequestError {
    name: string,
    message: string,
    status?: number,
}

/**
 * Convert any error to a object to send to client
 * 
 * @param error the error to convert to object
 */
export function convertError(error: InvalidRequest | Error): RequestError {

    const { name, message } = error;

    let status;
    if (error.status) {
        status = error.status;
    }

    // create the data object to send to client
    const data = {
        name,
        message,
        status,
    };

    return data;
}