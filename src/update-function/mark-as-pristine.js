"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../actions");
var util_1 = require("./util");
function markAsPristine(state) {
    return util_1.abstractControlReducer(state, new actions_1.MarkAsPristineAction(state.id));
}
exports.markAsPristine = markAsPristine;
//# sourceMappingURL=mark-as-pristine.js.map