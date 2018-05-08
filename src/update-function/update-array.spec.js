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
var update_array_1 = require("./update-array");
var update_group_1 = require("./update-group");
describe(update_array_1.updateArray.name, function () {
    it('should apply the provided functions to control children', function () {
        var state = state_1.createFormArrayState(test_util_1.FORM_CONTROL_ID, ['']);
        var expected = __assign({}, state.controls[0], { value: 'A' });
        var resultState = update_array_1.updateArray(function () { return expected; })(state);
        expect(resultState.controls[0]).toBe(expected);
    });
    it('should apply the provided functions to all control children', function () {
        var state = state_1.createFormArrayState(test_util_1.FORM_CONTROL_ID, ['', '']);
        var expected = __assign({}, state.controls[0], { value: 'A' });
        var resultState = update_array_1.updateArray(function () { return expected; })(state);
        expect(resultState.controls[0]).toBe(expected);
        expect(resultState.controls[1]).toBe(expected);
    });
    it('should apply the provided functions to group children', function () {
        var state = state_1.createFormArrayState(test_util_1.FORM_CONTROL_ID, [{ inner: '' }]);
        var expected = __assign({}, state.controls[0], { value: { inner: 'A' } });
        var resultState = update_array_1.updateArray(function () { return expected; })(state);
        expect(resultState.controls[0]).toBe(expected);
    });
    it('should apply the provided functions to array children', function () {
        var state = state_1.createFormArrayState(test_util_1.FORM_CONTROL_ID, [['']]);
        var expected = __assign({}, state.controls[0], { value: ['A'] });
        var resultState = update_array_1.updateArray(function () { return expected; })(state);
        expect(resultState.controls[0]).toBe(expected);
    });
    it('should apply the provided functions to control children uncurried', function () {
        var state = state_1.createFormArrayState(test_util_1.FORM_CONTROL_ID, ['']);
        var expected = __assign({}, state.controls[0], { value: 'A' });
        var resultState = update_array_1.updateArray(state, function () { return expected; });
        expect(resultState.controls[0]).toBe(expected);
    });
    it('should apply the provided functions to all control children uncurried', function () {
        var state = state_1.createFormArrayState(test_util_1.FORM_CONTROL_ID, ['', '']);
        var expected = __assign({}, state.controls[0], { value: 'A' });
        var resultState = update_array_1.updateArray(state, function () { return expected; });
        expect(resultState.controls[0]).toBe(expected);
        expect(resultState.controls[1]).toBe(expected);
    });
    it('should apply the provided functions to group children uncurried', function () {
        var state = state_1.createFormArrayState(test_util_1.FORM_CONTROL_ID, [{ inner: '' }]);
        var expected = __assign({}, state.controls[0], { value: { inner: 'A' } });
        var resultState = update_array_1.updateArray(state, function () { return expected; });
        expect(resultState.controls[0]).toBe(expected);
    });
    it('should apply the provided functions to array children uncurried', function () {
        var state = state_1.createFormArrayState(test_util_1.FORM_CONTROL_ID, [['']]);
        var expected = __assign({}, state.controls[0], { value: ['A'] });
        var resultState = update_array_1.updateArray(state, function () { return expected; });
        expect(resultState.controls[0]).toBe(expected);
    });
    it('should apply multiple provided functions one after another', function () {
        var state = state_1.createFormArrayState(test_util_1.FORM_CONTROL_ID, ['A', 'B', 'C']);
        var expected1 = __assign({}, state.controls[0], { value: 'D' });
        var expected2 = __assign({}, state.controls[1], { value: 'E' });
        var expected3 = __assign({}, state.controls[2], { value: 'F' });
        var resultState = update_array_1.updateArray(function (s) { return s.value === 'A' ? expected1 : s.value === 'B' ? expected3 : s; })(state);
        resultState = update_array_1.updateArray(function (s) { return s.value === 'F' ? expected2 : s.value === 'C' ? expected3 : s; })(resultState);
        expect(resultState.controls[0]).toBe(expected1);
        expect(resultState.controls[1]).toBe(expected2);
        expect(resultState.controls[2]).toBe(expected3);
    });
    it('should pass the parent array as the second parameter', function () {
        var state = state_1.createFormArrayState(test_util_1.FORM_CONTROL_ID, ['', '']);
        update_array_1.updateArray(function (c, p) {
            expect(p).toBe(state);
            return c;
        })(state);
    });
    it('should pass the index as the third parameter', function () {
        var state = state_1.createFormArrayState(test_util_1.FORM_CONTROL_ID, ['', '']);
        var loopCount = 0;
        update_array_1.updateArray(function (c, p, i) {
            expect(i).toBe(loopCount++);
            return c;
        })(state);
    });
    it('should work inside of an updateGroup', function () {
        // this just asserts it compiles without type error
        var validationFormGroupReducer = update_group_1.updateGroup({
            inner: update_array_1.updateArray(update_group_1.updateGroup({
                s: function (s) { return s; },
            })),
        });
        expect(validationFormGroupReducer).toBeDefined();
    });
});
//# sourceMappingURL=update-array.spec.js.map