/**
 * Create a new Invalid Request Error
 */
export declare class InvalidRequest extends Error {
    status: number;
    constructor(message: string);
}
