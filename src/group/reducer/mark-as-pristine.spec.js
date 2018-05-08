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
var mark_as_pristine_1 = require("./mark-as-pristine");
var test_util_1 = require("./test-util");
describe("form group " + mark_as_pristine_1.markAsPristineReducer.name, function () {
    it('should update state if dirty', function () {
        var state = __assign({}, test_util_1.INITIAL_STATE, { isDirty: true, isPristine: false });
        var resultState = mark_as_pristine_1.markAsPristineReducer(state, new actions_1.MarkAsPristineAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState.isDirty).toEqual(false);
        expect(resultState.isPristine).toEqual(true);
    });
    it('should not update state if pristine', function () {
        var resultState = mark_as_pristine_1.markAsPristineReducer(test_util_1.INITIAL_STATE, new actions_1.MarkAsPristineAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState).toBe(test_util_1.INITIAL_STATE);
    });
    it('should mark control children as pristine', function () {
        var state = state_1.cast(test_util_1.setPropertiesRecursively(test_util_1.INITIAL_STATE_FULL, [['isDirty', true], ['isPristine', false]]));
        var resultState = mark_as_pristine_1.markAsPristineReducer(state, new actions_1.MarkAsPristineAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState.controls.inner.isDirty).toEqual(false);
        expect(resultState.controls.inner.isPristine).toEqual(true);
    });
    it('should mark group children as pristine', function () {
        var state = state_1.cast(test_util_1.setPropertiesRecursively(test_util_1.INITIAL_STATE_FULL, [['isDirty', true], ['isPristine', false]]));
        var resultState = mark_as_pristine_1.markAsPristineReducer(state, new actions_1.MarkAsPristineAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState.controls.inner3.isDirty).toEqual(false);
        expect(resultState.controls.inner3.isPristine).toEqual(true);
    });
    it('should mark array children as pristine', function () {
        var state = state_1.cast(test_util_1.setPropertiesRecursively(test_util_1.INITIAL_STATE_FULL, [['isDirty', true], ['isPristine', false]]));
        var resultState = mark_as_pristine_1.markAsPristineReducer(state, new actions_1.MarkAsPristineAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState.controls.inner5.isDirty).toEqual(false);
        expect(resultState.controls.inner5.isPristine).toEqual(true);
    });
    it('should mark state as pristine if all children are pristine when control child is updated', function () {
        var state = state_1.cast(test_util_1.setPropertiesRecursively(test_util_1.INITIAL_STATE_FULL, [['isDirty', true], ['isPristine', false]], test_util_1.FORM_CONTROL_INNER2_ID, test_util_1.FORM_CONTROL_INNER3_ID, test_util_1.FORM_CONTROL_INNER5_ID));
        var resultState = mark_as_pristine_1.markAsPristineReducer(state, new actions_1.MarkAsPristineAction(test_util_1.FORM_CONTROL_INNER_ID));
        expect(resultState.isDirty).toEqual(false);
        expect(resultState.isPristine).toEqual(true);
    });
    it('should not mark state as pristine if not all children are pristine when control child is updated', function () {
        var state = state_1.cast(test_util_1.setPropertiesRecursively(test_util_1.INITIAL_STATE_FULL, [['isDirty', true], ['isPristine', false]]));
        var resultState = mark_as_pristine_1.markAsPristineReducer(state, new actions_1.MarkAsPristineAction(test_util_1.FORM_CONTROL_INNER_ID));
        expect(resultState.isDirty).toEqual(true);
        expect(resultState.isPristine).toEqual(false);
    });
    it('should mark state as pristine if all children are pristine when group child is updated', function () {
        var state = state_1.cast(test_util_1.setPropertiesRecursively(test_util_1.INITIAL_STATE_FULL, [['isDirty', true], ['isPristine', false]], test_util_1.FORM_CONTROL_INNER_ID, test_util_1.FORM_CONTROL_INNER2_ID, test_util_1.FORM_CONTROL_INNER5_ID));
        var resultState = mark_as_pristine_1.markAsPristineReducer(state, new actions_1.MarkAsPristineAction(test_util_1.FORM_CONTROL_INNER3_ID));
        expect(resultState.isDirty).toEqual(false);
        expect(resultState.isPristine).toEqual(true);
    });
    it('should mark state as pristine if all children are pristine when array child is updated', function () {
        var state = state_1.cast(test_util_1.setPropertiesRecursively(test_util_1.INITIAL_STATE_FULL, [['isDirty', true], ['isPristine', false]], test_util_1.FORM_CONTROL_INNER_ID, test_util_1.FORM_CONTROL_INNER2_ID, test_util_1.FORM_CONTROL_INNER3_ID));
        var resultState = mark_as_pristine_1.markAsPristineReducer(state, new actions_1.MarkAsPristineAction(test_util_1.FORM_CONTROL_INNER5_ID));
        expect(resultState.isDirty).toEqual(false);
        expect(resultState.isPristine).toEqual(true);
    });
});
//# sourceMappingURL=mark-as-pristine.spec.js.map