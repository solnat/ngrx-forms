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
var mark_as_untouched_1 = require("./mark-as-untouched");
var test_util_1 = require("./test-util");
describe("form group " + mark_as_untouched_1.markAsUntouchedReducer.name, function () {
    it('should update state if touched', function () {
        var state = __assign({}, test_util_1.INITIAL_STATE, { isTouched: true, isUntouched: false });
        var resultState = mark_as_untouched_1.markAsUntouchedReducer(state, new actions_1.MarkAsUntouchedAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState.isTouched).toEqual(false);
        expect(resultState.isUntouched).toEqual(true);
    });
    it('should not update state if untouched', function () {
        var resultState = mark_as_untouched_1.markAsUntouchedReducer(test_util_1.INITIAL_STATE, new actions_1.MarkAsUntouchedAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState).toBe(test_util_1.INITIAL_STATE);
    });
    it('should mark control children as untouched', function () {
        var state = state_1.cast(test_util_1.setPropertiesRecursively(test_util_1.INITIAL_STATE_FULL, [['isTouched', true], ['isUntouched', false]]));
        var resultState = mark_as_untouched_1.markAsUntouchedReducer(state, new actions_1.MarkAsUntouchedAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState.controls.inner.isTouched).toEqual(false);
        expect(resultState.controls.inner.isUntouched).toEqual(true);
    });
    it('should mark group children as untouched', function () {
        var state = state_1.cast(test_util_1.setPropertiesRecursively(test_util_1.INITIAL_STATE_FULL, [['isTouched', true], ['isUntouched', false]]));
        var resultState = mark_as_untouched_1.markAsUntouchedReducer(state, new actions_1.MarkAsUntouchedAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState.controls.inner3.isTouched).toEqual(false);
        expect(resultState.controls.inner3.isUntouched).toEqual(true);
    });
    it('should mark array children as untouched', function () {
        var state = state_1.cast(test_util_1.setPropertiesRecursively(test_util_1.INITIAL_STATE_FULL, [['isTouched', true], ['isUntouched', false]]));
        var resultState = mark_as_untouched_1.markAsUntouchedReducer(state, new actions_1.MarkAsUntouchedAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState.controls.inner5.isTouched).toEqual(false);
        expect(resultState.controls.inner5.isUntouched).toEqual(true);
    });
    it('should mark state as untouched if all children are untouched when control child is updated', function () {
        var state = state_1.cast(test_util_1.setPropertiesRecursively(test_util_1.INITIAL_STATE_FULL, [['isTouched', true], ['isUntouched', false]], test_util_1.FORM_CONTROL_INNER2_ID, test_util_1.FORM_CONTROL_INNER3_ID, test_util_1.FORM_CONTROL_INNER5_ID));
        var resultState = mark_as_untouched_1.markAsUntouchedReducer(state, new actions_1.MarkAsUntouchedAction(test_util_1.FORM_CONTROL_INNER_ID));
        expect(resultState.isTouched).toEqual(false);
        expect(resultState.isUntouched).toEqual(true);
    });
    it('should not mark state as untouched if not all children are untouched when control child is updated', function () {
        var state = state_1.cast(test_util_1.setPropertiesRecursively(test_util_1.INITIAL_STATE_FULL, [['isTouched', true], ['isUntouched', false]]));
        var resultState = mark_as_untouched_1.markAsUntouchedReducer(state, new actions_1.MarkAsUntouchedAction(test_util_1.FORM_CONTROL_INNER_ID));
        expect(resultState.isTouched).toEqual(true);
        expect(resultState.isUntouched).toEqual(false);
    });
    it('should mark state as untouched if all children are untouched when group child is updated', function () {
        var state = state_1.cast(test_util_1.setPropertiesRecursively(test_util_1.INITIAL_STATE_FULL, [['isTouched', true], ['isUntouched', false]], test_util_1.FORM_CONTROL_INNER_ID, test_util_1.FORM_CONTROL_INNER2_ID, test_util_1.FORM_CONTROL_INNER5_ID));
        var resultState = mark_as_untouched_1.markAsUntouchedReducer(state, new actions_1.MarkAsUntouchedAction(test_util_1.FORM_CONTROL_INNER3_ID));
        expect(resultState.isTouched).toEqual(false);
        expect(resultState.isUntouched).toEqual(true);
    });
    it('should mark state as untouched if all children are untouched when array child is updated', function () {
        var state = state_1.cast(test_util_1.setPropertiesRecursively(test_util_1.INITIAL_STATE_FULL, [['isTouched', true], ['isUntouched', false]], test_util_1.FORM_CONTROL_INNER_ID, test_util_1.FORM_CONTROL_INNER2_ID, test_util_1.FORM_CONTROL_INNER3_ID));
        var resultState = mark_as_untouched_1.markAsUntouchedReducer(state, new actions_1.MarkAsUntouchedAction(test_util_1.FORM_CONTROL_INNER5_ID));
        expect(resultState.isTouched).toEqual(false);
        expect(resultState.isUntouched).toEqual(true);
    });
});
//# sourceMappingURL=mark-as-untouched.spec.js.map