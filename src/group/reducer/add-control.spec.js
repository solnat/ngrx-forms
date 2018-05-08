"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../../actions");
var state_1 = require("../../state");
var add_control_1 = require("./add-control");
var test_util_1 = require("./test-util");
describe("form group " + add_control_1.addControlReducer.name, function () {
    it('should create child state for control child', function () {
        var value = 'B';
        var action = new actions_1.AddGroupControlAction(test_util_1.FORM_CONTROL_ID, 'inner2', value);
        var resultState = add_control_1.addControlReducer(test_util_1.INITIAL_STATE, action);
        expect(resultState.value).toEqual({ inner: '', inner2: value });
        expect(resultState.controls.inner2.value).toEqual(value);
    });
    it('should create child state for group child', function () {
        var value = { inner4: 'D' };
        var action = new actions_1.AddGroupControlAction(test_util_1.FORM_CONTROL_ID, 'inner3', value);
        var resultState = add_control_1.addControlReducer(test_util_1.INITIAL_STATE, action);
        expect(resultState.value).toEqual({ inner: '', inner3: value });
        expect(resultState.controls.inner3.value).toBe(value);
        expect(state_1.cast(resultState.controls.inner3).controls).toBeDefined();
        expect(Array.isArray(state_1.cast(resultState.controls.inner3).controls)).toBe(false);
    });
    it('should create child state for array child', function () {
        var value = ['A'];
        var action = new actions_1.AddGroupControlAction(test_util_1.FORM_CONTROL_ID, 'inner5', value);
        var resultState = add_control_1.addControlReducer(test_util_1.INITIAL_STATE, action);
        expect(resultState.value).toEqual({ inner: '', inner5: value });
        expect(resultState.controls.inner5.value).toBe(value);
        expect(state_1.cast(resultState.controls.inner5).controls).toBeDefined();
        expect(Array.isArray(state_1.cast(resultState.controls.inner5).controls)).toBe(true);
    });
    it('should throw if trying to add existing control', function () {
        var action = new actions_1.AddGroupControlAction(test_util_1.FORM_CONTROL_ID, 'inner', '');
        expect(function () { return add_control_1.addControlReducer(test_util_1.INITIAL_STATE, action); }).toThrowError();
    });
});
//# sourceMappingURL=add-control.spec.js.map