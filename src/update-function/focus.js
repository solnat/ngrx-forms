"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../actions");
var reducer_1 = require("../control/reducer");
/**
 * This update function takes a form control state and marks it as focused (which
 * will also `.focus()` the form element).
 */
function focus(state) {
    return reducer_1.formControlReducer(state, new actions_1.FocusAction(state.id));
}
exports.focus = focus;
//# sourceMappingURL=focus.js.map