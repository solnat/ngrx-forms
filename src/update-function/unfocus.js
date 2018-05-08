"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../actions");
var reducer_1 = require("../control/reducer");
/**
 * This update function takes a form control state and marks it as not focused (which
 * will also `.blur()` the form element).
 */
function unfocus(state) {
    return reducer_1.formControlReducer(state, new actions_1.UnfocusAction(state.id));
}
exports.unfocus = unfocus;
//# sourceMappingURL=unfocus.js.map