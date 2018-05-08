"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../actions");
var reducer_1 = require("../group/reducer");
var util_1 = require("./util");
function addGroupControl(name, value, state) {
    if (!!state) {
        return reducer_1.formGroupReducer(state, new actions_1.AddGroupControlAction(state.id, name, value));
    }
    return function (s) { return addGroupControl(name, value, util_1.ensureState(s)); };
}
exports.addGroupControl = addGroupControl;
//# sourceMappingURL=add-group-control.js.map