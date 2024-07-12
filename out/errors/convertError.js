"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertError = convertError;
/**
 * Convert any error to a object to send to client
 *
 * @param error the error to convert to object
 */
function convertError(error) {
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
//# sourceMappingURL=convertError.js.map