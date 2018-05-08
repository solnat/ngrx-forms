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
var mark_as_unsubmitted_1 = require("./mark-as-unsubmitted");
var test_util_1 = require("./test-util");
describe("form array " + mark_as_unsubmitted_1.markAsUnsubmittedReducer.name, function () {
    it('should update state if submitted', function () {
        var state = __assign({}, test_util_1.INITIAL_STATE, { isSubmitted: true, isUnsubmitted: false });
        var resultState = mark_as_unsubmitted_1.markAsUnsubmittedReducer(state, new actions_1.MarkAsUnsubmittedAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState.isSubmitted).toEqual(false);
        expect(resultState.isUnsubmitted).toEqual(true);
    });
    it('should not update state if unsubmitted', function () {
        var resultState = mark_as_unsubmitted_1.markAsUnsubmittedReducer(test_util_1.INITIAL_STATE, new actions_1.MarkAsUnsubmittedAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState).toBe(test_util_1.INITIAL_STATE);
    });
    it('should mark control children as unsubmitted', function () {
        var state = state_1.cast(test_util_1.setPropertiesRecursively(test_util_1.INITIAL_STATE, [['isSubmitted', true], ['isUnsubmitted', false]]));
        var resultState = mark_as_unsubmitted_1.markAsUnsubmittedReducer(state, new actions_1.MarkAsUnsubmittedAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState.controls[0].isSubmitted).toEqual(false);
        expect(resultState.controls[0].isUnsubmitted).toEqual(true);
    });
    it('should mark group children as unsubmitted', function () {
        var state = state_1.cast(test_util_1.setPropertiesRecursively(test_util_1.INITIAL_STATE_NESTED_GROUP, [['isSubmitted', true], ['isUnsubmitted', false]]));
        var resultState = mark_as_unsubmitted_1.markAsUnsubmittedReducer(state, new actions_1.MarkAsUnsubmittedAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState.controls[0].isSubmitted).toEqual(false);
        expect(resultState.controls[0].isUnsubmitted).toEqual(true);
    });
    it('should mark array children as unsubmitted', function () {
        var state = state_1.cast(test_util_1.setPropertiesRecursively(test_util_1.INITIAL_STATE_NESTED_ARRAY, [['isSubmitted', true], ['isUnsubmitted', false]]));
        var resultState = mark_as_unsubmitted_1.markAsUnsubmittedReducer(state, new actions_1.MarkAsUnsubmittedAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState.controls[0].isSubmitted).toEqual(false);
        expect(resultState.controls[0].isUnsubmitted).toEqual(true);
    });
    it('should mark state as unsubmitted if all children are pristine when control child is updated', function () {
        var state = state_1.cast(test_util_1.setPropertiesRecursively(test_util_1.INITIAL_STATE, [['isSubmitted', true], ['isUnsubmitted', false]], test_util_1.FORM_CONTROL_0_ID));
        var resultState = mark_as_unsubmitted_1.markAsUnsubmittedReducer(state, new actions_1.MarkAsUnsubmittedAction(test_util_1.FORM_CONTROL_1_ID));
        expect(resultState.isSubmitted).toEqual(false);
        expect(resultState.isUnsubmitted).toEqual(true);
    });
    it('should not mark state as unsubmitted if not all children are pristine when control child is updated', function () {
        var state = state_1.cast(test_util_1.setPropertiesRecursively(test_util_1.INITIAL_STATE, [['isSubmitted', true], ['isUnsubmitted', false]]));
        var resultState = mark_as_unsubmitted_1.markAsUnsubmittedReducer(state, new actions_1.MarkAsUnsubmittedAction(test_util_1.FORM_CONTROL_0_ID));
        expect(resultState.isSubmitted).toEqual(true);
        expect(resultState.isUnsubmitted).toEqual(false);
    });
    it('should mark state as unsubmitted if all children are pristine when group child is updated', function () {
        var state = state_1.cast(test_util_1.setPropertiesRecursively(test_util_1.INITIAL_STATE_NESTED_GROUP, [['isSubmitted', true], ['isUnsubmitted', false]], test_util_1.FORM_CONTROL_0_ID));
        var resultState = mark_as_unsubmitted_1.markAsUnsubmittedReducer(state, new actions_1.MarkAsUnsubmittedAction(test_util_1.FORM_CONTROL_1_ID));
        expect(resultState.isSubmitted).toEqual(false);
        expect(resultState.isUnsubmitted).toEqual(true);
    });
    it('should mark state as unsubmitted if all children are pristine when array child is updated', function () {
        var state = state_1.cast(test_util_1.setPropertiesRecursively(test_util_1.INITIAL_STATE_NESTED_ARRAY, [['isSubmitted', true], ['isUnsubmitted', false]], test_util_1.FORM_CONTROL_0_ID));
        var resultState = mark_as_unsubmitted_1.markAsUnsubmittedReducer(state, new actions_1.MarkAsUnsubmittedAction(test_util_1.FORM_CONTROL_1_ID));
        expect(resultState.isSubmitted).toEqual(false);
        expect(resultState.isUnsubmitted).toEqual(true);
    });
});
//# sourceMappingURL=mark-as-unsubmitted.spec.js.map