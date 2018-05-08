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
describe('form group reducer', function () {
    var FORM_CONTROL_ID = 'test ID';
    var FORM_CONTROL_INNER_ID = FORM_CONTROL_ID + '.inner';
    var FORM_CONTROL_INNER5_ID = FORM_CONTROL_ID + '.inner5';
    var INITIAL_FORM_CONTROL_VALUE = { inner: '' };
    var INITIAL_FORM_CONTROL_VALUE_FULL = { inner: '', inner2: '', inner3: { inner4: '' }, inner5: [''] };
    var INITIAL_STATE = state_1.createFormGroupState(FORM_CONTROL_ID, INITIAL_FORM_CONTROL_VALUE);
    var INITIAL_STATE_FULL = state_1.createFormGroupState(FORM_CONTROL_ID, INITIAL_FORM_CONTROL_VALUE_FULL);
    it('should skip any non-ngrx-forms action', function () {
        var resultState = reducer_1.formGroupReducerInternal(INITIAL_STATE, { type: '' });
        expect(resultState).toBe(INITIAL_STATE);
    });
    it('should skip any action with non-equal control ID', function () {
        var resultState = reducer_1.formGroupReducerInternal(INITIAL_STATE, new actions_1.SetValueAction('A' + FORM_CONTROL_ID, 'A'));
        expect(resultState).toBe(INITIAL_STATE);
    });
    it("should forward " + actions_1.FocusAction.name + "s to children", function () {
        var resultState = reducer_1.formGroupReducerInternal(INITIAL_STATE, new actions_1.FocusAction(FORM_CONTROL_INNER_ID));
        expect(state_1.cast(resultState.controls.inner).isFocused).toEqual(true);
        expect(state_1.cast(resultState.controls.inner).isUnfocused).toEqual(false);
    });
    it("should forward " + actions_1.UnfocusAction.name + "s to children", function () {
        var state = __assign({}, INITIAL_STATE, { controls: {
                inner: __assign({}, INITIAL_STATE.controls.inner, { isFocused: true, isUnfocused: false }),
            } });
        var resultState = reducer_1.formGroupReducerInternal(state, new actions_1.UnfocusAction(FORM_CONTROL_INNER_ID));
        expect(state_1.cast(resultState.controls.inner).isFocused).toEqual(false);
        expect(state_1.cast(resultState.controls.inner).isUnfocused).toEqual(true);
    });
    it("should forward add " + actions_1.AddArrayControlAction.name + "s to children", function () {
        var resultState = reducer_1.formGroupReducerInternal(INITIAL_STATE_FULL, new actions_1.AddArrayControlAction(FORM_CONTROL_INNER5_ID, ''));
        expect(state_1.cast(resultState.controls.inner5).controls[1]).toBeDefined();
    });
    it("should forward remove " + actions_1.RemoveArrayControlAction.name + "s to children", function () {
        var resultState = reducer_1.formGroupReducerInternal(INITIAL_STATE_FULL, new actions_1.RemoveArrayControlAction(FORM_CONTROL_INNER5_ID, 0));
        expect(state_1.cast(resultState.controls.inner5).controls[0]).toBeUndefined();
    });
    it('should not update state if no child was updated', function () {
        var resultState = reducer_1.formGroupReducerInternal(INITIAL_STATE, new actions_1.SetValueAction(FORM_CONTROL_INNER_ID, ''));
        expect(resultState).toBe(INITIAL_STATE);
    });
    it('should not update state value if no child value was updated', function () {
        var resultState = reducer_1.formGroupReducerInternal(INITIAL_STATE, new actions_1.MarkAsDirtyAction(FORM_CONTROL_INNER_ID));
        expect(resultState.value).toBe(INITIAL_STATE.value);
    });
    it('should not reset child states', function () {
        var value = 'A';
        var state = reducer_1.formGroupReducerInternal(INITIAL_STATE, new actions_1.SetValueAction(FORM_CONTROL_INNER_ID, value));
        var resultState = reducer_1.formGroupReducerInternal(state, new actions_1.MarkAsSubmittedAction(FORM_CONTROL_ID));
        expect(resultState.controls.inner.value).toBe(value);
    });
    it('should not be stateful', function () {
        reducer_1.formGroupReducerInternal(INITIAL_STATE_FULL, new actions_1.SetValueAction(FORM_CONTROL_ID, INITIAL_FORM_CONTROL_VALUE));
        expect(function () { return reducer_1.formGroupReducerInternal(INITIAL_STATE_FULL, new actions_1.MarkAsDirtyAction(FORM_CONTROL_ID)); }).not.toThrowError();
    });
    it('should preserve the order of properties when stringified', function () {
        var expected = JSON.stringify(INITIAL_STATE_FULL);
        var state = reducer_1.formGroupReducerInternal(INITIAL_STATE_FULL, new actions_1.MarkAsDirtyAction(FORM_CONTROL_ID));
        state = reducer_1.formGroupReducerInternal(state, new actions_1.MarkAsPristineAction(FORM_CONTROL_ID));
        expect(JSON.stringify(state)).toEqual(expected);
    });
    it('should throw if trying to set a date as value', function () {
        var state = state_1.createFormGroupState(FORM_CONTROL_ID, {});
        expect(function () { return reducer_1.formGroupReducerInternal(state, new actions_1.SetValueAction(FORM_CONTROL_ID, new Date())); }).toThrowError();
    });
    it('should throw if trying to set a date as a child value', function () {
        var state = state_1.createFormGroupState(FORM_CONTROL_ID, { inner: null });
        expect(function () { return reducer_1.formGroupReducerInternal(state, new actions_1.SetValueAction(FORM_CONTROL_INNER_ID, new Date())); }).toThrowError();
    });
    it('should throw if state is not a group state', function () {
        expect(function () { return reducer_1.formGroupReducerInternal(INITIAL_STATE.controls.inner, new actions_1.MarkAsDirtyAction(FORM_CONTROL_ID)); }).toThrowError();
    });
    describe(actions_1.SetValueAction.name, function () {
        it('should update state', function () {
            var resultState = reducer_1.formGroupReducerInternal(INITIAL_STATE, new actions_1.SetValueAction(FORM_CONTROL_ID, { inner: 'A' }));
            expect(resultState).not.toBe(INITIAL_STATE);
        });
    });
    describe(actions_1.SetErrorsAction.name, function () {
        it('should update state', function () {
            var errors = { required: true };
            var resultState = reducer_1.formGroupReducerInternal(INITIAL_STATE, new actions_1.SetErrorsAction(FORM_CONTROL_ID, errors));
            expect(resultState).not.toBe(INITIAL_STATE);
        });
    });
    describe(actions_1.StartAsyncValidationAction.name, function () {
        it('should update state', function () {
            var name = 'required';
            var resultState = reducer_1.formGroupReducerInternal(INITIAL_STATE, new actions_1.StartAsyncValidationAction(FORM_CONTROL_ID, name));
            expect(resultState).not.toBe(INITIAL_STATE);
        });
    });
    describe(actions_1.SetAsyncErrorAction.name, function () {
        it('should update state', function () {
            var name = 'required';
            var value = true;
            var state = __assign({}, INITIAL_STATE, { pendingValidations: [name], isValidationPending: true });
            var resultState = reducer_1.formGroupReducerInternal(state, new actions_1.SetAsyncErrorAction(FORM_CONTROL_ID, name, value));
            expect(resultState).not.toBe(INITIAL_STATE);
        });
    });
    describe(actions_1.ClearAsyncErrorAction.name, function () {
        it('should update state', function () {
            var name = 'required';
            var state = __assign({}, INITIAL_STATE, { isValid: false, isInvalid: true, errors: (_a = {}, _a['$' + name] = true, _a), pendingValidations: [name], isValidationPending: true });
            var resultState = reducer_1.formGroupReducerInternal(state, new actions_1.ClearAsyncErrorAction(FORM_CONTROL_ID, name));
            expect(resultState).not.toBe(INITIAL_STATE);
            var _a;
        });
    });
    describe(actions_1.MarkAsDirtyAction.name, function () {
        it('should update state', function () {
            var resultState = reducer_1.formGroupReducerInternal(INITIAL_STATE, new actions_1.MarkAsDirtyAction(FORM_CONTROL_ID));
            expect(resultState).not.toBe(INITIAL_STATE);
        });
    });
    describe(actions_1.MarkAsPristineAction.name, function () {
        it('should update state', function () {
            var state = __assign({}, INITIAL_STATE, { isDirty: true, isPristine: false });
            var resultState = reducer_1.formGroupReducerInternal(state, new actions_1.MarkAsPristineAction(FORM_CONTROL_ID));
            expect(resultState).not.toBe(INITIAL_STATE);
        });
    });
    describe(actions_1.EnableAction.name, function () {
        it('should update state', function () {
            var state = __assign({}, INITIAL_STATE, { isEnabled: false, isDisabled: true });
            var resultState = reducer_1.formGroupReducerInternal(state, new actions_1.EnableAction(FORM_CONTROL_ID));
            expect(resultState).not.toBe(INITIAL_STATE);
        });
    });
    describe(actions_1.DisableAction.name, function () {
        it('should update state', function () {
            var resultState = reducer_1.formGroupReducerInternal(INITIAL_STATE, new actions_1.DisableAction(FORM_CONTROL_ID));
            expect(resultState).not.toBe(INITIAL_STATE);
        });
    });
    describe(actions_1.MarkAsTouchedAction.name, function () {
        it('should update state', function () {
            var resultState = reducer_1.formGroupReducerInternal(INITIAL_STATE, new actions_1.MarkAsTouchedAction(FORM_CONTROL_ID));
            expect(resultState).not.toBe(INITIAL_STATE);
        });
    });
    describe(actions_1.MarkAsUntouchedAction.name, function () {
        it('should update state', function () {
            var state = __assign({}, INITIAL_STATE, { isTouched: true, isUntouched: false });
            var resultState = reducer_1.formGroupReducerInternal(state, new actions_1.MarkAsUntouchedAction(FORM_CONTROL_ID));
            expect(resultState).not.toBe(INITIAL_STATE);
        });
    });
    describe(actions_1.MarkAsSubmittedAction.name, function () {
        it('should update state', function () {
            var resultState = reducer_1.formGroupReducerInternal(INITIAL_STATE, new actions_1.MarkAsSubmittedAction(FORM_CONTROL_ID));
            expect(resultState).not.toBe(INITIAL_STATE);
        });
    });
    describe(actions_1.MarkAsUnsubmittedAction.name, function () {
        it('should update state', function () {
            var state = __assign({}, INITIAL_STATE, { isSubmitted: true, isUnsubmitted: false });
            var resultState = reducer_1.formGroupReducerInternal(state, new actions_1.MarkAsUnsubmittedAction(FORM_CONTROL_ID));
            expect(resultState).not.toBe(INITIAL_STATE);
        });
    });
    describe(actions_1.AddGroupControlAction.name, function () {
        it('should update state', function () {
            var action = new actions_1.AddGroupControlAction(FORM_CONTROL_ID, 'inner2', '');
            var resultState = reducer_1.formGroupReducerInternal(INITIAL_STATE, action);
            expect(resultState).not.toBe(INITIAL_STATE);
        });
    });
    describe(actions_1.RemoveGroupControlAction.name, function () {
        it('should update state', function () {
            var action = new actions_1.RemoveGroupControlAction(FORM_CONTROL_ID, 'inner2');
            var resultState = reducer_1.formGroupReducerInternal(INITIAL_STATE_FULL, action);
            expect(resultState).not.toBe(INITIAL_STATE_FULL);
        });
    });
    describe(actions_1.SetUserDefinedPropertyAction.name, function () {
        it('should update state', function () {
            var action = new actions_1.SetUserDefinedPropertyAction(FORM_CONTROL_ID, 'prop', 12);
            var resultState = reducer_1.formGroupReducerInternal(INITIAL_STATE_FULL, action);
            expect(resultState).not.toBe(INITIAL_STATE);
        });
    });
    describe(actions_1.ResetAction.name, function () {
        it('should update state', function () {
            var action = new actions_1.ResetAction(FORM_CONTROL_ID);
            var state = __assign({}, INITIAL_STATE, { isSubmitted: true, isUnsubmitted: false });
            var resultState = reducer_1.formGroupReducerInternal(state, action);
            expect(resultState).not.toBe(INITIAL_STATE);
        });
    });
});
//# sourceMappingURL=reducer.spec.js.map