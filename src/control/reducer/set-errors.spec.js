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
var set_errors_1 = require("./set-errors");
describe('form control setErrorsReducer', function () {
    var FORM_CONTROL_ID = 'test ID';
    var INITIAL_FORM_CONTROL_VALUE = '';
    var INITIAL_STATE = state_1.createFormControlState(FORM_CONTROL_ID, INITIAL_FORM_CONTROL_VALUE);
    it('should skip any action of the wrong type', function () { return expect(set_errors_1.setErrorsReducer(INITIAL_STATE, { type: '' })).toBe(INITIAL_STATE); });
    it('should update state if there are errors', function () {
        var errors = { required: true };
        var resultState = set_errors_1.setErrorsReducer(INITIAL_STATE, new actions_1.SetErrorsAction(FORM_CONTROL_ID, errors));
        expect(resultState.errors).toBe(errors);
        expect(resultState.isValid).toBe(false);
        expect(resultState.isInvalid).toBe(true);
    });
    it('should update state if there are no errors', function () {
        var errors = { required: true };
        var state = __assign({}, INITIAL_STATE, { isValid: false, isInvalid: true, errors: errors });
        var newErrors = {};
        var resultState = set_errors_1.setErrorsReducer(state, new actions_1.SetErrorsAction(FORM_CONTROL_ID, newErrors));
        expect(resultState.errors).toBe(newErrors);
        expect(resultState.isValid).toBe(true);
        expect(resultState.isInvalid).toBe(false);
    });
    it('should not update state if errors are equal', function () {
        var state = __assign({}, INITIAL_STATE, { isValid: false, isInvalid: true, errors: { required: true } });
        var resultState = set_errors_1.setErrorsReducer(state, new actions_1.SetErrorsAction(FORM_CONTROL_ID, { required: true }));
        expect(resultState).toBe(state);
    });
    it('should not update state if control is disabled', function () {
        var errors = { required: true };
        var state = __assign({}, INITIAL_STATE, { isEnabled: false, isDisabled: true });
        var resultState = set_errors_1.setErrorsReducer(state, new actions_1.SetErrorsAction(FORM_CONTROL_ID, errors));
        expect(resultState).toBe(state);
    });
    it('should not update state if errors are equal and empty', function () {
        var resultState = set_errors_1.setErrorsReducer(INITIAL_STATE, new actions_1.SetErrorsAction(FORM_CONTROL_ID, {}));
        expect(resultState).toBe(INITIAL_STATE);
    });
    it('should keep async errors', function () {
        var syncErrors = { required: true };
        var asyncErrors = { $required: true };
        var state = __assign({}, INITIAL_STATE, { isValid: false, isInvalid: true, errors: asyncErrors });
        var resultState = set_errors_1.setErrorsReducer(state, new actions_1.SetErrorsAction(FORM_CONTROL_ID, syncErrors));
        expect(resultState.errors).toEqual(__assign({}, asyncErrors, syncErrors));
    });
    it('should throw if trying to set invalid error value', function () {
        expect(function () { return set_errors_1.setErrorsReducer(INITIAL_STATE, new actions_1.SetErrorsAction(FORM_CONTROL_ID, null)); }).toThrowError();
        expect(function () { return set_errors_1.setErrorsReducer(INITIAL_STATE, new actions_1.SetErrorsAction(FORM_CONTROL_ID, 1)); }).toThrowError();
        expect(function () { return set_errors_1.setErrorsReducer(INITIAL_STATE, new actions_1.SetErrorsAction(FORM_CONTROL_ID, [])); }).toThrowError();
        expect(function () { return set_errors_1.setErrorsReducer(INITIAL_STATE, new actions_1.SetErrorsAction(FORM_CONTROL_ID, { $required: true })); }).toThrowError();
    });
});
//# sourceMappingURL=set-errors.spec.js.map