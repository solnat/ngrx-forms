"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mark_as_dirty_1 = require("./mark-as-dirty");
var test_util_1 = require("./test-util");
describe(mark_as_dirty_1.markAsDirty.name, function () {
    it('should call reducer for controls', function () {
        var resultState = mark_as_dirty_1.markAsDirty(test_util_1.INITIAL_STATE.controls.inner);
        expect(resultState).not.toBe(test_util_1.INITIAL_STATE.controls.inner);
    });
    it('should call reducer for groups', function () {
        var resultState = mark_as_dirty_1.markAsDirty(test_util_1.INITIAL_STATE);
        expect(resultState).not.toBe(test_util_1.INITIAL_STATE);
    });
    it('should call reducer for arrays', function () {
        var resultState = mark_as_dirty_1.markAsDirty(test_util_1.INITIAL_STATE.controls.inner5);
        expect(resultState).not.toBe(test_util_1.INITIAL_STATE.controls.inner5);
    });
});
//# sourceMappingURL=mark-as-dirty.spec.js.map