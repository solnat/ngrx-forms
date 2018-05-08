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
var actions_1 = require("../actions");
var state_1 = require("../state");
var reducer_1 = require("./reducer");
describe('form control reducer', function () {
    var FORM_CONTROL_ID = 'test ID';
    var INITIAL_FORM_CONTROL_VALUE = '';
    var INITIAL_STATE = state_1.createFormControlState(FORM_CONTROL_ID, INITIAL_FORM_CONTROL_VALUE);
    it('should skip any action with non-equal control ID', function () {
        var resultState = reducer_1.formControlReducerInternal(INITIAL_STATE, new actions_1.SetValueAction(FORM_CONTROL_ID + 'A', 'A'));
        expect(resultState).toBe(INITIAL_STATE);
    });
    it('should preserve the order of properties when stringified', function () {
        var expected = JSON.stringify(INITIAL_STATE);
        var state = reducer_1.formControlReducerInternal(INITIAL_STATE, new actions_1.MarkAsDirtyAction(FORM_CONTROL_ID));
        state = reducer_1.formControlReducerInternal(state, new actions_1.MarkAsPristineAction(FORM_CONTROL_ID));
        expect(JSON.stringify(state)).toEqual(expected);
    });
    it('should throw if state is not a control state', function () {
        expect(function () { return reducer_1.formControlReducerInternal({ controls: [] }, new actions_1.MarkAsDirtyAction(FORM_CONTROL_ID)); }).toThrowError();
    });
    describe(actions_1.SetValueAction.name, function () {
        it('should update state', function () {
            var resultState = reducer_1.formControlReducerInternal(INITIAL_STATE, new actions_1.SetValueAction(FORM_CONTROL_ID, 'A'));
            expect(resultState).not.toBe(INITIAL_STATE);
        });
    });
    describe(actions_1.SetErrorsAction.name, function () {
        it('should update state', function () {
            var errors = { required: true };
            var resultState = reducer_1.formControlReducerInternal(INITIAL_STATE, new actions_1.SetErrorsAction(FORM_CONTROL_ID, errors));
            expect(resultState).not.toBe(INITIAL_STATE);
        });
    });
    describe(actions_1.StartAsyncValidationAction.name, function () {
        it('should update state', function () {
            var name = 'required';
            var resultState = reducer_1.formControlReducerInternal(INITIAL_STATE, new actions_1.StartAsyncValidationAction(FORM_CONTROL_ID, name));
            expect(resultState).not.toBe(INITIAL_STATE);
        });
    });
    describe(actions_1.SetAsyncErrorAction.name, function () {
        it('should update state', function () {
            var name = 'required';
            var value = true;
            var state = __assign({}, INITIAL_STATE, { pendingValidations: [name], isValidationPending: true });
            var resultState = reducer_1.formControlReducerInternal(state, new actions_1.SetAsyncErrorAction(FORM_CONTROL_ID, name, value));
            expect(resultState).not.toBe(INITIAL_STATE);
        });
    });
    describe(actions_1.ClearAsyncErrorAction.name, function () {
        it('should update state', function () {
            var name = 'required';
            var state = __assign({}, INITIAL_STATE, { isValid: false, isInvalid: true, errors: (_a = {}, _a['$' + name] = true, _a), pendingValidations: [name], isValidationPending: true });
            var resultState = reducer_1.formControlReducerInternal(state, new actions_1.ClearAsyncErrorAction(FORM_CONTROL_ID, name));
            expect(resultState).not.toBe(INITIAL_STATE);
            var _a;
        });
    });
    describe(actions_1.MarkAsDirtyAction.name, function () {
        it('should update state', function () {
            var resultState = reducer_1.formControlReducerInternal(INITIAL_STATE, new actions_1.MarkAsDirtyAction(FORM_CONTROL_ID));
            expect(resultState).not.toBe(INITIAL_STATE);
        });
    });
    describe(actions_1.MarkAsPristineAction.name, function () {
        it('should update state', function () {
            var state = __assign({}, INITIAL_STATE, { isDirty: true, isPristine: false });
            var resultState = reducer_1.formControlReducerInternal(state, new actions_1.MarkAsPristineAction(FORM_CONTROL_ID));
            expect(resultState).not.toBe(INITIAL_STATE);
        });
    });
    describe(actions_1.EnableAction.name, function () {
        it('should update state', function () {
            var state = __assign({}, INITIAL_STATE, { isEnabled: false, isDisabled: true });
            var resultState = reducer_1.formControlReducerInternal(state, new actions_1.EnableAction(FORM_CONTROL_ID));
            expect(resultState).not.toBe(INITIAL_STATE);
        });
    });
    describe(actions_1.DisableAction.name, function () {
        it('should update state', function () {
            var resultState = reducer_1.formControlReducerInternal(INITIAL_STATE, new actions_1.DisableAction(FORM_CONTROL_ID));
            expect(resultState).not.toBe(INITIAL_STATE);
        });
    });
    describe(actions_1.MarkAsTouchedAction.name, function () {
        it('should update state', function () {
            var resultState = reducer_1.formControlReducerInternal(INITIAL_STATE, new actions_1.MarkAsTouchedAction(FORM_CONTROL_ID));
            expect(resultState).not.toBe(INITIAL_STATE);
        });
    });
    describe(actions_1.MarkAsUntouchedAction.name, function () {
        it('should update state', function () {
            var state = __assign({}, INITIAL_STATE, { isTouched: true, isUntouched: false });
            var resultState = reducer_1.formControlReducerInternal(state, new actions_1.MarkAsUntouchedAction(FORM_CONTROL_ID));
            expect(resultState).not.toBe(INITIAL_STATE);
        });
    });
    describe(actions_1.FocusAction.name, function () {
        it('should update state', function () {
            var resultState = reducer_1.formControlReducerInternal(INITIAL_STATE, new actions_1.FocusAction(FORM_CONTROL_ID));
            expect(resultState).not.toBe(INITIAL_STATE);
        });
    });
    describe(actions_1.UnfocusAction.name, function () {
        it('should update state', function () {
            var state = __assign({}, INITIAL_STATE, { isFocused: true, isUnfocused: false });
            var resultState = reducer_1.formControlReducerInternal(state, new actions_1.UnfocusAction(FORM_CONTROL_ID));
            expect(resultState).not.toBe(INITIAL_STATE);
        });
    });
    describe(actions_1.SetUserDefinedPropertyAction.name, function () {
        it('should update state', function () {
            var resultState = reducer_1.formControlReducerInternal(INITIAL_STATE, new actions_1.SetUserDefinedPropertyAction(FORM_CONTROL_ID, 'prop', 12));
            expect(resultState).not.toBe(INITIAL_STATE);
        });
    });
    describe(actions_1.MarkAsSubmittedAction.name, function () {
        it('should update state', function () {
            var resultState = reducer_1.formControlReducerInternal(INITIAL_STATE, new actions_1.MarkAsSubmittedAction(FORM_CONTROL_ID));
            expect(resultState).not.toBe(INITIAL_STATE);
        });
    });
    describe(actions_1.MarkAsUnsubmittedAction.name, function () {
        it('should update state', function () {
            var state = __assign({}, INITIAL_STATE, { isSubmitted: true, isUnsubmitted: false });
            var resultState = reducer_1.formControlReducerInternal(state, new actions_1.MarkAsUnsubmittedAction(FORM_CONTROL_ID));
            expect(resultState).not.toBe(INITIAL_STATE);
        });
    });
    describe(actions_1.ResetAction.name, function () {
        it('should update state', function () {
            var state = __assign({}, INITIAL_STATE, { isSubmitted: true, isUnsubmitted: false });
            var resultState = reducer_1.formControlReducerInternal(state, new actions_1.ResetAction(FORM_CONTROL_ID));
            expect(resultState).not.toBe(INITIAL_STATE);
        });
    });
});
//# sourceMappingURL=reducer.spec.js.map