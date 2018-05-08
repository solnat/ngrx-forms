"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var disable_1 = require("./disable");
var test_util_1 = require("./test-util");
describe(disable_1.disable.name, function () {
    it('should call reducer for controls', function () {
        var resultState = disable_1.disable(test_util_1.INITIAL_STATE.controls.inner);
        expect(resultState).not.toBe(test_util_1.INITIAL_STATE.controls.inner);
    });
    it('should call reducer for groups', function () {
        var resultState = disable_1.disable(test_util_1.INITIAL_STATE);
        expect(resultState).not.toBe(test_util_1.INITIAL_STATE);
    });
    it('should call reducer for arrays', function () {
        var resultState = disable_1.disable(test_util_1.INITIAL_STATE.controls.inner5);
        expect(resultState).not.toBe(test_util_1.INITIAL_STATE.controls.inner5);
    });
});
//# sourceMappingURL=disable.spec.js.map