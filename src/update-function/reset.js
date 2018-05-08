"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../actions");
var util_1 = require("./util");
function reset(state) {
    return util_1.abstractControlReducer(state, new actions_1.ResetAction(state.id));
}
exports.reset = reset;
//# sourceMappingURL=reset.js.map