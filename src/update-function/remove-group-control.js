"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../actions");
var reducer_1 = require("../group/reducer");
var util_1 = require("./util");
function removeGroupControl(name, state) {
    if (!!state) {
        return reducer_1.formGroupReducer(state, new actions_1.RemoveGroupControlAction(state.id, name));
    }
    return function (s) { return removeGroupControl(name, util_1.ensureState(s)); };
}
exports.removeGroupControl = removeGroupControl;
//# sourceMappingURL=remove-group-control.js.map