"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reducer_1 = require("../group/reducer");
var state_1 = require("../state");
function updateGroupControlsState(updateFns) {
    return function (state) {
        var hasChanged = false;
        var newControls = Object.keys(state.controls).reduce(function (res, key) {
            var control = state.controls[key];
            res[key] = control;
            if (updateFns.hasOwnProperty(key)) {
                var newControl = updateFns[key](control, state);
                hasChanged = hasChanged || newControl !== control;
                res[key] = newControl;
            }
            return res;
        }, {});
        return hasChanged ? newControls : state.controls;
    };
}
function updateGroupSingle(updateFns) {
    return function (state) {
        var newControls = updateGroupControlsState(updateFns)(state);
        return newControls !== state.controls
            ? state_1.computeGroupState(state.id, newControls, state.value, state.errors, state.pendingValidations, state.userDefinedProperties)
            : state;
    };
}
function updateGroup(stateOrFunction) {
    var updateFnsArr = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        updateFnsArr[_i - 1] = arguments[_i];
    }
    if (state_1.isGroupState(stateOrFunction)) {
        var first = updateFnsArr[0], rest = updateFnsArr.slice(1);
        return updateGroup.apply(void 0, [first].concat(rest))(stateOrFunction);
    }
    return function (state) {
        return [stateOrFunction].concat(updateFnsArr).reduce(function (s, updateFn) { return updateGroupSingle(updateFn)(s); }, state);
    };
}
exports.updateGroup = updateGroup;
/**
 * This function creates a reducer function that first applies an action to the state
 * and afterwards applies all given update function objects one after another to the
 * resulting form group state.
 *
 * The following (contrived) example uses this function to create a reducer that after
 * each action validates the child control `name` to be required and sets the child
 * control `email`'s value to be `''` if the name is invalid.
 *
 * ```typescript
 * interface FormValue {
 *   name: string;
 *   email: string;
 * }
 *
 * const reducer = createFormGroupReducerWithUpdate<FormValue>(
 *   {
 *     name: validate(required),
 *   },
 *   {
 *     email: (email, parentGroup) =>
 *       parentGroup.controls.name.isInvalid
 *         ? setValue('', email)
 *         : email,
 *   },
 * );
 * ```
 */
function createFormGroupReducerWithUpdate() {
    var updateFnsArr = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        updateFnsArr[_i] = arguments[_i];
    }
    return function (state, action) {
        state = reducer_1.formGroupReducer(state, action);
        return updateGroup.apply(void 0, updateFnsArr)(state);
    };
}
exports.createFormGroupReducerWithUpdate = createFormGroupReducerWithUpdate;
//# sourceMappingURL=update-group.js.map