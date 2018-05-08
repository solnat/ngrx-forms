"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../actions");
var util_1 = require("./util");
function disable(state) {
    return util_1.abstractControlReducer(state, new actions_1.DisableAction(state.id));
}
exports.disable = disable;
//# sourceMappingURL=disable.js.map