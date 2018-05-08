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
var select_1 = require("./select");
var TEST_ID = 'test ID';
var OPTION1_VALUE = 'op1';
var SelectTestComponent = (function () {
    function SelectTestComponent() {
        this.stringOptions = ['op1', 'op2'];
        this.numberOptions = [1, 2];
        this.booleanOptions = [true, false];
        this.state = { id: TEST_ID };
        this.trackByIndex = function (index) { return index; };
    }
    return SelectTestComponent;
}());
SelectTestComponent = __decorate([
    core_1.Component({
        // tslint:disable-next-line:component-selector
        selector: 'select-test',
        template: "\n<select [ngrxFormControlState]=\"state\">\n  <option value=\"op1\">op1</option>\n  <option value=\"op2\" selected>op2</option>\n</select>\n\n<select [ngrxFormControlState]=\"state\">\n  <option *ngFor=\"let o of stringOptions; trackBy: trackByIndex\" [value]=\"o\">{{o}}</option>\n</select>\n\n<select [ngrxFormControlState]=\"state\">\n  <option *ngFor=\"let o of numberOptions; trackBy: trackByIndex\" [value]=\"o\">{{o}}</option>\n</select>\n\n<select [ngrxFormControlState]=\"state\">\n  <option *ngFor=\"let o of booleanOptions; trackBy: trackByIndex\" [value]=\"o\">{{o}}</option>\n</select>\n",
    })
], SelectTestComponent);
exports.SelectTestComponent = SelectTestComponent;
describe(select_1.NgrxSelectViewAdapter.name, function () {
    var component;
    var fixture;
    var viewAdapter;
    var element;
    var option1;
    var option2;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                select_1.NgrxSelectViewAdapter,
                select_1.NgrxSelectOption,
                SelectTestComponent,
            ],
        }).compileComponents();
    }));
    describe('static options', function () {
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(SelectTestComponent);
            component = fixture.componentInstance;
            var nativeElement = fixture.nativeElement;
            element = nativeElement.querySelector('select');
            option1 = element.querySelectorAll('option')[0];
            option2 = element.querySelectorAll('option')[1];
            viewAdapter = core_1.getDebugNode(element).injector.get(select_1.NgrxSelectViewAdapter);
            fixture.detectChanges();
        });
        it('should attach the view adapter', function () { return expect(viewAdapter).toBeDefined(); });
        it('should mark the option as selected if same value is written', function () {
            viewAdapter.setViewValue(OPTION1_VALUE);
            expect(option1.selected).toBe(true);
        });
        it('should mark the option as unselected if different value is written', function () {
            viewAdapter.setViewValue(OPTION1_VALUE);
            expect(option2.selected).toBe(false);
        });
        it('should call the registered function whenever the value changes', function () {
            var spy = jasmine.createSpy('fn');
            viewAdapter.setOnChangeCallback(spy);
            element.value = '0';
            element.dispatchEvent(new Event('change'));
            expect(spy).toHaveBeenCalledWith(OPTION1_VALUE);
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
    describe('dynamic string options', function () {
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(SelectTestComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            var nativeElement = fixture.nativeElement;
            element = nativeElement.querySelectorAll('select')[1];
            option1 = element.querySelectorAll('option')[0];
            option2 = element.querySelectorAll('option')[1];
            viewAdapter = core_1.getDebugNode(element).injector.get(select_1.NgrxSelectViewAdapter);
            viewAdapter.setViewValue(component.stringOptions[1]);
        });
        it('should set the ID of the element to the ID of the state', function () {
            expect(element.id).toBe(TEST_ID);
        });
        it('should set the ID of the element if the ID of the state changes', function () {
            var newId = 'new ID';
            viewAdapter.ngrxFormControlState = { id: newId };
            fixture.detectChanges();
            expect(element.id).toBe(newId);
        });
        it('should mark the option as selected if same value is written', function () {
            viewAdapter.setViewValue(component.stringOptions[0]);
            expect(option1.selected).toBe(true);
        });
        it('should mark the option as unselected if different value is written', function () {
            viewAdapter.setViewValue(component.stringOptions[0]);
            expect(option2.selected).toBe(false);
        });
        it('should call the registered function whenever the value changes', function () {
            var spy = jasmine.createSpy('fn');
            viewAdapter.setOnChangeCallback(spy);
            element.selectedIndex = 0;
            element.dispatchEvent(new Event('change'));
            expect(spy).toHaveBeenCalledWith(component.stringOptions[0]);
        });
        it('should call the registered function whenever the selected option\'s value changes', function () {
            var spy = jasmine.createSpy('fn');
            viewAdapter.setOnChangeCallback(spy);
            var newValue = 'new value';
            component.stringOptions[1] = newValue;
            fixture.detectChanges();
            expect(spy).toHaveBeenCalledWith(newValue);
        });
        it('should not call the registered function whenever an unselected option\'s value changes', function () {
            var spy = jasmine.createSpy('fn');
            viewAdapter.setOnChangeCallback(spy);
            var newValue = 'new value';
            component.stringOptions[0] = newValue;
            fixture.detectChanges();
            expect(spy).not.toHaveBeenCalled();
        });
        it('should create new options dynamically', function () {
            var spy = jasmine.createSpy('fn');
            viewAdapter.setOnChangeCallback(spy);
            var newValue = 'op3';
            component.stringOptions.push(newValue);
            fixture.detectChanges();
            element.selectedIndex = 2;
            element.dispatchEvent(new Event('change'));
            expect(spy).toHaveBeenCalledWith(newValue);
        });
        it('should remove options dynamically', function () {
            var oldValue = component.stringOptions[1];
            component.stringOptions.pop();
            fixture.detectChanges();
            expect(function () { return viewAdapter.setViewValue(oldValue); }).not.toThrow();
            expect(element.selectedIndex).toEqual(-1);
        });
        it('should select the correct option when a new option is added for the current state value', function () {
            var newValue = 'new value';
            viewAdapter.setViewValue(newValue);
            component.stringOptions.push(newValue);
            fixture.detectChanges();
            var newOption = element.querySelectorAll('option')[2];
            expect(newOption.selected).toBe(true);
        });
    });
    describe('dynamic number options', function () {
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(SelectTestComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            var nativeElement = fixture.nativeElement;
            element = nativeElement.querySelectorAll('select')[2];
            option1 = element.querySelectorAll('option')[0];
            option2 = element.querySelectorAll('option')[1];
            viewAdapter = core_1.getDebugNode(element).injector.get(select_1.NgrxSelectViewAdapter);
            viewAdapter.setViewValue(component.numberOptions[1]);
        });
        it('should mark the option as selected if same value is written', function () {
            viewAdapter.setViewValue(component.numberOptions[0]);
            expect(option1.selected).toBe(true);
        });
        it('should mark the option as unselected if different value is written', function () {
            viewAdapter.setViewValue(component.numberOptions[0]);
            expect(option2.selected).toBe(false);
        });
        it('should call the registered function whenever the value changes', function () {
            var spy = jasmine.createSpy('fn');
            viewAdapter.setOnChangeCallback(spy);
            element.selectedIndex = 0;
            element.dispatchEvent(new Event('change'));
            expect(spy).toHaveBeenCalledWith(component.numberOptions[0]);
        });
        it('should call the registered function whenever the selected option\'s value changes', function () {
            var spy = jasmine.createSpy('fn');
            viewAdapter.setOnChangeCallback(spy);
            var newValue = 3;
            component.numberOptions[1] = newValue;
            fixture.detectChanges();
            expect(spy).toHaveBeenCalledWith(newValue);
        });
        it('should not call the registered function whenever an unselected option\'s value changes', function () {
            var spy = jasmine.createSpy('fn');
            viewAdapter.setOnChangeCallback(spy);
            var newValue = 3;
            component.numberOptions[0] = newValue;
            fixture.detectChanges();
            expect(spy).not.toHaveBeenCalled();
        });
        it('should create new options dynamically', function () {
            var spy = jasmine.createSpy('fn');
            viewAdapter.setOnChangeCallback(spy);
            var newValue = 3;
            component.numberOptions.push(newValue);
            fixture.detectChanges();
            element.selectedIndex = 2;
            element.dispatchEvent(new Event('change'));
            expect(spy).toHaveBeenCalledWith(newValue);
        });
        it('should remove options dynamically', function () {
            var oldValue = component.numberOptions[1];
            component.numberOptions.pop();
            fixture.detectChanges();
            expect(function () { return viewAdapter.setViewValue(oldValue); }).not.toThrow();
            expect(element.selectedIndex).toEqual(-1);
        });
        it('should select the correct option when a new option is added for the current state value', function () {
            var newValue = 3;
            viewAdapter.setViewValue(newValue);
            component.numberOptions.push(newValue);
            fixture.detectChanges();
            var newOption = element.querySelectorAll('option')[2];
            expect(newOption.selected).toBe(true);
        });
    });
    describe('dynamic boolean options', function () {
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(SelectTestComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            var nativeElement = fixture.nativeElement;
            element = nativeElement.querySelectorAll('select')[3];
            option1 = element.querySelectorAll('option')[0];
            option2 = element.querySelectorAll('option')[1];
            viewAdapter = core_1.getDebugNode(element).injector.get(select_1.NgrxSelectViewAdapter);
            viewAdapter.setViewValue(component.booleanOptions[1]);
        });
        it('should mark the option as selected if same value is written', function () {
            viewAdapter.setViewValue(component.booleanOptions[0]);
            expect(option1.selected).toBe(true);
        });
        it('should mark the option as unselected if different value is written', function () {
            viewAdapter.setViewValue(component.booleanOptions[0]);
            expect(option2.selected).toBe(false);
        });
        it('should call the registered function whenever the value changes', function () {
            var spy = jasmine.createSpy('fn');
            viewAdapter.setOnChangeCallback(spy);
            element.selectedIndex = 0;
            element.dispatchEvent(new Event('change'));
            expect(spy).toHaveBeenCalledWith(component.booleanOptions[0]);
        });
        it('should call the registered function whenever the selected option\'s value changes', function () {
            var spy = jasmine.createSpy('fn');
            viewAdapter.setOnChangeCallback(spy);
            var newValue = true;
            component.booleanOptions[1] = newValue;
            fixture.detectChanges();
            expect(spy).toHaveBeenCalledWith(newValue);
        });
        it('should create new options dynamically', function () {
            var spy = jasmine.createSpy('fn');
            viewAdapter.setOnChangeCallback(spy);
            var newValue = true;
            component.booleanOptions.push(newValue);
            fixture.detectChanges();
            element.selectedIndex = 2;
            element.dispatchEvent(new Event('change'));
            expect(spy).toHaveBeenCalledWith(newValue);
        });
        it('should remove options dynamically', function () {
            var oldValue = component.booleanOptions[1];
            component.booleanOptions.pop();
            fixture.detectChanges();
            expect(function () { return viewAdapter.setViewValue(oldValue); }).not.toThrow();
            expect(element.selectedIndex).toEqual(-1);
        });
        it('should select the correct option when a new option is added for the current state value', function () {
            var newValue = false;
            viewAdapter.setViewValue(newValue);
            component.booleanOptions = [true];
            fixture.detectChanges();
            component.booleanOptions.push(newValue);
            fixture.detectChanges();
            var newOption = element.querySelectorAll('option')[1];
            expect(newOption.selected).toBe(true);
        });
    });
});
describe(select_1.NgrxSelectOption.name, function () {
    var viewAdapter;
    var option;
    var renderer;
    beforeEach(function () {
        renderer = jasmine.createSpyObj('renderer2', ['setProperty']);
        viewAdapter = new select_1.NgrxSelectViewAdapter(renderer, {});
        option = new select_1.NgrxSelectOption({}, renderer, viewAdapter);
    });
    it('should work if option is created without view adapter', function () {
        expect(new select_1.NgrxSelectOption({}, {}, null)).toBeDefined();
    });
    it('should set the value to the id of the element', function () {
        option.value = 'value';
        expect(renderer.setProperty).not.toHaveBeenCalledWith(0);
    });
    it('should not set the value to the id if no view adapter is provided', function () {
        option = new select_1.NgrxSelectOption({}, {}, null);
        option.value = 'value';
        expect(renderer.setProperty).not.toHaveBeenCalled();
    });
});
//# sourceMappingURL=select.spec.js.map