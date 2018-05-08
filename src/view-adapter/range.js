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
var view_adapter_1 = require("./view-adapter");
// tslint:disable:directive-class-suffix
var NgrxRangeViewAdapter = NgrxRangeViewAdapter_1 = (function () {
    function NgrxRangeViewAdapter(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.onChange = function () { return void 0; };
        this.onTouched = function () { return void 0; };
    }
    Object.defineProperty(NgrxRangeViewAdapter.prototype, "ngrxFormControlState", {
        set: function (value) {
            if (!value) {
                throw new Error('The control state must not be undefined!');
            }
            if (value.id !== this.elementRef.nativeElement.id) {
                this.renderer.setProperty(this.elementRef.nativeElement, 'id', value.id);
            }
        },
        enumerable: true,
        configurable: true
    });
    NgrxRangeViewAdapter.prototype.setViewValue = function (value) {
        this.renderer.setProperty(this.elementRef.nativeElement, 'value', parseFloat(value));
    };
    NgrxRangeViewAdapter.prototype.setOnChangeCallback = function (fn) {
        this.onChange = fn;
    };
    NgrxRangeViewAdapter.prototype.setOnTouchedCallback = function (fn) {
        this.onTouched = fn;
    };
    NgrxRangeViewAdapter.prototype.setIsDisabled = function (isDisabled) {
        this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
    };
    NgrxRangeViewAdapter.prototype.handleInput = function (event) {
        var value = event.target.value;
        this.onChange(value === '' ? null : parseFloat(value));
    };
    return NgrxRangeViewAdapter;
}());
__decorate([
    core_1.HostListener('blur'),
    __metadata("design:type", Function)
], NgrxRangeViewAdapter.prototype, "onTouched", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], NgrxRangeViewAdapter.prototype, "ngrxFormControlState", null);
__decorate([
    core_1.HostListener('change', ['$event']),
    core_1.HostListener('input', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UIEvent]),
    __metadata("design:returntype", void 0)
], NgrxRangeViewAdapter.prototype, "handleInput", null);
NgrxRangeViewAdapter = NgrxRangeViewAdapter_1 = __decorate([
    core_1.Directive({
        selector: 'input[type=range][ngrxFormControlState]',
        providers: [{
                provide: view_adapter_1.NGRX_FORM_VIEW_ADAPTER,
                useExisting: core_1.forwardRef(function () { return NgrxRangeViewAdapter_1; }),
                multi: true,
            }],
    }),
    __metadata("design:paramtypes", [core_1.Renderer2, core_1.ElementRef])
], NgrxRangeViewAdapter);
exports.NgrxRangeViewAdapter = NgrxRangeViewAdapter;
var NgrxRangeViewAdapter_1;
//# sourceMappingURL=range.js.map