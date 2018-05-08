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
var actions_1 = require("../actions");
var test_util_1 = require("./test-util");
var update_group_1 = require("./update-group");
describe(update_group_1.updateGroup.name, function () {
    it('should apply the provided functions to control children', function () {
        var expected = __assign({}, test_util_1.INITIAL_STATE.controls.inner, { value: 'A' });
        var resultState = update_group_1.updateGroup({
            inner: function () { return expected; },
        })(test_util_1.INITIAL_STATE);
        expect(resultState.controls.inner).toBe(expected);
    });
    it('should apply the provided functions to group children', function () {
        var expected = __assign({}, test_util_1.INITIAL_STATE.controls.inner3, { value: { inner4: 'A' } });
        var resultState = update_group_1.updateGroup({
            inner3: function () { return expected; },
        })(test_util_1.INITIAL_STATE);
        expect(resultState.controls.inner3).toBe(expected);
    });
    it('should apply the provided functions to array children', function () {
        var expected = __assign({}, test_util_1.INITIAL_STATE.controls.inner5, { value: ['A'] });
        var resultState = update_group_1.updateGroup({
            inner5: function () { return expected; },
        })(test_util_1.INITIAL_STATE);
        expect(resultState.controls.inner5).toBe(expected);
    });
    it('should not change the state with empty update object', function () {
        var resultState = update_group_1.updateGroup({})(test_util_1.INITIAL_STATE);
        expect(resultState).toBe(resultState);
    });
    it('should apply the provided functions to control children uncurried', function () {
        var expected = __assign({}, test_util_1.INITIAL_STATE.controls.inner, { value: 'A' });
        var resultState = update_group_1.updateGroup(test_util_1.INITIAL_STATE, {
            inner: function () { return expected; },
        });
        expect(resultState.controls.inner).toBe(expected);
    });
    it('should apply the provided functions to group children uncurried', function () {
        var expected = __assign({}, test_util_1.INITIAL_STATE.controls.inner3, { value: { inner4: 'A' } });
        var resultState = update_group_1.updateGroup(test_util_1.INITIAL_STATE, {
            inner3: function () { return expected; },
        });
        expect(resultState.controls.inner3).toBe(expected);
    });
    it('should apply the provided functions to array children uncurried', function () {
        var expected = __assign({}, test_util_1.INITIAL_STATE.controls.inner5, { value: ['A'] });
        var resultState = update_group_1.updateGroup(test_util_1.INITIAL_STATE, {
            inner5: function () { return expected; },
        });
        expect(resultState.controls.inner5).toBe(expected);
    });
    it('should not change the state with empty update object uncurried', function () {
        var resultState = update_group_1.updateGroup(test_util_1.INITIAL_STATE, {});
        expect(resultState).toBe(resultState);
    });
    it('should apply multiple provided function objects one after another', function () {
        var updatedInner1 = __assign({}, test_util_1.INITIAL_STATE.controls.inner, { value: 'A' });
        var expectedInner1 = __assign({}, test_util_1.INITIAL_STATE.controls.inner, { value: 'B' });
        var expectedInner3 = __assign({}, test_util_1.INITIAL_STATE.controls.inner3, { value: { inner4: 'A' } });
        var resultState = update_group_1.updateGroup({
            inner: function () { return updatedInner1; },
            inner3: function () { return expectedInner3; },
        }, {
            inner: function () { return expectedInner1; },
        })(test_util_1.INITIAL_STATE);
        expect(resultState.controls.inner).toBe(expectedInner1);
        expect(resultState.controls.inner3).toBe(expectedInner3);
    });
    it('should pass the parent group as the second parameter', function () {
        update_group_1.updateGroup({
            inner3: function (c, p) {
                expect(p).toBe(test_util_1.INITIAL_STATE);
                return c;
            },
        })(test_util_1.INITIAL_STATE);
    });
});
describe(update_group_1.createFormGroupReducerWithUpdate.name, function () {
    it('should apply the action and the provided functions to control children', function () {
        var value = 'A';
        var resultState = update_group_1.createFormGroupReducerWithUpdate({
            inner: function (s) { return (__assign({}, s, { value: value })); },
        })(test_util_1.INITIAL_STATE, new actions_1.MarkAsTouchedAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState.controls.inner.isTouched).toBe(true);
        expect(resultState.controls.inner.value).toBe(value);
    });
    it('should apply the action and the provided functions to group children', function () {
        var value = { inner4: 'A' };
        var resultState = update_group_1.createFormGroupReducerWithUpdate({
            inner3: function (s) { return (__assign({}, s, { value: value })); },
        })(test_util_1.INITIAL_STATE, new actions_1.MarkAsTouchedAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState.controls.inner3.isTouched).toBe(true);
        expect(resultState.controls.inner3.value).toBe(value);
    });
    it('should apply the action and the provided functions to nested children', function () {
        var value = 'A';
        var resultState = update_group_1.createFormGroupReducerWithUpdate({
            inner3: update_group_1.updateGroup({
                inner4: function (s) { return (__assign({}, s, { value: value })); },
            }),
        })(test_util_1.INITIAL_STATE, new actions_1.MarkAsTouchedAction(test_util_1.FORM_CONTROL_ID));
        expect(resultState.controls.inner3.controls.inner4.isTouched).toBe(true);
        expect(resultState.controls.inner3.controls.inner4.value).toBe(value);
    });
    it('should first apply the action and then the provided functions', function () {
        var expected = __assign({}, test_util_1.INITIAL_STATE.controls.inner, { value: 'A' });
        var resultState = update_group_1.createFormGroupReducerWithUpdate({
            inner: function () { return expected; },
        })(test_util_1.INITIAL_STATE, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_INNER_ID, 'B'));
        expect(resultState.controls.inner).toBe(expected);
    });
    it('should apply multiple provided function objects one after another', function () {
        var updatedInner1 = __assign({}, test_util_1.INITIAL_STATE.controls.inner, { value: 'A' });
        var expectedInner1 = __assign({}, test_util_1.INITIAL_STATE.controls.inner, { value: 'B' });
        var expectedInner3 = __assign({}, test_util_1.INITIAL_STATE.controls.inner3, { value: { inner4: 'A' } });
        var resultState = update_group_1.createFormGroupReducerWithUpdate({
            inner: function () { return updatedInner1; },
            inner3: function () { return expectedInner3; },
        }, {
            inner: function () { return expectedInner1; },
        })(test_util_1.INITIAL_STATE, new actions_1.SetValueAction(test_util_1.FORM_CONTROL_INNER_ID, 'D'));
        expect(resultState.controls.inner).toBe(expectedInner1);
        expect(resultState.controls.inner3).toBe(expectedInner3);
    });
});
//# sourceMappingURL=update-group.spec.js.map