"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../../actions");
var state_1 = require("../../state");
var util_1 = require("./util");
function setValueReducer(state, action) {
    if (action.type !== actions_1.SetValueAction.TYPE) {
        return state;
    }
    if (action.controlId !== state.id) {
        return util_1.childReducer(state, action);
    }
    if (state.value === action.payload.value) {
        return state;
    }
    if (action.payload.value instanceof Date) {
        throw new Error('Date values are not supported. Please used serialized strings instead.');
    }
    var value = action.payload.value;
    var controls = value
        .map(function (v, i) {
        if (!state.controls[i]) {
            return state_1.createChildState(state.id + "." + i, v);
        }
        return util_1.callChildReducer(state.controls[i], new actions_1.SetValueAction(state.controls[i].id, v));
    });
    return state_1.computeArrayState(state.id, controls, value, state.errors, state.pendingValidations, state.userDefinedProperties);
}
exports.setValueReducer = setValueReducer;
//# sourceMappingURL=set-value.js.map