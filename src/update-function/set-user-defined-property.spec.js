"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var set_user_defined_property_1 = require("./set-user-defined-property");
var test_util_1 = require("./test-util");
describe(set_user_defined_property_1.setUserDefinedProperty.name, function () {
    it('should call reducer for controls', function () {
        var resultState = set_user_defined_property_1.setUserDefinedProperty('prop', 12)(test_util_1.INITIAL_STATE.controls.inner);
        expect(resultState).not.toBe(test_util_1.INITIAL_STATE.controls.inner);
    });
    it('should call reducer for groups', function () {
        var resultState = set_user_defined_property_1.setUserDefinedProperty('prop', 12)(test_util_1.INITIAL_STATE);
        expect(resultState).not.toBe(test_util_1.INITIAL_STATE);
    });
    it('should call reducer for arrays', function () {
        var resultState = set_user_defined_property_1.setUserDefinedProperty('prop', 12)(test_util_1.INITIAL_STATE.controls.inner5);
        expect(resultState).not.toBe(test_util_1.INITIAL_STATE.controls.inner5);
    });
    it('should call reducer for controls uncurried', function () {
        var resultState = set_user_defined_property_1.setUserDefinedProperty('prop', 12, test_util_1.INITIAL_STATE.controls.inner);
        expect(resultState).not.toBe(test_util_1.INITIAL_STATE.controls.inner);
    });
    it('should call reducer for groups uncurried', function () {
        var resultState = set_user_defined_property_1.setUserDefinedProperty('prop', 12, test_util_1.INITIAL_STATE);
        expect(resultState).not.toBe(test_util_1.INITIAL_STATE);
    });
    it('should call reducer for arrays uncurried', function () {
        var resultState = set_user_defined_property_1.setUserDefinedProperty('prop', 12, test_util_1.INITIAL_STATE.controls.inner5);
        expect(resultState).not.toBe(test_util_1.INITIAL_STATE.controls.inner5);
    });
    it('should throw if curried and no state', function () {
        expect(function () { return set_user_defined_property_1.setUserDefinedProperty('prop', 12)(undefined); }).toThrowError();
    });
});
//# sourceMappingURL=set-user-defined-property.spec.js.map