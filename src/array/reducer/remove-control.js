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
function updateIdRecursiveForGroup(state, newId) {
    var controls = Object.keys(state.controls).reduce(function (agg, key) {
        return Object.assign(agg, (_a = {},
            _a[key] = updateIdRecursive(state.controls[key], newId + "." + key),
            _a));
        var _a;
    }, {});
    return __assign({}, state, { id: newId, controls: controls });
}
function updateIdRecursiveForArray(state, newId) {
    var controls = state.controls.map(function (c, i) { return updateIdRecursive(c, newId + "." + i); });
    return __assign({}, state, { id: newId, controls: controls });
}
function updateIdRecursive(state, newId) {
    if (state.id === newId) {
        return state;
    }
    if (state_1.isGroupState(state)) {
        return updateIdRecursiveForGroup(state, newId);
    }
    if (state_1.isArrayState(state)) {
        return updateIdRecursiveForArray(state, newId);
    }
    return __assign({}, state, { id: newId });
}
function removeControlReducer(state, action) {
    if (action.type !== actions_1.RemoveArrayControlAction.TYPE) {
        return state;
    }
    if (action.controlId !== state.id) {
        return util_1.childReducer(state, action);
    }
    if (action.payload.index >= state.controls.length || action.payload.index < 0) {
        throw new Error("Index " + action.payload.index + " is out of bounds for array '" + state.id + "' with length " + state.controls.length + "!"); // `;
    }
    var index = action.payload.index;
    var controls = state.controls.filter(function (_, i) { return i !== index; }).map(function (c, i) { return updateIdRecursive(c, state.id + "." + i); });
    return state_1.computeArrayState(state.id, controls, state.value, state.errors, state.pendingValidations, state.userDefinedProperties);
}
exports.removeControlReducer = removeControlReducer;
//# sourceMappingURL=remove-control.js.map