"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../actions");
var util_1 = require("./util");
function setUserDefinedProperty(name, value, state) {
    if (!!state) {
        return util_1.abstractControlReducer(state, new actions_1.SetUserDefinedPropertyAction(state.id, name, value));
    }
    return function (s) { return setUserDefinedProperty(name, value, util_1.ensureState(s)); };
}
exports.setUserDefinedProperty = setUserDefinedProperty;
//# sourceMappingURL=set-user-defined-property.js.map