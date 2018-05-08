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
var util_1 = require("../../util");
function setAsyncErrorReducer(state, action) {
    if (action.type !== actions_1.SetAsyncErrorAction.TYPE) {
        return state;
    }
    if (state.isDisabled) {
        return state;
    }
    if (state.pendingValidations.indexOf(action.payload.name) < 0) {
        return state;
    }
    var name = '$' + action.payload.name;
    var value = action.payload.value;
    if (util_1.deepEquals(state.errors[name], action.payload.value)) {
        value = state.errors[name];
    }
    var errors = __assign({}, state.errors, (_a = {}, _a[name] = value, _a));
    var pendingValidations = state.pendingValidations.filter(function (v) { return v !== action.payload.name; });
    return __assign({}, state, { isValid: false, isInvalid: true, errors: errors,
        pendingValidations: pendingValidations, isValidationPending: pendingValidations.length > 0 });
    var _a;
}
exports.setAsyncErrorReducer = setAsyncErrorReducer;
//# sourceMappingURL=set-async-error.js.map