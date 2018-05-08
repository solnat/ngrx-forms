"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../actions");
var util_1 = require("./util");
function validate(param, state) {
    if (!!state) {
        param = Array.isArray(param) ? param : [param];
        var errors = param.reduce(function (agg, validationFn) { return Object.assign(agg, validationFn(state.value)); }, {});
        return util_1.abstractControlReducer(state, new actions_1.SetErrorsAction(state.id, errors));
    }
    return function (s) { return validate(param, util_1.ensureState(s)); };
}
exports.validate = validate;
//# sourceMappingURL=validate.js.map