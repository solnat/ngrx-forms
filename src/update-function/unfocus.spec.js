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
var unfocus_1 = require("./unfocus");
describe(unfocus_1.unfocus.name, function () {
    it('should call reducer for controls', function () {
        var state = __assign({}, test_util_1.INITIAL_STATE.controls.inner, { isFocused: true, isUnfocused: false });
        var resultState = unfocus_1.unfocus(state_1.cast(state));
        expect(resultState).not.toBe(state_1.cast(state));
    });
});
//# sourceMappingURL=unfocus.spec.js.map