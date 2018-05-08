"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var state_1 = require("../state");
exports.FORM_CONTROL_ID = 'test ID';
exports.FORM_CONTROL_INNER_ID = exports.FORM_CONTROL_ID + '.inner';
exports.FORM_CONTROL_INNER2_ID = exports.FORM_CONTROL_ID + '.inner2';
exports.INITIAL_FORM_CONTROL_VALUE = { inner: '', inner3: { inner4: '' }, inner5: [''] };
exports.INITIAL_STATE = state_1.createFormGroupState(exports.FORM_CONTROL_ID, exports.INITIAL_FORM_CONTROL_VALUE);
//# sourceMappingURL=test-util.js.map