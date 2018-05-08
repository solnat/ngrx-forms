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
var mark_as_touched_1 = require("./mark-as-touched");
var test_util_1 = require("./test-util");
describe("form group " + mark_as_touched_1.markAsTouchedReducer.name, function () {
    var INITIAL_STATE_FULL_TOUCHED = state_1.cast(test_util_1.setPropertiesRecursively(test_util_1.INITIAL_STATE_FULL, [['isTouched', true], ['isUntouched', false]]));
    it('should mark itself and all children recursively as touched', function () {
        var resultState = mark_as_touched_1.markAsTouchedReducer(test_util_1.INITIAL_STATE_FULL, new actions_1.MarkAsTouchedAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState).toEqual(INITIAL_STATE_FULL_TOUCHED);
    });
    it('should not update state if all children are marked as touched recursively', function () {
        var resultState = mark_as_touched_1.markAsTouchedReducer(INITIAL_STATE_FULL_TOUCHED, new actions_1.MarkAsTouchedAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState).toBe(INITIAL_STATE_FULL_TOUCHED);
    });
    it('should mark children as touched if the group itself is already marked as touched', function () {
        var state = __assign({}, test_util_1.INITIAL_STATE_FULL, { isTouched: true, isUntouched: false, controls: __assign({}, test_util_1.INITIAL_STATE_FULL.controls, { inner: __assign({}, test_util_1.INITIAL_STATE_FULL.controls.inner, { isTouched: true, isUntouched: false }) }) });
        var resultState = mark_as_touched_1.markAsTouchedReducer(state, new actions_1.MarkAsTouchedAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState).toEqual(INITIAL_STATE_FULL_TOUCHED);
    });
    it('should mark control children as touched', function () {
        var resultState = mark_as_touched_1.markAsTouchedReducer(test_util_1.INITIAL_STATE, new actions_1.MarkAsTouchedAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState.controls.inner.isTouched).toEqual(true);
        expect(resultState.controls.inner.isUntouched).toEqual(false);
    });
    it('should mark group children as touched', function () {
        var resultState = mark_as_touched_1.markAsTouchedReducer(test_util_1.INITIAL_STATE_FULL, new actions_1.MarkAsTouchedAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState.controls.inner3.isTouched).toEqual(true);
        expect(resultState.controls.inner3.isUntouched).toEqual(false);
    });
    it('should mark array children as touched', function () {
        var resultState = mark_as_touched_1.markAsTouchedReducer(test_util_1.INITIAL_STATE_FULL, new actions_1.MarkAsTouchedAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState.controls.inner5.isTouched).toEqual(true);
        expect(resultState.controls.inner5.isUntouched).toEqual(false);
    });
    it('should mark state as touched if control child is marked as touched', function () {
        var resultState = mark_as_touched_1.markAsTouchedReducer(test_util_1.INITIAL_STATE, new actions_1.MarkAsTouchedAction(test_util_1.FORM_CONTROL_INNER_ID));
        expect(resultState.isTouched).toEqual(true);
        expect(resultState.isUntouched).toEqual(false);
    });
    it('should mark state as touched if group child is marked as touched', function () {
        var resultState = mark_as_touched_1.markAsTouchedReducer(test_util_1.INITIAL_STATE_FULL, new actions_1.MarkAsTouchedAction(test_util_1.FORM_CONTROL_INNER3_ID));
        expect(resultState.isTouched).toEqual(true);
        expect(resultState.isUntouched).toEqual(false);
    });
    it('should mark state as touched if array child is marked as touched', function () {
        var resultState = mark_as_touched_1.markAsTouchedReducer(test_util_1.INITIAL_STATE_FULL, new actions_1.MarkAsTouchedAction(test_util_1.FORM_CONTROL_INNER5_ID));
        expect(resultState.isTouched).toEqual(true);
        expect(resultState.isUntouched).toEqual(false);
    });
});
//# sourceMappingURL=mark-as-touched.spec.js.map