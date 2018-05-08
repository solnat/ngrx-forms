"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SetValueAction = (function () {
    function SetValueAction(controlId, value) {
        this.type = SetValueAction.TYPE;
        this.controlId = controlId;
        this.payload = { value: value };
    }
    return SetValueAction;
}());
SetValueAction.TYPE = 'ngrx/forms/SET_VALUE';
exports.SetValueAction = SetValueAction;
var SetErrorsAction = (function () {
    function SetErrorsAction(controlId, errors) {
        this.type = SetErrorsAction.TYPE;
        this.controlId = controlId;
        this.payload = {
            errors: errors,
        };
    }
    return SetErrorsAction;
}());
SetErrorsAction.TYPE = 'ngrx/forms/SET_ERRORS';
exports.SetErrorsAction = SetErrorsAction;
var SetAsyncErrorAction = (function () {
    function SetAsyncErrorAction(controlId, name, value) {
        this.type = SetAsyncErrorAction.TYPE;
        this.controlId = controlId;
        this.payload = {
            name: name,
            value: value,
        };
    }
    return SetAsyncErrorAction;
}());
SetAsyncErrorAction.TYPE = 'ngrx/forms/SET_ASYNC_ERROR';
exports.SetAsyncErrorAction = SetAsyncErrorAction;
var ClearAsyncErrorAction = (function () {
    function ClearAsyncErrorAction(controlId, name) {
        this.type = ClearAsyncErrorAction.TYPE;
        this.controlId = controlId;
        this.payload = {
            name: name,
        };
    }
    return ClearAsyncErrorAction;
}());
ClearAsyncErrorAction.TYPE = 'ngrx/forms/CLEAR_ASYNC_ERROR';
exports.ClearAsyncErrorAction = ClearAsyncErrorAction;
var StartAsyncValidationAction = (function () {
    function StartAsyncValidationAction(controlId, name) {
        this.type = StartAsyncValidationAction.TYPE;
        this.controlId = controlId;
        this.payload = {
            name: name,
        };
    }
    return StartAsyncValidationAction;
}());
StartAsyncValidationAction.TYPE = 'ngrx/forms/START_ASYNC_VALIDATION';
exports.StartAsyncValidationAction = StartAsyncValidationAction;
var MarkAsDirtyAction = (function () {
    function MarkAsDirtyAction(controlId) {
        this.type = MarkAsDirtyAction.TYPE;
        this.controlId = controlId;
    }
    return MarkAsDirtyAction;
}());
MarkAsDirtyAction.TYPE = 'ngrx/forms/MARK_AS_DIRTY';
exports.MarkAsDirtyAction = MarkAsDirtyAction;
var MarkAsPristineAction = (function () {
    function MarkAsPristineAction(controlId) {
        this.type = MarkAsPristineAction.TYPE;
        this.controlId = controlId;
    }
    return MarkAsPristineAction;
}());
MarkAsPristineAction.TYPE = 'ngrx/forms/MARK_AS_PRISTINE';
exports.MarkAsPristineAction = MarkAsPristineAction;
var EnableAction = (function () {
    function EnableAction(controlId) {
        this.type = EnableAction.TYPE;
        this.controlId = controlId;
    }
    return EnableAction;
}());
EnableAction.TYPE = 'ngrx/forms/ENABLE';
exports.EnableAction = EnableAction;
var DisableAction = (function () {
    function DisableAction(controlId) {
        this.type = DisableAction.TYPE;
        this.controlId = controlId;
    }
    return DisableAction;
}());
DisableAction.TYPE = 'ngrx/forms/DISABLE';
exports.DisableAction = DisableAction;
var MarkAsTouchedAction = (function () {
    function MarkAsTouchedAction(controlId) {
        this.type = MarkAsTouchedAction.TYPE;
        this.controlId = controlId;
    }
    return MarkAsTouchedAction;
}());
MarkAsTouchedAction.TYPE = 'ngrx/forms/MARK_AS_TOUCHED';
exports.MarkAsTouchedAction = MarkAsTouchedAction;
var MarkAsUntouchedAction = (function () {
    function MarkAsUntouchedAction(controlId) {
        this.type = MarkAsUntouchedAction.TYPE;
        this.controlId = controlId;
    }
    return MarkAsUntouchedAction;
}());
MarkAsUntouchedAction.TYPE = 'ngrx/forms/MARK_AS_UNTOUCHED';
exports.MarkAsUntouchedAction = MarkAsUntouchedAction;
var FocusAction = (function () {
    function FocusAction(controlId) {
        this.type = FocusAction.TYPE;
        this.controlId = controlId;
    }
    return FocusAction;
}());
FocusAction.TYPE = 'ngrx/forms/FOCUS';
exports.FocusAction = FocusAction;
var UnfocusAction = (function () {
    function UnfocusAction(controlId) {
        this.type = UnfocusAction.TYPE;
        this.controlId = controlId;
    }
    return UnfocusAction;
}());
UnfocusAction.TYPE = 'ngrx/forms/UNFOCUS';
exports.UnfocusAction = UnfocusAction;
var MarkAsSubmittedAction = (function () {
    function MarkAsSubmittedAction(controlId) {
        this.type = MarkAsSubmittedAction.TYPE;
        this.controlId = controlId;
    }
    return MarkAsSubmittedAction;
}());
MarkAsSubmittedAction.TYPE = 'ngrx/forms/MARK_AS_SUBMITTED';
exports.MarkAsSubmittedAction = MarkAsSubmittedAction;
var MarkAsUnsubmittedAction = (function () {
    function MarkAsUnsubmittedAction(controlId) {
        this.type = MarkAsUnsubmittedAction.TYPE;
        this.controlId = controlId;
    }
    return MarkAsUnsubmittedAction;
}());
MarkAsUnsubmittedAction.TYPE = 'ngrx/forms/MARK_AS_UNSUBMITTED';
exports.MarkAsUnsubmittedAction = MarkAsUnsubmittedAction;
var AddArrayControlAction = (function () {
    function AddArrayControlAction(controlId, value, index) {
        if (index === void 0) { index = null; }
        this.type = AddArrayControlAction.TYPE;
        this.controlId = controlId;
        this.payload = { index: index, value: value };
    }
    return AddArrayControlAction;
}());
AddArrayControlAction.TYPE = 'ngrx/forms/ADD_ARRAY_CONTROL';
exports.AddArrayControlAction = AddArrayControlAction;
var AddGroupControlAction = (function () {
    function AddGroupControlAction(controlId, name, value) {
        this.type = AddGroupControlAction.TYPE;
        this.controlId = controlId;
        this.payload = { name: name, value: value };
    }
    return AddGroupControlAction;
}());
AddGroupControlAction.TYPE = 'ngrx/forms/ADD_GROUP_CONTROL';
exports.AddGroupControlAction = AddGroupControlAction;
var RemoveArrayControlAction = (function () {
    function RemoveArrayControlAction(controlId, index) {
        this.type = RemoveArrayControlAction.TYPE;
        this.controlId = controlId;
        this.payload = { index: index };
    }
    return RemoveArrayControlAction;
}());
RemoveArrayControlAction.TYPE = 'ngrx/forms/REMOVE_ARRAY_CONTROL';
exports.RemoveArrayControlAction = RemoveArrayControlAction;
var RemoveGroupControlAction = (function () {
    function RemoveGroupControlAction(controlId, name) {
        this.type = RemoveGroupControlAction.TYPE;
        this.controlId = controlId;
        this.payload = { name: name };
    }
    return RemoveGroupControlAction;
}());
RemoveGroupControlAction.TYPE = 'ngrx/forms/REMOVE_CONTROL';
exports.RemoveGroupControlAction = RemoveGroupControlAction;
var SetUserDefinedPropertyAction = (function () {
    function SetUserDefinedPropertyAction(controlId, name, value) {
        this.type = SetUserDefinedPropertyAction.TYPE;
        this.controlId = controlId;
        this.payload = { name: name, value: value };
    }
    return SetUserDefinedPropertyAction;
}());
SetUserDefinedPropertyAction.TYPE = 'ngrx/forms/SET_USER_DEFINED_PROPERTY';
exports.SetUserDefinedPropertyAction = SetUserDefinedPropertyAction;
var ResetAction = (function () {
    function ResetAction(controlId) {
        this.type = ResetAction.TYPE;
        this.controlId = controlId;
    }
    return ResetAction;
}());
ResetAction.TYPE = 'ngrx/forms/RESET';
exports.ResetAction = ResetAction;
function isNgrxFormsAction(action) {
    return !!action.type && action.type.startsWith('ngrx/forms/');
}
exports.isNgrxFormsAction = isNgrxFormsAction;
//# sourceMappingURL=actions.js.map