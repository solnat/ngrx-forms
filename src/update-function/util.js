"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reducer_1 = require("../array/reducer");
var reducer_2 = require("../control/reducer");
var reducer_3 = require("../group/reducer");
var state_1 = require("../state");
function abstractControlReducer(state, action) {
    if (state_1.isArrayState(state)) {
        return reducer_1.formArrayReducer(state, action);
    }
    if (state_1.isGroupState(state)) {
        return reducer_3.formGroupReducer(state, action);
    }
    return reducer_2.formControlReducer(state, action);
}
exports.abstractControlReducer = abstractControlReducer;
function compose() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return function (t) { return fns.reduce(function (res, f) { return f(res); }, t); };
}
exports.compose = compose;
function ensureState(state) {
    if (!state) {
        throw new Error('state must not be undefined!');
    }
    return state;
}
exports.ensureState = ensureState;
//# sourceMappingURL=util.js.map