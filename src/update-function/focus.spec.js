"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var state_1 = require("../state");
var focus_1 = require("./focus");
var test_util_1 = require("./test-util");
describe(focus_1.focus.name, function () {
    it('should call reducer for controls', function () {
        var resultState = focus_1.focus(state_1.cast(test_util_1.INITIAL_STATE.controls.inner));
        expect(resultState).not.toBe(state_1.cast(test_util_1.INITIAL_STATE.controls.inner));
    });
});
//# sourceMappingURL=focus.spec.js.map