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
var set_value_1 = require("./set-value");
var test_util_1 = require("./test-util");
describe("form group " + set_value_1.setValueReducer.name, function () {
    it('should update state value if different', function () {
        var value = { inner: 'A' };
        var resultState = set_value_1.setValueReducer(test_util_1.INITIAL_STATE, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_ID, value));
        expect(resultState.value).toEqual(value);
    });
    it('should not update state value if same', function () {
        var value = { inner: 'A' };
        var state = __assign({}, test_util_1.INITIAL_STATE, { value: value });
        var resultState = set_value_1.setValueReducer(state, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_ID, value));
        expect(resultState).toBe(state);
    });
    it('should not mark state as dirty', function () {
        var value = { inner: 'A' };
        var resultState = set_value_1.setValueReducer(test_util_1.INITIAL_STATE, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_ID, value));
        expect(resultState.isDirty).toEqual(false);
    });
    it('should update child state value', function () {
        var value = { inner: 'A' };
        var resultState = set_value_1.setValueReducer(test_util_1.INITIAL_STATE, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_ID, value));
        expect(resultState.controls.inner.value).toEqual(value.inner);
    });
    it('should create child states on demand', function () {
        var value = { inner: 'A', inner2: 'B' };
        var resultState = set_value_1.setValueReducer(test_util_1.INITIAL_STATE, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_ID, value));
        expect(resultState.value).toEqual(value);
        expect(resultState.controls.inner2.value).toEqual(value.inner2);
    });
    it('should create child states on demand for group children', function () {
        var value = { inner: 'A', inner3: { inner4: 'C' } };
        var resultState = set_value_1.setValueReducer(test_util_1.INITIAL_STATE, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_ID, value));
        expect(resultState.value).toEqual(value);
        expect(resultState.controls.inner3.value).toEqual(value.inner3);
    });
    it('should create child states on demand for array children', function () {
        var value = { inner: 'A', inner5: ['C'] };
        var resultState = set_value_1.setValueReducer(test_util_1.INITIAL_STATE, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_ID, value));
        expect(resultState.value).toEqual(value);
        expect(resultState.controls.inner5.value).toEqual(value.inner5);
    });
    it('should create child states on demand for null children', function () {
        var value = { inner: 'A', inner2: null };
        var resultState = set_value_1.setValueReducer(test_util_1.INITIAL_STATE, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_ID, value));
        expect(resultState.value).toEqual(value);
        expect(resultState.controls.inner2.value).toEqual(value.inner2);
    });
    it('should remove child states on demand', function () {
        var value = { inner: 'A', inner2: 'B' };
        var resultState = set_value_1.setValueReducer(test_util_1.INITIAL_STATE, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_ID, value));
        var value2 = { inner: 'A' };
        resultState = set_value_1.setValueReducer(resultState, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_ID, value2));
        expect(resultState.value).toEqual(value2);
        expect(resultState.controls.inner2).toBeUndefined();
    });
    it('should remove child states on demand when value is empty', function () {
        var id = 'ID';
        var state = state_1.createFormGroupState(id, { inner: 5 });
        var resultState = set_value_1.setValueReducer(state, new actions_1.SetValueAction(id, {}));
        expect(resultState.value).toEqual({});
        expect(resultState.controls.inner).toBeUndefined();
    });
    it('should aggregate child values', function () {
        var value = 'A';
        var resultState = set_value_1.setValueReducer(test_util_1.INITIAL_STATE, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_INNER_ID, value));
        expect(resultState.value).toEqual({ inner: 'A' });
    });
    it('should not mark state as dirty if child value is updated', function () {
        var value = 'A';
        var resultState = set_value_1.setValueReducer(test_util_1.INITIAL_STATE, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_INNER_ID, value));
        expect(resultState.isDirty).toEqual(false);
        expect(resultState.controls.inner.isDirty).toEqual(false);
    });
    it('should aggregate child values for group children', function () {
        var resultState = set_value_1.setValueReducer(test_util_1.INITIAL_STATE, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_ID, { inner: 'A', inner3: { inner4: 'C' } }));
        var value = { inner4: 'D' };
        resultState = set_value_1.setValueReducer(resultState, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_INNER3_ID, value));
        expect(resultState.value.inner3).toEqual(value);
    });
    it('should aggregate child values for array children', function () {
        var resultState = set_value_1.setValueReducer(test_util_1.INITIAL_STATE, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_ID, { inner: 'A', inner5: ['C'] }));
        var value = ['D'];
        resultState = set_value_1.setValueReducer(resultState, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_INNER5_ID, value));
        expect(resultState.value.inner5).toEqual(value);
    });
    it('should not mark state as dirty if group child value is updated', function () {
        var resultState = set_value_1.setValueReducer(test_util_1.INITIAL_STATE, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_ID, { inner: 'A', inner3: { inner4: 'C' } }));
        var value = { inner4: 'D' };
        resultState = set_value_1.setValueReducer(resultState, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_INNER3_ID, value));
        expect(resultState.isDirty).toEqual(false);
        expect(resultState.controls.inner3.isDirty).toEqual(false);
    });
    it('should not mark state as dirty if array child value is updated', function () {
        var resultState = set_value_1.setValueReducer(test_util_1.INITIAL_STATE, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_ID, { inner: 'A', inner5: ['C'] }));
        var value = ['D'];
        resultState = set_value_1.setValueReducer(resultState, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_INNER5_ID, value));
        expect(resultState.isDirty).toEqual(false);
        expect(resultState.controls.inner5.isDirty).toEqual(false);
    });
    it('should aggregate nested child values in groups', function () {
        var resultState = set_value_1.setValueReducer(test_util_1.INITIAL_STATE, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_ID, { inner: 'A', inner3: { inner4: 'C' } }));
        var value = 'D';
        resultState = set_value_1.setValueReducer(resultState, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_INNER4_ID, value));
        expect(resultState.value.inner3.inner4).toEqual(value);
    });
    it('should aggregate nested child values in arrays', function () {
        var resultState = set_value_1.setValueReducer(test_util_1.INITIAL_STATE, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_ID, { inner: 'A', inner5: ['C'] }));
        var value = 'D';
        resultState = set_value_1.setValueReducer(resultState, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_INNER5_0_ID, value));
        expect(resultState.value.inner5[0]).toEqual(value);
    });
    it('should not mark state as dirty if nested child value in group is updated', function () {
        var resultState = set_value_1.setValueReducer(test_util_1.INITIAL_STATE, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_ID, { inner: 'A', inner3: { inner4: 'C' } }));
        var value = 'D';
        resultState = set_value_1.setValueReducer(resultState, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_INNER4_ID, value));
        expect(resultState.isDirty).toEqual(false);
        expect(state_1.cast(resultState.controls.inner3).controls.inner4.isDirty).toEqual(false);
    });
    it('should not mark state as dirty if nested child value in array is updated', function () {
        var resultState = set_value_1.setValueReducer(test_util_1.INITIAL_STATE, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_ID, { inner: 'A', inner5: ['C'] }));
        var value = 'D';
        resultState = set_value_1.setValueReducer(resultState, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_INNER5_0_ID, value));
        expect(resultState.isDirty).toEqual(false);
        expect(state_1.cast(resultState.controls.inner5).controls[0].isDirty).toEqual(false);
    });
    it('should remove child errors on demand when value is empty', function () {
        var id = 'ID';
        var errors = { required: true };
        var state = state_1.createFormGroupState(id, { inner: 5 });
        state = __assign({}, state, { errors: {
                _inner: errors,
            }, controls: {
                inner: __assign({}, state.controls.inner, { errors: errors }),
            } });
        var resultState = set_value_1.setValueReducer(state, new actions_1.SetValueAction(id, {}));
        expect(resultState.value).toEqual({});
        expect(resultState.errors).toEqual({});
        expect(resultState.controls.inner).toBeUndefined();
    });
    it('should remove child errors and keep own errors on demand when value is empty', function () {
        var id = 'ID';
        var errors = { required: true };
        var state = state_1.createFormGroupState(id, { inner: 5 });
        state = __assign({}, state, { errors: __assign({ _inner: errors }, errors), controls: {
                inner: __assign({}, state.controls.inner, { errors: errors }),
            } });
        var resultState = set_value_1.setValueReducer(state, new actions_1.SetValueAction(id, {}));
        expect(resultState.value).toEqual({});
        expect(resultState.errors).toEqual(errors);
        expect(resultState.controls.inner).toBeUndefined();
    });
});
//# sourceMappingURL=set-value.spec.js.map