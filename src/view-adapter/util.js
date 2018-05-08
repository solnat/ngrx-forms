"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var checkbox_1 = require("./checkbox");
var default_1 = require("./default");
var number_1 = require("./number");
var radio_1 = require("./radio");
var range_1 = require("./range");
var select_1 = require("./select");
var select_multiple_1 = require("./select-multiple");
var BUILTIN_ADAPTERS = [
    checkbox_1.NgrxCheckboxViewAdapter,
    range_1.NgrxRangeViewAdapter,
    number_1.NgrxNumberViewAdapter,
    select_1.NgrxSelectViewAdapter,
    select_multiple_1.NgrxSelectMultipleViewAdapter,
    radio_1.NgrxRadioViewAdapter,
];
function isBuiltInViewAdapter(viewAdapter) {
    return BUILTIN_ADAPTERS.some(function (a) { return viewAdapter.constructor === a; });
}
exports.isBuiltInViewAdapter = isBuiltInViewAdapter;
function selectViewAdapter(viewAdapters) {
    if (!viewAdapters) {
        throw new Error('No view adapter matches!');
    }
    var defaultAdapter;
    var builtinAdapter;
    var customAdapter;
    viewAdapters.forEach(function (v) {
        if (v.constructor === default_1.NgrxDefaultViewAdapter) {
            defaultAdapter = v;
        }
        else if (isBuiltInViewAdapter(v)) {
            if (builtinAdapter) {
                throw new Error('More than one built-in view adapter matches!');
            }
            builtinAdapter = v;
        }
        else {
            if (customAdapter) {
                throw new Error('More than one custom view adapter matches!');
            }
            customAdapter = v;
        }
    });
    if (customAdapter) {
        return customAdapter;
    }
    if (builtinAdapter) {
        return builtinAdapter;
    }
    if (defaultAdapter) {
        return defaultAdapter;
    }
    throw new Error('No valid view adapter!');
}
exports.selectViewAdapter = selectViewAdapter;
//# sourceMappingURL=util.js.map