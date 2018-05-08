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
var enable_1 = require("./enable");
var test_util_1 = require("./test-util");
describe("form array " + enable_1.enableReducer.name, function () {
    it('should enable itself and all children recursively', function () {
        var state = state_1.cast(test_util_1.setPropertiesRecursively(test_util_1.INITIAL_STATE, [['isEnabled', false], ['isDisabled', true]]));
        var resultState = enable_1.enableReducer(state, new actions_1.EnableAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState).toEqual(test_util_1.INITIAL_STATE);
    });
    it('should not update state if all children are enabled recursively', function () {
        var resultState = enable_1.enableReducer(test_util_1.INITIAL_STATE, new actions_1.EnableAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState).toBe(test_util_1.INITIAL_STATE);
    });
    it('should enable children if the group itself is already enabled', function () {
        var state = __assign({}, test_util_1.INITIAL_STATE, { controls: [
                test_util_1.INITIAL_STATE.controls[0],
                __assign({}, test_util_1.INITIAL_STATE.controls[1], { isEnabled: false, isDisabled: true }),
            ] });
        var resultState = enable_1.enableReducer(state, new actions_1.EnableAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState).toEqual(test_util_1.INITIAL_STATE);
    });
    it('should enable if control child gets enabled', function () {
        var state = state_1.cast(test_util_1.setPropertiesRecursively(test_util_1.INITIAL_STATE, [['isEnabled', false], ['isDisabled', true]], test_util_1.FORM_CONTROL_1_ID));
        var resultState = enable_1.enableReducer(state, new actions_1.EnableAction(test_util_1.FORM_CONTROL_0_ID));
        expect(resultState).toEqual(test_util_1.INITIAL_STATE);
    });
    it('should enable without enabling any other children if control child gets enabled', function () {
        var state = state_1.cast(test_util_1.setPropertiesRecursively(test_util_1.INITIAL_STATE, [['isEnabled', false], ['isDisabled', true]]));
        var resultState = enable_1.enableReducer(state, new actions_1.EnableAction(test_util_1.FORM_CONTROL_0_ID));
        expect(resultState.isEnabled).toBe(true);
        expect(resultState.isDisabled).toBe(false);
        expect(resultState.controls[1].isEnabled).toBe(false);
        expect(resultState.controls[1].isDisabled).toBe(true);
    });
    it('should enable without enabling any other children if group child gets enabled', function () {
        var state = state_1.cast(test_util_1.setPropertiesRecursively(test_util_1.INITIAL_STATE_NESTED_GROUP, [['isEnabled', false], ['isDisabled', true]]));
        var resultState = enable_1.enableReducer(state, new actions_1.EnableAction(test_util_1.FORM_CONTROL_0_ID));
        expect(resultState.isEnabled).toBe(true);
        expect(resultState.isDisabled).toBe(false);
        expect(resultState.controls[1].isEnabled).toBe(false);
        expect(resultState.controls[1].isDisabled).toBe(true);
    });
    it('should enable without enabling any other children if array child gets enabled', function () {
        var state = state_1.cast(test_util_1.setPropertiesRecursively(test_util_1.INITIAL_STATE_NESTED_ARRAY, [['isEnabled', false], ['isDisabled', true]]));
        var resultState = enable_1.enableReducer(state, new actions_1.EnableAction(test_util_1.FORM_CONTROL_0_ID));
        expect(resultState.isEnabled).toBe(true);
        expect(resultState.isDisabled).toBe(false);
        expect(resultState.controls[1].isEnabled).toBe(false);
        expect(resultState.controls[1].isDisabled).toBe(true);
    });
});
//# sourceMappingURL=enable.spec.js.map