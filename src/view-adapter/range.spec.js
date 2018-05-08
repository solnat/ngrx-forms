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
var range_1 = require("./range");
var TEST_ID = 'test ID';
var RangeTestComponent = (function () {
    function RangeTestComponent() {
        this.state = { id: TEST_ID };
    }
    return RangeTestComponent;
}());
RangeTestComponent = __decorate([
    core_1.Component({
        // tslint:disable-next-line:component-selector
        selector: 'range-test',
        template: "\n<input type=\"range\" [ngrxFormControlState]=\"state\" />\n",
    })
], RangeTestComponent);
exports.RangeTestComponent = RangeTestComponent;
describe(range_1.NgrxRangeViewAdapter.name, function () {
    var component;
    var fixture;
    var viewAdapter;
    var element;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                range_1.NgrxRangeViewAdapter,
                RangeTestComponent,
            ],
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(RangeTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        element = fixture.nativeElement.querySelector('input');
        viewAdapter = core_1.getDebugNode(element).injector.get(range_1.NgrxRangeViewAdapter);
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
    it('should set the input\'s value', function () {
        var newValue = 10;
        viewAdapter.setViewValue(newValue);
        expect(element.value).toBe(newValue.toString());
    });
    it('should call the registered function whenever the value changes with a change event', function () {
        var spy = jasmine.createSpy('fn');
        viewAdapter.setOnChangeCallback(spy);
        var newValue = 100;
        element.value = newValue.toString();
        element.dispatchEvent(new Event('change'));
        expect(spy).toHaveBeenCalledWith(newValue);
    });
    it('should call the registered function whenever the value changes with an input event', function () {
        var spy = jasmine.createSpy('fn');
        viewAdapter.setOnChangeCallback(spy);
        var newValue = 100;
        element.value = newValue.toString();
        element.dispatchEvent(new Event('input'));
        expect(spy).toHaveBeenCalledWith(newValue);
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
//# sourceMappingURL=range.spec.js.map