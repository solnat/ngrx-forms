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
var radio_1 = require("./radio");
var TEST_ID = 'test ID';
var OPTION1_VALUE = 'op1';
var OPTION2_VALUE = 'op2';
var RadioTestComponent = (function () {
    function RadioTestComponent() {
        this.stringOptions = ['op1', 'op2'];
        this.numberOptions = [1, 2];
        this.booleanOptions = [true, false];
        this.state = { id: TEST_ID };
        this.trackByIndex = function (index) { return index; };
    }
    return RadioTestComponent;
}());
RadioTestComponent = __decorate([
    core_1.Component({
        // tslint:disable-next-line:component-selector
        selector: 'radio-test',
        template: "\n<input type=\"radio\" value=\"op1\" [ngrxFormControlState]=\"state\" />\n<input type=\"radio\" value=\"op2\" checked=\"checked\" [ngrxFormControlState]=\"state\" />\n\n<input type=\"radio\" *ngFor=\"let o of stringOptions; trackBy: trackByIndex\" [value]=\"o\" [ngrxFormControlState]=\"state\" />\n\n<input type=\"radio\" *ngFor=\"let o of numberOptions; trackBy: trackByIndex\" [value]=\"o\" [ngrxFormControlState]=\"state\" />\n\n<input type=\"radio\" *ngFor=\"let o of booleanOptions; trackBy: trackByIndex\" [value]=\"o\" [ngrxFormControlState]=\"state\" />\n",
    })
], RadioTestComponent);
exports.RadioTestComponent = RadioTestComponent;
describe(radio_1.NgrxRadioViewAdapter.name, function () {
    var component;
    var fixture;
    var viewAdapter1;
    var viewAdapter2;
    var element1;
    var element2;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                radio_1.NgrxRadioViewAdapter,
                RadioTestComponent,
            ],
        }).compileComponents();
    }));
    describe('static options', function () {
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(RadioTestComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            element1 = fixture.nativeElement.querySelectorAll('input')[0];
            element2 = fixture.nativeElement.querySelectorAll('input')[1];
            viewAdapter1 = core_1.getDebugNode(element1).injector.get(radio_1.NgrxRadioViewAdapter);
            viewAdapter2 = core_1.getDebugNode(element2).injector.get(radio_1.NgrxRadioViewAdapter);
        });
        it('should attach the view adapter', function () { return expect(viewAdapter1).toBeDefined(); });
        it('should set the name of the elements', function () {
            expect(element1.name).toBe(TEST_ID);
            expect(element2.name).toBe(TEST_ID);
        });
        it('should set the name of the elements when the state\'s ID changes', function () {
            var newId = 'new ID';
            viewAdapter1.ngrxFormControlState = { id: newId };
            viewAdapter2.ngrxFormControlState = { id: newId };
            fixture.detectChanges();
            expect(element1.name).toBe(newId);
            expect(element2.name).toBe(newId);
        });
        it('should mark the option as checked if same value is written', function () {
            viewAdapter1.setViewValue(OPTION1_VALUE);
            expect(element1.checked).toBe(true);
        });
        it('should mark the option as unchecked if different value is written', function () {
            element1.checked = true;
            viewAdapter1.setViewValue(OPTION2_VALUE);
            expect(element1.checked).toBe(false);
        });
        it('should call the registered function whenever the value changes', function () {
            var spy = jasmine.createSpy('fn');
            viewAdapter1.setOnChangeCallback(spy);
            element1.checked = true;
            element1.dispatchEvent(new Event('change'));
            expect(spy).toHaveBeenCalledWith(OPTION1_VALUE);
        });
        it('should call the registered function whenever the input is blurred', function () {
            var spy = jasmine.createSpy('fn');
            viewAdapter1.setOnTouchedCallback(spy);
            element1.dispatchEvent(new Event('blur'));
            expect(spy).toHaveBeenCalled();
        });
        it('should disable the input', function () {
            viewAdapter1.setIsDisabled(true);
            expect(element1.disabled).toBe(true);
        });
        it('should enable the input', function () {
            element1.disabled = true;
            viewAdapter1.setIsDisabled(false);
            expect(element1.disabled).toBe(false);
        });
        it('should throw if state is undefined', function () {
            expect(function () { return viewAdapter1.ngrxFormControlState = undefined; }).toThrowError();
        });
    });
    describe('dynamic string options', function () {
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(RadioTestComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            element1 = fixture.nativeElement.querySelectorAll('input')[2];
            element2 = fixture.nativeElement.querySelectorAll('input')[3];
            viewAdapter1 = core_1.getDebugNode(element1).injector.get(radio_1.NgrxRadioViewAdapter);
            viewAdapter2 = core_1.getDebugNode(element2).injector.get(radio_1.NgrxRadioViewAdapter);
            viewAdapter1.setViewValue(component.stringOptions[1]);
            viewAdapter2.setViewValue(component.stringOptions[1]);
        });
        it('should mark the option as checked if same value is written', function () {
            viewAdapter1.setViewValue(component.stringOptions[0]);
            viewAdapter2.setViewValue(component.stringOptions[0]);
            expect(element1.checked).toBe(true);
        });
        it('should mark the option as unchecked if different value is written', function () {
            element1.checked = true;
            viewAdapter1.setViewValue(component.stringOptions[1]);
            viewAdapter2.setViewValue(component.stringOptions[1]);
            expect(element1.checked).toBe(false);
        });
        it('should call the registered function whenever the value changes', function () {
            var spy = jasmine.createSpy('fn');
            viewAdapter1.setOnChangeCallback(spy);
            viewAdapter2.setOnChangeCallback(spy);
            element1.checked = true;
            element1.dispatchEvent(new Event('change'));
            expect(spy).toHaveBeenCalledWith(component.stringOptions[0]);
        });
        it('should call the registered function whenever the selected option\'s value changes', function () {
            var spy = jasmine.createSpy('fn');
            viewAdapter1.setOnChangeCallback(spy);
            viewAdapter2.setOnChangeCallback(spy);
            var newValue = 'new value';
            component.stringOptions[1] = newValue;
            fixture.detectChanges();
            expect(spy).toHaveBeenCalledWith(newValue);
        });
        it('should not call the registered function whenever an unselected option\'s value changes', function () {
            var spy = jasmine.createSpy('fn');
            viewAdapter1.setOnChangeCallback(spy);
            viewAdapter2.setOnChangeCallback(spy);
            var newValue = 'new value';
            component.stringOptions[0] = newValue;
            fixture.detectChanges();
            expect(spy).not.toHaveBeenCalled();
        });
        it('should create new options dynamically', function () {
            var spy = jasmine.createSpy('fn');
            viewAdapter1.setOnChangeCallback(spy);
            viewAdapter2.setOnChangeCallback(spy);
            var newValue = 'op3';
            component.stringOptions.push(newValue);
            fixture.detectChanges();
            var newElement = fixture.nativeElement.querySelectorAll('input')[4];
            var newViewAdapter = core_1.getDebugNode(newElement).injector.get(radio_1.NgrxRadioViewAdapter);
            newViewAdapter.setOnChangeCallback(spy);
            newElement.checked = true;
            newElement.dispatchEvent(new Event('change'));
            expect(spy).toHaveBeenCalledWith(newValue);
        });
    });
    describe('dynamic number options', function () {
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(RadioTestComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            element1 = fixture.nativeElement.querySelectorAll('input')[4];
            element2 = fixture.nativeElement.querySelectorAll('input')[5];
            viewAdapter1 = core_1.getDebugNode(element1).injector.get(radio_1.NgrxRadioViewAdapter);
            viewAdapter2 = core_1.getDebugNode(element2).injector.get(radio_1.NgrxRadioViewAdapter);
            viewAdapter1.setViewValue(component.numberOptions[1]);
            viewAdapter2.setViewValue(component.numberOptions[1]);
        });
        it('should mark the option as checked if same value is written', function () {
            viewAdapter1.setViewValue(component.numberOptions[0]);
            viewAdapter2.setViewValue(component.numberOptions[0]);
            expect(element1.checked).toBe(true);
        });
        it('should mark the option as unchecked if different value is written', function () {
            element1.checked = true;
            viewAdapter1.setViewValue(component.numberOptions[1]);
            viewAdapter2.setViewValue(component.numberOptions[1]);
            expect(element1.checked).toBe(false);
        });
        it('should call the registered function whenever the value changes', function () {
            var spy = jasmine.createSpy('fn');
            viewAdapter1.setOnChangeCallback(spy);
            viewAdapter2.setOnChangeCallback(spy);
            element1.checked = true;
            element1.dispatchEvent(new Event('change'));
            expect(spy).toHaveBeenCalledWith(component.numberOptions[0]);
        });
        it('should call the registered function whenever the selected option\'s value changes', function () {
            var spy = jasmine.createSpy('fn');
            viewAdapter1.setOnChangeCallback(spy);
            viewAdapter2.setOnChangeCallback(spy);
            var newValue = 3;
            component.numberOptions[1] = newValue;
            fixture.detectChanges();
            expect(spy).toHaveBeenCalledWith(newValue);
        });
        it('should not call the registered function whenever an unselected option\'s value changes', function () {
            var spy = jasmine.createSpy('fn');
            viewAdapter1.setOnChangeCallback(spy);
            viewAdapter2.setOnChangeCallback(spy);
            var newValue = 3;
            component.numberOptions[0] = newValue;
            fixture.detectChanges();
            expect(spy).not.toHaveBeenCalled();
        });
        it('should create new options dynamically', function () {
            var spy = jasmine.createSpy('fn');
            viewAdapter1.setOnChangeCallback(spy);
            viewAdapter2.setOnChangeCallback(spy);
            var newValue = 3;
            component.numberOptions.push(newValue);
            fixture.detectChanges();
            var newElement = fixture.nativeElement.querySelectorAll('input')[6];
            var newViewAdapter = core_1.getDebugNode(newElement).injector.get(radio_1.NgrxRadioViewAdapter);
            newViewAdapter.setOnChangeCallback(spy);
            newElement.checked = true;
            newElement.dispatchEvent(new Event('change'));
            expect(spy).toHaveBeenCalledWith(newValue);
        });
    });
    describe('dynamic boolean options', function () {
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(RadioTestComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            element1 = fixture.nativeElement.querySelectorAll('input')[6];
            element2 = fixture.nativeElement.querySelectorAll('input')[7];
            viewAdapter1 = core_1.getDebugNode(element1).injector.get(radio_1.NgrxRadioViewAdapter);
            viewAdapter2 = core_1.getDebugNode(element2).injector.get(radio_1.NgrxRadioViewAdapter);
            viewAdapter1.setViewValue(component.booleanOptions[1]);
            viewAdapter2.setViewValue(component.booleanOptions[1]);
        });
        it('should mark the option as checked if same value is written', function () {
            viewAdapter1.setViewValue(component.booleanOptions[0]);
            viewAdapter2.setViewValue(component.booleanOptions[0]);
            expect(element1.checked).toBe(true);
        });
        it('should mark the option as unchecked if different value is written', function () {
            element1.checked = true;
            viewAdapter1.setViewValue(component.booleanOptions[1]);
            viewAdapter2.setViewValue(component.booleanOptions[1]);
            expect(element1.checked).toBe(false);
        });
        it('should call the registered function whenever the value changes', function () {
            var spy = jasmine.createSpy('fn');
            viewAdapter1.setOnChangeCallback(spy);
            viewAdapter2.setOnChangeCallback(spy);
            element1.checked = true;
            element1.dispatchEvent(new Event('change'));
            expect(spy).toHaveBeenCalledWith(component.booleanOptions[0]);
        });
        it('should call the registered function whenever the selected option\'s value changes', function () {
            var spy = jasmine.createSpy('fn');
            viewAdapter1.setOnChangeCallback(spy);
            viewAdapter2.setOnChangeCallback(spy);
            var newValue = true;
            component.booleanOptions[1] = newValue;
            fixture.detectChanges();
            expect(spy).toHaveBeenCalledWith(newValue);
        });
        it('should not call the registered function whenever an unselected option\'s value changes', function () {
            var spy = jasmine.createSpy('fn');
            viewAdapter1.setOnChangeCallback(spy);
            viewAdapter2.setOnChangeCallback(spy);
            var newValue = true;
            component.booleanOptions[0] = newValue;
            fixture.detectChanges();
            expect(spy).not.toHaveBeenCalled();
        });
        it('should create new options dynamically', function () {
            var spy = jasmine.createSpy('fn');
            viewAdapter1.setOnChangeCallback(spy);
            viewAdapter2.setOnChangeCallback(spy);
            var newValue = true;
            component.booleanOptions.push(newValue);
            fixture.detectChanges();
            var newElement = fixture.nativeElement.querySelectorAll('input')[8];
            var newViewAdapter = core_1.getDebugNode(newElement).injector.get(radio_1.NgrxRadioViewAdapter);
            newViewAdapter.setOnChangeCallback(spy);
            newElement.checked = true;
            newElement.dispatchEvent(new Event('change'));
            expect(spy).toHaveBeenCalledWith(newValue);
        });
    });
});
//# sourceMappingURL=radio.spec.js.map