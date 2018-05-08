"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../../actions");
var state_1 = require("../../state");
var util_1 = require("./util");
function markAsSubmittedReducer(state, action) {
    if (action.type !== actions_1.MarkAsSubmittedAction.TYPE) {
        return state;
    }
    if (action.controlId !== state.id) {
        return util_1.childReducer(state, action);
    }
    var controls = util_1.dispatchActionPerChild(state.controls, function (controlId) { return new actions_1.MarkAsSubmittedAction(controlId); });
    if (controls === state.controls) {
        return state;
    }
    return state_1.computeArrayState(state.id, controls, state.value, state.errors, state.pendingValidations, state.userDefinedProperties);
}
exports.markAsSubmittedReducer = markAsSubmittedReducer;
//# sourceMappingURL=mark-as-submitted.js.map