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
function markAsTouchedReducer(state, action) {
    if (action.type !== actions_1.MarkAsTouchedAction.TYPE) {
        return state;
    }
    if (state.isTouched) {
        return state;
    }
    return __assign({}, state, { isTouched: true, isUntouched: false });
}
exports.markAsTouchedReducer = markAsTouchedReducer;
//# sourceMappingURL=mark-as-touched.js.map