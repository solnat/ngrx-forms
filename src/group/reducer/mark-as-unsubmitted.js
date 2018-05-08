"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../../actions");
var state_1 = require("../../state");
var util_1 = require("./util");
function markAsUnsubmittedReducer(state, action) {
    if (action.type !== actions_1.MarkAsUnsubmittedAction.TYPE) {
        return state;
    }
    if (action.controlId !== state.id) {
        return util_1.childReducer(state, action);
    }
    if (state.isUnsubmitted) {
        return state;
    }
    return state_1.computeGroupState(state.id, util_1.dispatchActionPerChild(state.controls, function (controlId) { return new actions_1.MarkAsUnsubmittedAction(controlId); }), state.value, state.errors, state.pendingValidations, state.userDefinedProperties);
}
exports.markAsUnsubmittedReducer = markAsUnsubmittedReducer;
//# sourceMappingURL=mark-as-unsubmitted.js.map