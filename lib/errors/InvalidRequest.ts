/**
 * Create a new Invalid Request Error
 */
export class InvalidRequest extends Error {
    status: number;

    constructor(message: string) {
        super(message);

        this.name = "Invalid Request";
        this.status = 500;
    }
}