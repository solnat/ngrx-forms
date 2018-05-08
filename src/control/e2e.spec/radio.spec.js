"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs");
var core_1 = require("@angular/core");
var testing_1 = require("@angular/core/testing");
var store_1 = require("@ngrx/store");
var Subject_1 = require("rxjs/Subject");
var actions_1 = require("../../actions");
var module_1 = require("../../module");
var state_1 = require("../../state");
var RADIO_OPTIONS = ['op1', 'op2'];
var RadioTestComponent = (function () {
    function RadioTestComponent() {
        this.options = RADIO_OPTIONS;
        this.trackByIndex = function (index) { return index; };
    }
    return RadioTestComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], RadioTestComponent.prototype, "state", void 0);
RadioTestComponent = __decorate([
    core_1.Component({
        // tslint:disable-next-line:component-selector
        selector: 'radio-test',
        template: '<input *ngFor="let o of options; trackBy: trackByIndex" type="radio" [value]="o" [ngrxFormControlState]="state" />',
    })
], RadioTestComponent);
exports.RadioTestComponent = RadioTestComponent;
describe(RadioTestComponent.name, function () {
    var component;
    var fixture;
    var actionsSubject;
    var actions$;
    var element1;
    var element2;
    var FORM_CONTROL_ID = 'test ID';
    var INITIAL_FORM_CONTROL_VALUE = RADIO_OPTIONS[1];
    var INITIAL_STATE = state_1.createFormControlState(FORM_CONTROL_ID, INITIAL_FORM_CONTROL_VALUE);
    beforeEach(function () {
        actionsSubject = new Subject_1.Subject();
        actions$ = actionsSubject; // cast required due to mismatch of lift() function signature
    });
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [module_1.NgrxFormsModule],
            declarations: [RadioTestComponent],
            providers: [{ provide: store_1.ActionsSubject, useValue: actionsSubject }],
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(RadioTestComponent);
        component = fixture.componentInstance;
        component.state = INITIAL_STATE;
        fixture.detectChanges();
        element1 = fixture.nativeElement.querySelectorAll('input')[0];
        element2 = fixture.nativeElement.querySelectorAll('input')[1];
    });
    it('should set the name of all elements to the ID of the state', function () {
        expect(element1.name).toBe(INITIAL_STATE.id);
        expect(element2.name).toBe(INITIAL_STATE.id);
    });
    it('should update the name of the elements if the state\'s ID changes', function () {
        var newId = 'new ID';
        component.state = __assign({}, INITIAL_STATE, { id: newId });
        fixture.detectChanges();
        expect(element1.name).toBe(newId);
        expect(element2.name).toBe(newId);
    });
    it('should select the correct option initially', function () {
        expect(element2.checked).toBe(true);
    });
    it("should trigger a " + actions_1.SetValueAction.name + " with the selected value when an option is selected", function (done) {
        actions$.take(1).subscribe(function (a) {
            expect(a.type).toBe(actions_1.SetValueAction.TYPE);
            expect(a.payload.value).toBe(RADIO_OPTIONS[0]);
            done();
        });
        element1.click();
    });
    it("should trigger a " + actions_1.MarkAsDirtyAction.name + " when an option is selected", function (done) {
        actions$.skip(1).take(1).subscribe(function (a) {
            expect(a.type).toBe(actions_1.MarkAsDirtyAction.TYPE);
            done();
        });
        element1.click();
    });
    it("should trigger " + actions_1.SetValueAction.name + "s and " + actions_1.MarkAsDirtyAction.name + "s when switching between options", function (done) {
        actions$.bufferCount(4).take(1).subscribe(function (_a) {
            var a1 = _a[0], a2 = _a[1], a3 = _a[2], a4 = _a[3];
            expect(a1.type).toBe(actions_1.SetValueAction.TYPE);
            expect(a2.type).toBe(actions_1.MarkAsDirtyAction.TYPE);
            expect(a3.type).toBe(actions_1.SetValueAction.TYPE);
            expect(a4.type).toBe(actions_1.MarkAsDirtyAction.TYPE);
            expect(a1.payload.value).toBe(RADIO_OPTIONS[0]);
            expect(a3.payload.value).toBe(RADIO_OPTIONS[1]);
            done();
        });
        element1.click();
        component.state = __assign({}, component.state, { value: RADIO_OPTIONS[0] });
        fixture.detectChanges();
        element2.click();
    });
    it("should trigger a " + actions_1.SetValueAction.name + " if the value of the selected option changes", function (done) {
        var newValue = 'new value';
        actions$.take(1).subscribe(function (a) {
            expect(a.type).toBe(actions_1.SetValueAction.TYPE);
            expect(a.payload.value).toBe(newValue);
            done();
        });
        component.options[1] = newValue;
        fixture.detectChanges();
    });
    it('should deselect other options when option is selected', function () {
        element1.click();
        expect(element2.checked).toBe(false);
    });
});
//# sourceMappingURL=radio.spec.js.map