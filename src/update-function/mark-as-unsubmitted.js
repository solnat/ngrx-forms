"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../actions");
var util_1 = require("./util");
function markAsUnsubmitted(state) {
    return util_1.abstractControlReducer(state, new actions_1.MarkAsUnsubmittedAction(state.id));
}
exports.markAsUnsubmitted = markAsUnsubmitted;
//# sourceMappingURL=mark-as-unsubmitted.js.map