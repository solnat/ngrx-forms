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
function startAsyncValidationReducer(state, action) {
    if (action.type !== actions_1.StartAsyncValidationAction.TYPE) {
        return state;
    }
    if (state.pendingValidations.indexOf(action.payload.name) >= 0) {
        return state;
    }
    return __assign({}, state, { pendingValidations: state.pendingValidations.concat([action.payload.name]), isValidationPending: true });
}
exports.startAsyncValidationReducer = startAsyncValidationReducer;
//# sourceMappingURL=start-async-validation.js.map