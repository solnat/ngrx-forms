"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var state_1 = require("../state");
var test_util_1 = require("./test-util");
var set_errors_1 = require("./set-errors");
describe(set_errors_1.setErrors.name, function () {
    it('should call reducer for controls', function () {
        var errors = { required: true };
        var resultState = set_errors_1.setErrors(errors)(state_1.cast(test_util_1.INITIAL_STATE.controls.inner));
        expect(resultState).not.toBe(state_1.cast(test_util_1.INITIAL_STATE.controls.inner));
    });
    it('should call reducer for groups', function () {
        var errors = { required: true };
        var resultState = set_errors_1.setErrors(errors)(test_util_1.INITIAL_STATE);
        expect(resultState).not.toBe(state_1.cast(test_util_1.INITIAL_STATE));
    });
    it('should call reducer for empty groups', function () {
        var errors = { required: true };
        var state = state_1.createFormGroupState('test ID', {});
        var resultState = set_errors_1.setErrors(errors)(state);
        expect(resultState).not.toBe(state);
    });
    it('should call reducer for arrays', function () {
        var errors = { required: true };
        var resultState = set_errors_1.setErrors(errors)(test_util_1.INITIAL_STATE.controls.inner5);
        expect(resultState).not.toBe(state_1.cast(test_util_1.INITIAL_STATE.controls.inner5));
    });
    it('should call reducer for empty arrays', function () {
        var errors = { required: true };
        var state = state_1.createFormArrayState('test ID', []);
        var resultState = set_errors_1.setErrors(errors)(state);
        expect(resultState).not.toBe(state);
    });
    it('should call reducer for controls uncurried', function () {
        var errors = { required: true };
        var resultState = set_errors_1.setErrors(errors, test_util_1.INITIAL_STATE.controls.inner);
        expect(resultState).not.toBe(test_util_1.INITIAL_STATE.controls.inner);
    });
    it('should call reducer for groups uncurried', function () {
        var errors = { required: true };
        var resultState = set_errors_1.setErrors(errors, test_util_1.INITIAL_STATE);
        expect(resultState).not.toBe(test_util_1.INITIAL_STATE);
    });
    it('should call reducer for empty groups uncurried', function () {
        var errors = { required: true };
        var state = state_1.createFormGroupState('test ID', {});
        var resultState = set_errors_1.setErrors(errors, state);
        expect(resultState).not.toBe(state);
    });
    it('should call reducer for arrays uncurried', function () {
        var errors = { required: true };
        var resultState = set_errors_1.setErrors(errors, test_util_1.INITIAL_STATE.controls.inner5);
        expect(resultState).not.toBe(test_util_1.INITIAL_STATE.controls.inner5);
    });
    it('should call reducer for empty arrays uncurried', function () {
        var errors = { required: true };
        var state = state_1.createFormArrayState('test ID', []);
        var resultState = set_errors_1.setErrors(errors, state);
        expect(resultState).not.toBe(state);
    });
    it('should merge errors from multiple validation functions', function () {
        var errors1 = { required: true };
        var errors2 = { min: 1 };
        var mergedErrors = { required: true, min: 1 };
        var resultState = set_errors_1.setErrors([errors1, errors2])(state_1.cast(test_util_1.INITIAL_STATE.controls.inner));
        expect(resultState.errors).toEqual(mergedErrors);
    });
    it('should merge errors from multiple validation functions in the order they were provided', function () {
        var errors1 = { min: 1, required: true };
        var errors2 = { min: 2 };
        var mergedErrors = { required: true, min: 2 };
        var resultState = set_errors_1.setErrors([errors1, errors2])(state_1.cast(test_util_1.INITIAL_STATE.controls.inner));
        expect(resultState.errors).toEqual(mergedErrors);
    });
    it('should throw if curried and no state', function () {
        var errors = { required: true };
        expect(function () { return set_errors_1.setErrors(errors)(undefined); }).toThrowError();
    });
});
//# sourceMappingURL=set-errors.spec.js.map