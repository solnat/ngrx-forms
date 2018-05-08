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
var state_1 = require("../../state");
var actions_1 = require("../../actions");
var set_user_defined_property_1 = require("./set-user-defined-property");
describe('form control setUserDefinedPropertyReducer', function () {
    var FORM_CONTROL_ID = 'test ID';
    var INITIAL_FORM_CONTROL_VALUE = '';
    var INITIAL_STATE = state_1.createFormControlState(FORM_CONTROL_ID, INITIAL_FORM_CONTROL_VALUE);
    it('should skip any actionof the wrong type', function () {
        return expect(set_user_defined_property_1.setUserDefinedPropertyReducer(INITIAL_STATE, { type: '' })).toBe(INITIAL_STATE);
    });
    it('should update state user defined properties if different', function () {
        var prop = 'prop';
        var value = 12;
        var resultState = set_user_defined_property_1.setUserDefinedPropertyReducer(INITIAL_STATE, new actions_1.SetUserDefinedPropertyAction(FORM_CONTROL_ID, prop, value));
        expect(resultState.userDefinedProperties).toEqual((_a = {},
            _a[prop] = value,
            _a));
        var _a;
    });
    it('should not update state user defined properties if same', function () {
        var prop = 'prop';
        var value = 12;
        var state = __assign({}, INITIAL_STATE, { userDefinedProperties: (_a = {}, _a[prop] = value, _a) });
        var resultState = set_user_defined_property_1.setUserDefinedPropertyReducer(state, new actions_1.SetUserDefinedPropertyAction(FORM_CONTROL_ID, prop, value));
        expect(resultState).toBe(state);
        var _a;
    });
    it('should not affect other custom properties', function () {
        var prop = 'prop';
        var prop2 = 'prop2';
        var value = 12;
        var value2 = 13;
        var state = __assign({}, INITIAL_STATE, { userDefinedProperties: (_a = {}, _a[prop] = value, _a) });
        var resultState = set_user_defined_property_1.setUserDefinedPropertyReducer(state, new actions_1.SetUserDefinedPropertyAction(FORM_CONTROL_ID, prop2, value2));
        expect(resultState.userDefinedProperties).toEqual((_b = {},
            _b[prop] = value,
            _b[prop2] = value2,
            _b));
        var _a, _b;
    });
});
//# sourceMappingURL=set-user-defined-property.spec.js.map