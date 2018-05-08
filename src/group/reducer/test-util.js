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
var state_1 = require("../../state");
exports.FORM_CONTROL_ID = 'test ID';
exports.FORM_CONTROL_INNER_ID = exports.FORM_CONTROL_ID + '.inner';
exports.FORM_CONTROL_INNER2_ID = exports.FORM_CONTROL_ID + '.inner2';
exports.FORM_CONTROL_INNER3_ID = exports.FORM_CONTROL_ID + '.inner3';
exports.FORM_CONTROL_INNER4_ID = exports.FORM_CONTROL_INNER3_ID + '.inner4';
exports.FORM_CONTROL_INNER5_ID = exports.FORM_CONTROL_ID + '.inner5';
exports.FORM_CONTROL_INNER5_0_ID = exports.FORM_CONTROL_ID + '.inner5.0';
exports.INITIAL_FORM_CONTROL_VALUE = { inner: '' };
exports.INITIAL_FORM_CONTROL_VALUE_FULL = { inner: '', inner2: '', inner3: { inner4: '' }, inner5: [''] };
exports.INITIAL_STATE = state_1.createFormGroupState(exports.FORM_CONTROL_ID, exports.INITIAL_FORM_CONTROL_VALUE);
exports.INITIAL_STATE_FULL = state_1.createFormGroupState(exports.FORM_CONTROL_ID, exports.INITIAL_FORM_CONTROL_VALUE_FULL);
exports.setPropertyRecursively = function (state, property, value) {
    var excludeIds = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        excludeIds[_i - 3] = arguments[_i];
    }
    if (excludeIds.indexOf(state.id) >= 0) {
        return state;
    }
    state = __assign({}, state, (_a = {}, _a[property] = value, _a));
    if (state_1.isArrayState(state)) {
        var controls = state.controls.map(function (s) { return exports.setPropertyRecursively.apply(void 0, [s, property, value].concat(excludeIds)); });
        return __assign({}, state, { controls: controls });
    }
    if (state_1.isGroupState(state)) {
        var controls_1 = state.controls;
        var newControls = Object.keys(controls_1).reduce(function (res, key) {
            var s = exports.setPropertyRecursively.apply(void 0, [controls_1[key], property, value].concat(excludeIds));
            res[key] = s;
            return res;
        }, {});
        return __assign({}, state, { controls: newControls });
    }
    return state;
    var _a;
};
exports.setPropertiesRecursively = function (state, properties) {
    var excludeIds = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        excludeIds[_i - 2] = arguments[_i];
    }
    return properties.reduce(function (s, _a) {
        var p = _a[0], v = _a[1];
        return exports.setPropertyRecursively.apply(void 0, [s, p, v].concat(excludeIds));
    }, state);
};
//# sourceMappingURL=test-util.js.map