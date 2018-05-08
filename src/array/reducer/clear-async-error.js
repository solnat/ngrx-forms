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
var state_1 = require("../../state");
var util_1 = require("./util");
function clearAsyncErrorReducer(state, action) {
    if (action.type !== actions_1.ClearAsyncErrorAction.TYPE) {
        return state;
    }
    if (action.controlId !== state.id) {
        return util_1.childReducer(state, action);
    }
    if (state.pendingValidations.indexOf(action.payload.name) < 0) {
        return state;
    }
    var name = '$' + action.payload.name;
    var errors = state.errors;
    if (state.errors.hasOwnProperty(name)) {
        errors = __assign({}, state.errors);
        delete errors[name];
    }
    var pendingValidations = state.pendingValidations.filter(function (v) { return v !== action.payload.name; });
    return state_1.computeArrayState(state.id, state.controls, state.value, errors, pendingValidations, state.userDefinedProperties);
}
exports.clearAsyncErrorReducer = clearAsyncErrorReducer;
//# sourceMappingURL=clear-async-error.js.map