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
var mark_as_submitted_1 = require("./mark-as-submitted");
var test_util_1 = require("./test-util");
describe("form array " + mark_as_submitted_1.markAsSubmittedReducer.name, function () {
    var INITIAL_STATE_SUBMITTED = state_1.cast(test_util_1.setPropertiesRecursively(test_util_1.INITIAL_STATE, [['isSubmitted', true], ['isUnsubmitted', false]]));
    it('should mark itself and all children recursively as submitted', function () {
        var resultState = mark_as_submitted_1.markAsSubmittedReducer(test_util_1.INITIAL_STATE, new actions_1.MarkAsSubmittedAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState).toEqual(INITIAL_STATE_SUBMITTED);
    });
    it('should not update state if all children are marked as submitted recursively', function () {
        var resultState = mark_as_submitted_1.markAsSubmittedReducer(INITIAL_STATE_SUBMITTED, new actions_1.MarkAsSubmittedAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState).toBe(INITIAL_STATE_SUBMITTED);
    });
    it('should mark children as submitted if the group itself is already marked as submitted', function () {
        var state = __assign({}, test_util_1.INITIAL_STATE, { isSubmitted: true, isUnsubmitted: false, controls: [
                test_util_1.INITIAL_STATE.controls[0],
                __assign({}, test_util_1.INITIAL_STATE.controls[1], { isSubmitted: true, isUnsubmitted: false }),
            ] });
        var resultState = mark_as_submitted_1.markAsSubmittedReducer(state, new actions_1.MarkAsSubmittedAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState).toEqual(INITIAL_STATE_SUBMITTED);
    });
    it('should mark control children as submitted', function () {
        var resultState = mark_as_submitted_1.markAsSubmittedReducer(test_util_1.INITIAL_STATE, new actions_1.MarkAsSubmittedAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState.controls[0].isSubmitted).toEqual(true);
        expect(resultState.controls[0].isUnsubmitted).toEqual(false);
    });
    it('should mark group children as submitted', function () {
        var resultState = mark_as_submitted_1.markAsSubmittedReducer(test_util_1.INITIAL_STATE_NESTED_GROUP, new actions_1.MarkAsSubmittedAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState.controls[0].isSubmitted).toEqual(true);
        expect(resultState.controls[0].isUnsubmitted).toEqual(false);
    });
    it('should mark array children as submitted', function () {
        var resultState = mark_as_submitted_1.markAsSubmittedReducer(test_util_1.INITIAL_STATE_NESTED_ARRAY, new actions_1.MarkAsSubmittedAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState.controls[0].isSubmitted).toEqual(true);
        expect(resultState.controls[0].isUnsubmitted).toEqual(false);
    });
    it('should mark state as submitted if control child is marked as submitted', function () {
        var resultState = mark_as_submitted_1.markAsSubmittedReducer(test_util_1.INITIAL_STATE, new actions_1.MarkAsSubmittedAction(test_util_1.FORM_CONTROL_0_ID));
        expect(resultState.isSubmitted).toEqual(true);
        expect(resultState.isUnsubmitted).toEqual(false);
    });
    it('should mark state as submitted if group child is marked as submitted', function () {
        var resultState = mark_as_submitted_1.markAsSubmittedReducer(test_util_1.INITIAL_STATE_NESTED_GROUP, new actions_1.MarkAsSubmittedAction(test_util_1.FORM_CONTROL_0_ID));
        expect(resultState.isSubmitted).toEqual(true);
        expect(resultState.isUnsubmitted).toEqual(false);
    });
    it('should mark state as submitted if array child is marked as submitted', function () {
        var resultState = mark_as_submitted_1.markAsSubmittedReducer(test_util_1.INITIAL_STATE_NESTED_ARRAY, new actions_1.MarkAsSubmittedAction(test_util_1.FORM_CONTROL_0_ID));
        expect(resultState.isSubmitted).toEqual(true);
        expect(resultState.isUnsubmitted).toEqual(false);
    });
});
//# sourceMappingURL=mark-as-submitted.spec.js.map