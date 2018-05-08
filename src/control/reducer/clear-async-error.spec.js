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
var clear_async_error_1 = require("./clear-async-error");
describe("form control " + clear_async_error_1.clearAsyncErrorReducer.name, function () {
    var FORM_CONTROL_ID = 'test ID';
    var INITIAL_FORM_CONTROL_VALUE = '';
    var INITIAL_STATE = state_1.createFormControlState(FORM_CONTROL_ID, INITIAL_FORM_CONTROL_VALUE);
    it('should skip any action of the wrong type', function () { return expect(clear_async_error_1.clearAsyncErrorReducer(INITIAL_STATE, { type: '' })).toBe(INITIAL_STATE); });
    it('should remove error from state', function () {
        var name = 'required';
        var state = __assign({}, INITIAL_STATE, { isValid: false, isInvalid: true, errors: (_a = {}, _a['$' + name] = true, _a), pendingValidations: [name], isValidationPending: true });
        var resultState = clear_async_error_1.clearAsyncErrorReducer(state, new actions_1.ClearAsyncErrorAction(FORM_CONTROL_ID, name));
        expect(resultState.errors).toEqual({});
        expect(resultState.isValid).toBe(true);
        expect(resultState.isInvalid).toBe(false);
        var _a;
    });
    it('should remove the validation from pending validations if validation is the last pending', function () {
        var name = 'required';
        var state = __assign({}, INITIAL_STATE, { isValid: false, isInvalid: true, errors: (_a = {}, _a['$' + name] = true, _a), pendingValidations: [name], isValidationPending: true });
        var resultState = clear_async_error_1.clearAsyncErrorReducer(state, new actions_1.ClearAsyncErrorAction(FORM_CONTROL_ID, name));
        expect(resultState.pendingValidations).toEqual([]);
        expect(resultState.isValidationPending).toBe(false);
        var _a;
    });
    it('should remove the validation from pending validations if validation is not the last pending', function () {
        var name = 'required';
        var name2 = 'min';
        var state = __assign({}, INITIAL_STATE, { isValid: false, isInvalid: true, errors: (_a = {}, _a['$' + name] = true, _a), pendingValidations: [name, name2], isValidationPending: true });
        var resultState = clear_async_error_1.clearAsyncErrorReducer(state, new actions_1.ClearAsyncErrorAction(FORM_CONTROL_ID, name));
        expect(resultState.pendingValidations).toEqual([name2]);
        expect(resultState.isValidationPending).toBe(true);
        var _a;
    });
    it('should remove pending validation without changing the errors if no matching error is found', function () {
        var name = 'required';
        var errors = { $min: true };
        var state = __assign({}, INITIAL_STATE, { isValid: false, isInvalid: true, errors: errors, pendingValidations: [name], isValidationPending: true });
        var resultState = clear_async_error_1.clearAsyncErrorReducer(state, new actions_1.ClearAsyncErrorAction(FORM_CONTROL_ID, name));
        expect(resultState.errors).toBe(errors);
        expect(resultState.pendingValidations).toEqual([]);
        expect(resultState.isValidationPending).toBe(false);
    });
    it('should not update state if no matching pending validation is found', function () {
        var name = 'required';
        var state = __assign({}, INITIAL_STATE, { pendingValidations: ['min'], isValidationPending: true });
        var resultState = clear_async_error_1.clearAsyncErrorReducer(state, new actions_1.ClearAsyncErrorAction(FORM_CONTROL_ID, name));
        expect(resultState).toBe(state);
    });
});
//# sourceMappingURL=clear-async-error.spec.js.map