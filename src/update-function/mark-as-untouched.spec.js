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
var mark_as_untouched_1 = require("./mark-as-untouched");
var test_util_1 = require("./test-util");
describe(mark_as_untouched_1.markAsUntouched.name, function () {
    it('should call reducer for controls', function () {
        var state = __assign({}, test_util_1.INITIAL_STATE.controls.inner, { isTouched: true, isUntouched: false });
        var resultState = mark_as_untouched_1.markAsUntouched(state);
        expect(resultState).not.toBe(state);
    });
    it('should call reducer for groups', function () {
        var state = __assign({}, test_util_1.INITIAL_STATE, { isTouched: true, isUntouched: false });
        var resultState = mark_as_untouched_1.markAsUntouched(state);
        expect(resultState).not.toBe(state);
    });
    it('should call reducer for arrays', function () {
        var state = __assign({}, test_util_1.INITIAL_STATE.controls.inner5, { isTouched: true, isUntouched: false });
        var resultState = mark_as_untouched_1.markAsUntouched(state);
        expect(resultState).not.toBe(state);
    });
});
//# sourceMappingURL=mark-as-untouched.spec.js.map