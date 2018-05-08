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
var platform_browser_1 = require("@angular/platform-browser");
var view_adapter_1 = require("./view-adapter");
/**
 * We must check whether the agent is Android because composition events
 * behave differently between iOS and Android.
 */
function isAndroid() {
    var userAgent = platform_browser_1.ɵgetDOM() ? platform_browser_1.ɵgetDOM().getUserAgent() : '';
    return /android (\d+)/.test(userAgent.toLowerCase());
}
// tslint:disable:directive-class-suffix
var NgrxDefaultViewAdapter = NgrxDefaultViewAdapter_1 = (function () {
    function NgrxDefaultViewAdapter(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.onChange = function () { return void 0; };
        this.onTouched = function () { return void 0; };
        /** Whether the user is creating a composition string (IME events). */
        this.isComposing = false;
        this.isCompositionSupported = !isAndroid();
    }
    Object.defineProperty(NgrxDefaultViewAdapter.prototype, "ngrxFormControlState", {
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
    NgrxDefaultViewAdapter.prototype.setViewValue = function (value) {
        var normalizedValue = value == null ? '' : value;
        this.renderer.setProperty(this.elementRef.nativeElement, 'value', normalizedValue);
    };
    NgrxDefaultViewAdapter.prototype.setOnChangeCallback = function (fn) {
        this.onChange = fn;
    };
    NgrxDefaultViewAdapter.prototype.setOnTouchedCallback = function (fn) {
        this.onTouched = fn;
    };
    NgrxDefaultViewAdapter.prototype.setIsDisabled = function (isDisabled) {
        this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
    };
    NgrxDefaultViewAdapter.prototype.handleInput = function (event) {
        if (this.isCompositionSupported && this.isComposing) {
            return;
        }
        this.onChange(event.target.value);
    };
    NgrxDefaultViewAdapter.prototype.compositionStart = function () {
        this.isComposing = true;
    };
    NgrxDefaultViewAdapter.prototype.compositionEnd = function (event) {
        this.isComposing = false;
        if (this.isCompositionSupported) {
            this.onChange(event.target.value);
        }
    };
    return NgrxDefaultViewAdapter;
}());
__decorate([
    core_1.HostListener('blur'),
    __metadata("design:type", Function)
], NgrxDefaultViewAdapter.prototype, "onTouched", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], NgrxDefaultViewAdapter.prototype, "ngrxFormControlState", null);
__decorate([
    core_1.HostListener('input', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UIEvent]),
    __metadata("design:returntype", void 0)
], NgrxDefaultViewAdapter.prototype, "handleInput", null);
__decorate([
    core_1.HostListener('compositionstart'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NgrxDefaultViewAdapter.prototype, "compositionStart", null);
__decorate([
    core_1.HostListener('compositionend', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UIEvent]),
    __metadata("design:returntype", void 0)
], NgrxDefaultViewAdapter.prototype, "compositionEnd", null);
NgrxDefaultViewAdapter = NgrxDefaultViewAdapter_1 = __decorate([
    core_1.Directive({
        selector: 'input:not([type=checkbox])[ngrxFormControlState],textarea[ngrxFormControlState]',
        providers: [{
                provide: view_adapter_1.NGRX_FORM_VIEW_ADAPTER,
                useExisting: core_1.forwardRef(function () { return NgrxDefaultViewAdapter_1; }),
                multi: true,
            }],
    }),
    __metadata("design:paramtypes", [core_1.Renderer2, core_1.ElementRef])
], NgrxDefaultViewAdapter);
exports.NgrxDefaultViewAdapter = NgrxDefaultViewAdapter;
var NgrxDefaultViewAdapter_1;
//# sourceMappingURL=default.js.map