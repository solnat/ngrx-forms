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
var disable_1 = require("./disable");
describe('form control disableReducer', function () {
    var FORM_CONTROL_ID = 'test ID';
    var INITIAL_FORM_CONTROL_VALUE = '';
    var INITIAL_STATE = state_1.createFormControlState(FORM_CONTROL_ID, INITIAL_FORM_CONTROL_VALUE);
    it('should skip any actionof the wrong type', function () { return expect(disable_1.disableReducer(INITIAL_STATE, { type: '' })).toBe(INITIAL_STATE); });
    it('should update state if enabled', function () {
        var resultState = disable_1.disableReducer(INITIAL_STATE, new actions_1.DisableAction(FORM_CONTROL_ID));
        expect(resultState.isEnabled).toEqual(false);
        expect(resultState.isDisabled).toEqual(true);
    });
    it('should not update state if disabled', function () {
        var state = __assign({}, INITIAL_STATE, { isEnabled: false, isDisabled: true });
        var resultState = disable_1.disableReducer(state, new actions_1.DisableAction(FORM_CONTROL_ID));
        expect(resultState).toBe(state);
    });
    it('should mark the state as valid and clear all errors', function () {
        var errors = { required: true };
        var state = __assign({}, INITIAL_STATE, { isValid: false, isInvalid: true, errors: errors });
        var resultState = disable_1.disableReducer(state, new actions_1.DisableAction(FORM_CONTROL_ID));
        expect(resultState.isValid).toEqual(true);
        expect(resultState.isInvalid).toEqual(false);
        expect(resultState.errors).toEqual({});
    });
    it('should clear all pending validations', function () {
        var state = __assign({}, INITIAL_STATE, { pendingValidations: ['required'], isValidationPending: true });
        var resultState = disable_1.disableReducer(state, new actions_1.DisableAction(FORM_CONTROL_ID));
        expect(resultState.pendingValidations).toEqual([]);
        expect(resultState.isValidationPending).toBe(false);
    });
});
//# sourceMappingURL=disable.spec.js.map