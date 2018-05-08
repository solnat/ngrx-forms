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
var state_1 = require("../../state");
var actions_1 = require("../../actions");
var set_async_error_1 = require("./set-async-error");
describe("form control " + set_async_error_1.setAsyncErrorReducer.name, function () {
    var FORM_CONTROL_ID = 'test ID';
    var INITIAL_FORM_CONTROL_VALUE = '';
    var INITIAL_STATE = state_1.createFormControlState(FORM_CONTROL_ID, INITIAL_FORM_CONTROL_VALUE);
    it('should skip any action of the wrong type', function () { return expect(set_async_error_1.setAsyncErrorReducer(INITIAL_STATE, { type: '' })).toBe(INITIAL_STATE); });
    it('should update state with error', function () {
        var name = 'required';
        var value = true;
        var state = __assign({}, INITIAL_STATE, { pendingValidations: [name], isValidationPending: true });
        var resultState = set_async_error_1.setAsyncErrorReducer(state, new actions_1.SetAsyncErrorAction(FORM_CONTROL_ID, name, value));
        expect(resultState.errors).toEqual((_a = {}, _a['$' + name] = value, _a));
        expect(resultState.isValid).toBe(false);
        expect(resultState.isInvalid).toBe(true);
        var _a;
    });
    it('should remove the validation from pending validations if validation is the last pending', function () {
        var name = 'required';
        var value = true;
        var state = __assign({}, INITIAL_STATE, { pendingValidations: [name], isValidationPending: true });
        var resultState = set_async_error_1.setAsyncErrorReducer(state, new actions_1.SetAsyncErrorAction(FORM_CONTROL_ID, name, value));
        expect(resultState.pendingValidations).toEqual([]);
        expect(resultState.isValidationPending).toBe(false);
    });
    it('should remove the validation from pending validations if validation is not the last pending', function () {
        var name = 'required';
        var name2 = 'min';
        var value = true;
        var state = __assign({}, INITIAL_STATE, { pendingValidations: [name, name2], isValidationPending: true });
        var resultState = set_async_error_1.setAsyncErrorReducer(state, new actions_1.SetAsyncErrorAction(FORM_CONTROL_ID, name, value));
        expect(resultState.pendingValidations).toEqual([name2]);
        expect(resultState.isValidationPending).toBe(true);
    });
    it('should remove pending validation without changing the error if error value is the same', function () {
        var name = 'required';
        var value = true;
        var state = __assign({}, INITIAL_STATE, { isValid: false, isInvalid: true, errors: (_a = {}, _a['$' + name] = value, _a), pendingValidations: [name], isValidationPending: true });
        var resultState = set_async_error_1.setAsyncErrorReducer(state, new actions_1.SetAsyncErrorAction(FORM_CONTROL_ID, name, value));
        expect(resultState.errors['$' + name]).toBe(value);
        expect(resultState.pendingValidations).toEqual([]);
        expect(resultState.isValidationPending).toBe(false);
        var _a;
    });
    it('should remove pending validation without changing the error if error value is equal', function () {
        var name = 'required';
        var value = { field: true };
        var state = __assign({}, INITIAL_STATE, { isValid: false, isInvalid: true, errors: (_a = {}, _a['$' + name] = value, _a), pendingValidations: [name], isValidationPending: true });
        var resultState = set_async_error_1.setAsyncErrorReducer(state, new actions_1.SetAsyncErrorAction(FORM_CONTROL_ID, name, __assign({}, value)));
        expect(resultState.errors['$' + name]).toBe(value);
        expect(resultState.pendingValidations).toEqual([]);
        expect(resultState.isValidationPending).toBe(false);
        var _a;
    });
    it('should not update state if control is disabled', function () {
        var name = 'required';
        var value = true;
        var state = __assign({}, INITIAL_STATE, { isEnabled: false, isDisabled: true });
        var resultState = set_async_error_1.setAsyncErrorReducer(state, new actions_1.SetAsyncErrorAction(FORM_CONTROL_ID, name, value));
        expect(resultState).toBe(state);
    });
    it('should not update state if no matching pending validation is found', function () {
        var name = 'required';
        var value = true;
        var state = __assign({}, INITIAL_STATE, { pendingValidations: ['min'], isValidationPending: true });
        var resultState = set_async_error_1.setAsyncErrorReducer(state, new actions_1.SetAsyncErrorAction(FORM_CONTROL_ID, name, value));
        expect(resultState).toBe(state);
    });
});
//# sourceMappingURL=set-async-error.spec.js.map