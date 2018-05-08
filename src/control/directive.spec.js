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
require("rxjs/add/operator/count");
require("rxjs/add/operator/first");
require("rxjs/add/operator/skip");
var ReplaySubject_1 = require("rxjs/ReplaySubject");
var actions_1 = require("../actions");
var state_1 = require("../state");
var directive_1 = require("./directive");
var value_converter_1 = require("./value-converter");
describe(directive_1.NgrxFormControlDirective.name, function () {
    var directive;
    var elementRef;
    var nativeElement;
    var document;
    var actionsSubject;
    var actions$;
    var viewAdapter;
    var onChange;
    var onTouched;
    var FORM_CONTROL_ID = 'test ID';
    var INITIAL_FORM_CONTROL_VALUE = 'value';
    var INITIAL_STATE = state_1.createFormControlState(FORM_CONTROL_ID, INITIAL_FORM_CONTROL_VALUE);
    beforeEach(function () {
        nativeElement = jasmine.createSpyObj('nativeElement', ['focus', 'blur']);
        elementRef = { nativeElement: nativeElement };
        document = {};
        actionsSubject = new ReplaySubject_1.ReplaySubject();
        actions$ = actionsSubject; // required due to mismatch of lift() function signature
        viewAdapter = {
            setViewValue: function () { return void 0; },
            setOnChangeCallback: function (fn) { return onChange = fn; },
            setOnTouchedCallback: function (fn) { return onTouched = fn; },
            setIsDisabled: function () { return void 0; },
        };
        directive = new directive_1.NgrxFormControlDirective(elementRef, document, actionsSubject, [viewAdapter], []);
        directive.ngrxFormControlState = INITIAL_STATE;
    });
    describe('writing values and dispatching value and dirty actions', function () {
        beforeEach(function () {
            directive.ngOnInit();
        });
        it('should write the value when the state changes', function () {
            var newValue = 'new value';
            var spy = spyOn(viewAdapter, 'setViewValue');
            directive.ngrxFormControlState = __assign({}, INITIAL_STATE, { value: newValue });
            expect(spy).toHaveBeenCalledWith(newValue);
        });
        it('should not write the value when the state value does not change', function () {
            var spy = spyOn(viewAdapter, 'setViewValue');
            directive.ngrxFormControlState = INITIAL_STATE;
            expect(spy).not.toHaveBeenCalled();
        });
        it('should not write the value when the state value is the same as the view value', function () {
            var newValue = 'new value';
            onChange(newValue);
            var spy = spyOn(viewAdapter, 'setViewValue');
            directive.ngrxFormControlState = __assign({}, INITIAL_STATE, { value: newValue });
            expect(spy).not.toHaveBeenCalled();
        });
        it('should write the value when the state value does not change but the id does', function () {
            var spy = spyOn(viewAdapter, 'setViewValue');
            directive.ngrxFormControlState = __assign({}, INITIAL_STATE, { id: FORM_CONTROL_ID + '1' });
            expect(spy).toHaveBeenCalledWith(INITIAL_STATE.value);
        });
        it('should write the value when the state value does not change but the id does after a new view value was reported', function () {
            var newValue = 'new value';
            onChange(newValue);
            var spy = spyOn(viewAdapter, 'setViewValue');
            directive.ngrxFormControlState = __assign({}, INITIAL_STATE, { id: FORM_CONTROL_ID + '1', value: newValue });
            expect(spy).toHaveBeenCalledWith(newValue);
        });
        it('should write the value when the state value does not change but the id does after an undefined view value was reported', function () {
            var newValue = undefined;
            onChange(newValue);
            var spy = spyOn(viewAdapter, 'setViewValue');
            directive.ngrxFormControlState = __assign({}, INITIAL_STATE, { id: FORM_CONTROL_ID + '1', value: newValue });
            expect(spy).toHaveBeenCalledWith(newValue);
        });
        it("should dispatch a " + actions_1.SetValueAction.name + " if the view value changes", function (done) {
            actions$.first().subscribe(function (a) {
                expect(a).toEqual(new actions_1.SetValueAction(INITIAL_STATE.id, newValue));
                done();
            });
            var newValue = 'new value';
            onChange(newValue);
        });
        it("should not dispatch a " + actions_1.SetValueAction.name + " if the view value is the same as the state", function (done) {
            actions$.count().subscribe(function (c) {
                expect(c).toEqual(0);
                done();
            });
            onChange(INITIAL_STATE.value);
            actionsSubject.complete();
        });
        it("should dispatch a " + actions_1.MarkAsDirtyAction.name + " if the view value changes when the state is not marked as dirty", function (done) {
            actions$.skip(1).first().subscribe(function (a) {
                expect(a).toEqual(new actions_1.MarkAsDirtyAction(INITIAL_STATE.id));
                done();
            });
            var newValue = 'new value';
            onChange(newValue);
        });
        it("should not dispatch a " + actions_1.MarkAsDirtyAction.name + " if the view value changes when the state is marked as dirty", function (done) {
            actions$.count().subscribe(function (c) {
                expect(c).toEqual(1);
                done();
            });
            directive.ngrxFormControlState = __assign({}, INITIAL_STATE, { isDirty: true, isPristine: false });
            var newValue = 'new value';
            onChange(newValue);
            actionsSubject.complete();
        });
        it('should write the value when the state changes to the same value that was reported from the view before', function () {
            var newValue = 'new value';
            onChange(newValue);
            directive.ngrxFormControlState = __assign({}, INITIAL_STATE, { value: newValue });
            directive.ngrxFormControlState = INITIAL_STATE;
            var spy = spyOn(viewAdapter, 'setViewValue');
            directive.ngrxFormControlState = __assign({}, INITIAL_STATE, { value: newValue });
            expect(spy).toHaveBeenCalledWith(newValue);
        });
        it('should correctly set the initial values if a value converter is set after the initial state', function () {
            var convertedValue = ['A'];
            viewAdapter = __assign({}, viewAdapter, { setViewValue: function (v) { return expect(v).toEqual(convertedValue); } });
            directive = new directive_1.NgrxFormControlDirective(elementRef, document, actionsSubject, [viewAdapter], []);
            directive.ngrxFormControlState = INITIAL_STATE;
            directive.ngrxValueConverter = {
                convertStateToViewValue: function () { return convertedValue; },
                convertViewToStateValue: function (s) { return s; },
            };
            directive.ngOnInit();
        });
    });
    describe('ngrxUpdateOn "blur"', function () {
        beforeEach(function () {
            directive.ngOnInit();
            directive.ngrxFormControlState = __assign({}, INITIAL_STATE, { isTouched: true, isUntouched: false });
            directive.ngrxUpdateOn = 'blur';
        });
        it('should dispatch an action on blur if the view value has changed with ngrxUpdateOn "blur"', function (done) {
            actions$.first().subscribe(function (a) {
                expect(a).toEqual(new actions_1.SetValueAction(INITIAL_STATE.id, newValue));
                done();
            });
            var newValue = 'new value';
            onChange(newValue);
            onTouched();
        });
        it('should not dispatch an action on blur if the view value has not changed with ngrxUpdateOn "blur"', function (done) {
            actions$.count().subscribe(function (c) {
                expect(c).toEqual(0);
                done();
            });
            onTouched();
            actionsSubject.complete();
        });
        it('should not dispatch an action if the view value changes with ngrxUpdateOn "blur"', function (done) {
            actions$.count().subscribe(function (c) {
                expect(c).toEqual(0);
                done();
            });
            var newValue = 'new value';
            onChange(newValue);
            actionsSubject.complete();
        });
        it('should not write the value when the state value does not change', function () {
            var newValue = 'new value';
            onChange(newValue);
            var spy = spyOn(viewAdapter, 'setViewValue');
            directive.ngrxFormControlState = __assign({}, INITIAL_STATE);
            expect(spy).not.toHaveBeenCalled();
        });
    });
    describe('value conversion', function () {
        var VIEW_VALUE = new Date(0);
        var STATE_VALUE = '1970-01-01T00:00:00.000Z';
        beforeEach(function () {
            directive.ngOnInit();
            directive.ngrxValueConverter = value_converter_1.NgrxValueConverters.dateToISOString;
        });
        it('should convert the state value when the state changes', function () {
            var spy = spyOn(viewAdapter, 'setViewValue');
            directive.ngrxFormControlState = __assign({}, INITIAL_STATE, { value: STATE_VALUE });
            expect(spy).toHaveBeenCalledWith(VIEW_VALUE);
        });
        it('should convert the view value if it changes', function (done) {
            actions$.first().subscribe(function (a) {
                expect(a).toEqual(new actions_1.SetValueAction(INITIAL_STATE.id, STATE_VALUE));
                done();
            });
            onChange(VIEW_VALUE);
        });
        it('should not write the value when the state value does not change with conversion', function () {
            directive.ngrxFormControlState = __assign({}, INITIAL_STATE, { value: STATE_VALUE });
            var spy = spyOn(viewAdapter, 'setViewValue');
            directive.ngrxFormControlState = __assign({}, INITIAL_STATE, { value: STATE_VALUE });
            expect(spy).not.toHaveBeenCalled();
        });
        it('should not dispatch an action if the view value is the same as the state with conversion', function (done) {
            actions$.count().subscribe(function (c) {
                expect(c).toEqual(0);
                done();
            });
            directive.ngrxFormControlState = __assign({}, INITIAL_STATE, { value: STATE_VALUE });
            onChange(VIEW_VALUE);
            actionsSubject.complete();
        });
    });
    describe('focus tracking', function () {
        describe('is enabled', function () {
            beforeEach(function () {
                directive.ngrxEnableFocusTracking = true;
            });
            it('should focus the element if state is focused initially', function () {
                directive.ngrxFormControlState = __assign({}, INITIAL_STATE, { isFocused: true, isUnfocused: false });
                directive.ngOnInit();
                expect(nativeElement.focus).toHaveBeenCalled();
            });
            it('should blur the element if state is unfocused initially', function () {
                directive.ngOnInit();
                expect(nativeElement.blur).toHaveBeenCalled();
            });
            it('should focus the element if state becomes focused', function () {
                directive.ngOnInit();
                expect(nativeElement.focus).not.toHaveBeenCalled();
                directive.ngrxFormControlState = __assign({}, INITIAL_STATE, { isFocused: true, isUnfocused: false });
                expect(nativeElement.focus).toHaveBeenCalled();
            });
            it('should blur the element if state becomes unfocused', function () {
                directive.ngrxFormControlState = __assign({}, INITIAL_STATE, { isFocused: true, isUnfocused: false });
                directive.ngOnInit();
                expect(nativeElement.blur).not.toHaveBeenCalled();
                directive.ngrxFormControlState = INITIAL_STATE;
                expect(nativeElement.blur).toHaveBeenCalled();
            });
            it("should dispatch a " + actions_1.FocusAction + " when element becomes focused and state is not focused", function (done) {
                directive.ngOnInit();
                actions$.first().subscribe(function (a) {
                    expect(a).toEqual(new actions_1.FocusAction(INITIAL_STATE.id));
                    done();
                });
                document.activeElement = nativeElement;
                directive.onFocusChange();
                actionsSubject.complete();
            });
            it('should not dispatch an action when element becomes focused and state is focused', function (done) {
                directive.ngOnInit();
                actions$.count().subscribe(function (c) {
                    expect(c).toEqual(0);
                    done();
                });
                directive.ngrxFormControlState = __assign({}, INITIAL_STATE, { isFocused: true, isUnfocused: false });
                document.activeElement = nativeElement;
                directive.onFocusChange();
                actionsSubject.complete();
            });
            it("should dispatch an " + actions_1.UnfocusAction + " when element becomes unfocused and state is focused", function (done) {
                directive.ngOnInit();
                actions$.first().subscribe(function (a) {
                    expect(a).toEqual(new actions_1.UnfocusAction(INITIAL_STATE.id));
                    done();
                });
                directive.ngrxFormControlState = __assign({}, INITIAL_STATE, { isFocused: true, isUnfocused: false });
                directive.onFocusChange();
                actionsSubject.complete();
            });
            it('should not dispatch an action when element becomes unfocused and state is unfocused', function (done) {
                directive.ngOnInit();
                actions$.count().subscribe(function (c) {
                    expect(c).toEqual(0);
                    done();
                });
                directive.onFocusChange();
                actionsSubject.complete();
            });
        });
        describe('is disabled', function () {
            it('should not focus the element initially', function () {
                directive.ngrxFormControlState = __assign({}, INITIAL_STATE, { isFocused: true, isUnfocused: false });
                directive.ngOnInit();
                expect(nativeElement.focus).not.toHaveBeenCalled();
            });
            it('should not blur the element initially', function () {
                directive.ngOnInit();
                expect(nativeElement.blur).not.toHaveBeenCalled();
            });
            it('should not focus the element if state becomes focused', function () {
                directive.ngOnInit();
                directive.ngrxFormControlState = __assign({}, INITIAL_STATE, { isFocused: true, isUnfocused: false });
                expect(nativeElement.focus).not.toHaveBeenCalled();
            });
            it('should not blur the element if state becomes unfocused', function () {
                directive.ngrxFormControlState = __assign({}, INITIAL_STATE, { isFocused: true, isUnfocused: false });
                directive.ngOnInit();
                directive.ngrxFormControlState = INITIAL_STATE;
                expect(nativeElement.blur).not.toHaveBeenCalled();
            });
            it("should not dispatch an action when element becomes focused and state is not focused", function (done) {
                directive.ngOnInit();
                actions$.count().subscribe(function (c) {
                    expect(c).toEqual(0);
                    done();
                });
                document.activeElement = nativeElement;
                directive.onFocusChange();
                actionsSubject.complete();
            });
            it('should not dispatch an action when element becomes focused and state is focused', function (done) {
                directive.ngOnInit();
                actions$.count().subscribe(function (c) {
                    expect(c).toEqual(0);
                    done();
                });
                directive.ngrxFormControlState = __assign({}, INITIAL_STATE, { isFocused: true, isUnfocused: false });
                document.activeElement = nativeElement;
                directive.onFocusChange();
                actionsSubject.complete();
            });
            it("should not dispatch an action when element becomes unfocused and state is focused", function (done) {
                directive.ngOnInit();
                actions$.count().subscribe(function (c) {
                    expect(c).toEqual(0);
                    done();
                });
                directive.ngrxFormControlState = __assign({}, INITIAL_STATE, { isFocused: true, isUnfocused: false });
                directive.onFocusChange();
                actionsSubject.complete();
            });
            it('should not dispatch an action when element becomes unfocused and state is unfocused', function (done) {
                directive.ngOnInit();
                actions$.count().subscribe(function (c) {
                    expect(c).toEqual(0);
                    done();
                });
                directive.onFocusChange();
                actionsSubject.complete();
            });
        });
    });
    describe('non-browser platforms', function () {
        beforeEach(function () {
            directive = new directive_1.NgrxFormControlDirective(elementRef, null, actionsSubject, [viewAdapter], []);
            directive.ngrxFormControlState = INITIAL_STATE;
        });
        it('should throw when trying to enable focus tracking', function () {
            expect(function () { return directive.ngrxEnableFocusTracking = true; }).toThrowError();
        });
    });
    // TODO: throwing error on undefined state
    // TODO: mark as touched
    // TODO: disabling and enabling
    // TODO: last keydown code tracking
});
//# sourceMappingURL=directive.spec.js.map