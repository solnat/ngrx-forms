"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../actions");
var util_1 = require("./util");
function enable(state) {
    return util_1.abstractControlReducer(state, new actions_1.EnableAction(state.id));
}
exports.enable = enable;
//# sourceMappingURL=enable.js.map