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
var enable_1 = require("./enable");
var test_util_1 = require("./test-util");
describe(enable_1.enable.name, function () {
    it('should call reducer for controls', function () {
        var state = __assign({}, test_util_1.INITIAL_STATE.controls.inner, { isEnabled: false, isDisabled: true });
        var resultState = enable_1.enable(state);
        expect(resultState).not.toBe(state);
    });
    it('should call reducer for groups', function () {
        var state = __assign({}, test_util_1.INITIAL_STATE, { isEnabled: false, isDisabled: true, controls: __assign({}, test_util_1.INITIAL_STATE.controls, { inner: __assign({}, test_util_1.INITIAL_STATE.controls.inner, { isEnabled: false, isDisabled: true }) }) });
        var resultState = enable_1.enable(state);
        expect(resultState).not.toBe(state);
    });
    it('should call reducer for arrays', function () {
        var inner5State = state_1.cast(test_util_1.INITIAL_STATE.controls.inner5);
        var state = __assign({}, inner5State, { isEnabled: false, isDisabled: true, controls: inner5State.controls.concat([
                __assign({}, inner5State.controls[0], { isEnabled: false, isDisabled: true }),
            ]) });
        var resultState = enable_1.enable(state);
        expect(resultState).not.toBe(state);
    });
});
//# sourceMappingURL=enable.spec.js.map