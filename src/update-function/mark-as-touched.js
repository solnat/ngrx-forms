"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../actions");
var util_1 = require("./util");
function markAsTouched(state) {
    return util_1.abstractControlReducer(state, new actions_1.MarkAsTouchedAction(state.id));
}
exports.markAsTouched = markAsTouched;
//# sourceMappingURL=mark-as-touched.js.map