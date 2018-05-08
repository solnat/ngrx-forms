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
var start_async_validation_1 = require("./start-async-validation");
var test_util_1 = require("./test-util");
describe("form group " + start_async_validation_1.startAsyncValidationReducer.name, function () {
    it('should skip any action of the wrong type', function () { return expect(start_async_validation_1.startAsyncValidationReducer(test_util_1.INITIAL_STATE, { type: '' })).toBe(test_util_1.INITIAL_STATE); });
    it('should update state with pending validation', function () {
        var name = 'required';
        var resultState = start_async_validation_1.startAsyncValidationReducer(test_util_1.INITIAL_STATE, new actions_1.StartAsyncValidationAction(test_util_1.FORM_CONTROL_ID, name));
        expect(resultState.pendingValidations).toEqual([name]);
        expect(resultState.isValidationPending).toBe(true);
    });
    it('should update state with pending validation if validations are already pending', function () {
        var name = 'required';
        var existingName = 'min';
        var state = __assign({}, test_util_1.INITIAL_STATE, { pendingValidations: [existingName], isValidationPending: true });
        var resultState = start_async_validation_1.startAsyncValidationReducer(state, new actions_1.StartAsyncValidationAction(test_util_1.FORM_CONTROL_ID, name));
        expect(resultState.pendingValidations).toEqual([existingName, name]);
        expect(resultState.isValidationPending).toBe(true);
    });
    it('should not update state if validation is already pending', function () {
        var name = 'required';
        var state = __assign({}, test_util_1.INITIAL_STATE, { pendingValidations: [name], isValidationPending: true });
        var resultState = start_async_validation_1.startAsyncValidationReducer(state, new actions_1.StartAsyncValidationAction(test_util_1.FORM_CONTROL_ID, name));
        expect(resultState).toBe(state);
    });
    it('should not update state if validation is already pending', function () {
        var name = 'required';
        var state = __assign({}, test_util_1.INITIAL_STATE, { pendingValidations: [name], isValidationPending: true });
        var resultState = start_async_validation_1.startAsyncValidationReducer(state, new actions_1.StartAsyncValidationAction(test_util_1.FORM_CONTROL_ID, name));
        expect(resultState).toBe(state);
    });
    it('should mark state as having validation pending if control child is marked as having validation pending', function () {
        var name = 'required';
        var resultState = start_async_validation_1.startAsyncValidationReducer(test_util_1.INITIAL_STATE, new actions_1.StartAsyncValidationAction(test_util_1.FORM_CONTROL_INNER_ID, name));
        expect(resultState.isValidationPending).toEqual(true);
    });
    it('should mark state as having validation pending if group child is marked as having validation pending', function () {
        var name = 'required';
        var resultState = start_async_validation_1.startAsyncValidationReducer(test_util_1.INITIAL_STATE_FULL, new actions_1.StartAsyncValidationAction(test_util_1.FORM_CONTROL_INNER3_ID, name));
        expect(resultState.isValidationPending).toEqual(true);
    });
    it('should mark state as having validation pending if array child is marked as having validation pending', function () {
        var name = 'required';
        var resultState = start_async_validation_1.startAsyncValidationReducer(test_util_1.INITIAL_STATE_FULL, new actions_1.StartAsyncValidationAction(test_util_1.FORM_CONTROL_INNER5_ID, name));
        expect(resultState.isValidationPending).toEqual(true);
    });
});
//# sourceMappingURL=start-async-validation.spec.js.map