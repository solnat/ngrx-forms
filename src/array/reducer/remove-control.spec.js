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
var remove_control_1 = require("./remove-control");
var test_util_1 = require("./test-util");
describe("form group " + remove_control_1.removeControlReducer.name, function () {
    var INITIAL_FORM_ARRAY_VALUE = ['A', 'B'];
    var INITIAL_FORM_ARRAY_VALUE_NESTED_GROUP = [{ inner: 'A' }, { inner: 'B' }];
    var INITIAL_FORM_ARRAY_VALUE_NESTED_ARRAY = [['A'], ['B']];
    var INITIAL_STATE = state_1.createFormArrayState(test_util_1.FORM_CONTROL_ID, INITIAL_FORM_ARRAY_VALUE);
    var INITIAL_STATE_NESTED_GROUP = state_1.createFormArrayState(test_util_1.FORM_CONTROL_ID, INITIAL_FORM_ARRAY_VALUE_NESTED_GROUP);
    var INITIAL_STATE_NESTED_ARRAY = state_1.createFormArrayState(test_util_1.FORM_CONTROL_ID, INITIAL_FORM_ARRAY_VALUE_NESTED_ARRAY);
    it('should remove child state', function () {
        var action = new actions_1.RemoveArrayControlAction(test_util_1.FORM_CONTROL_ID, 0);
        var resultState = remove_control_1.removeControlReducer(INITIAL_STATE, action);
        expect(resultState.value).toEqual([INITIAL_FORM_ARRAY_VALUE[1]]);
        expect(resultState.controls[1]).toBeUndefined();
        expect(resultState.controls[0].id).toEqual(test_util_1.FORM_CONTROL_ID + '.0');
    });
    it('should remove child state for group children', function () {
        var action = new actions_1.RemoveArrayControlAction(test_util_1.FORM_CONTROL_ID, 0);
        var resultState = remove_control_1.removeControlReducer(INITIAL_STATE_NESTED_GROUP, action);
        expect(resultState.value).toEqual([INITIAL_FORM_ARRAY_VALUE_NESTED_GROUP[1]]);
        expect(resultState.controls[1]).toBeUndefined();
        expect(resultState.controls[0].id).toEqual(test_util_1.FORM_CONTROL_ID + '.0');
    });
    it('should remove child state for array children', function () {
        var action = new actions_1.RemoveArrayControlAction(test_util_1.FORM_CONTROL_ID, 0);
        var resultState = remove_control_1.removeControlReducer(INITIAL_STATE_NESTED_ARRAY, action);
        expect(resultState.value).toEqual([INITIAL_FORM_ARRAY_VALUE_NESTED_ARRAY[1]]);
        expect(resultState.controls[1]).toBeUndefined();
        expect(resultState.controls[0].id).toEqual(test_util_1.FORM_CONTROL_ID + '.0');
    });
    it('should update nested child IDs for group children', function () {
        var action = new actions_1.RemoveArrayControlAction(test_util_1.FORM_CONTROL_ID, 0);
        var resultState = remove_control_1.removeControlReducer(INITIAL_STATE_NESTED_GROUP, action);
        expect(state_1.cast(resultState.controls[0]).controls.inner.id).toEqual(test_util_1.FORM_CONTROL_ID + '.0.inner');
    });
    it('should update nested child IDs for array children', function () {
        var action = new actions_1.RemoveArrayControlAction(test_util_1.FORM_CONTROL_ID, 0);
        var resultState = remove_control_1.removeControlReducer(INITIAL_STATE_NESTED_ARRAY, action);
        expect(state_1.cast(resultState.controls[0]).controls[0].id).toEqual(test_util_1.FORM_CONTROL_ID + '.0.0');
    });
    it('should remove last element', function () {
        var action = new actions_1.RemoveArrayControlAction(test_util_1.FORM_CONTROL_ID, 1);
        var resultState = remove_control_1.removeControlReducer(INITIAL_STATE, action);
        expect(resultState.value).toEqual([INITIAL_FORM_ARRAY_VALUE[0]]);
        expect(resultState.controls[1]).toBeUndefined();
        expect(resultState.controls[0].id).toEqual(test_util_1.FORM_CONTROL_ID + '.0');
    });
    it('should remove child errors for removed child', function () {
        var id = 'ID';
        var errors = { required: true };
        var state = state_1.createFormArrayState(id, [5]);
        state = __assign({}, state, { errors: {
                _0: errors,
            }, controls: [
                __assign({}, state.controls[0], { errors: errors }),
            ] });
        var action = new actions_1.RemoveArrayControlAction(id, 0);
        var resultState = remove_control_1.removeControlReducer(state, action);
        expect(resultState.value).toEqual([]);
        expect(resultState.errors).toEqual({});
        expect(resultState.controls[0]).toBeUndefined();
    });
    it('should remove child errors for removed child and keep own errors', function () {
        var id = 'ID';
        var errors = { required: true };
        var state = state_1.createFormArrayState(id, [5]);
        state = __assign({}, state, { errors: __assign({ _0: errors }, errors), controls: [
                __assign({}, state.controls[0], { errors: errors }),
            ] });
        var action = new actions_1.RemoveArrayControlAction(id, 0);
        var resultState = remove_control_1.removeControlReducer(state, action);
        expect(resultState.value).toEqual([]);
        expect(resultState.errors).toEqual(errors);
        expect(resultState.controls[0]).toBeUndefined();
    });
    it('should throw if trying to remove non-existing control', function () {
        var action = new actions_1.RemoveArrayControlAction(test_util_1.FORM_CONTROL_ID, 2);
        expect(function () { return remove_control_1.removeControlReducer(INITIAL_STATE, action); }).toThrowError();
    });
    it('should throw if trying to remove control at negative index', function () {
        var action = new actions_1.RemoveArrayControlAction(test_util_1.FORM_CONTROL_ID, -1);
        expect(function () { return remove_control_1.removeControlReducer(INITIAL_STATE, action); }).toThrowError();
    });
});
//# sourceMappingURL=remove-control.spec.js.map