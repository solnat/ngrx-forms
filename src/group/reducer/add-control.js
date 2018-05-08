"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../../actions");
var state_1 = require("../../state");
var util_1 = require("./util");
function addControlReducer(state, action) {
    if (action.type !== actions_1.AddGroupControlAction.TYPE) {
        return state;
    }
    if (action.controlId !== state.id) {
        return util_1.childReducer(state, action);
    }
    if (state.controls.hasOwnProperty(action.payload.name)) {
        throw new Error("Group '" + state.id + "' already has child control '" + action.payload.name + "'!"); // `;
    }
    var controls = Object.assign({}, state.controls, (_a = {},
        _a[action.payload.name] = state_1.createChildState(state.id + "." + action.payload.name, action.payload.value),
        _a));
    return state_1.computeGroupState(state.id, controls, state.value, state.errors, state.pendingValidations, state.userDefinedProperties);
    var _a;
}
exports.addControlReducer = addControlReducer;
//# sourceMappingURL=add-control.js.map