"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var state_1 = require("../state");
var test_util_1 = require("./test-util");
var set_value_1 = require("./set-value");
describe(set_value_1.setValue.name, function () {
    it('should call reducer for controls', function () {
        var resultState = set_value_1.setValue('A')(state_1.cast(test_util_1.INITIAL_STATE.controls.inner));
        expect(resultState).not.toBe(state_1.cast(test_util_1.INITIAL_STATE.controls.inner));
    });
    it('should call reducer for groups', function () {
        var resultState = set_value_1.setValue({ inner: 'A', inner5: test_util_1.INITIAL_STATE.value.inner5 })(test_util_1.INITIAL_STATE);
        expect(resultState).not.toBe(state_1.cast(test_util_1.INITIAL_STATE));
    });
    it('should call reducer for arrays', function () {
        var resultState = set_value_1.setValue(['A'])(test_util_1.INITIAL_STATE.controls.inner5);
        expect(resultState).not.toBe(state_1.cast(test_util_1.INITIAL_STATE.controls.inner5));
    });
    it('should call reducer for controls uncurried', function () {
        var resultState = set_value_1.setValue('A', test_util_1.INITIAL_STATE.controls.inner);
        expect(resultState).not.toBe(test_util_1.INITIAL_STATE.controls.inner);
    });
    it('should call reducer for groups uncurried', function () {
        var resultState = set_value_1.setValue({ inner: 'A', inner5: test_util_1.INITIAL_STATE.value.inner5 }, test_util_1.INITIAL_STATE);
        expect(resultState).not.toBe(test_util_1.INITIAL_STATE);
    });
    it('should call reducer for arrays uncurried', function () {
        var resultState = set_value_1.setValue(['A'], test_util_1.INITIAL_STATE.controls.inner5);
        expect(resultState).not.toBe(test_util_1.INITIAL_STATE.controls.inner5);
    });
    it('should throw if curried and no state', function () {
        expect(function () { return set_value_1.setValue('')(undefined); }).toThrowError();
    });
});
//# sourceMappingURL=set-value.spec.js.map