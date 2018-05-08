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
function enableReducer(state, action) {
    if (action.type !== actions_1.EnableAction.TYPE) {
        return state;
    }
    if (state.isEnabled) {
        return state;
    }
    return __assign({}, state, { isEnabled: true, isDisabled: false });
}
exports.enableReducer = enableReducer;
//# sourceMappingURL=enable.js.map