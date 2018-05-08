"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var state_1 = require("../state");
var remove_array_control_1 = require("./remove-array-control");
var test_util_1 = require("./test-util");
describe(remove_array_control_1.removeArrayControl.name, function () {
    var INITIAL_ARRAY_STATE = state_1.createFormArrayState(test_util_1.FORM_CONTROL_ID, ['']);
    it('should call reducer for arrays', function () {
        var resultState = remove_array_control_1.removeArrayControl(0)(INITIAL_ARRAY_STATE);
        expect(resultState).not.toBe(state_1.cast(INITIAL_ARRAY_STATE));
    });
    it('should call reducer for arrays uncurried', function () {
        var resultState = remove_array_control_1.removeArrayControl(0, INITIAL_ARRAY_STATE);
        expect(resultState).not.toBe(state_1.cast(INITIAL_ARRAY_STATE));
    });
    it('should throw if curried and no state', function () {
        expect(function () { return remove_array_control_1.removeArrayControl(0)(undefined); }).toThrowError();
    });
});
//# sourceMappingURL=remove-array-control.spec.js.map