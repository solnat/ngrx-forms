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
var reset_1 = require("./reset");
var test_util_1 = require("./test-util");
describe(reset_1.reset.name, function () {
    it('should call reducer for controls if dirty', function () {
        var state = __assign({}, test_util_1.INITIAL_STATE.controls.inner, { isDirty: true, isPristine: false });
        var resultState = reset_1.reset(state);
        expect(resultState).not.toBe(state);
    });
    it('should call reducer for controls if touched', function () {
        var state = __assign({}, test_util_1.INITIAL_STATE.controls.inner, { isTouched: true, isUntouched: false });
        var resultState = reset_1.reset(state);
        expect(resultState).not.toBe(state);
    });
    it('should call reducer for controls if submitted', function () {
        var state = __assign({}, test_util_1.INITIAL_STATE.controls.inner, { isSubmitted: true, isUnsubmitted: false });
        var resultState = reset_1.reset(state);
        expect(resultState).not.toBe(state);
    });
    it('should call reducer for groups if dirty', function () {
        var state = __assign({}, test_util_1.INITIAL_STATE, { isDirty: true, isPristine: false });
        var resultState = reset_1.reset(state);
        expect(resultState).not.toBe(state);
    });
    it('should call reducer for groups if touched', function () {
        var state = __assign({}, test_util_1.INITIAL_STATE, { isTouched: true, isUntouched: false });
        var resultState = reset_1.reset(state);
        expect(resultState).not.toBe(state);
    });
    it('should call reducer for groups if submitted', function () {
        var state = __assign({}, test_util_1.INITIAL_STATE, { isSubmitted: true, isUnsubmitted: false });
        var resultState = reset_1.reset(state);
        expect(resultState).not.toBe(state);
    });
    it('should call reducer for arrays if dirty', function () {
        var state = __assign({}, test_util_1.INITIAL_STATE.controls.inner5, { isDirty: true, isPristine: false });
        var resultState = reset_1.reset(state);
        expect(resultState).not.toBe(state);
    });
    it('should call reducer for arrays if touched', function () {
        var state = __assign({}, test_util_1.INITIAL_STATE.controls.inner5, { isTouched: true, isUntouched: false });
        var resultState = reset_1.reset(state);
        expect(resultState).not.toBe(state);
    });
    it('should call reducer for arrays if submitted', function () {
        var state = __assign({}, test_util_1.INITIAL_STATE.controls.inner5, { isSubmitted: true, isUnsubmitted: false });
        var resultState = reset_1.reset(state);
        expect(resultState).not.toBe(state);
    });
});
//# sourceMappingURL=reset.spec.js.map