"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../../actions");
function markAsPristineReducer(state, action) {
    if (action.type !== actions_1.MarkAsPristineAction.TYPE) {
        return state;
    }
    if (state.isPristine) {
        return state;
    }
    return __assign({}, state, { isDirty: false, isPristine: true });
}
exports.markAsPristineReducer = markAsPristineReducer;
//# sourceMappingURL=mark-as-pristine.js.map