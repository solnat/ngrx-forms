"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../../actions");
var state_1 = require("../../state");
var util_1 = require("./util");
function startAsyncValidationReducer(state, action) {
    if (action.type !== actions_1.StartAsyncValidationAction.TYPE) {
        return state;
    }
    if (action.controlId !== state.id) {
        return util_1.childReducer(state, action);
    }
    if (state.pendingValidations.indexOf(action.payload.name) >= 0) {
        return state;
    }
    var pendingValidations = state.pendingValidations.concat([action.payload.name]);
    return state_1.computeArrayState(state.id, state.controls, state.value, state.errors, pendingValidations, state.userDefinedProperties);
}
exports.startAsyncValidationReducer = startAsyncValidationReducer;
//# sourceMappingURL=start-async-validation.js.map