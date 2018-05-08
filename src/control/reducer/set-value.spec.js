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
var set_value_1 = require("./set-value");
describe('form control setValueReducer', function () {
    var FORM_CONTROL_ID = 'test ID';
    var INITIAL_FORM_CONTROL_VALUE = '';
    var INITIAL_STATE = state_1.createFormControlState(FORM_CONTROL_ID, INITIAL_FORM_CONTROL_VALUE);
    it('should skip any actionof the wrong type', function () { return expect(set_value_1.setValueReducer(INITIAL_STATE, { type: '' })).toBe(INITIAL_STATE); });
    it('should update state value if different', function () {
        var value = 'A';
        var resultState = set_value_1.setValueReducer(INITIAL_STATE, new actions_1.SetValueAction(FORM_CONTROL_ID, value));
        expect(resultState.value).toEqual(value);
    });
    it('should not update state value if same', function () {
        var value = 'A';
        var state = __assign({}, INITIAL_STATE, { value: value });
        var resultState = set_value_1.setValueReducer(state, new actions_1.SetValueAction(FORM_CONTROL_ID, value));
        expect(resultState).toBe(state);
    });
    it('should not mark state as dirty', function () {
        var value = 'A';
        var resultState = set_value_1.setValueReducer(INITIAL_STATE, new actions_1.SetValueAction(FORM_CONTROL_ID, value));
        expect(resultState.isDirty).toEqual(false);
    });
    it('should throw for date values', function () {
        var value = new Date(1970, 0, 1);
        var state = state_1.createFormControlState(FORM_CONTROL_ID, null);
        expect(function () { return set_value_1.setValueReducer(state, new actions_1.SetValueAction(FORM_CONTROL_ID, value)); }).toThrowError();
    });
    it('should throw if value is not supported', function () {
        var value = {};
        expect(function () { return set_value_1.setValueReducer(INITIAL_STATE, new actions_1.SetValueAction(FORM_CONTROL_ID, value)); }).toThrowError();
    });
});
//# sourceMappingURL=set-value.spec.js.map