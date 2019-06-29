"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Events = /** @class */ (function () {
    function Events() {
        /**
         * The registered events
         */
        this.events = {};
    }
    Events.prototype.triggerEvent = function (name, arg) {
        var _this = this;
        // the caller index
        var index = 0;
        /**
         * Call this function to run the next function
         */
        var callEvent = function () {
            // check if the callback exists
            if (_this.events[name][index]) {
                // run the callback
                _this.events[name][index](arg, function () {
                    index++;
                    callEvent();
                });
            }
        };
        if (this.events[name]) {
            callEvent();
        }
    };
    /**
     * Add a Event listener to the event name
     *
     * @param name The event name
     * @param callback The callback function.
     */
    Events.prototype.on = function (name, callback) {
        if (!this.events[name]) {
            this.events[name] = [];
        }
        // add the callback to the event listeners
        this.events[name].push(callback);
    };
    /**
     * Remove the event from the list
     *
     * @param name The event name
     * @param callback the callback to remove
     */
    Events.prototype.remove = function (name, callback) {
        // check if the list exists
        if (this.events[name]) {
            // look for the function in the list
            for (var i = this.events[name].length - 1; i >= 0; i--) {
                // match the callback function
                if (this.events[name][i] === callback) {
                    // remove the function from the list
                    this.events[name].splice(i, 1);
                }
            }
        }
    };
    return Events;
}());
exports.Events = Events;
//# sourceMappingURL=event.js.map