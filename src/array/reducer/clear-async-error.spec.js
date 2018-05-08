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
var clear_async_error_1 = require("./clear-async-error");
var test_util_1 = require("./test-util");
describe("form array " + clear_async_error_1.clearAsyncErrorReducer.name, function () {
    it('should skip any action of the wrong type', function () { return expect(clear_async_error_1.clearAsyncErrorReducer(test_util_1.INITIAL_STATE, { type: '' })).toBe(test_util_1.INITIAL_STATE); });
    it('should remove error from state', function () {
        var name = 'required';
        var state = __assign({}, test_util_1.INITIAL_STATE, { isValid: false, isInvalid: true, errors: (_a = {}, _a['$' + name] = true, _a), pendingValidations: [name], isValidationPending: true });
        var resultState = clear_async_error_1.clearAsyncErrorReducer(state, new actions_1.ClearAsyncErrorAction(test_util_1.FORM_CONTROL_ID, name));
        expect(resultState.errors).toEqual({});
        expect(resultState.isValid).toBe(true);
        expect(resultState.isInvalid).toBe(false);
        var _a;
    });
    it('should remove the validation from pending validations if validation is the last pending', function () {
        var name = 'required';
        var state = __assign({}, test_util_1.INITIAL_STATE, { isValid: false, isInvalid: true, errors: (_a = {}, _a['$' + name] = true, _a), pendingValidations: [name], isValidationPending: true });
        var resultState = clear_async_error_1.clearAsyncErrorReducer(state, new actions_1.ClearAsyncErrorAction(test_util_1.FORM_CONTROL_ID, name));
        expect(resultState.pendingValidations).toEqual([]);
        expect(resultState.isValidationPending).toBe(false);
        var _a;
    });
    it('should remove the validation from pending validations if validation is not the last pending', function () {
        var name = 'required';
        var name2 = 'min';
        var state = __assign({}, test_util_1.INITIAL_STATE, { isValid: false, isInvalid: true, errors: (_a = {}, _a['$' + name] = true, _a), pendingValidations: [name, name2], isValidationPending: true });
        var resultState = clear_async_error_1.clearAsyncErrorReducer(state, new actions_1.ClearAsyncErrorAction(test_util_1.FORM_CONTROL_ID, name));
        expect(resultState.pendingValidations).toEqual([name2]);
        expect(resultState.isValidationPending).toBe(true);
        var _a;
    });
    it('should remove pending validation without changing the errors if no matching error is found', function () {
        var name = 'required';
        var errors = { $min: true };
        var state = __assign({}, test_util_1.INITIAL_STATE, { isValid: false, isInvalid: true, errors: errors, pendingValidations: [name], isValidationPending: true });
        var resultState = clear_async_error_1.clearAsyncErrorReducer(state, new actions_1.ClearAsyncErrorAction(test_util_1.FORM_CONTROL_ID, name));
        expect(resultState.errors).toBe(errors);
        expect(resultState.pendingValidations).toEqual([]);
        expect(resultState.isValidationPending).toBe(false);
    });
    it('should not update state if no matching pending validation is found', function () {
        var name = 'required';
        var state = __assign({}, test_util_1.INITIAL_STATE, { pendingValidations: ['min'], isValidationPending: true });
        var resultState = clear_async_error_1.clearAsyncErrorReducer(state, new actions_1.ClearAsyncErrorAction(test_util_1.FORM_CONTROL_ID, name));
        expect(resultState).toBe(state);
    });
    it('should aggregate child errors', function () {
        var name = 'required';
        var value = true;
        var errors = { min: 0 };
        var state = __assign({}, test_util_1.INITIAL_STATE, { pendingValidations: [name], isValidationPending: true, errors: (_a = {},
                _a['$' + name] = value,
                _a._0 = errors,
                _a), controls: [
                __assign({}, test_util_1.INITIAL_STATE.controls[0], { isValid: false, isInvalid: true, errors: errors }),
            ] });
        var resultState = clear_async_error_1.clearAsyncErrorReducer(state, new actions_1.ClearAsyncErrorAction(test_util_1.FORM_CONTROL_ID, name));
        expect(resultState.errors).toEqual({ _0: errors });
        expect(resultState.isValid).toEqual(false);
        expect(resultState.isInvalid).toEqual(true);
        expect(resultState.isValidationPending).toEqual(false);
        var _a;
    });
    it('should aggregate child errors for group children', function () {
        var name = 'required';
        var value = true;
        var errors = { min: 0 };
        var state = __assign({}, test_util_1.INITIAL_STATE_NESTED_GROUP, { pendingValidations: [name], isValidationPending: true, errors: (_a = {},
                _a['$' + name] = value,
                _a._0 = errors,
                _a), controls: [
                __assign({}, test_util_1.INITIAL_STATE_NESTED_GROUP.controls[0], { isValid: false, isInvalid: true, errors: errors }),
            ] });
        var resultState = clear_async_error_1.clearAsyncErrorReducer(state, new actions_1.ClearAsyncErrorAction(test_util_1.FORM_CONTROL_ID, name));
        expect(resultState.errors).toEqual({ _0: errors });
        expect(resultState.isValid).toEqual(false);
        expect(resultState.isInvalid).toEqual(true);
        expect(resultState.isValidationPending).toEqual(false);
        var _a;
    });
    it('should aggregate child errors for array children', function () {
        var name = 'required';
        var value = true;
        var errors = { min: 0 };
        var state = __assign({}, test_util_1.INITIAL_STATE_NESTED_ARRAY, { pendingValidations: [name], isValidationPending: true, errors: (_a = {},
                _a['$' + name] = value,
                _a._0 = errors,
                _a), controls: [
                __assign({}, test_util_1.INITIAL_STATE_NESTED_ARRAY.controls[0], { isValid: false, isInvalid: true, errors: errors }),
            ] });
        var resultState = clear_async_error_1.clearAsyncErrorReducer(state, new actions_1.ClearAsyncErrorAction(test_util_1.FORM_CONTROL_ID, name));
        expect(resultState.errors).toEqual({ _0: errors });
        expect(resultState.isValid).toEqual(false);
        expect(resultState.isInvalid).toEqual(true);
        var _a;
    });
    it('should aggregate multiple child errors', function () {
        var name = 'required';
        var value = true;
        var errors1 = { min: 0 };
        var errors2 = { max: 0 };
        var state = __assign({}, test_util_1.INITIAL_STATE, { pendingValidations: [name], isValidationPending: true, errors: (_a = {},
                _a['$' + name] = value,
                _a._0 = errors1,
                _a._1 = errors2,
                _a), controls: [
                __assign({}, test_util_1.INITIAL_STATE.controls[0], { isValid: false, isInvalid: true, errors: errors1 }),
                __assign({}, test_util_1.INITIAL_STATE.controls[1], { isValid: false, isInvalid: true, errors: errors2 }),
            ] });
        var resultState = clear_async_error_1.clearAsyncErrorReducer(state, new actions_1.ClearAsyncErrorAction(test_util_1.FORM_CONTROL_ID, name));
        expect(resultState.errors).toEqual({ _0: errors1, _1: errors2 });
        expect(resultState.isValid).toEqual(false);
        expect(resultState.isInvalid).toEqual(true);
        expect(resultState.isValidationPending).toEqual(false);
        var _a;
    });
    it('should track child errors and own errors when own errors are changed', function () {
        var name1 = 'required';
        var value1 = true;
        var name2 = 'min';
        var value2 = 0;
        var state = __assign({}, test_util_1.INITIAL_STATE, { errors: (_a = {},
                _a['$' + name1] = value1,
                _a._0 = (_b = {}, _b['$' + name2] = value2, _b),
                _a), isValid: false, isInvalid: true, pendingValidations: [name1], isValidationPending: true, controls: [
                __assign({}, test_util_1.INITIAL_STATE.controls[0], { isValid: false, isInvalid: true, errors: (_c = {}, _c['$' + name2] = value2, _c) }),
            ] });
        var resultState = clear_async_error_1.clearAsyncErrorReducer(state, new actions_1.ClearAsyncErrorAction(test_util_1.FORM_CONTROL_ID, name1));
        expect(resultState.errors).toEqual({ _0: (_d = {}, _d['$' + name2] = value2, _d) });
        expect(resultState.isValidationPending).toEqual(false);
        var _a, _b, _c, _d;
    });
    it('should track own errors and child errors when child errors are changed', function () {
        var name1 = 'required';
        var value1 = true;
        var name2 = 'min';
        var value2 = 0;
        var state = __assign({}, test_util_1.INITIAL_STATE, { errors: (_a = {},
                _a['$' + name1] = value1,
                _a._inner = (_b = {}, _b['$' + name2] = value2, _b),
                _a), isValid: false, isInvalid: true, isValidationPending: true, controls: [
                __assign({}, test_util_1.INITIAL_STATE.controls[0], { isValid: false, isInvalid: true, errors: (_c = {}, _c['$' + name2] = value2, _c), pendingValidations: [name2], isValidationPending: true }),
            ] });
        var resultState = clear_async_error_1.clearAsyncErrorReducer(state, new actions_1.ClearAsyncErrorAction(test_util_1.FORM_CONTROL_0_ID, name2));
        expect(resultState.errors).toEqual((_d = {}, _d['$' + name1] = value1, _d));
        expect(resultState.isValidationPending).toEqual(false);
        var _a, _b, _c, _d;
    });
    it('should mark state as validation pending if child control is validation pending', function () {
        var name = 'required';
        var state = __assign({}, test_util_1.INITIAL_STATE, { pendingValidations: [name], isValidationPending: true, controls: [
                __assign({}, test_util_1.INITIAL_STATE.controls[0], { pendingValidations: [name], isValidationPending: true }),
            ] });
        var resultState = clear_async_error_1.clearAsyncErrorReducer(state, new actions_1.ClearAsyncErrorAction(test_util_1.FORM_CONTROL_ID, name));
        expect(resultState.pendingValidations).toEqual([]);
        expect(resultState.isValidationPending).toEqual(true);
    });
    it('should mark state as validation pending if child group is validation pending', function () {
        var name = 'required';
        var state = __assign({}, test_util_1.INITIAL_STATE_NESTED_GROUP, { pendingValidations: [name], isValidationPending: true, controls: [
                __assign({}, test_util_1.INITIAL_STATE_NESTED_GROUP.controls[0], { pendingValidations: [name], isValidationPending: true }),
            ] });
        var resultState = clear_async_error_1.clearAsyncErrorReducer(state, new actions_1.ClearAsyncErrorAction(test_util_1.FORM_CONTROL_ID, name));
        expect(resultState.pendingValidations).toEqual([]);
        expect(resultState.isValidationPending).toEqual(true);
    });
    it('should mark state as validation pending if child array is validation pending', function () {
        var name = 'required';
        var state = __assign({}, test_util_1.INITIAL_STATE_NESTED_ARRAY, { pendingValidations: [name], isValidationPending: true, controls: [
                __assign({}, test_util_1.INITIAL_STATE_NESTED_ARRAY.controls[0], { pendingValidations: [name], isValidationPending: true }),
            ] });
        var resultState = clear_async_error_1.clearAsyncErrorReducer(state, new actions_1.ClearAsyncErrorAction(test_util_1.FORM_CONTROL_ID, name));
        expect(resultState.pendingValidations).toEqual([]);
        expect(resultState.isValidationPending).toEqual(true);
    });
});
//# sourceMappingURL=clear-async-error.spec.js.map