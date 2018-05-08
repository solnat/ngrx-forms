"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var state_1 = require("../state");
var update_array_1 = require("./update-array");
var update_group_1 = require("./update-group");
function updateRecursiveSingle(parent, updateFn) {
    return function (state) {
        if (state_1.isGroupState(state)) {
            var updateFunctions = Object.keys(state.controls).reduce(function (agg, key) {
                return Object.assign(agg, (_a = {},
                    _a[key] = function (s, p) { return updateRecursiveSingle(p, updateFn)(s); },
                    _a));
                var _a;
            }, {});
            state = update_group_1.updateGroup(updateFunctions)(state);
            return updateFn(state, parent);
        }
        if (state_1.isArrayState(state)) {
            state = update_array_1.updateArray(function (s, p) { return updateRecursiveSingle(p, updateFn)(s); })(state);
            return updateFn(state, parent);
        }
        return updateFn(state, parent);
    };
}
function updateRecursive(stateOrFunction) {
    var updateFnArr = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        updateFnArr[_i - 1] = arguments[_i];
    }
    if (typeof stateOrFunction !== 'function') {
        var first = updateFnArr[0], rest = updateFnArr.slice(1);
        return updateRecursive.apply(void 0, [first].concat(rest))(stateOrFunction);
    }
    return function (state) {
        return [stateOrFunction].concat(updateFnArr).reduce(function (s, updateFn) { return updateRecursiveSingle(state, updateFn)(s); }, state);
    };
}
exports.updateRecursive = updateRecursive;
//# sourceMappingURL=update-recursive.js.map