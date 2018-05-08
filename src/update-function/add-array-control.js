"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../actions");
var reducer_1 = require("../array/reducer");
var state_1 = require("../state");
var util_1 = require("./util");
function addArrayControl(value, indexOrState, index) {
    if (indexOrState === void 0) { indexOrState = null; }
    if (index === void 0) { index = null; }
    if (indexOrState !== null && state_1.isArrayState(indexOrState)) {
        return reducer_1.formArrayReducer(indexOrState, new actions_1.AddArrayControlAction(indexOrState.id, value, index));
    }
    return function (s) { return addArrayControl(value, util_1.ensureState(s), indexOrState); };
}
exports.addArrayControl = addArrayControl;
//# sourceMappingURL=add-array-control.js.map