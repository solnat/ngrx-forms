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
var set_value_1 = require("./set-value");
var test_util_1 = require("./test-util");
describe("form array " + set_value_1.setValueReducer.name, function () {
    it('should update state value if different', function () {
        var value = ['A', ''];
        var resultState = set_value_1.setValueReducer(test_util_1.INITIAL_STATE, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_ID, value));
        expect(resultState.value).toEqual(value);
    });
    it('should not update state value if same', function () {
        var value = ['', ''];
        var state = __assign({}, test_util_1.INITIAL_STATE, { value: value });
        var resultState = set_value_1.setValueReducer(state, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_ID, value));
        expect(resultState).toBe(state);
    });
    it('should not mark state as dirty', function () {
        var value = ['A', ''];
        var resultState = set_value_1.setValueReducer(test_util_1.INITIAL_STATE, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_ID, value));
        expect(resultState.isDirty).toEqual(false);
    });
    it('should update child state value', function () {
        var value = ['A', ''];
        var resultState = set_value_1.setValueReducer(test_util_1.INITIAL_STATE, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_ID, value));
        expect(resultState.controls[0].value).toEqual(value[0]);
    });
    it('should create child states on demand', function () {
        var value = ['', '', ''];
        var resultState = set_value_1.setValueReducer(test_util_1.INITIAL_STATE, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_ID, value));
        expect(resultState.value).toEqual(value);
        expect(resultState.controls[2].value).toEqual(value[2]);
    });
    it('should create child states on demand for group children', function () {
        var value = [{ inner: '' }, { inner: '' }, { inner: '' }];
        var resultState = set_value_1.setValueReducer(test_util_1.INITIAL_STATE_NESTED_GROUP, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_ID, value));
        expect(resultState.value).toEqual(value);
        expect(resultState.controls[2].value).toEqual(value[2]);
    });
    it('should create child states on demand for array children', function () {
        var value = [[''], [''], ['']];
        var resultState = set_value_1.setValueReducer(test_util_1.INITIAL_STATE_NESTED_ARRAY, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_ID, value));
        expect(resultState.value).toEqual(value);
        expect(resultState.controls[2].value).toEqual(value[2]);
    });
    it('should create child states on demand for null children', function () {
        var value = ['', '', null];
        var resultState = set_value_1.setValueReducer(test_util_1.INITIAL_STATE, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_ID, value));
        expect(resultState.value).toEqual(value);
        expect(resultState.controls[2].value).toEqual(value[2]);
    });
    it('should remove child states on demand', function () {
        var value = [''];
        var resultState = set_value_1.setValueReducer(test_util_1.INITIAL_STATE, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_ID, value));
        expect(resultState.value).toEqual(value);
        expect(resultState.controls[1]).toBeUndefined();
    });
    it('should remove child states on demand when value is empty', function () {
        var value = [];
        var resultState = set_value_1.setValueReducer(test_util_1.INITIAL_STATE, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_ID, value));
        expect(resultState.value).toEqual(value);
        expect(resultState.controls[0]).toBeUndefined();
    });
    it('should aggregate child values', function () {
        var value = 'A';
        var resultState = set_value_1.setValueReducer(test_util_1.INITIAL_STATE, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_0_ID, value));
        expect(resultState.value).toEqual([value, '']);
    });
    it('should not mark state as dirty if child value is updated', function () {
        var value = 'A';
        var resultState = set_value_1.setValueReducer(test_util_1.INITIAL_STATE, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_0_ID, value));
        expect(resultState.isDirty).toEqual(false);
        expect(resultState.controls[0].isDirty).toEqual(false);
    });
    it('should aggregate child values for group children', function () {
        var value = { inner: 'A' };
        var resultState = set_value_1.setValueReducer(test_util_1.INITIAL_STATE_NESTED_GROUP, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_0_ID, value));
        expect(resultState.value).toEqual([value, { inner: '' }]);
    });
    it('should not mark state as dirty if group child value is updated', function () {
        var value = { inner: 'A' };
        var resultState = set_value_1.setValueReducer(test_util_1.INITIAL_STATE_NESTED_GROUP, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_0_ID, value));
        expect(resultState.isDirty).toEqual(false);
        expect(resultState.controls[0].isDirty).toEqual(false);
    });
    it('should aggregate child values for array children', function () {
        var value = ['A'];
        var resultState = set_value_1.setValueReducer(test_util_1.INITIAL_STATE_NESTED_ARRAY, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_0_ID, value));
        expect(resultState.value).toEqual([value, ['']]);
    });
    it('should not mark state as dirty if array child value is updated', function () {
        var value = ['A'];
        var resultState = set_value_1.setValueReducer(test_util_1.INITIAL_STATE_NESTED_ARRAY, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_0_ID, value));
        expect(resultState.isDirty).toEqual(false);
        expect(resultState.controls[0].isDirty).toEqual(false);
    });
    it('should remove child errors on demand when value is empty', function () {
        var errors = { required: true };
        var state = __assign({}, test_util_1.INITIAL_STATE, { errors: {
                _0: errors,
            }, controls: [
                __assign({}, test_util_1.INITIAL_STATE.controls[0], { errors: errors }),
                test_util_1.INITIAL_STATE.controls[1],
            ] });
        var resultState = set_value_1.setValueReducer(state, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_ID, []));
        expect(resultState.value).toEqual([]);
        expect(resultState.errors).toEqual({});
        expect(resultState.controls[0]).toBeUndefined();
    });
    it('should remove child errors and keep own errors on demand when value is empty', function () {
        var errors = { required: true };
        var state = __assign({}, test_util_1.INITIAL_STATE, { errors: __assign({ _0: errors }, errors), controls: [
                __assign({}, test_util_1.INITIAL_STATE.controls[0], { errors: errors }),
                test_util_1.INITIAL_STATE.controls[1],
            ] });
        var resultState = set_value_1.setValueReducer(state, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_ID, []));
        expect(resultState.value).toEqual([]);
        expect(resultState.errors).toEqual(errors);
        expect(resultState.controls[0]).toBeUndefined();
    });
});
//# sourceMappingURL=set-value.spec.js.map