"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var state_1 = require("../state");
var add_array_control_1 = require("./add-array-control");
var test_util_1 = require("./test-util");
describe(add_array_control_1.addArrayControl.name, function () {
    var INITIAL_ARRAY_STATE = state_1.createFormArrayState(test_util_1.FORM_CONTROL_ID, ['']);
    it('should call reducer for arrays', function () {
        var resultState = add_array_control_1.addArrayControl('A', 1)(INITIAL_ARRAY_STATE);
        expect(resultState).not.toBe(state_1.cast(INITIAL_ARRAY_STATE));
    });
    it('should call reducer for arrays without index', function () {
        var resultState = add_array_control_1.addArrayControl('A')(INITIAL_ARRAY_STATE);
        expect(resultState).not.toBe(state_1.cast(INITIAL_ARRAY_STATE));
    });
    it('should call reducer for arrays uncurried', function () {
        var resultState = add_array_control_1.addArrayControl('A', INITIAL_ARRAY_STATE, 1);
        expect(resultState).not.toBe(state_1.cast(INITIAL_ARRAY_STATE));
    });
    it('should call reducer for arrays uncurried without index', function () {
        var resultState = add_array_control_1.addArrayControl('A', INITIAL_ARRAY_STATE);
        expect(resultState).not.toBe(state_1.cast(INITIAL_ARRAY_STATE));
    });
    it('should throw if curried and no state', function () {
        expect(function () { return add_array_control_1.addArrayControl('A', 1)(undefined); }).toThrowError();
    });
});
//# sourceMappingURL=add-array-control.spec.js.map