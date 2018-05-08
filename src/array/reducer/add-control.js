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
function addControlReducer(state, action) {
    if (action.type !== actions_1.AddArrayControlAction.TYPE) {
        return state;
    }
    if (action.controlId !== state.id) {
        return util_1.childReducer(state, action);
    }
    var index = action.payload.index === null ? state.controls.length : action.payload.index;
    if (index > state.controls.length || index < 0) {
        throw new Error("Index " + index + " is out of bounds for array '" + state.id + "' with length " + state.controls.length + "!"); // `;
    }
    var controls = state.controls.slice();
    controls.splice(index, 0, state_1.createChildState(state.id + "." + index, action.payload.value));
    controls = controls.map(function (c, i) { return (__assign({}, c, { id: state.id + "." + i })); });
    return state_1.computeArrayState(state.id, controls, state.value, state.errors, state.pendingValidations, state.userDefinedProperties);
}
exports.addControlReducer = addControlReducer;
//# sourceMappingURL=add-control.js.map