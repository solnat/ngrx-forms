"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var state_1 = require("../state");
function updateArrayControlsState(updateFn) {
    return function (state) {
        var hasChanged = false;
        var newControls = state.controls.map(function (control, index) {
            var newControl = updateFn(control, state, index);
            hasChanged = hasChanged || newControl !== control;
            return newControl;
        });
        return hasChanged ? newControls : state.controls;
    };
}
function updateArraySingle(updateFn) {
    return function (state) {
        var newControls = updateArrayControlsState(updateFn)(state);
        return newControls !== state.controls
            ? state_1.computeArrayState(state.id, newControls, state.value, state.errors, state.pendingValidations, state.userDefinedProperties)
            : state;
    };
}
function updateArray(stateOrFunction) {
    var updateFnArr = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        updateFnArr[_i - 1] = arguments[_i];
    }
    if (typeof stateOrFunction !== 'function') {
        var first = updateFnArr[0], rest = updateFnArr.slice(1);
        return updateArray.apply(void 0, [first].concat(rest))(stateOrFunction);
    }
    return function (state) {
        return [stateOrFunction].concat(updateFnArr).reduce(function (s, updateFn) { return updateArraySingle(updateFn)(s); }, state);
    };
}
exports.updateArray = updateArray;
//# sourceMappingURL=update-array.js.map