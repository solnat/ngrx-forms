"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var testing_1 = require("@angular/core/testing");
var checkbox_1 = require("./checkbox");
var TEST_ID = 'test ID';
var CheckboxTestComponent = (function () {
    function CheckboxTestComponent() {
        this.state = { id: TEST_ID };
    }
    return CheckboxTestComponent;
}());
CheckboxTestComponent = __decorate([
    core_1.Component({
        // tslint:disable-next-line:component-selector
        selector: 'checkbox-test',
        template: "\n<input type=\"checkbox\" [ngrxFormControlState]=\"state\" />\n",
    })
], CheckboxTestComponent);
exports.CheckboxTestComponent = CheckboxTestComponent;
describe(checkbox_1.NgrxCheckboxViewAdapter.name, function () {
    var component;
    var fixture;
    var viewAdapter;
    var element;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                checkbox_1.NgrxCheckboxViewAdapter,
                CheckboxTestComponent,
            ],
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(CheckboxTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        element = fixture.nativeElement.querySelector('input');
        viewAdapter = core_1.getDebugNode(element).injector.get(checkbox_1.NgrxCheckboxViewAdapter);
    });
    it('should attach the view adapter', function () { return expect(viewAdapter).toBeDefined(); });
    it('should set the ID of the element to the ID of the state', function () {
        expect(element.id).toBe(TEST_ID);
    });
    it('should set the ID of the element if the ID of the state changes', function () {
        var newId = 'new ID';
        viewAdapter.ngrxFormControlState = { id: newId };
        fixture.detectChanges();
        expect(element.id).toBe(newId);
    });
    it('should mark the input as checked', function () {
        var newValue = true;
        viewAdapter.setViewValue(newValue);
        expect(element.checked).toBe(newValue);
    });
    it('should call the registered function whenever the checkbox is checked', function () {
        var spy = jasmine.createSpy('fn');
        viewAdapter.setOnChangeCallback(spy);
        element.checked = true;
        element.dispatchEvent(new Event('change'));
        expect(spy).toHaveBeenCalledWith(true);
    });
    it('should call the registered function whenever the checkbox is unchecked', function () {
        element.checked = true;
        element.dispatchEvent(new Event('change'));
        var spy = jasmine.createSpy('fn');
        viewAdapter.setOnChangeCallback(spy);
        element.checked = false;
        element.dispatchEvent(new Event('change'));
        expect(spy).toHaveBeenCalledWith(false);
    });
    it('should call the registered function whenever the input is blurred', function () {
        var spy = jasmine.createSpy('fn');
        viewAdapter.setOnTouchedCallback(spy);
        element.dispatchEvent(new Event('blur'));
        expect(spy).toHaveBeenCalled();
    });
    it('should disable the input', function () {
        viewAdapter.setIsDisabled(true);
        expect(element.disabled).toBe(true);
    });
    it('should enable the input', function () {
        element.disabled = true;
        viewAdapter.setIsDisabled(false);
        expect(element.disabled).toBe(false);
    });
    it('should throw if state is undefined', function () {
        expect(function () { return viewAdapter.ngrxFormControlState = undefined; }).toThrowError();
    });
});
//# sourceMappingURL=checkbox.spec.js.map