"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../actions");
var state_1 = require("../state");
var add_control_1 = require("./reducer/add-control");
var clear_async_error_1 = require("./reducer/clear-async-error");
var disable_1 = require("./reducer/disable");
var enable_1 = require("./reducer/enable");
var mark_as_dirty_1 = require("./reducer/mark-as-dirty");
var mark_as_pristine_1 = require("./reducer/mark-as-pristine");
var mark_as_submitted_1 = require("./reducer/mark-as-submitted");
var mark_as_touched_1 = require("./reducer/mark-as-touched");
var mark_as_unsubmitted_1 = require("./reducer/mark-as-unsubmitted");
var mark_as_untouched_1 = require("./reducer/mark-as-untouched");
var remove_control_1 = require("./reducer/remove-control");
var reset_1 = require("./reducer/reset");
var set_async_error_1 = require("./reducer/set-async-error");
var set_errors_1 = require("./reducer/set-errors");
var set_user_defined_property_1 = require("./reducer/set-user-defined-property");
var set_value_1 = require("./reducer/set-value");
var start_async_validation_1 = require("./reducer/start-async-validation");
var util_1 = require("./reducer/util");
function formArrayReducerInternal(state, action) {
    if (!state_1.isArrayState(state)) {
        throw new Error('State must be array state');
    }
    if (!actions_1.isNgrxFormsAction(action)) {
        return state;
    }
    if (!action.controlId.startsWith(state.id)) {
        return state;
    }
    switch (action.type) {
        case actions_1.FocusAction.TYPE:
        case actions_1.UnfocusAction.TYPE:
        case actions_1.AddGroupControlAction.TYPE:
        case actions_1.RemoveGroupControlAction.TYPE:
            return util_1.childReducer(state, action);
    }
    state = set_value_1.setValueReducer(state, action);
    state = set_errors_1.setErrorsReducer(state, action);
    state = start_async_validation_1.startAsyncValidationReducer(state, action);
    state = set_async_error_1.setAsyncErrorReducer(state, action);
    state = clear_async_error_1.clearAsyncErrorReducer(state, action);
    state = enable_1.enableReducer(state, action);
    state = disable_1.disableReducer(state, action);
    state = mark_as_dirty_1.markAsDirtyReducer(state, action);
    state = mark_as_pristine_1.markAsPristineReducer(state, action);
    state = mark_as_touched_1.markAsTouchedReducer(state, action);
    state = mark_as_untouched_1.markAsUntouchedReducer(state, action);
    state = mark_as_submitted_1.markAsSubmittedReducer(state, action);
    state = mark_as_unsubmitted_1.markAsUnsubmittedReducer(state, action);
    state = set_user_defined_property_1.setUserDefinedPropertyReducer(state, action);
    state = reset_1.resetReducer(state, action);
    state = add_control_1.addControlReducer(state, action);
    state = remove_control_1.removeControlReducer(state, action);
    return state;
}
exports.formArrayReducerInternal = formArrayReducerInternal;
/**
 * This reducer function updates a form array state with actions.
 */
function formArrayReducer(state, action) {
    return formArrayReducerInternal(state, action);
}
exports.formArrayReducer = formArrayReducer;
//# sourceMappingURL=reducer.js.map