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
var mark_as_unsubmitted_1 = require("./mark-as-unsubmitted");
var test_util_1 = require("./test-util");
describe(mark_as_unsubmitted_1.markAsUnsubmitted.name, function () {
    it('should call reducer for controls', function () {
        var state = __assign({}, test_util_1.INITIAL_STATE.controls.inner, { isSubmitted: true, isUnsubmitted: false });
        var resultState = mark_as_unsubmitted_1.markAsUnsubmitted(state);
        expect(resultState).not.toBe(state);
    });
    it('should call reducer for groups', function () {
        var state = __assign({}, test_util_1.INITIAL_STATE, { isSubmitted: true, isUnsubmitted: false });
        var resultState = mark_as_unsubmitted_1.markAsUnsubmitted(state);
        expect(resultState).not.toBe(state);
    });
    it('should call reducer for arrays', function () {
        var state = __assign({}, test_util_1.INITIAL_STATE.controls.inner5, { isSubmitted: true, isUnsubmitted: false });
        var resultState = mark_as_unsubmitted_1.markAsUnsubmitted(state);
        expect(resultState).not.toBe(state);
    });
});
//# sourceMappingURL=mark-as-unsubmitted.spec.js.map