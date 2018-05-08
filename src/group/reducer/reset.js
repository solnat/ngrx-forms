"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../../actions");
var state_1 = require("../../state");
var util_1 = require("./util");
function resetReducer(state, action) {
    if (action.type !== actions_1.ResetAction.TYPE) {
        return state;
    }
    if (action.controlId !== state.id) {
        return util_1.childReducer(state, action);
    }
    if (state.isPristine && state.isUntouched && state.isUnsubmitted) {
        return state;
    }
    return state_1.computeGroupState(state.id, util_1.dispatchActionPerChild(state.controls, function (controlId) { return new actions_1.ResetAction(controlId); }), state.value, state.errors, state.pendingValidations, state.userDefinedProperties);
}
exports.resetReducer = resetReducer;
//# sourceMappingURL=reset.js.map