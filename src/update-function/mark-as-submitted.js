"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../actions");
var util_1 = require("./util");
function markAsSubmitted(state) {
    return util_1.abstractControlReducer(state, new actions_1.MarkAsSubmittedAction(state.id));
}
exports.markAsSubmitted = markAsSubmitted;
//# sourceMappingURL=mark-as-submitted.js.map