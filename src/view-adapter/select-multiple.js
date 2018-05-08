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
var NgrxSelectMultipleViewAdapter = NgrxSelectMultipleViewAdapter_1 = (function () {
    function NgrxSelectMultipleViewAdapter(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.options = {};
        this.optionValues = {};
        this.idCounter = 0;
        this.selectedIds = [];
        this.onChangeFn = function () { return void 0; };
        this.onTouched = function () { return void 0; };
    }
    Object.defineProperty(NgrxSelectMultipleViewAdapter.prototype, "ngrxFormControlState", {
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
    NgrxSelectMultipleViewAdapter.prototype.setViewValue = function (value) {
        var _this = this;
        if (value === null) {
            value = [];
        }
        if (!Array.isArray(value)) {
            throw new Error("the value provided to a NgrxSelectMultipleViewAdapter must be null or an array; got " + value + " of type " + typeof value); // `
        }
        this.selectedIds = value.map(function (v) { return _this.getOptionId(v); }).filter(function (id) { return id !== null; }).map(function (id) { return id; });
        Object.keys(this.options).forEach(function (id) { return _this.options[id].isSelected = _this.selectedIds.indexOf(id) >= 0; });
    };
    NgrxSelectMultipleViewAdapter.prototype.onChange = function () {
        var _this = this;
        this.selectedIds = Object.keys(this.options).filter(function (id) { return _this.options[id].isSelected; });
        var value = this.selectedIds.map(function (id) { return _this.optionValues[id]; });
        this.onChangeFn(value);
    };
    NgrxSelectMultipleViewAdapter.prototype.setOnChangeCallback = function (fn) {
        this.onChangeFn = fn;
    };
    NgrxSelectMultipleViewAdapter.prototype.setOnTouchedCallback = function (fn) {
        this.onTouched = fn;
    };
    NgrxSelectMultipleViewAdapter.prototype.setIsDisabled = function (isDisabled) {
        this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
    };
    NgrxSelectMultipleViewAdapter.prototype.registerOption = function (option) {
        var id = this.idCounter.toString();
        this.options[id] = option;
        this.idCounter += 1;
        return id;
    };
    NgrxSelectMultipleViewAdapter.prototype.updateOptionValue = function (id, value) {
        this.optionValues[id] = value;
        if (this.selectedIds.indexOf(id) >= 0) {
            this.onChange();
        }
    };
    NgrxSelectMultipleViewAdapter.prototype.deregisterOption = function (id) {
        delete this.options[id];
        delete this.optionValues[id];
    };
    NgrxSelectMultipleViewAdapter.prototype.getOptionId = function (value) {
        for (var _i = 0, _a = Array.from(Object.keys(this.optionValues)); _i < _a.length; _i++) {
            var id = _a[_i];
            if (this.optionValues[id] === value) {
                return id;
            }
        }
        return null;
    };
    return NgrxSelectMultipleViewAdapter;
}());
__decorate([
    core_1.HostListener('blur'),
    __metadata("design:type", Function)
], NgrxSelectMultipleViewAdapter.prototype, "onTouched", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], NgrxSelectMultipleViewAdapter.prototype, "ngrxFormControlState", null);
__decorate([
    core_1.HostListener('change'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NgrxSelectMultipleViewAdapter.prototype, "onChange", null);
NgrxSelectMultipleViewAdapter = NgrxSelectMultipleViewAdapter_1 = __decorate([
    core_1.Directive({
        selector: 'select[multiple][ngrxFormControlState]',
        providers: [{
                provide: view_adapter_1.NGRX_FORM_VIEW_ADAPTER,
                useExisting: core_1.forwardRef(function () { return NgrxSelectMultipleViewAdapter_1; }),
                multi: true,
            }],
    }),
    __metadata("design:paramtypes", [core_1.Renderer2, core_1.ElementRef])
], NgrxSelectMultipleViewAdapter);
exports.NgrxSelectMultipleViewAdapter = NgrxSelectMultipleViewAdapter;
var NULL_VIEW_ADAPTER = {
    registerOption: function () { return ''; },
    deregisterOption: function () { return void 0; },
    updateOptionValue: function () { return void 0; },
};
var NULL_RENDERER = {
    setProperty: function () { return void 0; },
};
var NgrxSelectMultipleOption = (function () {
    function NgrxSelectMultipleOption(element, renderer, viewAdapter) {
        this.element = element;
        this.renderer = renderer;
        this.viewAdapter = viewAdapter;
        this.renderer = viewAdapter ? renderer : NULL_RENDERER;
        this.viewAdapter = viewAdapter || NULL_VIEW_ADAPTER;
        this.id = this.viewAdapter.registerOption(this);
    }
    Object.defineProperty(NgrxSelectMultipleOption.prototype, "value", {
        set: function (value) {
            this.viewAdapter.updateOptionValue(this.id, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgrxSelectMultipleOption.prototype, "isSelected", {
        get: function () {
            return this.element.nativeElement.selected;
        },
        set: function (selected) {
            this.renderer.setProperty(this.element.nativeElement, 'selected', selected);
        },
        enumerable: true,
        configurable: true
    });
    NgrxSelectMultipleOption.prototype.ngOnInit = function () {
        this.renderer.setProperty(this.element.nativeElement, 'value', this.id);
    };
    NgrxSelectMultipleOption.prototype.ngOnDestroy = function () {
        this.viewAdapter.deregisterOption(this.id);
    };
    return NgrxSelectMultipleOption;
}());
__decorate([
    core_1.Input('value'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], NgrxSelectMultipleOption.prototype, "value", null);
NgrxSelectMultipleOption = __decorate([
    core_1.Directive({
        // tslint:disable-next-line:directive-selector
        selector: 'option',
    }),
    __param(2, core_1.Host()), __param(2, core_1.Optional()),
    __metadata("design:paramtypes", [core_1.ElementRef,
        core_1.Renderer2,
        NgrxSelectMultipleViewAdapter])
], NgrxSelectMultipleOption);
exports.NgrxSelectMultipleOption = NgrxSelectMultipleOption;
var NgrxSelectMultipleViewAdapter_1;
//# sourceMappingURL=select-multiple.js.map