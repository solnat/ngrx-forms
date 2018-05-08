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
var core_1 = require("@angular/core");
/**
 * Lists the available status class names based on the property
 * they are depending on.
 */
exports.NGRX_STATUS_CLASS_NAMES = {
    isValid: 'ngrx-forms-valid',
    isInvalid: 'ngrx-forms-invalid',
    isDirty: 'ngrx-forms-dirty',
    isPristine: 'ngrx-forms-pristine',
    isTouched: 'ngrx-forms-touched',
    isUntouched: 'ngrx-forms-untouched',
    isSubmitted: 'ngrx-forms-submitted',
    isUnsubmitted: 'ngrx-forms-unsubmitted',
    isValidationPending: 'ngrx-forms-validation-pending',
};
var NgrxStatusCssClassesDirective = (function () {
    function NgrxStatusCssClassesDirective() {
    }
    Object.defineProperty(NgrxStatusCssClassesDirective.prototype, "ngrxFormControlState", {
        set: function (state) {
            this.state = state;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgrxStatusCssClassesDirective.prototype, "ngrxFormState", {
        set: function (state) {
            this.state = state;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgrxStatusCssClassesDirective.prototype, "isValid", {
        get: function () {
            return this.state.isValid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgrxStatusCssClassesDirective.prototype, "isInvalid", {
        get: function () {
            return this.state.isInvalid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgrxStatusCssClassesDirective.prototype, "isDirty", {
        get: function () {
            return this.state.isDirty;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgrxStatusCssClassesDirective.prototype, "isPristine", {
        get: function () {
            return this.state.isPristine;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgrxStatusCssClassesDirective.prototype, "isTouched", {
        get: function () {
            return this.state.isTouched;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgrxStatusCssClassesDirective.prototype, "isUntouched", {
        get: function () {
            return this.state.isUntouched;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgrxStatusCssClassesDirective.prototype, "isSubmitted", {
        get: function () {
            return this.state.isSubmitted;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgrxStatusCssClassesDirective.prototype, "isUnsubmitted", {
        get: function () {
            return this.state.isUnsubmitted;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgrxStatusCssClassesDirective.prototype, "isValidationPending", {
        get: function () {
            return this.state.isValidationPending;
        },
        enumerable: true,
        configurable: true
    });
    return NgrxStatusCssClassesDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], NgrxStatusCssClassesDirective.prototype, "ngrxFormControlState", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], NgrxStatusCssClassesDirective.prototype, "ngrxFormState", null);
__decorate([
    core_1.HostBinding("class." + exports.NGRX_STATUS_CLASS_NAMES.isValid),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NgrxStatusCssClassesDirective.prototype, "isValid", null);
__decorate([
    core_1.HostBinding("class." + exports.NGRX_STATUS_CLASS_NAMES.isInvalid),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NgrxStatusCssClassesDirective.prototype, "isInvalid", null);
__decorate([
    core_1.HostBinding("class." + exports.NGRX_STATUS_CLASS_NAMES.isDirty),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NgrxStatusCssClassesDirective.prototype, "isDirty", null);
__decorate([
    core_1.HostBinding("class." + exports.NGRX_STATUS_CLASS_NAMES.isPristine),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NgrxStatusCssClassesDirective.prototype, "isPristine", null);
__decorate([
    core_1.HostBinding("class." + exports.NGRX_STATUS_CLASS_NAMES.isTouched),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NgrxStatusCssClassesDirective.prototype, "isTouched", null);
__decorate([
    core_1.HostBinding("class." + exports.NGRX_STATUS_CLASS_NAMES.isUntouched),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NgrxStatusCssClassesDirective.prototype, "isUntouched", null);
__decorate([
    core_1.HostBinding("class." + exports.NGRX_STATUS_CLASS_NAMES.isSubmitted),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NgrxStatusCssClassesDirective.prototype, "isSubmitted", null);
__decorate([
    core_1.HostBinding("class." + exports.NGRX_STATUS_CLASS_NAMES.isUnsubmitted),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NgrxStatusCssClassesDirective.prototype, "isUnsubmitted", null);
__decorate([
    core_1.HostBinding("class." + exports.NGRX_STATUS_CLASS_NAMES.isValidationPending),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NgrxStatusCssClassesDirective.prototype, "isValidationPending", null);
NgrxStatusCssClassesDirective = __decorate([
    core_1.Directive({
        selector: 'form[ngrxFormState],[ngrxFormControlState]',
    })
], NgrxStatusCssClassesDirective);
exports.NgrxStatusCssClassesDirective = NgrxStatusCssClassesDirective;
//# sourceMappingURL=status-css-classes.directive.js.map