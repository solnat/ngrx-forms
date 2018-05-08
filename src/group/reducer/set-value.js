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
    var controls = Object.keys(value)
        .reduce(function (c, key) {
        if (!state.controls[key]) {
            c[key] = state_1.createChildState(state.id + "." + key, value[key]);
        }
        else {
            c[key] = util_1.callChildReducer(state.controls[key], new actions_1.SetValueAction(state.controls[key].id, value[key]));
        }
        return c;
    }, {});
    return state_1.computeGroupState(state.id, controls, value, state.errors, state.pendingValidations, state.userDefinedProperties);
}
exports.setValueReducer = setValueReducer;
//# sourceMappingURL=set-value.js.map