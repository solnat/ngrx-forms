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
describe("form group " + enable_1.enableReducer.name, function () {
    it('should enable itself and all children recursively', function () {
        var state = state_1.cast(test_util_1.setPropertiesRecursively(test_util_1.INITIAL_STATE_FULL, [['isEnabled', false], ['isDisabled', true]]));
        var resultState = enable_1.enableReducer(state, new actions_1.EnableAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState).toEqual(test_util_1.INITIAL_STATE_FULL);
    });
    it('should not update state if all children are enabled recursively', function () {
        var resultState = enable_1.enableReducer(test_util_1.INITIAL_STATE_FULL, new actions_1.EnableAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState).toBe(test_util_1.INITIAL_STATE_FULL);
    });
    it('should enable children if the group itself is already enabled', function () {
        var state = __assign({}, test_util_1.INITIAL_STATE_FULL, { controls: __assign({}, test_util_1.INITIAL_STATE_FULL.controls, { inner2: __assign({}, test_util_1.INITIAL_STATE_FULL.controls.inner2, { isEnabled: false, isDisabled: true }) }) });
        var resultState = enable_1.enableReducer(state, new actions_1.EnableAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState).toEqual(test_util_1.INITIAL_STATE_FULL);
    });
    it('should enable without enabling any other children if control child gets enabled', function () {
        var state = state_1.cast(test_util_1.setPropertiesRecursively(test_util_1.INITIAL_STATE_FULL, [['isEnabled', false], ['isDisabled', true]]));
        var resultState = enable_1.enableReducer(state, new actions_1.EnableAction(test_util_1.FORM_CONTROL_INNER_ID));
        expect(resultState.isEnabled).toBe(true);
        expect(resultState.isDisabled).toBe(false);
        expect(resultState.controls.inner2.isEnabled).toBe(false);
        expect(resultState.controls.inner2.isDisabled).toBe(true);
    });
    it('should enable without enabling any other children if group child gets enabled', function () {
        var state = state_1.cast(test_util_1.setPropertiesRecursively(test_util_1.INITIAL_STATE_FULL, [['isEnabled', false], ['isDisabled', true]]));
        var resultState = enable_1.enableReducer(state, new actions_1.EnableAction(test_util_1.FORM_CONTROL_INNER3_ID));
        expect(resultState.isEnabled).toBe(true);
        expect(resultState.isDisabled).toBe(false);
        expect(resultState.controls.inner.isEnabled).toBe(false);
        expect(resultState.controls.inner.isDisabled).toBe(true);
    });
    it('should enable without enabling any other children if array child gets enabled', function () {
        var state = state_1.cast(test_util_1.setPropertiesRecursively(test_util_1.INITIAL_STATE_FULL, [['isEnabled', false], ['isDisabled', true]]));
        var resultState = enable_1.enableReducer(state, new actions_1.EnableAction(test_util_1.FORM_CONTROL_INNER5_ID));
        expect(resultState.isEnabled).toBe(true);
        expect(resultState.isDisabled).toBe(false);
        expect(resultState.controls.inner.isEnabled).toBe(false);
        expect(resultState.controls.inner.isDisabled).toBe(true);
    });
});
//# sourceMappingURL=enable.spec.js.map