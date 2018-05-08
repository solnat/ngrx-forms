"use strict";
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
require("rxjs/add/operator/first");
require("rxjs/add/operator/skip");
var core_1 = require("@angular/core");
var testing_1 = require("@angular/core/testing");
var store_1 = require("@ngrx/store");
var Subject_1 = require("rxjs/Subject");
var actions_1 = require("../../actions");
var module_1 = require("../../module");
var state_1 = require("../../state");
var SELECT_OPTIONS = ['op1', 'op2'];
var SelectComponent = (function () {
    function SelectComponent() {
        this.options = SELECT_OPTIONS;
    }
    return SelectComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], SelectComponent.prototype, "state", void 0);
SelectComponent = __decorate([
    core_1.Component({
        // tslint:disable-next-line:component-selector
        selector: 'select-test',
        template: '<select [ngrxFormControlState]="state"><option *ngFor="let o of options" [value]="o">{{o}}</option></select>',
    })
], SelectComponent);
exports.SelectComponent = SelectComponent;
var SelectFallbackComponent = (function () {
    function SelectFallbackComponent() {
        this.options = SELECT_OPTIONS;
    }
    return SelectFallbackComponent;
}());
SelectFallbackComponent = __decorate([
    core_1.Component({
        // tslint:disable-next-line:component-selector
        selector: 'select-test-fallback',
        template: '<select><option *ngFor="let o of options" [value]="o">{{o}} Label</option></select>',
    })
], SelectFallbackComponent);
exports.SelectFallbackComponent = SelectFallbackComponent;
describe(SelectComponent.name, function () {
    var component;
    var fixture;
    var actionsSubject;
    var actions$;
    var element;
    var option1;
    var option2;
    var FORM_CONTROL_ID = 'test ID';
    var INITIAL_FORM_CONTROL_VALUE = SELECT_OPTIONS[1];
    var INITIAL_STATE = state_1.createFormControlState(FORM_CONTROL_ID, INITIAL_FORM_CONTROL_VALUE);
    beforeEach(function () {
        actionsSubject = new Subject_1.Subject();
        actions$ = actionsSubject; // cast required due to mismatch of lift() function signature
    });
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [module_1.NgrxFormsModule],
            declarations: [SelectComponent, SelectFallbackComponent],
            providers: [{ provide: store_1.ActionsSubject, useValue: actionsSubject }],
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(SelectComponent);
        component = fixture.componentInstance;
        component.state = INITIAL_STATE;
        fixture.detectChanges();
        var nativeElement = fixture.nativeElement;
        element = nativeElement.querySelector('select');
        option1 = nativeElement.querySelectorAll('option')[0];
        option2 = nativeElement.querySelectorAll('option')[1];
    });
    it('should select the correct option initially', function () {
        expect(option2.selected).toBe(true);
    });
    it("should trigger a " + actions_1.SetValueAction.name + " with the selected value when an option is selected", function (done) {
        actions$.first().subscribe(function (a) {
            expect(a.type).toBe(actions_1.SetValueAction.TYPE);
            expect(a.payload.value).toBe(SELECT_OPTIONS[0]);
            done();
        });
        element.selectedIndex = 0;
        element.dispatchEvent(new Event('change'));
    });
    it("should trigger a " + actions_1.MarkAsDirtyAction.name + " when an option is selected", function (done) {
        actions$.skip(1).first().subscribe(function (a) {
            expect(a.type).toBe(actions_1.MarkAsDirtyAction.TYPE);
            done();
        });
        element.selectedIndex = 0;
        element.dispatchEvent(new Event('change'));
    });
    it('should set the value attribute for options without associated form state', function () {
        var fallbackFixture = testing_1.TestBed.createComponent(SelectFallbackComponent);
        fallbackFixture.detectChanges();
        var nativeElement = fallbackFixture.nativeElement;
        element = nativeElement.querySelector('select');
        option1 = nativeElement.querySelectorAll('option')[0];
        option2 = nativeElement.querySelectorAll('option')[1];
        expect(option1.value).toBe(SELECT_OPTIONS[0]);
        expect(option2.value).toBe(SELECT_OPTIONS[1]);
    });
});
var SELECT_NUMBER_OPTIONS = [1, 2];
var NumberSelectComponent = (function () {
    function NumberSelectComponent() {
        this.options = SELECT_NUMBER_OPTIONS;
    }
    return NumberSelectComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NumberSelectComponent.prototype, "state", void 0);
NumberSelectComponent = __decorate([
    core_1.Component({
        // tslint:disable-next-line:component-selector
        selector: 'select-test',
        template: '<select [ngrxFormControlState]="state"><option *ngFor="let o of options" [value]="o">{{o}}</option></select>',
    })
], NumberSelectComponent);
exports.NumberSelectComponent = NumberSelectComponent;
describe(NumberSelectComponent.name, function () {
    var component;
    var fixture;
    var actionsSubject;
    var actions$;
    var element;
    var option1;
    var option2;
    var FORM_CONTROL_ID = 'test ID';
    var INITIAL_FORM_CONTROL_VALUE = SELECT_NUMBER_OPTIONS[1];
    var INITIAL_STATE = state_1.createFormControlState(FORM_CONTROL_ID, INITIAL_FORM_CONTROL_VALUE);
    beforeEach(function () {
        actionsSubject = new Subject_1.Subject();
        actions$ = actionsSubject; // cast required due to mismatch of lift() function signature
    });
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [module_1.NgrxFormsModule],
            declarations: [NumberSelectComponent],
            providers: [{ provide: store_1.ActionsSubject, useValue: actionsSubject }],
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(NumberSelectComponent);
        component = fixture.componentInstance;
        component.state = INITIAL_STATE;
        fixture.detectChanges();
        var nativeElement = fixture.nativeElement;
        element = nativeElement.querySelector('select');
        option1 = element.querySelectorAll('option')[0];
        option2 = element.querySelectorAll('option')[1];
    });
    it('should select the correct option initially', function () {
        expect(option2.selected).toBe(true);
    });
    it("should trigger a " + actions_1.SetValueAction.name + " with the selected value when an option is selected", function (done) {
        actions$.first().subscribe(function (a) {
            expect(a.type).toBe(actions_1.SetValueAction.TYPE);
            expect(a.payload.value).toBe(SELECT_NUMBER_OPTIONS[0]);
            done();
        });
        element.selectedIndex = 0;
        element.dispatchEvent(new Event('change'));
    });
    it("should trigger a " + actions_1.MarkAsDirtyAction.name + " when an option is selected", function (done) {
        actions$.skip(1).first().subscribe(function (a) {
            expect(a.type).toBe(actions_1.MarkAsDirtyAction.TYPE);
            done();
        });
        element.selectedIndex = 0;
        element.dispatchEvent(new Event('change'));
    });
});
//# sourceMappingURL=select.spec.js.map