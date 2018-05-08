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
var mark_as_dirty_1 = require("./mark-as-dirty");
describe('form control markAsDirtyReducer', function () {
    var FORM_CONTROL_ID = 'test ID';
    var INITIAL_FORM_CONTROL_VALUE = '';
    var INITIAL_STATE = state_1.createFormControlState(FORM_CONTROL_ID, INITIAL_FORM_CONTROL_VALUE);
    it('should skip any actionof the wrong type', function () {
        return expect(mark_as_dirty_1.markAsDirtyReducer(INITIAL_STATE, { type: '' })).toBe(INITIAL_STATE);
    });
    it('should update state if pristine', function () {
        var resultState = mark_as_dirty_1.markAsDirtyReducer(INITIAL_STATE, new actions_1.MarkAsDirtyAction(FORM_CONTROL_ID));
        expect(resultState.isDirty).toEqual(true);
        expect(resultState.isPristine).toEqual(false);
    });
    it('should not update state if dirty', function () {
        var state = __assign({}, INITIAL_STATE, { isDirty: true, isPristine: false });
        var resultState = mark_as_dirty_1.markAsDirtyReducer(state, new actions_1.MarkAsDirtyAction(FORM_CONTROL_ID));
        expect(resultState).toBe(state);
    });
});
//# sourceMappingURL=mark-as-dirty.spec.js.map