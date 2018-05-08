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
var NgrxNumberViewAdapter = NgrxNumberViewAdapter_1 = (function () {
    function NgrxNumberViewAdapter(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.onChange = function () { return void 0; };
        this.onTouched = function () { return void 0; };
    }
    Object.defineProperty(NgrxNumberViewAdapter.prototype, "ngrxFormControlState", {
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
    NgrxNumberViewAdapter.prototype.setViewValue = function (value) {
        // The value needs to be normalized for IE9, otherwise it is set to 'null' when null
        var normalizedValue = value === null ? '' : value;
        this.renderer.setProperty(this.elementRef.nativeElement, 'value', normalizedValue);
    };
    NgrxNumberViewAdapter.prototype.setOnChangeCallback = function (fn) {
        this.onChange = fn;
    };
    NgrxNumberViewAdapter.prototype.setOnTouchedCallback = function (fn) {
        this.onTouched = fn;
    };
    NgrxNumberViewAdapter.prototype.setIsDisabled = function (isDisabled) {
        this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
    };
    NgrxNumberViewAdapter.prototype.handleInput = function (event) {
        var value = event.target.value;
        this.onChange(value === '' ? null : parseFloat(value));
    };
    return NgrxNumberViewAdapter;
}());
__decorate([
    core_1.HostListener('blur'),
    __metadata("design:type", Function)
], NgrxNumberViewAdapter.prototype, "onTouched", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], NgrxNumberViewAdapter.prototype, "ngrxFormControlState", null);
__decorate([
    core_1.HostListener('change', ['$event']),
    core_1.HostListener('input', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UIEvent]),
    __metadata("design:returntype", void 0)
], NgrxNumberViewAdapter.prototype, "handleInput", null);
NgrxNumberViewAdapter = NgrxNumberViewAdapter_1 = __decorate([
    core_1.Directive({
        selector: 'input[type=number][ngrxFormControlState]',
        providers: [{
                provide: view_adapter_1.NGRX_FORM_VIEW_ADAPTER,
                useExisting: core_1.forwardRef(function () { return NgrxNumberViewAdapter_1; }),
                multi: true,
            }],
    }),
    __metadata("design:paramtypes", [core_1.Renderer2, core_1.ElementRef])
], NgrxNumberViewAdapter);
exports.NgrxNumberViewAdapter = NgrxNumberViewAdapter;
var NgrxNumberViewAdapter_1;
//# sourceMappingURL=number.js.map