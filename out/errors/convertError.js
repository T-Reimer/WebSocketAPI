"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Convert any error to a object to send to client
 *
 * @param error the error to convert to object
 */
function convertError(error) {
    var name = error.name, message = error.message;
    var status;
    if (error.status) {
        status = error.status;
    }
    // create the data object to send to client
    var data = {
        name: name,
        message: message,
        status: status,
    };
    return data;
}
exports.convertError = convertError;
//# sourceMappingURL=convertError.js.map