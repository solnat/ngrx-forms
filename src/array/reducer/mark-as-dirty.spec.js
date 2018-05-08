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
var mark_as_dirty_1 = require("./mark-as-dirty");
var test_util_1 = require("./test-util");
describe("form array " + mark_as_dirty_1.markAsDirtyReducer.name, function () {
    var INITIAL_STATE_DIRTY = state_1.cast(test_util_1.setPropertiesRecursively(test_util_1.INITIAL_STATE, [['isDirty', true], ['isPristine', false]]));
    it('should mark itself and all children recursively as dirty', function () {
        var resultState = mark_as_dirty_1.markAsDirtyReducer(test_util_1.INITIAL_STATE, new actions_1.MarkAsDirtyAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState).toEqual(INITIAL_STATE_DIRTY);
    });
    it('should not update state if all children are marked as dirty recursively', function () {
        var resultState = mark_as_dirty_1.markAsDirtyReducer(INITIAL_STATE_DIRTY, new actions_1.MarkAsDirtyAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState).toBe(INITIAL_STATE_DIRTY);
    });
    it('should mark children as dirty if the group itself is already marked as dirty', function () {
        var state = __assign({}, test_util_1.INITIAL_STATE, { isDirty: true, isPristine: false, controls: [
                test_util_1.INITIAL_STATE.controls[0],
                __assign({}, test_util_1.INITIAL_STATE.controls[1], { isDirty: true, isPristine: false }),
            ] });
        var resultState = mark_as_dirty_1.markAsDirtyReducer(state, new actions_1.MarkAsDirtyAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState).toEqual(INITIAL_STATE_DIRTY);
    });
    it('should mark control children as dirty', function () {
        var resultState = mark_as_dirty_1.markAsDirtyReducer(test_util_1.INITIAL_STATE, new actions_1.MarkAsDirtyAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState.controls[0].isDirty).toEqual(true);
        expect(resultState.controls[0].isPristine).toEqual(false);
    });
    it('should mark group children as dirty', function () {
        var resultState = mark_as_dirty_1.markAsDirtyReducer(test_util_1.INITIAL_STATE_NESTED_GROUP, new actions_1.MarkAsDirtyAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState.controls[0].isDirty).toEqual(true);
        expect(resultState.controls[0].isPristine).toEqual(false);
    });
    it('should mark array children as dirty', function () {
        var resultState = mark_as_dirty_1.markAsDirtyReducer(test_util_1.INITIAL_STATE_NESTED_ARRAY, new actions_1.MarkAsDirtyAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState.controls[0].isDirty).toEqual(true);
        expect(resultState.controls[0].isPristine).toEqual(false);
    });
    it('should mark state as dirty if control child is marked as dirty', function () {
        var resultState = mark_as_dirty_1.markAsDirtyReducer(test_util_1.INITIAL_STATE, new actions_1.MarkAsDirtyAction(test_util_1.FORM_CONTROL_0_ID));
        expect(resultState.isDirty).toEqual(true);
        expect(resultState.isPristine).toEqual(false);
    });
    it('should mark state as dirty if group child is marked as dirty', function () {
        var resultState = mark_as_dirty_1.markAsDirtyReducer(test_util_1.INITIAL_STATE_NESTED_GROUP, new actions_1.MarkAsDirtyAction(test_util_1.FORM_CONTROL_0_ID));
        expect(resultState.isDirty).toEqual(true);
        expect(resultState.isPristine).toEqual(false);
    });
    it('should mark state as dirty if array child is marked as dirty', function () {
        var resultState = mark_as_dirty_1.markAsDirtyReducer(test_util_1.INITIAL_STATE_NESTED_ARRAY, new actions_1.MarkAsDirtyAction(test_util_1.FORM_CONTROL_0_ID));
        expect(resultState.isDirty).toEqual(true);
        expect(resultState.isPristine).toEqual(false);
    });
});
//# sourceMappingURL=mark-as-dirty.spec.js.map