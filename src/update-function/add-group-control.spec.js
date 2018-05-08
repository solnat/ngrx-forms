"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var state_1 = require("../state");
var add_group_control_1 = require("./add-group-control");
var test_util_1 = require("./test-util");
describe(add_group_control_1.addGroupControl.name, function () {
    it('should call reducer for groups', function () {
        var resultState = add_group_control_1.addGroupControl('inner2', 'A')(test_util_1.INITIAL_STATE);
        expect(resultState).not.toBe(state_1.cast(test_util_1.INITIAL_STATE));
    });
    it('should call reducer for groups uncurried', function () {
        var resultState = add_group_control_1.addGroupControl('inner2', 'A', test_util_1.INITIAL_STATE);
        expect(resultState).not.toBe(state_1.cast(test_util_1.INITIAL_STATE));
    });
    it('should throw if curried and no state', function () {
        expect(function () { return add_group_control_1.addGroupControl('inner2', 'A')(undefined); }).toThrowError();
    });
});
//# sourceMappingURL=add-group-control.spec.js.map