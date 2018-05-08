"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../actions");
var util_1 = require("./util");
function markAsDirty(state) {
    return util_1.abstractControlReducer(state, new actions_1.MarkAsDirtyAction(state.id));
}
exports.markAsDirty = markAsDirty;
//# sourceMappingURL=mark-as-dirty.js.map