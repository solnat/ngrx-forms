"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../../actions");
var state_1 = require("../../state");
var util_1 = require("./util");
var util_2 = require("../../util");
function setErrorsReducer(state, action) {
    if (action.type !== actions_1.SetErrorsAction.TYPE) {
        return state;
    }
    if (action.controlId !== state.id) {
        return util_1.childReducer(state, action);
    }
    if (state.isDisabled) {
        return state;
    }
    if (state.errors === action.payload.errors) {
        return state;
    }
    if (util_2.deepEquals(state.errors, action.payload.errors)) {
        return state;
    }
    if (!action.payload.errors || typeof action.payload.errors !== 'object' || Array.isArray(action.payload.errors)) {
        throw new Error("Control errors must be an object; got " + action.payload.errors); // `;
    }
    if (Object.keys(action.payload.errors).some(function (key) { return key.startsWith('_'); })) {
        throw new Error("Control errors must not use underscore as a prefix; got " + JSON.stringify(action.payload.errors)); // `;
    }
    if (Object.keys(action.payload.errors).some(function (key) { return key.startsWith('$'); })) {
        throw new Error("Control errors must not use $ as a prefix; got " + JSON.stringify(action.payload.errors)); // `;
    }
    var childAndAsyncErrors = Object.keys(state.errors)
        .filter(function (key) { return key.startsWith('_') || key.startsWith('$'); })
        .reduce(function (res, key) {
        return Object.assign(res, (_a = {}, _a[key] = state.errors[key], _a));
        var _a;
    }, {});
    var newErrors = Object.assign(childAndAsyncErrors, action.payload.errors);
    return state_1.computeGroupState(state.id, state.controls, state.value, newErrors, state.pendingValidations, state.userDefinedProperties);
}
exports.setErrorsReducer = setErrorsReducer;
//# sourceMappingURL=set-errors.js.map