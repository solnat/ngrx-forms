"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../actions");
var reducer_1 = require("../array/reducer");
var util_1 = require("./util");
function removeArrayControl(index, state) {
    if (!!state) {
        return reducer_1.formArrayReducer(state, new actions_1.RemoveArrayControlAction(state.id, index));
    }
    return function (s) { return removeArrayControl(index, util_1.ensureState(s)); };
}
exports.removeArrayControl = removeArrayControl;
//# sourceMappingURL=remove-array-control.js.map