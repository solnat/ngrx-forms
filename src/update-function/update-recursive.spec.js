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
var state_1 = require("../state");
var test_util_1 = require("./test-util");
var update_recursive_1 = require("./update-recursive");
describe(update_recursive_1.updateRecursive.name, function () {
    it('should apply the provided functions to controls', function () {
        var state = state_1.createFormControlState(test_util_1.FORM_CONTROL_ID, '');
        var expected = __assign({}, state, { value: 'A' });
        var resultState = update_recursive_1.updateRecursive(function () { return expected; })(state);
        expect(resultState).toBe(expected);
    });
    it('should apply the provided functions to controls uncurried', function () {
        var state = state_1.createFormControlState(test_util_1.FORM_CONTROL_ID, '');
        var expected = __assign({}, state, { value: 'A' });
        var resultState = update_recursive_1.updateRecursive(state, function () { return expected; });
        expect(resultState).toBe(expected);
    });
    it('should apply the provided functions to arrays', function () {
        var state = state_1.createFormArrayState(test_util_1.FORM_CONTROL_ID, ['']);
        var expected = __assign({}, state, { value: ['A'] });
        var resultState = update_recursive_1.updateRecursive(function () { return expected; })(state);
        expect(resultState).toBe(expected);
    });
    it('should apply the provided functions to arrays uncurried', function () {
        var state = state_1.createFormArrayState(test_util_1.FORM_CONTROL_ID, ['']);
        var expected = __assign({}, state, { value: ['A'] });
        var resultState = update_recursive_1.updateRecursive(state, function () { return expected; });
        expect(resultState).toBe(expected);
    });
    it('should apply the provided functions to children in an array', function () {
        var state = state_1.createFormArrayState(test_util_1.FORM_CONTROL_ID, ['']);
        var expected = __assign({}, state.controls[0], { value: 'A' });
        var resultState = update_recursive_1.updateRecursive(function (s) { return s.id === test_util_1.FORM_CONTROL_ID + '.0' ? expected : s; })(state);
        expect(state_1.cast(resultState).controls[0]).toBe(expected);
    });
    it('should apply the provided functions to multiple children in an array', function () {
        var state = state_1.createFormArrayState(test_util_1.FORM_CONTROL_ID, ['', '']);
        var expected = __assign({}, state.controls[1], { value: 'A' });
        var resultState = update_recursive_1.updateRecursive(function (s) { return s.id === test_util_1.FORM_CONTROL_ID + '.1' ? expected : s; })(state);
        expect(state_1.cast(resultState).controls[1]).toBe(expected);
    });
    it('should apply the provided functions to groups', function () {
        var state = state_1.createFormGroupState(test_util_1.FORM_CONTROL_ID, { inner: '' });
        var expected = __assign({}, state, { value: { inner: 'A' } });
        var resultState = update_recursive_1.updateRecursive(function () { return expected; })(state);
        expect(resultState).toBe(expected);
    });
    it('should apply the provided functions to groups uncurried', function () {
        var state = state_1.createFormGroupState(test_util_1.FORM_CONTROL_ID, { inner: '' });
        var expected = __assign({}, state, { value: { inner: 'A' } });
        var resultState = update_recursive_1.updateRecursive(state, function () { return expected; });
        expect(resultState).toBe(expected);
    });
    it('should apply the provided functions to children in a group', function () {
        var state = state_1.createFormGroupState(test_util_1.FORM_CONTROL_ID, { inner: '' });
        var expected = __assign({}, state.controls.inner, { value: 'A' });
        var resultState = update_recursive_1.updateRecursive(function (s) { return s.id === test_util_1.FORM_CONTROL_INNER_ID ? expected : s; })(state);
        expect(state_1.cast(resultState).controls.inner).toBe(expected);
    });
    it('should apply the provided functions to multiple children in a group', function () {
        var state = state_1.createFormGroupState(test_util_1.FORM_CONTROL_ID, { inner: '', inner2: '' });
        var expected = __assign({}, state.controls.inner2, { value: 'A' });
        var resultState = update_recursive_1.updateRecursive(function (s) { return s.id === test_util_1.FORM_CONTROL_INNER2_ID ? expected : s; })(state);
        expect(state_1.cast(resultState).controls.inner2).toBe(expected);
    });
    it('should apply multiple provided functions one after another', function () {
        var state = state_1.createFormArrayState(test_util_1.FORM_CONTROL_ID, ['A', 'B', 'C']);
        var expected1 = __assign({}, state.controls[0], { value: 'D' });
        var expected2 = __assign({}, state.controls[1], { value: 'E' });
        var expected3 = __assign({}, state.controls[2], { value: 'F' });
        var resultState = update_recursive_1.updateRecursive(function (s) { return s.value === 'A' ? expected1 : s.value === 'B' ? expected3 : s; })(state);
        resultState = update_recursive_1.updateRecursive(function (s) { return s.value === 'F' ? expected2 : s.value === 'C' ? expected3 : s; })(resultState);
        expect(state_1.cast(resultState).controls[0]).toBe(expected1);
        expect(state_1.cast(resultState).controls[1]).toBe(expected2);
        expect(state_1.cast(resultState).controls[2]).toBe(expected3);
    });
    it('should pass top level state itself as the second parameter for top level state', function () {
        var state = state_1.createFormArrayState(test_util_1.FORM_CONTROL_ID, ['', '']);
        update_recursive_1.updateRecursive(function (c, p) {
            if (c === state) {
                expect(p).toBe(state);
            }
            return c;
        })(state);
    });
    it('should pass the parent state as the second parameter for child states', function () {
        var state = state_1.createFormArrayState(test_util_1.FORM_CONTROL_ID, ['', '']);
        update_recursive_1.updateRecursive(function (c, p) {
            if (c !== state) {
                expect(p).toBe(state);
            }
            return c;
        })(state);
    });
});
//# sourceMappingURL=update-recursive.spec.js.map