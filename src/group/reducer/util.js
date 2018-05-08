"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reducer_1 = require("../../array/reducer");
var reducer_2 = require("../../control/reducer");
var state_1 = require("../../state");
var reducer_3 = require("../reducer");
function callChildReducer(state, action) {
    if (state_1.isArrayState(state)) {
        return reducer_1.formArrayReducerInternal(state, action);
    }
    if (state_1.isGroupState(state)) {
        return reducer_3.formGroupReducerInternal(state, action);
    }
    return reducer_2.formControlReducerInternal(state, action);
}
exports.callChildReducer = callChildReducer;
function dispatchActionPerChild(controls, actionCreator) {
    var hasChanged = false;
    var newControls = Object.keys(controls)
        .reduce(function (c, key) {
        c[key] = callChildReducer(controls[key], actionCreator(controls[key].id));
        hasChanged = hasChanged || c[key] !== controls[key];
        return c;
    }, {});
    return hasChanged ? newControls : controls;
}
exports.dispatchActionPerChild = dispatchActionPerChild;
function callChildReducers(controls, action) {
    var hasChanged = false;
    var newControls = Object.keys(controls)
        .map(function (key) { return [key, callChildReducer(controls[key], action)]; })
        .reduce(function (res, _a) {
        var key = _a[0], state = _a[1];
        hasChanged = hasChanged || state !== controls[key];
        return Object.assign(res, (_b = {}, _b[key] = state, _b));
        var _b;
    }, {});
    return hasChanged ? newControls : controls;
}
function childReducer(state, action) {
    var controls = callChildReducers(state.controls, action);
    if (state.controls === controls) {
        return state;
    }
    return state_1.computeGroupState(state.id, controls, state.value, state.errors, state.pendingValidations, state.userDefinedProperties);
}
exports.childReducer = childReducer;
//# sourceMappingURL=util.js.map