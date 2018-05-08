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
var disable_1 = require("./disable");
var test_util_1 = require("./test-util");
describe("form group " + disable_1.disableReducer.name, function () {
    it('should update state if enabled', function () {
        var resultState = disable_1.disableReducer(test_util_1.INITIAL_STATE, new actions_1.DisableAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState.isEnabled).toEqual(false);
        expect(resultState.isDisabled).toEqual(true);
    });
    it('should not update state if disabled', function () {
        var state = __assign({}, test_util_1.INITIAL_STATE, { isEnabled: false, isDisabled: true });
        var resultState = disable_1.disableReducer(state, new actions_1.DisableAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState).toBe(state);
    });
    it('should mark the state as valid and clear all errors', function () {
        var errors = { required: true };
        var state = __assign({}, test_util_1.INITIAL_STATE, { isValid: false, isInvalid: true, errors: errors });
        var resultState = disable_1.disableReducer(state, new actions_1.DisableAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState.isValid).toEqual(true);
        expect(resultState.isInvalid).toEqual(false);
        expect(resultState.errors).toEqual({});
    });
    it('should clear all pending validations', function () {
        var state = __assign({}, test_util_1.INITIAL_STATE, { pendingValidations: ['required'], isValidationPending: true });
        var resultState = disable_1.disableReducer(state, new actions_1.DisableAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState.pendingValidations).toEqual([]);
        expect(resultState.isValidationPending).toBe(false);
    });
    it('should disable control children', function () {
        var resultState = disable_1.disableReducer(test_util_1.INITIAL_STATE, new actions_1.DisableAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState.controls.inner.isEnabled).toBe(false);
        expect(resultState.controls.inner.isDisabled).toBe(true);
    });
    it('should disable group children', function () {
        var resultState = disable_1.disableReducer(test_util_1.INITIAL_STATE_FULL, new actions_1.DisableAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState.controls.inner3.isEnabled).toBe(false);
        expect(resultState.controls.inner3.isDisabled).toBe(true);
    });
    it('should disable array children', function () {
        var resultState = disable_1.disableReducer(test_util_1.INITIAL_STATE_FULL, new actions_1.DisableAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState.controls.inner5.isEnabled).toBe(false);
        expect(resultState.controls.inner5.isDisabled).toBe(true);
    });
    it('should disable if all children are disabled when control child is disabled', function () {
        var resultState = disable_1.disableReducer(test_util_1.INITIAL_STATE, new actions_1.DisableAction(test_util_1.FORM_CONTROL_INNER_ID));
        expect(resultState.isEnabled).toBe(false);
        expect(resultState.isDisabled).toBe(true);
    });
    it('should not disable if not all children are disabled when child is disabled', function () {
        var resultState = disable_1.disableReducer(test_util_1.INITIAL_STATE_FULL, new actions_1.DisableAction(test_util_1.FORM_CONTROL_INNER_ID));
        expect(resultState.isEnabled).toBe(true);
        expect(resultState.isDisabled).toBe(false);
    });
    it('should disable if all children are disabled when group child is disabled', function () {
        var state = state_1.cast(test_util_1.setPropertiesRecursively(test_util_1.INITIAL_STATE_FULL, [['isEnabled', false], ['isDisabled', false]], test_util_1.FORM_CONTROL_INNER3_ID));
        var resultState = disable_1.disableReducer(state, new actions_1.DisableAction(test_util_1.FORM_CONTROL_INNER3_ID));
        expect(resultState.isEnabled).toBe(false);
        expect(resultState.isDisabled).toBe(true);
    });
    it('should disable if all children are disabled when array child is disabled', function () {
        var state = state_1.cast(test_util_1.setPropertiesRecursively(test_util_1.INITIAL_STATE_FULL, [['isEnabled', false], ['isDisabled', false]], test_util_1.FORM_CONTROL_INNER5_ID));
        var resultState = disable_1.disableReducer(state, new actions_1.DisableAction(test_util_1.FORM_CONTROL_INNER5_ID));
        expect(resultState.isEnabled).toBe(false);
        expect(resultState.isDisabled).toBe(true);
    });
});
//# sourceMappingURL=disable.spec.js.map