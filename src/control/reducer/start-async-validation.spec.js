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
var start_async_validation_1 = require("./start-async-validation");
describe("form control " + start_async_validation_1.startAsyncValidationReducer.name, function () {
    var FORM_CONTROL_ID = 'test ID';
    var INITIAL_FORM_CONTROL_VALUE = '';
    var INITIAL_STATE = state_1.createFormControlState(FORM_CONTROL_ID, INITIAL_FORM_CONTROL_VALUE);
    it('should skip any action of the wrong type', function () { return expect(start_async_validation_1.startAsyncValidationReducer(INITIAL_STATE, { type: '' })).toBe(INITIAL_STATE); });
    it('should update state with pending validation', function () {
        var name = 'required';
        var resultState = start_async_validation_1.startAsyncValidationReducer(INITIAL_STATE, new actions_1.StartAsyncValidationAction(FORM_CONTROL_ID, name));
        expect(resultState.pendingValidations).toEqual([name]);
        expect(resultState.isValidationPending).toBe(true);
    });
    it('should update state with pending validation if validations are already pending', function () {
        var name = 'required';
        var existingName = 'min';
        var state = __assign({}, INITIAL_STATE, { pendingValidations: [existingName], isValidationPending: true });
        var resultState = start_async_validation_1.startAsyncValidationReducer(state, new actions_1.StartAsyncValidationAction(FORM_CONTROL_ID, name));
        expect(resultState.pendingValidations).toEqual([existingName, name]);
        expect(resultState.isValidationPending).toBe(true);
    });
    it('should not update state if validation is already pending', function () {
        var name = 'required';
        var state = __assign({}, INITIAL_STATE, { pendingValidations: [name], isValidationPending: true });
        var resultState = start_async_validation_1.startAsyncValidationReducer(state, new actions_1.StartAsyncValidationAction(FORM_CONTROL_ID, name));
        expect(resultState).toBe(state);
    });
});
//# sourceMappingURL=start-async-validation.spec.js.map