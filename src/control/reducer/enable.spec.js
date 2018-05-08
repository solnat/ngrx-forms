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
var enable_1 = require("./enable");
describe('form control enableReducer', function () {
    var FORM_CONTROL_ID = 'test ID';
    var INITIAL_FORM_CONTROL_VALUE = '';
    var INITIAL_STATE = state_1.createFormControlState(FORM_CONTROL_ID, INITIAL_FORM_CONTROL_VALUE);
    it('should skip any actionof the wrong type', function () { return expect(enable_1.enableReducer(INITIAL_STATE, { type: '' })).toBe(INITIAL_STATE); });
    it('should update state if disabled', function () {
        var state = __assign({}, INITIAL_STATE, { isEnabled: false, isDisabled: true });
        var resultState = enable_1.enableReducer(state, new actions_1.EnableAction(FORM_CONTROL_ID));
        expect(resultState.isEnabled).toEqual(true);
        expect(resultState.isDisabled).toEqual(false);
    });
    it('should not update state if enabled', function () {
        var resultState = enable_1.enableReducer(INITIAL_STATE, new actions_1.EnableAction(FORM_CONTROL_ID));
        expect(resultState).toBe(INITIAL_STATE);
    });
});
//# sourceMappingURL=enable.spec.js.map