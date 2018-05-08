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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var select_1 = require("./select");
var select_multiple_1 = require("./select-multiple");
// tslint:disable:directive-class-suffix
var NULL_RENDERER = {
    setProperty: function () { return void 0; },
};
/**
 * This directive is necessary to restore the default behaviour of Angular
 * when an `option` is used without an **ngrx-forms** form state. Since it
 * is not possible to select an element with a selector that considers its
 * parent the `option` directives for `select` and `select[multiple]` will
 * always be applied and therefore overriding the `[value]` binding which
 * disabled Angular's normal behaviour. This directive restores this
 * behaviour if no `select` or `select[multiple]` view adapter is found.
 * This is not a perfect solution since it may interfere with other
 * directives that try to set the `[value]` but that is very unlikely.
 */
var NgrxFallbackSelectOption = (function () {
    function NgrxFallbackSelectOption(element, renderer, viewAdapter, multipleViewAdapter) {
        this.element = element;
        this.renderer = renderer;
        this.renderer = viewAdapter || multipleViewAdapter ? NULL_RENDERER : renderer;
    }
    Object.defineProperty(NgrxFallbackSelectOption.prototype, "value", {
        set: function (value) {
            this.renderer.setProperty(this.element.nativeElement, 'value', value);
        },
        enumerable: true,
        configurable: true
    });
    return NgrxFallbackSelectOption;
}());
__decorate([
    core_1.Input('value'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], NgrxFallbackSelectOption.prototype, "value", null);
NgrxFallbackSelectOption = __decorate([
    core_1.Directive({
        // tslint:disable-next-line:directive-selector
        selector: 'option',
    }),
    __param(2, core_1.Host()), __param(2, core_1.Optional()),
    __param(3, core_1.Host()), __param(3, core_1.Optional()),
    __metadata("design:paramtypes", [core_1.ElementRef,
        core_1.Renderer2,
        select_1.NgrxSelectViewAdapter,
        select_multiple_1.NgrxSelectMultipleViewAdapter])
], NgrxFallbackSelectOption);
exports.NgrxFallbackSelectOption = NgrxFallbackSelectOption;
//# sourceMappingURL=option.js.map