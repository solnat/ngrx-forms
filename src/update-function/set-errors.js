"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../actions");
var util_1 = require("./util");
function setErrors(param, state) {
    if (!!state) {
        param = Array.isArray(param) ? param : [param];
        var errors = param.reduce(function (agg, err) { return Object.assign(agg, err); }, {});
        return util_1.abstractControlReducer(state, new actions_1.SetErrorsAction(state.id, errors));
    }
    return function (s) { return setErrors(param, util_1.ensureState(s)); };
}
exports.setErrors = setErrors;
//# sourceMappingURL=set-errors.js.map