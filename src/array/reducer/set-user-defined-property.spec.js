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
var actions_1 = require("../../actions");
var set_user_defined_property_1 = require("./set-user-defined-property");
var test_util_1 = require("./test-util");
describe("form group " + set_user_defined_property_1.setUserDefinedPropertyReducer.name, function () {
    it('should skip any actionof the wrong type', function () {
        return expect(set_user_defined_property_1.setUserDefinedPropertyReducer(test_util_1.INITIAL_STATE, { type: '' })).toBe(test_util_1.INITIAL_STATE);
    });
    it('should update state user defined properties if different', function () {
        var prop = 'prop';
        var value = 12;
        var resultState = set_user_defined_property_1.setUserDefinedPropertyReducer(test_util_1.INITIAL_STATE, new actions_1.SetUserDefinedPropertyAction(test_util_1.FORM_CONTROL_ID, prop, value));
        expect(resultState.userDefinedProperties).toEqual((_a = {},
            _a[prop] = value,
            _a));
        var _a;
    });
    it('should not update state user defined properties if same', function () {
        var prop = 'prop';
        var value = 12;
        var state = __assign({}, test_util_1.INITIAL_STATE, { userDefinedProperties: (_a = {}, _a[prop] = value, _a) });
        var resultState = set_user_defined_property_1.setUserDefinedPropertyReducer(state, new actions_1.SetUserDefinedPropertyAction(test_util_1.FORM_CONTROL_ID, prop, value));
        expect(resultState).toBe(state);
        var _a;
    });
    it('should update state user defined properties for children', function () {
        var prop = 'prop';
        var value = 12;
        var resultState = set_user_defined_property_1.setUserDefinedPropertyReducer(test_util_1.INITIAL_STATE, new actions_1.SetUserDefinedPropertyAction(test_util_1.FORM_CONTROL_0_ID, prop, value));
        expect(resultState.controls[0].userDefinedProperties).toEqual((_a = {},
            _a[prop] = value,
            _a));
        var _a;
    });
});
//# sourceMappingURL=set-user-defined-property.spec.js.map