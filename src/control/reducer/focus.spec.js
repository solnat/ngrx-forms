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
var focus_1 = require("./focus");
describe('form control focusReducer', function () {
    var FORM_CONTROL_ID = 'test ID';
    var INITIAL_FORM_CONTROL_VALUE = '';
    var INITIAL_STATE = state_1.createFormControlState(FORM_CONTROL_ID, INITIAL_FORM_CONTROL_VALUE);
    it('should skip any actionof the wrong type', function () { return expect(focus_1.focusReducer(INITIAL_STATE, { type: '' })).toBe(INITIAL_STATE); });
    it('should update state if unfocused', function () {
        var resultState = focus_1.focusReducer(INITIAL_STATE, new actions_1.FocusAction(FORM_CONTROL_ID));
        expect(resultState.isFocused).toEqual(true);
        expect(resultState.isUnfocused).toEqual(false);
    });
    it('should not update state if focused', function () {
        var state = __assign({}, INITIAL_STATE, { isFocused: true, isUnfocused: false });
        var resultState = focus_1.focusReducer(state, new actions_1.FocusAction(FORM_CONTROL_ID));
        expect(resultState).toBe(state);
    });
});
//# sourceMappingURL=focus.spec.js.map