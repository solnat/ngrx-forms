"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reducer_1 = require("../../control/reducer");
var reducer_2 = require("../../group/reducer");
var state_1 = require("../../state");
var reducer_3 = require("../reducer");
function callChildReducer(state, action) {
    if (state_1.isArrayState(state)) {
        return reducer_3.formArrayReducerInternal(state, action);
    }
    if (state_1.isGroupState(state)) {
        return reducer_2.formGroupReducerInternal(state, action);
    }
    return reducer_1.formControlReducerInternal(state, action);
}
exports.callChildReducer = callChildReducer;
function dispatchActionPerChild(controls, actionCreator) {
    var hasChanged = false;
    var newControls = controls
        .map(function (state) {
        var newState = callChildReducer(state, actionCreator(state.id));
        hasChanged = hasChanged || state !== newState;
        return newState;
    });
    return hasChanged ? newControls : controls;
}
exports.dispatchActionPerChild = dispatchActionPerChild;
function callChildReducers(controls, action) {
    var hasChanged = false;
    var newControls = controls
        .map(function (state) {
        var newState = callChildReducer(state, action);
        hasChanged = hasChanged || state !== newState;
        return newState;
    });
    return hasChanged ? newControls : controls;
}
function childReducer(state, action) {
    var controls = callChildReducers(state.controls, action);
    if (state.controls === controls) {
        return state;
    }
    return state_1.computeArrayState(state.id, controls, state.value, state.errors, state.pendingValidations, state.userDefinedProperties);
}
exports.childReducer = childReducer;
//# sourceMappingURL=util.js.map