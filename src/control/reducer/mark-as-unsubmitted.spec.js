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
var mark_as_unsubmitted_1 = require("./mark-as-unsubmitted");
describe('form control markAsUnsubmittedReducer', function () {
    var FORM_CONTROL_ID = 'test ID';
    var INITIAL_FORM_CONTROL_VALUE = '';
    var INITIAL_STATE = state_1.createFormControlState(FORM_CONTROL_ID, INITIAL_FORM_CONTROL_VALUE);
    it('should skip any actionof the wrong type', function () {
        return expect(mark_as_unsubmitted_1.markAsUnsubmittedReducer(INITIAL_STATE, { type: '' })).toBe(INITIAL_STATE);
    });
    describe(actions_1.MarkAsUnsubmittedAction.name, function () {
        it('should update state if submitted', function () {
            var state = __assign({}, INITIAL_STATE, { isSubmitted: true, isUnsubmitted: false });
            var resultState = mark_as_unsubmitted_1.markAsUnsubmittedReducer(state, new actions_1.MarkAsUnsubmittedAction(FORM_CONTROL_ID));
            expect(resultState.isSubmitted).toEqual(false);
            expect(resultState.isUnsubmitted).toEqual(true);
        });
        it('should not update state if unsubmitted', function () {
            var resultState = mark_as_unsubmitted_1.markAsUnsubmittedReducer(INITIAL_STATE, new actions_1.MarkAsUnsubmittedAction(FORM_CONTROL_ID));
            expect(resultState).toBe(INITIAL_STATE);
        });
    });
});
//# sourceMappingURL=mark-as-unsubmitted.spec.js.map