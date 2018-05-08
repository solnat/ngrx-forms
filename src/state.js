"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
/**
 * This function determines if a form state is an array state.
 */
function isArrayState(state) {
    var controls = state.controls;
    return state.hasOwnProperty('controls') && Array.isArray(controls) && typeof controls !== 'function';
}
exports.isArrayState = isArrayState;
/**
 * This function determines if a form state is a group state.
 */
function isGroupState(state) {
    var controls = state.controls;
    return state.hasOwnProperty('controls') && !Array.isArray(controls) && typeof controls !== 'function';
}
exports.isGroupState = isGroupState;
/**
 * This utility function allows the compiler to correctly infer
 * the type of a form state. It can be used in places where a
 * sub-type of `AbstractControlState` is expected.
 */
function cast(state) {
    return state;
}
exports.cast = cast;
function createChildState(id, childValue) {
    if (childValue !== null && Array.isArray(childValue)) {
        return createFormArrayState(id, childValue);
    }
    if (childValue !== null && typeof childValue === 'object') {
        return createFormGroupState(id, childValue);
    }
    return createFormControlState(id, childValue);
}
exports.createChildState = createChildState;
/**
 * This function creates a form control state with an ID and a value.
 */
function createFormControlState(id, value) {
    return {
        id: id,
        value: value,
        errors: {},
        pendingValidations: [],
        isValidationPending: false,
        isValid: true,
        isInvalid: false,
        isEnabled: true,
        isDisabled: false,
        isDirty: false,
        isPristine: true,
        isTouched: false,
        isUntouched: true,
        isSubmitted: false,
        isUnsubmitted: true,
        isFocused: false,
        isUnfocused: true,
        userDefinedProperties: {},
    };
}
exports.createFormControlState = createFormControlState;
function getFormGroupValue(controls, originalValue) {
    var hasChanged = Object.keys(originalValue).length !== Object.keys(controls).length;
    var newValue = Object.keys(controls).reduce(function (res, key) {
        hasChanged = hasChanged || originalValue[key] !== controls[key].value;
        res[key] = controls[key].value;
        return res;
    }, {});
    return hasChanged ? newValue : originalValue;
}
exports.getFormGroupValue = getFormGroupValue;
function getFormGroupErrors(controls, originalErrors) {
    var hasChanged = false;
    var groupErrors = Object.keys(originalErrors)
        .filter(function (key) { return !key.startsWith('_'); })
        .reduce(function (res, key) {
        return Object.assign(res, (_a = {}, _a[key] = originalErrors[key], _a));
        var _a;
    }, {});
    var newErrors = Object.keys(controls).reduce(function (res, key) {
        var controlErrors = controls[key].errors;
        if (!util_1.isEmpty(controlErrors)) {
            hasChanged = hasChanged || originalErrors['_' + key] !== controlErrors;
            res['_' + key] = controls[key].errors;
        }
        else {
            hasChanged = hasChanged || originalErrors.hasOwnProperty('_' + key);
        }
        return res;
    }, groupErrors);
    hasChanged = hasChanged || Object.keys(originalErrors).length !== Object.keys(newErrors).length;
    return hasChanged ? newErrors : originalErrors;
}
exports.getFormGroupErrors = getFormGroupErrors;
function computeGroupState(id, controls, value, errors, pendingValidations, userDefinedProperties) {
    value = getFormGroupValue(controls, value);
    errors = getFormGroupErrors(controls, errors);
    var isValid = util_1.isEmpty(errors);
    var isDirty = Object.keys(controls).some(function (key) { return controls[key].isDirty; });
    var isEnabled = Object.keys(controls).length === 0 || Object.keys(controls).some(function (key) { return controls[key].isEnabled; });
    var isTouched = Object.keys(controls).some(function (key) { return controls[key].isTouched; });
    var isSubmitted = Object.keys(controls).some(function (key) { return controls[key].isSubmitted; });
    var isValidationPending = pendingValidations.length > 0 || Object.keys(controls).some(function (key) { return controls[key].isValidationPending; });
    return {
        id: id,
        value: value,
        errors: errors,
        pendingValidations: pendingValidations,
        isValidationPending: isValidationPending,
        isValid: isValid,
        isInvalid: !isValid,
        isEnabled: isEnabled,
        isDisabled: !isEnabled,
        isDirty: isDirty,
        isPristine: !isDirty,
        isTouched: isTouched,
        isUntouched: !isTouched,
        isSubmitted: isSubmitted,
        isUnsubmitted: !isSubmitted,
        userDefinedProperties: userDefinedProperties,
        controls: controls,
    };
}
exports.computeGroupState = computeGroupState;
/**
 * This function creates a form group state with an ID and a value.
 * From the value the shape of the group state is inferred, i.e.
 * object properties are inferred as form groups, array properties
 * are inferred as form arrays, and primitive properties are inferred
 * as form controls.
 */
