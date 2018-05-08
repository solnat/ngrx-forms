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
var core_1 = require("@angular/core");
var testing_1 = require("@angular/core/testing");
var state_1 = require("./state");
var status_css_classes_directive_1 = require("./status-css-classes.directive");
var TestComponent = (function () {
    function TestComponent() {
    }
    return TestComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TestComponent.prototype, "state", void 0);
TestComponent = __decorate([
    core_1.Component({
        // tslint:disable-next-line:component-selector
        selector: 'classes-test',
        template: "\n<form [ngrxFormState]=\"state\">\n  <input type=\"text\" [ngrxFormControlState]=\"state.controls.inner\" />\n  <select [ngrxFormControlState]=\"state.controls.inner\"><option value=\"A\">A</option></select>\n</form>\n  ",
    })
], TestComponent);
exports.TestComponent = TestComponent;
describe(status_css_classes_directive_1.NgrxStatusCssClassesDirective.name, function () {
    var component;
    var fixture;
    var formElement;
    var inputElement;
    var selectElement;
    var FORM_CONTROL_ID = 'test ID';
    var INITIAL_STATE = state_1.createFormGroupState(FORM_CONTROL_ID, { inner: 'A' });
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                status_css_classes_directive_1.NgrxStatusCssClassesDirective,
                TestComponent,
            ],
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        component.state = INITIAL_STATE;
        fixture.detectChanges();
        var nativeElement = fixture.nativeElement;
        formElement = nativeElement.querySelector('form');
        inputElement = nativeElement.querySelector('input');
        selectElement = nativeElement.querySelector('select');
    });
    describe('should select the correct classes for isValid', function () {
        it('for form elements', function () {
            expect(formElement.classList).toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isValid);
            expect(formElement.classList).not.toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isInvalid);
        });
        it('for input elements', function () {
            expect(inputElement.classList).toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isValid);
            expect(inputElement.classList).not.toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isInvalid);
        });
        it('for select elements', function () {
            expect(selectElement.classList).toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isValid);
            expect(selectElement.classList).not.toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isInvalid);
        });
    });
    describe('should select the correct classes for isInvalid', function () {
        beforeEach(function () {
            component.state = __assign({}, component.state, { errors: {
                    _inner: {
                        required: true,
                    },
                }, isValid: false, isInvalid: true, controls: __assign({}, component.state.controls, { inner: __assign({}, component.state.controls.inner, { errors: {
                            required: true,
                        }, isValid: false, isInvalid: true }) }) });
            fixture.detectChanges();
        });
        it('for form elements', function () {
            expect(formElement.classList).not.toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isValid);
            expect(formElement.classList).toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isInvalid);
        });
        it('for input elements', function () {
            expect(inputElement.classList).not.toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isValid);
            expect(inputElement.classList).toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isInvalid);
        });
        it('for select elements', function () {
            expect(selectElement.classList).not.toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isValid);
            expect(selectElement.classList).toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isInvalid);
        });
    });
    describe('should select the correct classes for isDirty', function () {
        beforeEach(function () {
            component.state = __assign({}, component.state, { isDirty: true, isPristine: false, controls: __assign({}, component.state.controls, { inner: __assign({}, component.state.controls.inner, { isDirty: true, isPristine: false }) }) });
            fixture.detectChanges();
        });
        it('for form elements', function () {
            expect(formElement.classList).toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isDirty);
            expect(formElement.classList).not.toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isPristine);
        });
        it('for input elements', function () {
            expect(inputElement.classList).toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isDirty);
            expect(inputElement.classList).not.toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isPristine);
        });
        it('for select elements', function () {
            expect(selectElement.classList).toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isDirty);
            expect(selectElement.classList).not.toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isPristine);
        });
    });
    describe('should select the correct classes for isPristine', function () {
        it('for form elements', function () {
            expect(formElement.classList).not.toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isDirty);
            expect(formElement.classList).toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isPristine);
        });
        it('for input elements', function () {
            expect(inputElement.classList).not.toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isDirty);
            expect(inputElement.classList).toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isPristine);
        });
        it('for select elements', function () {
            expect(selectElement.classList).not.toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isDirty);
            expect(selectElement.classList).toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isPristine);
        });
    });
    describe('should select the correct classes for isTouched', function () {
        beforeEach(function () {
            component.state = __assign({}, component.state, { isTouched: true, isUntouched: false, controls: __assign({}, component.state.controls, { inner: __assign({}, component.state.controls.inner, { isTouched: true, isUntouched: false }) }) });
            fixture.detectChanges();
        });
        it('for form elements', function () {
            expect(formElement.classList).toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isTouched);
            expect(formElement.classList).not.toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isUntouched);
        });
        it('for input elements', function () {
            expect(inputElement.classList).toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isTouched);
            expect(inputElement.classList).not.toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isUntouched);
        });
        it('for select elements', function () {
            expect(selectElement.classList).toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isTouched);
            expect(selectElement.classList).not.toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isUntouched);
        });
    });
    describe('should select the correct classes for isUntouched', function () {
        it('for form elements', function () {
            expect(formElement.classList).not.toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isTouched);
            expect(formElement.classList).toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isUntouched);
        });
        it('for input elements', function () {
            expect(inputElement.classList).not.toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isTouched);
            expect(inputElement.classList).toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isUntouched);
        });
        it('for select elements', function () {
            expect(selectElement.classList).not.toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isTouched);
            expect(selectElement.classList).toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isUntouched);
        });
    });
    describe('should select the correct classes for isSubmitted', function () {
        beforeEach(function () {
            component.state = __assign({}, component.state, { isSubmitted: true, isUnsubmitted: false, controls: __assign({}, component.state.controls, { inner: __assign({}, component.state.controls.inner, { isSubmitted: true, isUnsubmitted: false }) }) });
            fixture.detectChanges();
        });
        it('for form elements', function () {
            expect(formElement.classList).toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isSubmitted);
            expect(formElement.classList).not.toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isUnsubmitted);
        });
        it('for input elements', function () {
            expect(inputElement.classList).toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isSubmitted);
            expect(inputElement.classList).not.toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isUnsubmitted);
        });
        it('for select elements', function () {
            expect(selectElement.classList).toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isSubmitted);
            expect(selectElement.classList).not.toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isUnsubmitted);
        });
    });
    describe('should select the correct classes for isUnsubmitted', function () {
        it('for form elements', function () {
            expect(formElement.classList).not.toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isSubmitted);
            expect(formElement.classList).toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isUnsubmitted);
        });
        it('for input elements', function () {
            expect(inputElement.classList).not.toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isSubmitted);
            expect(inputElement.classList).toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isUnsubmitted);
        });
        it('for select elements', function () {
            expect(selectElement.classList).not.toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isSubmitted);
            expect(selectElement.classList).toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isUnsubmitted);
        });
    });
    describe('should select the correct classes for isValidationPending', function () {
        var markAsValidationPending = function () {
            component.state = __assign({}, component.state, { pendingValidations: ['test'], isValidationPending: true, controls: __assign({}, component.state.controls, { inner: __assign({}, component.state.controls.inner, { pendingValidations: ['test'], isValidationPending: true }) }) });
            fixture.detectChanges();
        };
        it('for form elements', function () {
            expect(formElement.classList).not.toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isValidationPending);
            markAsValidationPending();
            expect(formElement.classList).toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isValidationPending);
        });
        it('for input elements', function () {
            expect(inputElement.classList).not.toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isValidationPending);
            markAsValidationPending();
            expect(inputElement.classList).toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isValidationPending);
        });
        it('for select elements', function () {
            expect(selectElement.classList).not.toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isValidationPending);
            markAsValidationPending();
            expect(selectElement.classList).toContain(status_css_classes_directive_1.NGRX_STATUS_CLASS_NAMES.isValidationPending);
        });
    });
});
//# sourceMappingURL=status-css-classes.directive.e2e.spec.js.map