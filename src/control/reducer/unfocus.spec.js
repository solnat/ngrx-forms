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
var unfocus_1 = require("./unfocus");
describe('form control unfocusReducer', function () {
    var FORM_CONTROL_ID = 'test ID';
    var INITIAL_FORM_CONTROL_VALUE = '';
    var INITIAL_STATE = state_1.createFormControlState(FORM_CONTROL_ID, INITIAL_FORM_CONTROL_VALUE);
    it('should skip any actionof the wrong type', function () { return expect(unfocus_1.unfocusReducer(INITIAL_STATE, { type: '' })).toBe(INITIAL_STATE); });
    it('should update state if focused', function () {
        var state = __assign({}, INITIAL_STATE, { isFocused: true, isUnfocused: false });
        var resultState = unfocus_1.unfocusReducer(state, new actions_1.UnfocusAction(FORM_CONTROL_ID));
        expect(resultState.isFocused).toEqual(false);
        expect(resultState.isUnfocused).toEqual(true);
    });
    it('should not update state if unfocused', function () {
        var resultState = unfocus_1.unfocusReducer(INITIAL_STATE, new actions_1.UnfocusAction(FORM_CONTROL_ID));
        expect(resultState).toBe(INITIAL_STATE);
    });
});
//# sourceMappingURL=unfocus.spec.js.map