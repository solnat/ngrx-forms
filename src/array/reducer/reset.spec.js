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
var reset_1 = require("./reset");
var test_util_1 = require("./test-util");
describe("form array " + reset_1.resetReducer.name, function () {
    it('should update state if dirty', function () {
        var state = __assign({}, test_util_1.INITIAL_STATE, { isDirty: true, isPristine: false });
        var resultState = reset_1.resetReducer(state, new actions_1.ResetAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState.isDirty).toEqual(false);
        expect(resultState.isPristine).toEqual(true);
        expect(resultState.isTouched).toEqual(false);
        expect(resultState.isUntouched).toEqual(true);
        expect(resultState.isSubmitted).toEqual(false);
        expect(resultState.isUnsubmitted).toEqual(true);
    });
    it('should update state if touched', function () {
        var state = __assign({}, test_util_1.INITIAL_STATE, { isTouched: true, isUntouched: false });
        var resultState = reset_1.resetReducer(state, new actions_1.ResetAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState.isDirty).toEqual(false);
        expect(resultState.isPristine).toEqual(true);
        expect(resultState.isTouched).toEqual(false);
        expect(resultState.isUntouched).toEqual(true);
        expect(resultState.isSubmitted).toEqual(false);
        expect(resultState.isUnsubmitted).toEqual(true);
    });
    it('should update state if submitted', function () {
        var state = __assign({}, test_util_1.INITIAL_STATE, { isSubmitted: true, isUnsubmitted: false });
        var resultState = reset_1.resetReducer(state, new actions_1.ResetAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState.isDirty).toEqual(false);
        expect(resultState.isPristine).toEqual(true);
        expect(resultState.isTouched).toEqual(false);
        expect(resultState.isUntouched).toEqual(true);
        expect(resultState.isSubmitted).toEqual(false);
        expect(resultState.isUnsubmitted).toEqual(true);
    });
    it('should not update state if pristine and untouched and unsubmitted', function () {
        var resultState = reset_1.resetReducer(test_util_1.INITIAL_STATE, new actions_1.ResetAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState).toBe(test_util_1.INITIAL_STATE);
    });
    it('should reset control children', function () {
        var state = state_1.cast(test_util_1.setPropertiesRecursively(test_util_1.INITIAL_STATE, [['isDirty', true], ['isPristine', false]]));
        var resultState = reset_1.resetReducer(state, new actions_1.ResetAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState.controls[0].isDirty).toEqual(false);
        expect(resultState.controls[0].isPristine).toEqual(true);
    });
    it('should reset group children', function () {
        var state = state_1.cast(test_util_1.setPropertiesRecursively(test_util_1.INITIAL_STATE_NESTED_GROUP, [['isDirty', true], ['isPristine', false]]));
        var resultState = reset_1.resetReducer(state, new actions_1.ResetAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState.controls[0].isDirty).toEqual(false);
        expect(resultState.controls[0].isPristine).toEqual(true);
    });
    it('should reset array children', function () {
        var state = state_1.cast(test_util_1.setPropertiesRecursively(test_util_1.INITIAL_STATE_NESTED_ARRAY, [['isDirty', true], ['isPristine', false]]));
        var resultState = reset_1.resetReducer(state, new actions_1.ResetAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState.controls[0].isDirty).toEqual(false);
        expect(resultState.controls[0].isPristine).toEqual(true);
    });
    it('should reset state if all children are reset when control child is updated', function () {
        var state = state_1.cast(test_util_1.setPropertiesRecursively(test_util_1.INITIAL_STATE, [['isDirty', true], ['isPristine', false], ['isTouched', true], ['isUntouched', false], ['isSubmitted', true], ['isUnsubmitted', false]], test_util_1.FORM_CONTROL_0_ID));
        var resultState = reset_1.resetReducer(state, new actions_1.ResetAction(test_util_1.FORM_CONTROL_1_ID));
        expect(resultState.isDirty).toEqual(false);
        expect(resultState.isPristine).toEqual(true);
    });
    it('should not reset state if not all children are reset when control child is updated', function () {
        var state = state_1.cast(test_util_1.setPropertiesRecursively(test_util_1.INITIAL_STATE, [['isDirty', true], ['isPristine', false]]));
        var resultState = reset_1.resetReducer(state, new actions_1.ResetAction(test_util_1.FORM_CONTROL_0_ID));
        expect(resultState.isDirty).toEqual(true);
        expect(resultState.isPristine).toEqual(false);
    });
    it('should reset state if all children are reset when group child is updated', function () {
        var state = state_1.cast(test_util_1.setPropertiesRecursively(test_util_1.INITIAL_STATE_NESTED_GROUP, [['isDirty', true], ['isPristine', false], ['isTouched', true], ['isUntouched', false], ['isSubmitted', true], ['isUnsubmitted', false]], test_util_1.FORM_CONTROL_0_ID));
        var resultState = reset_1.resetReducer(state, new actions_1.ResetAction(test_util_1.FORM_CONTROL_1_ID));
        expect(resultState.isDirty).toEqual(false);
        expect(resultState.isPristine).toEqual(true);
    });
    it('should reset state if all children are reset when array child is updated', function () {
        var state = state_1.cast(test_util_1.setPropertiesRecursively(test_util_1.INITIAL_STATE_NESTED_ARRAY, [['isDirty', true], ['isPristine', false], ['isTouched', true], ['isUntouched', false], ['isSubmitted', true], ['isUnsubmitted', false]], test_util_1.FORM_CONTROL_0_ID));
        var resultState = reset_1.resetReducer(state, new actions_1.ResetAction(test_util_1.FORM_CONTROL_1_ID));
        expect(resultState.isDirty).toEqual(false);
        expect(resultState.isPristine).toEqual(true);
    });
});
//# sourceMappingURL=reset.spec.js.map