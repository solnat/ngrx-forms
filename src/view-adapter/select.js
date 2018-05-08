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
var view_adapter_1 = require("./view-adapter");
// tslint:disable:directive-class-suffix
var NgrxSelectViewAdapter = NgrxSelectViewAdapter_1 = (function () {
    function NgrxSelectViewAdapter(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.optionMap = {};
        this.idCounter = 0;
        this.selectedId = null;
        this.value = undefined;
        this.onChangeFn = function () { return void 0; };
        this.onTouched = function () { return void 0; };
    }
    Object.defineProperty(NgrxSelectViewAdapter.prototype, "ngrxFormControlState", {
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
    NgrxSelectViewAdapter.prototype.setViewValue = function (value) {
        this.value = value;
        this.selectedId = this.getOptionId(value);
        if (this.selectedId === null) {
            this.renderer.setProperty(this.elementRef.nativeElement, 'selectedIndex', -1);
        }
        this.renderer.setProperty(this.elementRef.nativeElement, 'value', this.selectedId);
    };
    NgrxSelectViewAdapter.prototype.onChange = function (event) {
        this.selectedId = event.target.value;
        var value = this.optionMap[this.selectedId];
        this.value = value;
        this.onChangeFn(value);
    };
    NgrxSelectViewAdapter.prototype.setOnChangeCallback = function (fn) {
        this.onChangeFn = fn;
    };
    NgrxSelectViewAdapter.prototype.setOnTouchedCallback = function (fn) {
        this.onTouched = fn;
    };
    NgrxSelectViewAdapter.prototype.setIsDisabled = function (isDisabled) {
        this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
    };
    NgrxSelectViewAdapter.prototype.createOptionId = function () {
        var id = this.idCounter.toString();
        this.idCounter += 1;
        return id;
    };
    NgrxSelectViewAdapter.prototype.updateOptionValue = function (id, value) {
        this.optionMap[id] = value;
        if (this.selectedId === id) {
            this.onChangeFn(value);
        }
        else if (value === this.value) {
            this.setViewValue(value);
        }
    };
    NgrxSelectViewAdapter.prototype.deregisterOption = function (id) {
        delete this.optionMap[id];
    };
    NgrxSelectViewAdapter.prototype.getOptionId = function (value) {
        for (var _i = 0, _a = Array.from(Object.keys(this.optionMap)); _i < _a.length; _i++) {
            var id = _a[_i];
            if (this.optionMap[id] === value) {
                return id;
            }
        }
        return null;
    };
    return NgrxSelectViewAdapter;
}());
__decorate([
    core_1.HostListener('blur'),
    __metadata("design:type", Function)
], NgrxSelectViewAdapter.prototype, "onTouched", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], NgrxSelectViewAdapter.prototype, "ngrxFormControlState", null);
__decorate([
    core_1.HostListener('change', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UIEvent]),
    __metadata("design:returntype", void 0)
], NgrxSelectViewAdapter.prototype, "onChange", null);
NgrxSelectViewAdapter = NgrxSelectViewAdapter_1 = __decorate([
    core_1.Directive({
        selector: 'select:not([multiple])[ngrxFormControlState]',
        providers: [{
                provide: view_adapter_1.NGRX_FORM_VIEW_ADAPTER,
                useExisting: core_1.forwardRef(function () { return NgrxSelectViewAdapter_1; }),
                multi: true,
            }],
    }),
    __metadata("design:paramtypes", [core_1.Renderer2, core_1.ElementRef])
], NgrxSelectViewAdapter);
exports.NgrxSelectViewAdapter = NgrxSelectViewAdapter;
var NULL_VIEW_ADAPTER = {
    createOptionId: function () { return ''; },
    deregisterOption: function () { return void 0; },
    updateOptionValue: function () { return void 0; },
};
var NULL_RENDERER = {
    setProperty: function () { return void 0; },
};
var NgrxSelectOption = (function () {
    function NgrxSelectOption(element, renderer, viewAdapter) {
        this.element = element;
        this.renderer = renderer;
        this.viewAdapter = viewAdapter;
        this.isInitialized = false;
        this.renderer = viewAdapter ? renderer : NULL_RENDERER;
        this.viewAdapter = viewAdapter || NULL_VIEW_ADAPTER;
        this.id = this.viewAdapter.createOptionId();
    }
    Object.defineProperty(NgrxSelectOption.prototype, "value", {
        set: function (value) {
            // this cannot be done inside ngOnInit since the value property
            // must be already set when the option value is updated in the view
            // adapter and the initial binding of 'value' happens before
            // ngOnInit runs
            if (!this.isInitialized) {
                this.isInitialized = true;
                this.renderer.setProperty(this.element.nativeElement, 'value', this.id);
            }
            this.viewAdapter.updateOptionValue(this.id, value);
        },
        enumerable: true,
        configurable: true
    });
    NgrxSelectOption.prototype.ngOnDestroy = function () {
        this.viewAdapter.deregisterOption(this.id);
    };
    return NgrxSelectOption;
}());
__decorate([
    core_1.Input('value'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], NgrxSelectOption.prototype, "value", null);
NgrxSelectOption = __decorate([
    core_1.Directive({
        // tslint:disable-next-line:directive-selector
        selector: 'option',
    }),
    __param(2, core_1.Host()), __param(2, core_1.Optional()),
    __metadata("design:paramtypes", [core_1.ElementRef,
        core_1.Renderer2,
        NgrxSelectViewAdapter])
], NgrxSelectOption);
exports.NgrxSelectOption = NgrxSelectOption;
var NgrxSelectViewAdapter_1;
//# sourceMappingURL=select.js.map