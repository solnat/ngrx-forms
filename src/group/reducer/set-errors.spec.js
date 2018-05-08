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
var set_errors_1 = require("./set-errors");
var test_util_1 = require("./test-util");
describe("form group " + set_errors_1.setErrorsReducer.name, function () {
    it('should update state if there are errors', function () {
        var errors = { required: true };
        var resultState = set_errors_1.setErrorsReducer(test_util_1.INITIAL_STATE, new actions_1.SetErrorsAction(test_util_1.FORM_CONTROL_ID, errors));
        expect(resultState.errors).toEqual(errors);
        expect(resultState.isValid).toBe(false);
        expect(resultState.isInvalid).toBe(true);
    });
    it('should update state if there are no errors', function () {
        var errors = { required: true };
        var state = __assign({}, test_util_1.INITIAL_STATE, { isValid: false, isInvalid: true, errors: errors });
        var resultState = set_errors_1.setErrorsReducer(state, new actions_1.SetErrorsAction(test_util_1.FORM_CONTROL_ID, {}));
        expect(resultState.errors).toEqual({});
        expect(resultState.isValid).toBe(true);
        expect(resultState.isInvalid).toBe(false);
    });
    it('should not update state if errors are equal', function () {
        var state = __assign({}, test_util_1.INITIAL_STATE, { isValid: false, isInvalid: true, errors: { required: true } });
        var resultState = set_errors_1.setErrorsReducer(state, new actions_1.SetErrorsAction(test_util_1.FORM_CONTROL_ID, { required: true }));
        expect(resultState).toBe(state);
    });
    it('should not update state if control is disabled', function () {
        var errors = { required: true };
        var state = __assign({}, test_util_1.INITIAL_STATE, { isEnabled: false, isDisabled: true });
        var resultState = set_errors_1.setErrorsReducer(state, new actions_1.SetErrorsAction(test_util_1.FORM_CONTROL_ID, errors));
        expect(resultState).toBe(state);
    });
    it('should not update state if errors are equal and empty', function () {
        var resultState = set_errors_1.setErrorsReducer(test_util_1.INITIAL_STATE, new actions_1.SetErrorsAction(test_util_1.FORM_CONTROL_ID, {}));
        expect(resultState).toBe(test_util_1.INITIAL_STATE);
    });
    it('should update state if group is empty', function () {
        var errors = { required: true };
        var state = state_1.createFormGroupState('test ID', {});
        var resultState = set_errors_1.setErrorsReducer(state, new actions_1.SetErrorsAction(test_util_1.FORM_CONTROL_ID, errors));
        expect(resultState.errors).toEqual(errors);
        expect(resultState.isValid).toBe(false);
        expect(resultState.isInvalid).toBe(true);
    });
    it('should keep async errors', function () {
        var syncErrors = { required: true };
        var asyncErrors = { $required: true };
        var state = __assign({}, test_util_1.INITIAL_STATE, { isValid: false, isInvalid: true, errors: asyncErrors });
        var resultState = set_errors_1.setErrorsReducer(state, new actions_1.SetErrorsAction(test_util_1.FORM_CONTROL_ID, syncErrors));
        expect(resultState.errors).toEqual(__assign({}, asyncErrors, syncErrors));
    });
    it('should throw if trying to set invalid error value', function () {
        expect(function () { return set_errors_1.setErrorsReducer(test_util_1.INITIAL_STATE, new actions_1.SetErrorsAction(test_util_1.FORM_CONTROL_ID, null)); }).toThrowError();
        expect(function () { return set_errors_1.setErrorsReducer(test_util_1.INITIAL_STATE, new actions_1.SetErrorsAction(test_util_1.FORM_CONTROL_ID, 1)); }).toThrowError();
        expect(function () { return set_errors_1.setErrorsReducer(test_util_1.INITIAL_STATE, new actions_1.SetErrorsAction(test_util_1.FORM_CONTROL_ID, [])); }).toThrowError();
        expect(function () { return set_errors_1.setErrorsReducer(test_util_1.INITIAL_STATE, new actions_1.SetErrorsAction(test_util_1.FORM_CONTROL_ID, { $required: true })); }).toThrowError();
        expect(function () { return set_errors_1.setErrorsReducer(test_util_1.INITIAL_STATE, new actions_1.SetErrorsAction(test_util_1.FORM_CONTROL_ID, { _inner: true })); }).toThrowError();
    });
    it('should aggregate child errors', function () {
        var errors = { required: true };
        var resultState = set_errors_1.setErrorsReducer(test_util_1.INITIAL_STATE, new actions_1.SetErrorsAction(test_util_1.FORM_CONTROL_INNER_ID, errors));
        expect(resultState.errors).toEqual({ _inner: errors });
        expect(resultState.isValid).toEqual(false);
        expect(resultState.isInvalid).toEqual(true);
    });
    it('should aggregate child errors for group children', function () {
        var errors = { required: true };
        var resultState = set_errors_1.setErrorsReducer(test_util_1.INITIAL_STATE_FULL, new actions_1.SetErrorsAction(test_util_1.FORM_CONTROL_INNER3_ID, errors));
        expect(resultState.errors).toEqual({ _inner3: errors });
        expect(resultState.isValid).toEqual(false);
        expect(resultState.isInvalid).toEqual(true);
    });
    it('should aggregate child errors for array children', function () {
        var errors = { required: true };
        var resultState = set_errors_1.setErrorsReducer(test_util_1.INITIAL_STATE_FULL, new actions_1.SetErrorsAction(test_util_1.FORM_CONTROL_INNER5_ID, errors));
        expect(resultState.errors).toEqual({ _inner5: errors });
        expect(resultState.isValid).toEqual(false);
        expect(resultState.isInvalid).toEqual(true);
    });
    it('should aggregate nested child errors for group', function () {
        var errors = { required: true };
        var resultState = set_errors_1.setErrorsReducer(test_util_1.INITIAL_STATE_FULL, new actions_1.SetErrorsAction(test_util_1.FORM_CONTROL_INNER4_ID, errors));
        expect(resultState.errors).toEqual({ _inner3: { _inner4: errors } });
        expect(resultState.isValid).toEqual(false);
        expect(resultState.isInvalid).toEqual(true);
    });
    it('should aggregate nested child errors for array', function () {
        var errors = { required: true };
        var resultState = set_errors_1.setErrorsReducer(test_util_1.INITIAL_STATE_FULL, new actions_1.SetErrorsAction(test_util_1.FORM_CONTROL_INNER5_0_ID, errors));
        expect(resultState.errors).toEqual({ _inner5: { _0: errors } });
        expect(resultState.isValid).toEqual(false);
        expect(resultState.isInvalid).toEqual(true);
    });
    it('should aggregate multiple child errors', function () {
        var errors1 = { required: true };
        var errors2 = { min: 0 };
        var resultState = set_errors_1.setErrorsReducer(test_util_1.INITIAL_STATE_FULL, new actions_1.SetErrorsAction(test_util_1.FORM_CONTROL_INNER_ID, errors1));
        resultState = set_errors_1.setErrorsReducer(resultState, new actions_1.SetErrorsAction(test_util_1.FORM_CONTROL_INNER3_ID, errors2));
        expect(resultState.errors).toEqual({ _inner: errors1, _inner3: errors2 });
        expect(resultState.isValid).toEqual(false);
        expect(resultState.isInvalid).toEqual(true);
    });
    it('should track child errors and own errors when own errors are changed', function () {
        var errors1 = { required: true };
        var errors2 = { min: 0 };
        var state = __assign({}, test_util_1.INITIAL_STATE, { errors: {
                _inner: errors2,
            }, isValid: false, isInvalid: true, controls: {
                inner: __assign({}, test_util_1.INITIAL_STATE.controls.inner, { isValid: false, isInvalid: true, errors: errors2 }),
            } });
        var resultState = set_errors_1.setErrorsReducer(state, new actions_1.SetErrorsAction(test_util_1.FORM_CONTROL_ID, errors1));
        expect(resultState.errors).toEqual(__assign({}, errors1, { _inner: errors2 }));
    });
    it('should track own errors and child errors when child errors are changed', function () {
        var errors1 = { required: true };
        var state = __assign({}, test_util_1.INITIAL_STATE, { isValid: false, isInvalid: true, errors: errors1 });
        var errors2 = { min: 0 };
        var resultState = set_errors_1.setErrorsReducer(state, new actions_1.SetErrorsAction(test_util_1.FORM_CONTROL_INNER_ID, errors2));
        expect(resultState.errors).toEqual(__assign({}, errors1, { _inner: errors2 }));
    });
});
//# sourceMappingURL=set-errors.spec.js.map