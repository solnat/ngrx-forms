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
function setErrorsReducer(state, action) {
    if (action.type !== actions_1.SetErrorsAction.TYPE) {
        return state;
    }
    if (state.isDisabled) {
        return state;
    }
    if (state.errors === action.payload.errors) {
        return state;
    }
    if (util_1.deepEquals(state.errors, action.payload.errors)) {
        return state;
    }
    if (!action.payload.errors || typeof action.payload.errors !== 'object' || Array.isArray(action.payload.errors)) {
        throw new Error("Control errors must be an object; got " + action.payload.errors); // `;
    }
    if (Object.keys(action.payload.errors).some(function (key) { return key.startsWith('$'); })) {
        throw new Error("Control errors must not use $ as a prefix; got " + JSON.stringify(action.payload.errors)); // `;
    }
    var asyncErrors = Object.keys(state.errors)
        .filter(function (key) { return key.startsWith('$'); })
        .reduce(function (res, key) {
        return Object.assign(res, (_a = {}, _a[key] = state.errors[key], _a));
        var _a;
    }, {});
    var newErrors = util_1.isEmpty(asyncErrors) ? action.payload.errors : Object.assign(asyncErrors, action.payload.errors);
    var isValid = util_1.isEmpty(newErrors);
    return __assign({}, state, { isValid: isValid, isInvalid: !isValid, errors: newErrors });
}
exports.setErrorsReducer = setErrorsReducer;
//# sourceMappingURL=set-errors.js.map