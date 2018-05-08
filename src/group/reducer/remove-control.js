"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../../actions");
var state_1 = require("../../state");
var util_1 = require("./util");
function removeControlReducer(state, action) {
    if (action.type !== actions_1.RemoveGroupControlAction.TYPE) {
        return state;
    }
    if (action.controlId !== state.id) {
        return util_1.childReducer(state, action);
    }
    if (!state.controls.hasOwnProperty(action.payload.name)) {
        throw new Error("Group '" + state.id + "' does not have child control '" + action.payload.name + "'!"); // `;
    }
    var controls = Object.assign({}, state.controls);
    delete controls[action.payload.name];
    return state_1.computeGroupState(state.id, controls, state.value, state.errors, state.pendingValidations, state.userDefinedProperties);
}
exports.removeControlReducer = removeControlReducer;
//# sourceMappingURL=remove-control.js.map