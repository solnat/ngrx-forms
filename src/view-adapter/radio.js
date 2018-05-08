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
var NgrxRadioViewAdapter = NgrxRadioViewAdapter_1 = (function () {
    function NgrxRadioViewAdapter(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.onChange = function () { return void 0; };
        this.onTouched = function () { return void 0; };
    }
    Object.defineProperty(NgrxRadioViewAdapter.prototype, "value", {
        set: function (val) {
            if (val !== this.latestValue) {
                this.latestValue = val;
                if (this.isChecked) {
                    this.onChange();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgrxRadioViewAdapter.prototype, "ngrxFormControlState", {
        set: function (value) {
            if (!value) {
                throw new Error('The control state must not be undefined!');
            }
            if (value.id !== this.elementRef.nativeElement.name) {
                this.renderer.setProperty(this.elementRef.nativeElement, 'name', value.id);
            }
        },
        enumerable: true,
        configurable: true
    });
    NgrxRadioViewAdapter.prototype.ngOnInit = function () {
        this.isChecked = this.elementRef.nativeElement.checked;
    };
    NgrxRadioViewAdapter.prototype.setViewValue = function (value) {
        this.isChecked = value === this.latestValue;
        this.renderer.setProperty(this.elementRef.nativeElement, 'checked', this.isChecked);
    };
    NgrxRadioViewAdapter.prototype.setOnChangeCallback = function (fn) {
        var _this = this;
        this.onChange = function () { return fn(_this.latestValue); };
    };
    NgrxRadioViewAdapter.prototype.setOnTouchedCallback = function (fn) {
        this.onTouched = fn;
    };
    NgrxRadioViewAdapter.prototype.setIsDisabled = function (isDisabled) {
        this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
    };
    return NgrxRadioViewAdapter;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], NgrxRadioViewAdapter.prototype, "value", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], NgrxRadioViewAdapter.prototype, "ngrxFormControlState", null);
__decorate([
    core_1.HostListener('change'),
    __metadata("design:type", Function)
], NgrxRadioViewAdapter.prototype, "onChange", void 0);
__decorate([
    core_1.HostListener('blur'),
    __metadata("design:type", Function)
], NgrxRadioViewAdapter.prototype, "onTouched", void 0);
NgrxRadioViewAdapter = NgrxRadioViewAdapter_1 = __decorate([
    core_1.Directive({
        selector: 'input[type=radio][ngrxFormControlState]',
        providers: [{
                provide: view_adapter_1.NGRX_FORM_VIEW_ADAPTER,
                useExisting: core_1.forwardRef(function () { return NgrxRadioViewAdapter_1; }),
                multi: true,
            }],
    }),
    __metadata("design:paramtypes", [core_1.Renderer2,
        core_1.ElementRef])
], NgrxRadioViewAdapter);
exports.NgrxRadioViewAdapter = NgrxRadioViewAdapter;
var NgrxRadioViewAdapter_1;
//# sourceMappingURL=radio.js.map