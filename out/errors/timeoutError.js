"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeoutError = void 0;
class TimeoutError extends Error {
    constructor(message) {
        super(message);
        this.name = "Timeout Error";
    }
}
exports.TimeoutError = TimeoutError;
//# sourceMappingURL=timeoutError.js.map