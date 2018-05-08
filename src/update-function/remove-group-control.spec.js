"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var state_1 = require("../state");
var remove_group_control_1 = require("./remove-group-control");
var test_util_1 = require("./test-util");
describe(remove_group_control_1.removeGroupControl.name, function () {
    it('should call reducer for groups', function () {
        var resultState = remove_group_control_1.removeGroupControl('inner3')(test_util_1.INITIAL_STATE);
        expect(resultState).not.toBe(state_1.cast(test_util_1.INITIAL_STATE));
    });
    it('should call reducer for groups uncurried', function () {
        var resultState = remove_group_control_1.removeGroupControl('inner3', test_util_1.INITIAL_STATE);
        expect(resultState).not.toBe(state_1.cast(test_util_1.INITIAL_STATE));
    });
    it('should throw if curried and no state', function () {
        expect(function () { return remove_group_control_1.removeGroupControl('inner3')(undefined); }).toThrowError();
    });
});
//# sourceMappingURL=remove-group-control.spec.js.map