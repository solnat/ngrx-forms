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
    it('should remove child state', function () {
        var action = new actions_1.RemoveGroupControlAction(test_util_1.FORM_CONTROL_ID, 'inner2');
        var resultState = remove_control_1.removeControlReducer(test_util_1.INITIAL_STATE_FULL, action);
        expect(resultState.value).toEqual({ inner: '', inner3: { inner4: '' }, inner5: [''] });
        expect(resultState.controls.inner2).toBeUndefined();
    });
    it('should remove child state for group children', function () {
        var action = new actions_1.RemoveGroupControlAction(test_util_1.FORM_CONTROL_ID, 'inner3');
        var resultState = remove_control_1.removeControlReducer(test_util_1.INITIAL_STATE_FULL, action);
        expect(resultState.value).toEqual({ inner: '', inner2: '', inner5: [''] });
        expect(resultState.controls.inner3).toBeUndefined();
    });
    it('should remove child state for array children', function () {
        var action = new actions_1.RemoveGroupControlAction(test_util_1.FORM_CONTROL_ID, 'inner5');
        var resultState = remove_control_1.removeControlReducer(test_util_1.INITIAL_STATE_FULL, action);
        expect(resultState.value).toEqual({ inner: '', inner2: '', inner3: { inner4: '' } });
        expect(resultState.controls.inner5).toBeUndefined();
    });
    it('should remove child errors for removed child', function () {
        var id = 'ID';
        var errors = { required: true };
        var state = state_1.createFormGroupState(id, { inner: 5 });
        state = __assign({}, state, { errors: {
                _inner: errors,
            }, controls: {
                inner: __assign({}, state.controls.inner, { errors: errors }),
            } });
        var action = new actions_1.RemoveGroupControlAction(id, 'inner');
        var resultState = remove_control_1.removeControlReducer(state, action);
        expect(resultState.value).toEqual({});
        expect(resultState.errors).toEqual({});
        expect(resultState.controls.inner).toBeUndefined();
    });
    it('should remove child errors for removed child and keep own errors', function () {
        var id = 'ID';
        var errors = { required: true };
        var state = state_1.createFormGroupState(id, { inner: 5 });
        state = __assign({}, state, { errors: __assign({ _inner: errors }, errors), controls: {
                inner: __assign({}, state.controls.inner, { errors: errors }),
            } });
        var action = new actions_1.RemoveGroupControlAction(id, 'inner');
        var resultState = remove_control_1.removeControlReducer(state, action);
        expect(resultState.value).toEqual({});
        expect(resultState.errors).toEqual(errors);
        expect(resultState.controls.inner).toBeUndefined();
    });
    it('should throw if trying to remove non-existing control', function () {
        var action = new actions_1.RemoveGroupControlAction(test_util_1.FORM_CONTROL_ID, 'inner2');
        expect(function () { return remove_control_1.removeControlReducer(test_util_1.INITIAL_STATE, action); }).toThrowError();
    });
});
//# sourceMappingURL=remove-control.spec.js.map