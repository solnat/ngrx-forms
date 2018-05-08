"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../../actions");
var util_1 = require("./util");
function setUserDefinedPropertyReducer(state, action) {
    if (action.type !== actions_1.SetUserDefinedPropertyAction.TYPE) {
        return state;
    }
    if (action.controlId !== state.id) {
        return util_1.childReducer(state, action);
    }
    if (state.userDefinedProperties[action.payload.name] === action.payload.value) {
        return state;
    }
    return __assign({}, state, { userDefinedProperties: __assign({}, state.userDefinedProperties, (_a = {}, _a[action.payload.name] = action.payload.value, _a)) });
    var _a;
}
exports.setUserDefinedPropertyReducer = setUserDefinedPropertyReducer;
//# sourceMappingURL=set-user-defined-property.js.map