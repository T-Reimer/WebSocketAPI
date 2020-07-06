"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Removes any leading or following slashes in the endpoint url
 *
 * @param url
 */
function stripUrlSlashes(url) {
    return url.replace(/^\/|\/$/g, "");
}
exports.default = stripUrlSlashes;
//# sourceMappingURL=stripSlashes.js.map