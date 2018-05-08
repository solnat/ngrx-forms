"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../actions");
var util_1 = require("./util");
function setValue(value, state) {
    if (!!state) {
        return util_1.abstractControlReducer(state, new actions_1.SetValueAction(state.id, value));
    }
    return function (s) { return setValue(value, util_1.ensureState(s)); };
}
exports.setValue = setValue;
//# sourceMappingURL=set-value.js.map