function createFormGroupState(id, initialValue) {
    var controls = Object.keys(initialValue)
        .map(function (key) { return [key, createChildState(id + "." + key, initialValue[key])]; })
        .reduce(function (res, _a) {
        var controlId = _a[0], state = _a[1];
        return Object.assign(res, (_b = {}, _b[controlId] = state, _b));
        var _b;
    }, {});
    return computeGroupState(id, controls, initialValue, {}, [], {});
}
exports.createFormGroupState = createFormGroupState;
function getFormArrayValue(controls, originalValue) {
    var hasChanged = Object.keys(originalValue).length !== Object.keys(controls).length;
    var newValue = controls.map(function (state, i) {
        hasChanged = hasChanged || originalValue[i] !== state.value;
        return state.value;
    });
    return hasChanged ? newValue : originalValue;
}
exports.getFormArrayValue = getFormArrayValue;
function getFormArrayErrors(controls, originalErrors) {
    var hasChanged = false;
    var groupErrors = Object.keys(originalErrors)
        .filter(function (key) { return !key.startsWith('_'); })
        .reduce(function (res, key) {
        return Object.assign(res, (_a = {}, _a[key] = originalErrors[key], _a));
        var _a;
    }, {});
    var newErrors = controls.reduce(function (res, state, i) {
        var controlErrors = state.errors;
        if (!util_1.isEmpty(controlErrors)) {
            hasChanged = hasChanged || originalErrors['_' + i] !== controlErrors;
            res['_' + i] = controlErrors;
        }
        else {
            hasChanged = hasChanged || originalErrors.hasOwnProperty('_' + i);
        }
        return res;
    }, groupErrors);
    hasChanged = hasChanged || Object.keys(originalErrors).length !== Object.keys(newErrors).length;
    return hasChanged ? newErrors : originalErrors;
}
exports.getFormArrayErrors = getFormArrayErrors;
function computeArrayState(id, controls, value, errors, pendingValidations, userDefinedProperties) {
    value = getFormArrayValue(controls, value);
    errors = getFormArrayErrors(controls, errors);
    var isValid = util_1.isEmpty(errors);
    var isDirty = controls.some(function (state) { return state.isDirty; });
    var isEnabled = controls.length === 0 || controls.some(function (state) { return state.isEnabled; });
    var isTouched = controls.some(function (state) { return state.isTouched; });
    var isSubmitted = controls.some(function (state) { return state.isSubmitted; });
    var isValidationPending = pendingValidations.length > 0 || controls.some(function (state) { return state.isValidationPending; });
    return {
        id: id,
        value: value,
        errors: errors,
        pendingValidations: pendingValidations,
        isValidationPending: isValidationPending,
        isValid: isValid,
        isInvalid: !isValid,
        isEnabled: isEnabled,
        isDisabled: !isEnabled,
        isDirty: isDirty,
        isPristine: !isDirty,
        isTouched: isTouched,
        isUntouched: !isTouched,
        isSubmitted: isSubmitted,
        isUnsubmitted: !isSubmitted,
        userDefinedProperties: userDefinedProperties,
        controls: controls,
    };
}
exports.computeArrayState = computeArrayState;
/**
 * This function creates a form array state with an ID and a value.
 * From the value the shape of the array state is inferred, i.e.
 * object values are inferred as form groups, array values
 * are inferred as form arrays, and primitive values are inferred
 * as form controls.
 */
function createFormArrayState(id, initialValue) {
    var controls = initialValue
        .map(function (value, i) { return createChildState(id + "." + i, value); });
    return computeArrayState(id, controls, initialValue, {}, [], {});
}
exports.createFormArrayState = createFormArrayState;
//# sourceMappingURL=state.js.map