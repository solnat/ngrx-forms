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
var set_async_error_1 = require("./set-async-error");
var test_util_1 = require("./test-util");
describe("form group " + set_async_error_1.setAsyncErrorReducer.name, function () {
    it('should skip any action of the wrong type', function () { return expect(set_async_error_1.setAsyncErrorReducer(test_util_1.INITIAL_STATE, { type: '' })).toBe(test_util_1.INITIAL_STATE); });
    it('should update state with error', function () {
        var name = 'required';
        var value = true;
        var state = __assign({}, test_util_1.INITIAL_STATE, { pendingValidations: [name], isValidationPending: true });
        var resultState = set_async_error_1.setAsyncErrorReducer(state, new actions_1.SetAsyncErrorAction(test_util_1.FORM_CONTROL_ID, name, value));
        expect(resultState.errors).toEqual((_a = {}, _a['$' + name] = value, _a));
        expect(resultState.isValid).toBe(false);
        expect(resultState.isInvalid).toBe(true);
        var _a;
    });
    it('should remove the validation from pending validations if validation is the last pending', function () {
        var name = 'required';
        var value = true;
        var state = __assign({}, test_util_1.INITIAL_STATE, { pendingValidations: [name], isValidationPending: true });
        var resultState = set_async_error_1.setAsyncErrorReducer(state, new actions_1.SetAsyncErrorAction(test_util_1.FORM_CONTROL_ID, name, value));
        expect(resultState.pendingValidations).toEqual([]);
        expect(resultState.isValidationPending).toBe(false);
    });
    it('should remove the validation from pending validations if validation is not the last pending', function () {
        var name = 'required';
        var name2 = 'min';
        var value = true;
        var state = __assign({}, test_util_1.INITIAL_STATE, { pendingValidations: [name, name2], isValidationPending: true });
        var resultState = set_async_error_1.setAsyncErrorReducer(state, new actions_1.SetAsyncErrorAction(test_util_1.FORM_CONTROL_ID, name, value));
        expect(resultState.pendingValidations).toEqual([name2]);
        expect(resultState.isValidationPending).toBe(true);
    });
    it('should remove pending validation without changing the error if error value is the same', function () {
        var name = 'required';
        var value = true;
        var state = __assign({}, test_util_1.INITIAL_STATE, { isValid: false, isInvalid: true, errors: (_a = {}, _a['$' + name] = value, _a), pendingValidations: [name], isValidationPending: true });
        var resultState = set_async_error_1.setAsyncErrorReducer(state, new actions_1.SetAsyncErrorAction(test_util_1.FORM_CONTROL_ID, name, value));
        expect(resultState.errors['$' + name]).toBe(value);
        expect(resultState.pendingValidations).toEqual([]);
        expect(resultState.isValidationPending).toBe(false);
        var _a;
    });
    it('should remove pending validation without changing the error if error value is equal', function () {
        var name = 'required';
        var value = { field: true };
        var state = __assign({}, test_util_1.INITIAL_STATE, { isValid: false, isInvalid: true, errors: (_a = {}, _a['$' + name] = value, _a), pendingValidations: [name], isValidationPending: true });
        var resultState = set_async_error_1.setAsyncErrorReducer(state, new actions_1.SetAsyncErrorAction(test_util_1.FORM_CONTROL_ID, name, __assign({}, value)));
        expect(resultState.errors['$' + name]).toBe(value);
        expect(resultState.pendingValidations).toEqual([]);
        expect(resultState.isValidationPending).toBe(false);
        var _a;
    });
    it('should not update state if control is disabled', function () {
        var name = 'required';
        var value = true;
        var state = __assign({}, test_util_1.INITIAL_STATE, { isEnabled: false, isDisabled: true });
        var resultState = set_async_error_1.setAsyncErrorReducer(state, new actions_1.SetAsyncErrorAction(test_util_1.FORM_CONTROL_ID, name, value));
        expect(resultState).toBe(state);
    });
    it('should not update state if no matching pending validation is found', function () {
        var name = 'required';
        var value = true;
        var state = __assign({}, test_util_1.INITIAL_STATE, { pendingValidations: ['min'], isValidationPending: true });
        var resultState = set_async_error_1.setAsyncErrorReducer(state, new actions_1.SetAsyncErrorAction(test_util_1.FORM_CONTROL_ID, name, value));
        expect(resultState).toBe(state);
    });
    it('should aggregate child errors', function () {
        var name = 'required';
        var value = true;
        var state = __assign({}, test_util_1.INITIAL_STATE, { isValidationPending: true, controls: {
                inner: __assign({}, test_util_1.INITIAL_STATE.controls.inner, { pendingValidations: [name], isValidationPending: true }),
            } });
        var resultState = set_async_error_1.setAsyncErrorReducer(state, new actions_1.SetAsyncErrorAction(test_util_1.FORM_CONTROL_INNER_ID, name, value));
        expect(resultState.errors).toEqual({ _inner: (_a = {}, _a['$' + name] = value, _a) });
        expect(resultState.isValid).toEqual(false);
        expect(resultState.isInvalid).toEqual(true);
        expect(resultState.isValidationPending).toEqual(false);
        var _a;
    });
    it('should aggregate child errors for group children', function () {
        var name = 'required';
        var value = true;
        var state = __assign({}, test_util_1.INITIAL_STATE_FULL, { isValidationPending: true, controls: {
                inner3: __assign({}, test_util_1.INITIAL_STATE_FULL.controls.inner3, { pendingValidations: [name], isValidationPending: true }),
            } });
        var resultState = set_async_error_1.setAsyncErrorReducer(state, new actions_1.SetAsyncErrorAction(test_util_1.FORM_CONTROL_INNER3_ID, name, value));
        expect(resultState.errors).toEqual({ _inner3: (_a = {}, _a['$' + name] = value, _a) });
        expect(resultState.isValid).toEqual(false);
        expect(resultState.isInvalid).toEqual(true);
        expect(resultState.isValidationPending).toEqual(false);
        var _a;
    });
    it('should aggregate child errors for array children', function () {
        var name = 'required';
        var value = true;
        var state = __assign({}, test_util_1.INITIAL_STATE_FULL, { isValidationPending: true, controls: {
                inner5: __assign({}, test_util_1.INITIAL_STATE_FULL.controls.inner5, { pendingValidations: [name], isValidationPending: true }),
            } });
        var resultState = set_async_error_1.setAsyncErrorReducer(state, new actions_1.SetAsyncErrorAction(test_util_1.FORM_CONTROL_INNER5_ID, name, value));
        expect(resultState.errors).toEqual({ _inner5: (_a = {}, _a['$' + name] = value, _a) });
        expect(resultState.isValid).toEqual(false);
        expect(resultState.isInvalid).toEqual(true);
        expect(resultState.isValidationPending).toEqual(false);
        var _a;
    });
    it('should aggregate multiple child errors', function () {
        var name1 = 'required';
        var value1 = true;
        var name2 = 'min';
        var value2 = 0;
        var state = __assign({}, test_util_1.INITIAL_STATE_FULL, { isValidationPending: true, controls: {
                inner: __assign({}, test_util_1.INITIAL_STATE_FULL.controls.inner, { pendingValidations: [name1], isValidationPending: true }),
                inner3: __assign({}, test_util_1.INITIAL_STATE_FULL.controls.inner3, { pendingValidations: [name2], isValidationPending: true }),
            } });
        var resultState = set_async_error_1.setAsyncErrorReducer(state, new actions_1.SetAsyncErrorAction(test_util_1.FORM_CONTROL_INNER_ID, name1, value1));
        resultState = set_async_error_1.setAsyncErrorReducer(resultState, new actions_1.SetAsyncErrorAction(test_util_1.FORM_CONTROL_INNER3_ID, name2, value2));
        expect(resultState.errors).toEqual({ _inner: (_a = {}, _a['$' + name1] = value1, _a), _inner3: (_b = {}, _b['$' + name2] = value2, _b) });
        expect(resultState.isValid).toEqual(false);
        expect(resultState.isInvalid).toEqual(true);
        expect(resultState.isValidationPending).toEqual(false);
        var _a, _b;
    });
    it('should track child errors and own errors when own errors are changed', function () {
        var name1 = 'required';
        var value1 = true;
        var name2 = 'min';
        var value2 = 0;
        var state = __assign({}, test_util_1.INITIAL_STATE, { errors: {
                _inner: (_a = {}, _a['$' + name2] = value2, _a),
            }, isValid: false, isInvalid: true, pendingValidations: [name1], isValidationPending: true, controls: {
                inner: __assign({}, test_util_1.INITIAL_STATE.controls.inner, { isValid: false, isInvalid: true, errors: (_b = {}, _b['$' + name2] = value2, _b) }),
            } });
        var resultState = set_async_error_1.setAsyncErrorReducer(state, new actions_1.SetAsyncErrorAction(test_util_1.FORM_CONTROL_ID, name1, value1));
        expect(resultState.errors).toEqual((_c = {}, _c['$' + name1] = value1, _c._inner = (_d = {}, _d['$' + name2] = value2, _d), _c));
        var _a, _b, _c, _d;
    });
    it('should track own errors and child errors when child errors are changed', function () {
        var name1 = 'required';
        var value1 = true;
        var name2 = 'min';
        var value2 = 0;
        var state = __assign({}, test_util_1.INITIAL_STATE, { isValid: false, isInvalid: true, errors: (_a = {}, _a['$' + name1] = value1, _a), isValidationPending: true, controls: {
                inner: __assign({}, test_util_1.INITIAL_STATE.controls.inner, { pendingValidations: [name2], isValidationPending: true }),
            } });
        var resultState = set_async_error_1.setAsyncErrorReducer(state, new actions_1.SetAsyncErrorAction(test_util_1.FORM_CONTROL_INNER_ID, name2, value2));
        expect(resultState.errors).toEqual((_b = {}, _b['$' + name1] = value1, _b._inner = (_c = {}, _c['$' + name2] = value2, _c), _b));
        var _a, _b, _c;
    });
    it('should mark state as validation pending if child control is validation pending', function () {
        var name = 'required';
        var value = true;
        var state = __assign({}, test_util_1.INITIAL_STATE, { pendingValidations: [name], isValidationPending: true, controls: {
                inner: __assign({}, test_util_1.INITIAL_STATE.controls.inner, { pendingValidations: [name], isValidationPending: true }),
            } });
        var resultState = set_async_error_1.setAsyncErrorReducer(state, new actions_1.SetAsyncErrorAction(test_util_1.FORM_CONTROL_ID, name, value));
        expect(resultState.pendingValidations).toEqual([]);
        expect(resultState.isValidationPending).toEqual(true);
    });
    it('should mark state as validation pending if child group is validation pending', function () {
        var name = 'required';
        var value = true;
        var state = __assign({}, test_util_1.INITIAL_STATE, { pendingValidations: [name], isValidationPending: true, controls: {
                inner3: __assign({}, test_util_1.INITIAL_STATE.controls.inner, { pendingValidations: [name], isValidationPending: true }),
            } });
        var resultState = set_async_error_1.setAsyncErrorReducer(state, new actions_1.SetAsyncErrorAction(test_util_1.FORM_CONTROL_ID, name, value));
        expect(resultState.pendingValidations).toEqual([]);
        expect(resultState.isValidationPending).toEqual(true);
    });
    it('should mark state as validation pending if child array is validation pending', function () {
        var name = 'required';
        var value = true;
        var state = __assign({}, test_util_1.INITIAL_STATE, { pendingValidations: [name], isValidationPending: true, controls: {
                inner5: __assign({}, test_util_1.INITIAL_STATE.controls.inner, { pendingValidations: [name], isValidationPending: true }),
            } });
        var resultState = set_async_error_1.setAsyncErrorReducer(state, new actions_1.SetAsyncErrorAction(test_util_1.FORM_CONTROL_ID, name, value));
        expect(resultState.pendingValidations).toEqual([]);
        expect(resultState.isValidationPending).toEqual(true);
    });
});
//# sourceMappingURL=set-async-error.spec.js.map