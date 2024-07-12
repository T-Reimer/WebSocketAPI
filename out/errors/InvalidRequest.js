"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidRequest = void 0;
/**
 * Create a new Invalid Request Error
 */
class InvalidRequest extends Error {
    constructor(message) {
        super(message);
        this.name = "Invalid Request";
        this.status = 500;
    }
}
exports.InvalidRequest = InvalidRequest;
//# sourceMappingURL=InvalidRequest.js.map