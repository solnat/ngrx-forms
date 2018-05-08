"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../../actions");
var state_1 = require("../../state");
var util_1 = require("./util");
function markAsTouchedReducer(state, action) {
    if (action.type !== actions_1.MarkAsTouchedAction.TYPE) {
        return state;
    }
    if (action.controlId !== state.id) {
        return util_1.childReducer(state, action);
    }
    var controls = util_1.dispatchActionPerChild(state.controls, function (controlId) { return new actions_1.MarkAsTouchedAction(controlId); });
    if (controls === state.controls) {
        return state;
    }
    return state_1.computeGroupState(state.id, controls, state.value, state.errors, state.pendingValidations, state.userDefinedProperties);
}
exports.markAsTouchedReducer = markAsTouchedReducer;
//# sourceMappingURL=mark-as-touched.js.map