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
function setValueReducer(state, action) {
    if (action.type !== actions_1.SetValueAction.TYPE) {
        return state;
    }
    if (state.value === action.payload.value) {
        return state;
    }
    var value = action.payload.value;
    var valueType = typeof value;
    if (value !== null && ['string', 'number', 'boolean', 'undefined'].indexOf(valueType) === -1) {
        var errorMsg = 'Form control states only support undefined, null, string, number, and boolean values';
        throw new Error(errorMsg + "; got " + JSON.stringify(action.payload.value) + " of type \"" + valueType + "\""); // `;
    }
    return __assign({}, state, { value: action.payload.value });
}
exports.setValueReducer = setValueReducer;
//# sourceMappingURL=set-value.js.map