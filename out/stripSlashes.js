"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = stripUrlSlashes;
/**
 * Removes any leading or following slashes in the endpoint url
 *
 * @param url
 */
function stripUrlSlashes(url) {
    return url.replace(/^\/|\/$/g, "");
}
//# sourceMappingURL=stripSlashes.js.map