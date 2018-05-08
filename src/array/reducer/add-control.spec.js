"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../../actions");
var state_1 = require("../../state");
var add_control_1 = require("./add-control");
var test_util_1 = require("./test-util");
describe("form array " + add_control_1.addControlReducer.name, function () {
    it('should create child state for control child', function () {
        var value = 'B';
        var action = new actions_1.AddArrayControlAction(test_util_1.FORM_CONTROL_ID, value);
        var resultState = add_control_1.addControlReducer(test_util_1.INITIAL_STATE, action);
        expect(resultState.value).toEqual(test_util_1.INITIAL_STATE.value.concat([value]));
        expect(resultState.controls[2].value).toEqual(value);
    });
    it('should create child state for group child', function () {
        var value = { inner: 'D' };
        var action = new actions_1.AddArrayControlAction(test_util_1.FORM_CONTROL_ID, value);
        var resultState = add_control_1.addControlReducer(test_util_1.INITIAL_STATE_NESTED_GROUP, action);
        expect(resultState.value).toEqual(test_util_1.INITIAL_STATE_NESTED_GROUP.value.concat([value]));
        expect(resultState.controls[2].value).toBe(value);
        expect(state_1.cast(resultState.controls[2]).controls).toBeDefined();
        expect(Array.isArray(state_1.cast(resultState.controls[2]).controls)).toBe(false);
    });
    it('should create child state for array child', function () {
        var value = ['A'];
        var action = new actions_1.AddArrayControlAction(test_util_1.FORM_CONTROL_ID, value);
        var resultState = add_control_1.addControlReducer(test_util_1.INITIAL_STATE_NESTED_ARRAY, action);
        expect(resultState.value).toEqual(test_util_1.INITIAL_STATE_NESTED_ARRAY.value.concat([value]));
        expect(resultState.controls[2].value).toEqual(value);
        expect(state_1.cast(resultState.controls[2]).controls).toBeDefined();
        expect(Array.isArray(state_1.cast(resultState.controls[2]).controls)).toBe(true);
    });
    it('should create child state at the given index', function () {
        var value = 'B';
        var action = new actions_1.AddArrayControlAction(test_util_1.FORM_CONTROL_ID, value, 1);
        var resultState = add_control_1.addControlReducer(test_util_1.INITIAL_STATE, action);
        expect(resultState.value).toEqual(['', value, '']);
        expect(resultState.controls[1].value).toEqual(value);
        expect(resultState.controls[1].id).toEqual(test_util_1.FORM_CONTROL_ID + '.1');
        expect(resultState.controls[2].value).toEqual('');
        expect(resultState.controls[2].id).toEqual(test_util_1.FORM_CONTROL_ID + '.2');
    });
    it('should create child state at the start', function () {
        var value = 'B';
        var action = new actions_1.AddArrayControlAction(test_util_1.FORM_CONTROL_ID, value, 0);
        var resultState = add_control_1.addControlReducer(test_util_1.INITIAL_STATE, action);
        expect(resultState.value).toEqual([value, '', '']);
        expect(resultState.controls[0].value).toEqual(value);
        expect(resultState.controls[0].id).toEqual(test_util_1.FORM_CONTROL_ID + '.0');
        expect(resultState.controls[2].value).toEqual('');
        expect(resultState.controls[2].id).toEqual(test_util_1.FORM_CONTROL_ID + '.2');
    });
    it('should throw if trying to add control at out of bounds index', function () {
        var action = new actions_1.AddArrayControlAction(test_util_1.FORM_CONTROL_ID, '', 3);
        expect(function () { return add_control_1.addControlReducer(test_util_1.INITIAL_STATE, action); }).toThrowError();
    });
    it('should throw if trying to add control at negative index', function () {
        var action = new actions_1.AddArrayControlAction(test_util_1.FORM_CONTROL_ID, '', -1);
        expect(function () { return add_control_1.addControlReducer(test_util_1.INITIAL_STATE, action); }).toThrowError();
    });
});
//# sourceMappingURL=add-control.spec.js.map