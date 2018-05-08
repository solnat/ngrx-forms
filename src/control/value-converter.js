"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NgrxValueConverters = {
    identity: function () {
        return {
            convertViewToStateValue: function (value) { return value; },
            convertStateToViewValue: function (value) { return value; },
        };
    },
    dateToISOString: {
        convertViewToStateValue: function (date) { return date === null ? null : date.toISOString(); },
        convertStateToViewValue: function (s) { return s === null ? null : new Date(Date.parse(s)); },
    },
    objectToJSON: {
        convertViewToStateValue: function (value) { return value === null ? null : JSON.stringify(value); },
        convertStateToViewValue: function (s) { return s === null ? null : JSON.parse(s); },
    },
};
//# sourceMappingURL=value-converter.js.map