"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../actions");
var util_1 = require("./util");
function markAsUntouched(state) {
    return util_1.abstractControlReducer(state, new actions_1.MarkAsUntouchedAction(state.id));
}
exports.markAsUntouched = markAsUntouched;
//# sourceMappingURL=mark-as-untouched.js.map