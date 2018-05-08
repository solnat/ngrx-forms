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
var state_1 = require("../../state");
var reset_1 = require("./reset");
describe("form control " + reset_1.resetReducer.name, function () {
    var FORM_CONTROL_ID = 'test ID';
    var INITIAL_FORM_CONTROL_VALUE = '';
    var INITIAL_STATE = state_1.createFormControlState(FORM_CONTROL_ID, INITIAL_FORM_CONTROL_VALUE);
    it('should skip any action of the wrong type', function () {
        return expect(reset_1.resetReducer(INITIAL_STATE, { type: '' })).toBe(INITIAL_STATE);
    });
    it('should update state if dirty', function () {
        var state = __assign({}, INITIAL_STATE, { isDirty: true, isPristine: false });
        var resultState = reset_1.resetReducer(state, new actions_1.ResetAction(FORM_CONTROL_ID));
        expect(resultState.isDirty).toEqual(false);
        expect(resultState.isPristine).toEqual(true);
        expect(resultState.isTouched).toEqual(false);
        expect(resultState.isUntouched).toEqual(true);
        expect(resultState.isSubmitted).toEqual(false);
        expect(resultState.isUnsubmitted).toEqual(true);
    });
    it('should update state if touched', function () {
        var state = __assign({}, INITIAL_STATE, { isTouched: true, isUntouched: false });
        var resultState = reset_1.resetReducer(state, new actions_1.ResetAction(FORM_CONTROL_ID));
        expect(resultState.isDirty).toEqual(false);
        expect(resultState.isPristine).toEqual(true);
        expect(resultState.isTouched).toEqual(false);
        expect(resultState.isUntouched).toEqual(true);
        expect(resultState.isSubmitted).toEqual(false);
        expect(resultState.isUnsubmitted).toEqual(true);
    });
    it('should update state if submitted', function () {
        var state = __assign({}, INITIAL_STATE, { isSubmitted: true, isUnsubmitted: false });
        var resultState = reset_1.resetReducer(state, new actions_1.ResetAction(FORM_CONTROL_ID));
        expect(resultState.isDirty).toEqual(false);
        expect(resultState.isPristine).toEqual(true);
        expect(resultState.isTouched).toEqual(false);
        expect(resultState.isUntouched).toEqual(true);
        expect(resultState.isSubmitted).toEqual(false);
        expect(resultState.isUnsubmitted).toEqual(true);
    });
    it('should not update state if pristine and untouched and unsubmitted', function () {
        var resultState = reset_1.resetReducer(INITIAL_STATE, new actions_1.ResetAction(FORM_CONTROL_ID));
        expect(resultState).toBe(INITIAL_STATE);
    });
});
//# sourceMappingURL=reset.spec.js.map