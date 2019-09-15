import { InvalidRequest } from "./InvalidRequest";

interface Error {
    name: string;
    message: string;
    status?: number;
}

/**
 * Convert any error to a object to send to client
 * 
 * @param error the error to convert to object
 */
export function convertError(error: InvalidRequest | Error) {

    const { name, message } = error;

    let status: number | null = null;
    if (error.status) {
        status = error.status;
    }

    // create the data object to send to client
    const data: {
        name: string,
        message: string,
        status: number | null,
        error: true,
        id: number | null
    } = {
        name,
        message,
        status,
        error: true,
        id: null
    };

    return data;
}