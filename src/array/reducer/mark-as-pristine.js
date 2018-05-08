"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../../actions");
var state_1 = require("../../state");
var util_1 = require("./util");
function markAsPristineReducer(state, action) {
    if (action.type !== actions_1.MarkAsPristineAction.TYPE) {
        return state;
    }
    if (action.controlId !== state.id) {
        return util_1.childReducer(state, action);
    }
    if (state.isPristine) {
        return state;
    }
    return state_1.computeArrayState(state.id, util_1.dispatchActionPerChild(state.controls, function (controlId) { return new actions_1.MarkAsPristineAction(controlId); }), state.value, state.errors, state.pendingValidations, state.userDefinedProperties);
}
exports.markAsPristineReducer = markAsPristineReducer;
//# sourceMappingURL=mark-as-pristine.js.map