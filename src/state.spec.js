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
var test_util_1 = require("./array/reducer/test-util");
var test_util_2 = require("./group/reducer/test-util");
var state_1 = require("./state");
describe('state', function () {
    var FORM_CONTROL_ID = 'test ID';
    describe('control', function () {
        var INITIAL_FORM_CONTROL_VALUE = 'abc';
        var INITIAL_STATE = state_1.createFormControlState(FORM_CONTROL_ID, INITIAL_FORM_CONTROL_VALUE);
        it('should set the correct id', function () {
            expect(INITIAL_STATE.id).toBe(FORM_CONTROL_ID);
        });
        it('should set the correct value', function () {
            expect(INITIAL_STATE.value).toBe(INITIAL_FORM_CONTROL_VALUE);
        });
        it('should mark control as valid', function () {
            expect(INITIAL_STATE.isValid).toBe(true);
            expect(INITIAL_STATE.isInvalid).toBe(false);
        });
        it('should mark control as enabled', function () {
            expect(INITIAL_STATE.isEnabled).toBe(true);
            expect(INITIAL_STATE.isDisabled).toBe(false);
        });
        it('should mark control as unfocused', function () {
            expect(INITIAL_STATE.isFocused).toBe(false);
            expect(INITIAL_STATE.isUnfocused).toBe(true);
        });
        it('should set empty errors', function () {
            expect(INITIAL_STATE.errors).toEqual({});
        });
        it('should mark control as pristine', function () {
            expect(INITIAL_STATE.isPristine).toBe(true);
            expect(INITIAL_STATE.isDirty).toBe(false);
        });
        it('should mark control as untouched', function () {
            expect(INITIAL_STATE.isTouched).toBe(false);
            expect(INITIAL_STATE.isUntouched).toBe(true);
        });
        it('should mark control as unsubmitted', function () {
            expect(INITIAL_STATE.isSubmitted).toBe(false);
            expect(INITIAL_STATE.isUnsubmitted).toBe(true);
        });
        it('should set empty user-defined properties', function () {
            expect(INITIAL_STATE.userDefinedProperties).toEqual({});
        });
    });
    describe('group', function () {
        var CONTROL_VALUE = 'abc';
        var GROUP_VALUE = { control: 'bcd' };
        var ARRAY_VALUE = ['def'];
        var INITIAL_VALUE = { control: CONTROL_VALUE, group: GROUP_VALUE, array: ARRAY_VALUE };
        var INITIAL_STATE = state_1.createFormGroupState(FORM_CONTROL_ID, INITIAL_VALUE);
        it('should set the correct id', function () {
            expect(INITIAL_STATE.id).toBe(FORM_CONTROL_ID);
        });
        it('should set the correct value', function () {
            expect(INITIAL_STATE.value).toBe(INITIAL_VALUE);
        });
        it('should mark control as valid', function () {
            expect(INITIAL_STATE.isValid).toBe(true);
            expect(INITIAL_STATE.isInvalid).toBe(false);
        });
        it('should mark control as enabled', function () {
            expect(INITIAL_STATE.isEnabled).toBe(true);
            expect(INITIAL_STATE.isDisabled).toBe(false);
        });
        it('should set empty errors', function () {
            expect(INITIAL_STATE.errors).toEqual({});
        });
        it('should mark control as pristine', function () {
            expect(INITIAL_STATE.isPristine).toBe(true);
            expect(INITIAL_STATE.isDirty).toBe(false);
        });
        it('should mark control as untouched', function () {
            expect(INITIAL_STATE.isTouched).toBe(false);
            expect(INITIAL_STATE.isUntouched).toBe(true);
        });
        it('should mark control as unsubmitted', function () {
            expect(INITIAL_STATE.isSubmitted).toBe(false);
            expect(INITIAL_STATE.isUnsubmitted).toBe(true);
        });
        it('should set empty user-defined properties', function () {
            expect(INITIAL_STATE.userDefinedProperties).toEqual({});
        });
        it('should create control child', function () {
            expect(INITIAL_STATE.controls.control.value).toEqual(CONTROL_VALUE);
            expect(state_1.cast(INITIAL_STATE.controls.control).isFocused).toBeDefined();
        });
        it('should create group child', function () {
            expect(INITIAL_STATE.controls.group.value).toEqual(GROUP_VALUE);
            var controls = state_1.cast(INITIAL_STATE.controls.group).controls;
            expect(controls).toBeDefined();
            expect(Array.isArray(controls)).toBe(false);
        });
        it('should create array child', function () {
            expect(INITIAL_STATE.controls.array.value).toEqual(ARRAY_VALUE);
            var controls = state_1.cast(INITIAL_STATE.controls.array).controls;
            expect(controls).toBeDefined();
            expect(Array.isArray(controls)).toBe(true);
        });
        it('should produce the same state as is computed after an action is applied', function () {
            var state = state_1.computeGroupState(INITIAL_STATE.id, INITIAL_STATE.controls, INITIAL_STATE.value, INITIAL_STATE.errors, INITIAL_STATE.pendingValidations, INITIAL_STATE.userDefinedProperties);
            expect(state.id).toBe(INITIAL_STATE.id);
            expect(state.value).toEqual(INITIAL_STATE.value);
            expect(state.errors).toEqual(INITIAL_STATE.errors);
            expect(state.pendingValidations).toEqual(INITIAL_STATE.pendingValidations);
            expect(state.isValid).toEqual(INITIAL_STATE.isValid);
            expect(state.isInvalid).toEqual(INITIAL_STATE.isInvalid);
            expect(state.isEnabled).toEqual(INITIAL_STATE.isEnabled);
            expect(state.isDisabled).toEqual(INITIAL_STATE.isDisabled);
            expect(state.isDirty).toEqual(INITIAL_STATE.isDirty);
            expect(state.isPristine).toEqual(INITIAL_STATE.isPristine);
            expect(state.isTouched).toEqual(INITIAL_STATE.isTouched);
            expect(state.isUntouched).toEqual(INITIAL_STATE.isUntouched);
            expect(state.isSubmitted).toEqual(INITIAL_STATE.isSubmitted);
            expect(state.isUnsubmitted).toEqual(INITIAL_STATE.isUnsubmitted);
            expect(state.userDefinedProperties).toEqual(INITIAL_STATE.userDefinedProperties);
        });
        it('should produce the same state as is computed after an action is applied for empty group', function () {
            var initialState = state_1.createFormGroupState(FORM_CONTROL_ID, {});
            var state = state_1.computeGroupState(initialState.id, initialState.controls, initialState.value, initialState.errors, initialState.pendingValidations, initialState.userDefinedProperties);
            expect(state.id).toBe(initialState.id);
            expect(state.value).toEqual(initialState.value);
            expect(state.errors).toEqual(initialState.errors);
            expect(state.pendingValidations).toEqual(initialState.pendingValidations);
            expect(state.isValid).toEqual(initialState.isValid);
            expect(state.isInvalid).toEqual(initialState.isInvalid);
            expect(state.isEnabled).toEqual(initialState.isEnabled);
            expect(state.isDisabled).toEqual(initialState.isDisabled);
            expect(state.isDirty).toEqual(initialState.isDirty);
            expect(state.isPristine).toEqual(initialState.isPristine);
            expect(state.isTouched).toEqual(initialState.isTouched);
            expect(state.isUntouched).toEqual(initialState.isUntouched);
            expect(state.isSubmitted).toEqual(initialState.isSubmitted);
            expect(state.isUnsubmitted).toEqual(initialState.isUnsubmitted);
            expect(state.userDefinedProperties).toEqual(initialState.userDefinedProperties);
        });
    });
    describe('array', function () {
        var INITIAL_VALUE = ['a', 'b'];
        var INITIAL_STATE = state_1.createFormArrayState(FORM_CONTROL_ID, INITIAL_VALUE);
        it('should set the correct id', function () {
            expect(INITIAL_STATE.id).toBe(FORM_CONTROL_ID);
        });
        it('should set the correct value', function () {
            expect(INITIAL_STATE.value).toBe(INITIAL_VALUE);
        });
        it('should set the correct value for empty arrays', function () {
            expect(state_1.createFormArrayState(FORM_CONTROL_ID, []).value).toEqual([]);
        });
        it('should mark control as valid', function () {
            expect(INITIAL_STATE.isValid).toBe(true);
            expect(INITIAL_STATE.isInvalid).toBe(false);
        });
        it('should mark control as enabled', function () {
            expect(INITIAL_STATE.isEnabled).toBe(true);
            expect(INITIAL_STATE.isDisabled).toBe(false);
        });
        it('should set empty errors', function () {
            expect(INITIAL_STATE.errors).toEqual({});
        });
        it('should mark control as pristine', function () {
            expect(INITIAL_STATE.isPristine).toBe(true);
            expect(INITIAL_STATE.isDirty).toBe(false);
        });
        it('should mark control as untouched', function () {
            expect(INITIAL_STATE.isTouched).toBe(false);
            expect(INITIAL_STATE.isUntouched).toBe(true);
        });
        it('should mark control as unsubmitted', function () {
            expect(INITIAL_STATE.isSubmitted).toBe(false);
            expect(INITIAL_STATE.isUnsubmitted).toBe(true);
        });
        it('should set empty user-defined properties', function () {
            expect(INITIAL_STATE.userDefinedProperties).toEqual({});
        });
        it('should create control child', function () {
            expect(INITIAL_STATE.controls[0].value).toEqual(INITIAL_VALUE[0]);
            expect(state_1.cast(INITIAL_STATE.controls[0]).isFocused).toBeDefined();
        });
        it('should create group child', function () {
            var initialValue = [{ control: 'a' }, { control: 'b' }];
            var initialState = state_1.createFormArrayState(FORM_CONTROL_ID, initialValue);
            expect(initialState.controls[0].value).toEqual(initialValue[0]);
            var controls = state_1.cast(initialState.controls[0]).controls;
            expect(controls).toBeDefined();
            expect(Array.isArray(controls)).toBe(false);
        });
        it('should create array child', function () {
            var initialValue = [['a'], ['b']];
            var initialState = state_1.createFormArrayState(FORM_CONTROL_ID, initialValue);
            expect(initialState.controls[0].value).toEqual(initialValue[0]);
            var controls = state_1.cast(initialState.controls[0]).controls;
            expect(controls).toBeDefined();
            expect(Array.isArray(controls)).toBe(true);
        });
        it('should create mixed children', function () {
            var initialValue = [['a'], { control: 'b' }];
            var initialState = state_1.createFormArrayState(FORM_CONTROL_ID, initialValue);
            expect(initialState.controls[0].value).toEqual(initialValue[0]);
            var controls = state_1.cast(initialState.controls[0]).controls;
            expect(controls).toBeDefined();
            expect(Array.isArray(controls)).toBe(true);
            expect(initialState.controls[1].value).toEqual(initialValue[1]);
            var controls2 = state_1.cast(initialState.controls[1]).controls;
            expect(controls2).toBeDefined();
            expect(Array.isArray(controls2)).toBe(false);
        });
        it('should create empty children array for empty value array', function () {
            var initialValue = [];
            var initialState = state_1.createFormArrayState(FORM_CONTROL_ID, initialValue);
            expect(initialState.controls).toEqual([]);
        });
        it('should produce the same state as is computed after an action is applied', function () {
            var state = state_1.computeArrayState(INITIAL_STATE.id, INITIAL_STATE.controls, INITIAL_STATE.value, INITIAL_STATE.errors, INITIAL_STATE.pendingValidations, INITIAL_STATE.userDefinedProperties);
            expect(state.id).toBe(INITIAL_STATE.id);
            expect(state.value).toEqual(INITIAL_STATE.value);
            expect(state.errors).toEqual(INITIAL_STATE.errors);
            expect(state.pendingValidations).toEqual(INITIAL_STATE.pendingValidations);
            expect(state.isValid).toEqual(INITIAL_STATE.isValid);
            expect(state.isInvalid).toEqual(INITIAL_STATE.isInvalid);
            expect(state.isEnabled).toEqual(INITIAL_STATE.isEnabled);
            expect(state.isDisabled).toEqual(INITIAL_STATE.isDisabled);
            expect(state.isDirty).toEqual(INITIAL_STATE.isDirty);
            expect(state.isPristine).toEqual(INITIAL_STATE.isPristine);
            expect(state.isTouched).toEqual(INITIAL_STATE.isTouched);
            expect(state.isUntouched).toEqual(INITIAL_STATE.isUntouched);
            expect(state.isSubmitted).toEqual(INITIAL_STATE.isSubmitted);
            expect(state.isUnsubmitted).toEqual(INITIAL_STATE.isUnsubmitted);
            expect(state.userDefinedProperties).toEqual(INITIAL_STATE.userDefinedProperties);
        });
        it('should produce the same state as is computed after an action is applied for empty array', function () {
            var initialState = state_1.createFormArrayState(FORM_CONTROL_ID, []);
            var state = state_1.computeArrayState(initialState.id, initialState.controls, initialState.value, initialState.errors, initialState.pendingValidations, initialState.userDefinedProperties);
            expect(state.id).toBe(initialState.id);
            expect(state.value).toEqual(initialState.value);
            expect(state.errors).toEqual(initialState.errors);
            expect(state.pendingValidations).toEqual(initialState.pendingValidations);
            expect(state.isValid).toEqual(initialState.isValid);
            expect(state.isInvalid).toEqual(initialState.isInvalid);
            expect(state.isEnabled).toEqual(initialState.isEnabled);
            expect(state.isDisabled).toEqual(initialState.isDisabled);
            expect(state.isDirty).toEqual(initialState.isDirty);
            expect(state.isPristine).toEqual(initialState.isPristine);
            expect(state.isTouched).toEqual(initialState.isTouched);
            expect(state.isUntouched).toEqual(initialState.isUntouched);
            expect(state.isSubmitted).toEqual(initialState.isSubmitted);
            expect(state.isUnsubmitted).toEqual(initialState.isUnsubmitted);
            expect(state.userDefinedProperties).toEqual(initialState.userDefinedProperties);
        });
    });
    describe(state_1.isArrayState.name, function () {
        it('should return true for array state', function () {
            var INITIAL_STATE = state_1.createFormArrayState(FORM_CONTROL_ID, ['abc']);
            expect(state_1.isArrayState(INITIAL_STATE)).toBe(true);
        });
        it('should return false for group state', function () {
            var INITIAL_STATE = state_1.createFormGroupState(FORM_CONTROL_ID, { control: 'abc' });
            expect(state_1.isArrayState(INITIAL_STATE)).toBe(false);
        });
        it('should return false for control state', function () {
            var INITIAL_STATE = state_1.createFormControlState(FORM_CONTROL_ID, 'abc');
            expect(state_1.isArrayState(INITIAL_STATE)).toBe(false);
        });
        it('should return false for update object', function () {
            expect(state_1.isArrayState({ controls: function () { return void 0; } })).toBe(false);
        });
    });
    describe(state_1.isGroupState.name, function () {
        it('should return true for group state', function () {
            var INITIAL_STATE = state_1.createFormGroupState(FORM_CONTROL_ID, { control: 'abc' });
            expect(state_1.isGroupState(INITIAL_STATE)).toBe(true);
        });
        it('should return false for control state', function () {
            var INITIAL_STATE = state_1.createFormControlState(FORM_CONTROL_ID, 'abc');
            expect(state_1.isGroupState(INITIAL_STATE)).toBe(false);
        });
        it('should return false for array state', function () {
            var INITIAL_STATE = state_1.createFormArrayState(FORM_CONTROL_ID, ['abc']);
            expect(state_1.isGroupState(INITIAL_STATE)).toBe(false);
        });
        it('should return false for update object', function () {
            expect(state_1.isGroupState({ controls: function () { return void 0; } })).toBe(false);
        });
    });
    describe(state_1.computeArrayState.name, function () {
        var VALUE = ['a', 'b'];
        var CONTROL_1 = state_1.createFormControlState(test_util_1.FORM_CONTROL_0_ID, VALUE[0]);
        var CONTROL_2 = state_1.createFormControlState(test_util_1.FORM_CONTROL_1_ID, VALUE[1]);
        var CONTROLS = [CONTROL_1, CONTROL_2];
        it('should aggregate child values', function () {
            var state = state_1.computeArrayState(FORM_CONTROL_ID, CONTROLS, [], {}, [], {});
            expect(state.value).toEqual(VALUE);
        });
        it('should aggregate child errors', function () {
            var childError = { required: true };
            var controlWithError = __assign({}, CONTROL_1, { errors: childError, isValid: false, isInvalid: true });
            var state = state_1.computeArrayState(FORM_CONTROL_ID, [controlWithError, CONTROL_2], [], {}, [], {});
            expect(state.errors).toEqual({ _0: childError });
        });
        it('should merge own errors with child errors', function () {
            var childError = { required: true };
            var ownError = { max: true };
            var controlWithError = __assign({}, CONTROL_1, { errors: childError, isValid: false, isInvalid: true });
            var state = state_1.computeArrayState(FORM_CONTROL_ID, [controlWithError, CONTROL_2], [], ownError, [], {});
            expect(state.errors).toEqual(__assign({ _0: childError }, ownError));
        });
        it('should mark as valid if there are no errors', function () {
            var state = state_1.computeArrayState(FORM_CONTROL_ID, CONTROLS, [], {}, [], {});
            expect(state.isValid).toEqual(true);
            expect(state.isInvalid).toEqual(false);
        });
        it('should mark as invalid if there are errors', function () {
            var errors = { max: true };
            var state = state_1.computeArrayState(FORM_CONTROL_ID, CONTROLS, [], errors, [], {});
            expect(state.isValid).toEqual(false);
            expect(state.isInvalid).toEqual(true);
        });
        it('should mark as pristine if no child is dirty', function () {
            var state = state_1.computeArrayState(FORM_CONTROL_ID, CONTROLS, [], {}, [], {});
            expect(state.isDirty).toEqual(false);
            expect(state.isPristine).toEqual(true);
        });
        it('should mark as dirty if some child is dirty', function () {
            var dirtyControl = __assign({}, CONTROL_1, { isDirty: true, isPristine: false });
            var state = state_1.computeArrayState(FORM_CONTROL_ID, [dirtyControl, CONTROL_2], [], {}, [], {});
            expect(state.isDirty).toEqual(true);
            expect(state.isPristine).toEqual(false);
        });
        it('should mark as pristine if array is empty', function () {
            var state = state_1.computeArrayState(FORM_CONTROL_ID, [], [], {}, [], {});
            expect(state.isDirty).toBe(false);
            expect(state.isPristine).toBe(true);
        });
        it('should mark as enabled if some child is enabled', function () {
            var disabledControl = __assign({}, CONTROL_1, { isEnabled: false, isDisabled: true });
            var state = state_1.computeArrayState(FORM_CONTROL_ID, [disabledControl, CONTROL_2], [], {}, [], {});
            expect(state.isEnabled).toEqual(true);
            expect(state.isDisabled).toEqual(false);
        });
        it('should mark as disabled if all children are disabled', function () {
            var disabledControl1 = __assign({}, CONTROL_1, { isEnabled: false, isDisabled: true });
            var disabledControl2 = __assign({}, CONTROL_1, { isEnabled: false, isDisabled: true });
            var state = state_1.computeArrayState(FORM_CONTROL_ID, [disabledControl1, disabledControl2], [], {}, [], {});
            expect(state.isEnabled).toEqual(false);
            expect(state.isDisabled).toEqual(true);
        });
        it('should mark as enabled if array is empty', function () {
            var state = state_1.computeArrayState(FORM_CONTROL_ID, [], [], {}, [], {});
            expect(state.isEnabled).toBe(true);
            expect(state.isDisabled).toBe(false);
        });
        it('should mark as untouched if no child is touched', function () {
            var state = state_1.computeArrayState(FORM_CONTROL_ID, CONTROLS, [], {}, [], {});
            expect(state.isTouched).toEqual(false);
            expect(state.isUntouched).toEqual(true);
        });
        it('should mark as touched if some child is touched', function () {
            var touchedControl = __assign({}, CONTROL_1, { isTouched: true, isUntouched: false });
            var state = state_1.computeArrayState(FORM_CONTROL_ID, [touchedControl, CONTROL_2], [], {}, [], {});
            expect(state.isTouched).toEqual(true);
            expect(state.isUntouched).toEqual(false);
        });
        it('should mark as untouched if array is empty', function () {
            var state = state_1.computeArrayState(FORM_CONTROL_ID, [], [], {}, [], {});
            expect(state.isTouched).toEqual(false);
            expect(state.isUntouched).toBe(true);
        });
        it('should mark as unsubmitted if no child is submitted', function () {
            var state = state_1.computeArrayState(FORM_CONTROL_ID, CONTROLS, [], {}, [], {});
            expect(state.isSubmitted).toEqual(false);
            expect(state.isUnsubmitted).toEqual(true);
        });
        it('should mark as submitted if some child is submitted', function () {
            var submittedControl = __assign({}, CONTROL_1, { isSubmitted: true, isUnsubmitted: false });
            var state = state_1.computeArrayState(FORM_CONTROL_ID, [submittedControl, CONTROL_2], [], {}, [], {});
            expect(state.isSubmitted).toEqual(true);
            expect(state.isUnsubmitted).toEqual(false);
        });
        it('should mark as unsubmitted if array is empty', function () {
            var state = state_1.computeArrayState(FORM_CONTROL_ID, [], [], {}, [], {});
            expect(state.isUnsubmitted).toBe(true);
        });
        it('should mark as validation pending if child has pending validations', function () {
            var validationPendingControl = __assign({}, CONTROL_1, { pendingValidations: ['test'], isValidationPending: true });
            var state = state_1.computeArrayState(FORM_CONTROL_ID, [validationPendingControl, CONTROL_2], [], {}, [], {});
            expect(state.isValidationPending).toEqual(true);
        });
        it('should mark as validation pending if array has pending validations', function () {
            var state = state_1.computeArrayState(FORM_CONTROL_ID, CONTROLS, [], {}, ['test'], {});
            expect(state.isValidationPending).toEqual(true);
        });
        it('should mark as no validation pending if no validations are pending', function () {
            var state = state_1.computeArrayState(FORM_CONTROL_ID, CONTROLS, [], {}, [], {});
            expect(state.isValidationPending).toEqual(false);
        });
    });
    describe(state_1.computeGroupState.name, function () {
        var VALUE = { inner1: 'a', inner2: 'b' };
        var CONTROL_1 = state_1.createFormControlState(test_util_2.FORM_CONTROL_INNER_ID, VALUE.inner1);
        var CONTROL_2 = state_1.createFormControlState(test_util_2.FORM_CONTROL_INNER2_ID, VALUE.inner2);
        var CONTROLS = { inner1: CONTROL_1, inner2: CONTROL_2 };
        it('should aggregate child values', function () {
            var state = state_1.computeGroupState(FORM_CONTROL_ID, CONTROLS, { inner1: '', inner2: '' }, {}, [], {});
            expect(state.value).toEqual(VALUE);
        });
        it('should aggregate child errors', function () {
            var childError = { required: true };
            var controlWithError = __assign({}, CONTROL_1, { errors: childError, isValid: false, isInvalid: true });
            var state = state_1.computeGroupState(FORM_CONTROL_ID, { inner1: controlWithError, inner2: CONTROL_2 }, VALUE, {}, [], {});
            expect(state.errors).toEqual({ _inner1: childError });
        });
        it('should merge own errors with child errors', function () {
            var childError = { required: true };
            var ownError = { max: true };
            var controlWithError = __assign({}, CONTROL_1, { errors: childError, isValid: false, isInvalid: true });
            var state = state_1.computeGroupState(FORM_CONTROL_ID, { inner1: controlWithError, inner2: CONTROL_2 }, VALUE, ownError, [], {});
            expect(state.errors).toEqual(__assign({ _inner1: childError }, ownError));
        });
        it('should mark as valid if there are no errors', function () {
            var state = state_1.computeGroupState(FORM_CONTROL_ID, CONTROLS, VALUE, {}, [], {});
            expect(state.isValid).toEqual(true);
            expect(state.isInvalid).toEqual(false);
        });
        it('should mark as invalid if there are errors', function () {
            var errors = { max: true };
            var state = state_1.computeGroupState(FORM_CONTROL_ID, CONTROLS, VALUE, errors, [], {});
            expect(state.isValid).toEqual(false);
            expect(state.isInvalid).toEqual(true);
        });
        it('should mark as pristine if no child is dirty', function () {
            var state = state_1.computeGroupState(FORM_CONTROL_ID, CONTROLS, VALUE, {}, [], {});
            expect(state.isDirty).toEqual(false);
            expect(state.isPristine).toEqual(true);
        });
        it('should mark as dirty if some child is dirty', function () {
            var dirtyControl = __assign({}, CONTROL_1, { isDirty: true, isPristine: false });
            var state = state_1.computeGroupState(FORM_CONTROL_ID, { inner1: dirtyControl, inner2: CONTROL_2 }, VALUE, {}, [], {});
            expect(state.isDirty).toEqual(true);
            expect(state.isPristine).toEqual(false);
        });
        it('should mark as pristine if group is empty', function () {
            var state = state_1.computeGroupState(FORM_CONTROL_ID, {}, {}, {}, [], {});
            expect(state.isDirty).toBe(false);
            expect(state.isPristine).toBe(true);
        });
        it('should mark as enabled if some child is enabled', function () {
            var disabledControl = __assign({}, CONTROL_1, { isEnabled: false, isDisabled: true });
            var state = state_1.computeGroupState(FORM_CONTROL_ID, { inner1: disabledControl, inner2: CONTROL_2 }, VALUE, {}, [], {});
            expect(state.isEnabled).toEqual(true);
            expect(state.isDisabled).toEqual(false);
        });
        it('should mark as disabled if all children are disabled', function () {
            var disabledControl1 = __assign({}, CONTROL_1, { isEnabled: false, isDisabled: true });
            var disabledControl2 = __assign({}, CONTROL_1, { isEnabled: false, isDisabled: true });
            var state = state_1.computeGroupState(FORM_CONTROL_ID, { inner1: disabledControl1, inner2: disabledControl2 }, VALUE, {}, [], {});
            expect(state.isEnabled).toEqual(false);
            expect(state.isDisabled).toEqual(true);
        });
        it('should mark as enabled if group is empty', function () {
            var state = state_1.computeGroupState(FORM_CONTROL_ID, {}, {}, {}, [], {});
            expect(state.isEnabled).toBe(true);
            expect(state.isDisabled).toBe(false);
        });
        it('should mark as untouched if no child is touched', function () {
            var state = state_1.computeGroupState(FORM_CONTROL_ID, CONTROLS, VALUE, {}, [], {});
            expect(state.isTouched).toEqual(false);
            expect(state.isUntouched).toEqual(true);
        });
        it('should mark as touched if some child is touched', function () {
            var touchedControl = __assign({}, CONTROL_1, { isTouched: true, isUntouched: false });
            var state = state_1.computeGroupState(FORM_CONTROL_ID, { inner1: touchedControl, inner2: CONTROL_2 }, VALUE, {}, [], {});
            expect(state.isTouched).toEqual(true);
            expect(state.isUntouched).toEqual(false);
        });
        it('should mark as untouched if group is empty', function () {
            var state = state_1.computeGroupState(FORM_CONTROL_ID, {}, {}, {}, [], {});
            expect(state.isTouched).toEqual(false);
            expect(state.isUntouched).toBe(true);
        });
        it('should mark as unsubmitted if no child is submitted', function () {
            var state = state_1.computeGroupState(FORM_CONTROL_ID, CONTROLS, VALUE, {}, [], {});
            expect(state.isSubmitted).toEqual(false);
            expect(state.isUnsubmitted).toEqual(true);
        });
        it('should mark as submitted if some child is submitted', function () {
            var submittedControl = __assign({}, CONTROL_1, { isSubmitted: true, isUnsubmitted: false });
            var state = state_1.computeGroupState(FORM_CONTROL_ID, { inner1: submittedControl, inner2: CONTROL_2 }, VALUE, {}, [], {});
            expect(state.isSubmitted).toEqual(true);
            expect(state.isUnsubmitted).toEqual(false);
        });
        it('should mark as unsubmitted if group is empty', function () {
            var state = state_1.computeGroupState(FORM_CONTROL_ID, {}, {}, {}, [], {});
            expect(state.isUnsubmitted).toBe(true);
        });
        it('should mark as validation pending if child has pending validations', function () {
            var validationPendingControl = __assign({}, CONTROL_1, { pendingValidations: ['test'], isValidationPending: true });
            var state = state_1.computeGroupState(FORM_CONTROL_ID, { inner1: validationPendingControl, inner2: CONTROL_2 }, VALUE, {}, [], {});
            expect(state.isValidationPending).toEqual(true);
        });
        it('should mark as validation pending if group has pending validations', function () {
            var state = state_1.computeGroupState(FORM_CONTROL_ID, CONTROLS, VALUE, {}, ['test'], {});
            expect(state.isValidationPending).toEqual(true);
        });
        it('should mark as no validation pending if no validations are pending', function () {
            var state = state_1.computeGroupState(FORM_CONTROL_ID, CONTROLS, VALUE, {}, [], {});
            expect(state.isValidationPending).toEqual(false);
        });
    });
});
//# sourceMappingURL=state.spec.js.map