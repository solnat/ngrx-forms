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
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var store_1 = require("@ngrx/store");
var actions_1 = require("../actions");
var util_1 = require("../view-adapter/util");
var view_adapter_1 = require("../view-adapter/view-adapter");
var value_converter_1 = require("./value-converter");
var CHANGE = 'change';
var BLUR = 'blur';
var NgrxFormControlDirective = (function () {
    function NgrxFormControlDirective(el, 
        // for the dom parameter the `null` type must be last to ensure that in the compiled output
        // there is no reference to the Document type to support non-browser platforms
        dom, actionsSubject, viewAdapters, valueAccessors) {
        this.el = el;
        this.dom = dom;
        this.actionsSubject = actionsSubject;
        this.isInitialized = false;
        this.focusTrackingIsEnabled = false;
        this.ngrxUpdateOn = CHANGE;
        this.ngrxValueConverter = value_converter_1.NgrxValueConverters.identity();
        viewAdapters = viewAdapters || [];
        valueAccessors = valueAccessors || [];
        if (valueAccessors.length > 1) {
            throw new Error('More than one custom control value accessor matches!');
        }
        this.viewAdapter = valueAccessors.length > 0
            ? new ControlValueAccessorAdapter(valueAccessors[0])
            : util_1.selectViewAdapter(viewAdapters);
    }
    Object.defineProperty(NgrxFormControlDirective.prototype, "ngrxFormControlState", {
        set: function (newState) {
            if (!newState) {
                throw new Error('The control state must not be undefined!');
            }
            var oldState = this.state;
            this.state = newState;
            if (this.isInitialized) {
                this.updateViewIfControlIdChanged(newState, oldState);
                this.updateViewIfValueChanged(newState, oldState);
                this.updateViewIfIsDisabledChanged(newState, oldState);
                this.updateViewIfIsFocusedChanged(newState, oldState);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgrxFormControlDirective.prototype, "ngrxEnableFocusTracking", {
        set: function (value) {
            if (value && !this.dom) {
                throw new Error('focus tracking is only supported on the browser platform');
            }
            this.focusTrackingIsEnabled = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgrxFormControlDirective.prototype, "focusRegionStartAttr", {
        // TODO: move this into a separate directive
        // automatically apply the attribute that's used by the CDK to set initial focus
        get: function () {
            return this.state && this.state.isFocused ? '' : null;
        },
        enumerable: true,
        configurable: true
    });
    NgrxFormControlDirective.prototype.updateViewIfControlIdChanged = function (newState, oldState) {
        if (oldState && newState.id === oldState.id) {
            return;
        }
        this.stateValue = newState.value;
        this.viewValue = this.ngrxValueConverter.convertStateToViewValue(this.stateValue);
        this.viewAdapter.setViewValue(this.viewValue);
        if (this.viewAdapter.setIsDisabled) {
            this.viewAdapter.setIsDisabled(newState.isDisabled);
        }
    };
    NgrxFormControlDirective.prototype.updateViewIfValueChanged = function (newState, oldState) {
        if (newState.value === this.stateValue) {
            return;
        }
        this.stateValue = newState.value;
        this.viewValue = this.ngrxValueConverter.convertStateToViewValue(newState.value);
        this.viewAdapter.setViewValue(this.viewValue);
    };
    NgrxFormControlDirective.prototype.updateViewIfIsDisabledChanged = function (newState, oldState) {
        if (!this.viewAdapter.setIsDisabled) {
            return;
        }
        if (oldState && newState.isDisabled === oldState.isDisabled) {
            return;
        }
        this.viewAdapter.setIsDisabled(newState.isDisabled);
    };
    NgrxFormControlDirective.prototype.updateViewIfIsFocusedChanged = function (newState, oldState) {
        if (!this.focusTrackingIsEnabled) {
            return;
        }
        if (oldState && newState.isFocused === oldState.isFocused) {
            return;
        }
        if (newState.isFocused) {
            this.el.nativeElement.focus();
        }
        else {
            this.el.nativeElement.blur();
        }
    };
    NgrxFormControlDirective.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.state) {
            throw new Error('The form state must not be undefined!');
        }
        this.isInitialized = true;
        this.updateViewIfControlIdChanged(this.state, undefined);
        this.updateViewIfValueChanged(this.state, undefined);
        this.updateViewIfIsDisabledChanged(this.state, undefined);
        this.updateViewIfIsFocusedChanged(this.state, undefined);
        var dispatchSetValueAction = function () {
            _this.stateValue = _this.ngrxValueConverter.convertViewToStateValue(_this.viewValue);
            if (_this.stateValue !== _this.state.value) {
                _this.actionsSubject.next(new actions_1.SetValueAction(_this.state.id, _this.stateValue));
                if (_this.state.isPristine) {
                    _this.actionsSubject.next(new actions_1.MarkAsDirtyAction(_this.state.id));
                }
            }
        };
        this.viewAdapter.setOnChangeCallback(function (viewValue) {
            _this.viewValue = viewValue;
            if (_this.ngrxUpdateOn === CHANGE) {
                dispatchSetValueAction();
            }
        });
        this.viewAdapter.setOnTouchedCallback(function () {
            if (!_this.state.isTouched) {
                _this.actionsSubject.next(new actions_1.MarkAsTouchedAction(_this.state.id));
            }
            if (_this.ngrxUpdateOn === BLUR) {
                dispatchSetValueAction();
            }
        });
    };
    NgrxFormControlDirective.prototype.ngAfterViewInit = function () {
        // we need to update the view again after it was initialized since some
        // controls depend on child elements for setting the value (e.g. selects)
        this.viewAdapter.setViewValue(this.viewValue);
        if (this.viewAdapter.setIsDisabled) {
            this.viewAdapter.setIsDisabled(this.state.isDisabled);
        }
    };
    NgrxFormControlDirective.prototype.onFocusChange = function () {
        if (!this.focusTrackingIsEnabled) {
            return;
        }
        var isControlFocused = this.el.nativeElement === this.dom.activeElement;
        if (isControlFocused !== this.state.isFocused) {
            this.actionsSubject.next(isControlFocused ? new actions_1.FocusAction(this.state.id) : new actions_1.UnfocusAction(this.state.id));
        }
    };
    return NgrxFormControlDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], NgrxFormControlDirective.prototype, "ngrxFormControlState", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], NgrxFormControlDirective.prototype, "ngrxUpdateOn", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NgrxFormControlDirective.prototype, "ngrxEnableFocusTracking", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NgrxFormControlDirective.prototype, "ngrxValueConverter", void 0);
__decorate([
    core_1.HostBinding('attr.cdk-focus-region-start'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NgrxFormControlDirective.prototype, "focusRegionStartAttr", null);
__decorate([
    core_1.HostListener('focusin'),
    core_1.HostListener('focusout'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NgrxFormControlDirective.prototype, "onFocusChange", null);
NgrxFormControlDirective = __decorate([
    core_1.Directive({
        selector: '[ngrxFormControlState]',
    }),
    __param(1, core_1.Optional()), __param(1, core_1.Inject(platform_browser_1.DOCUMENT)),
    __param(3, core_1.Self()), __param(3, core_1.Optional()), __param(3, core_1.Inject(view_adapter_1.NGRX_FORM_VIEW_ADAPTER)),
    __param(4, core_1.Self()), __param(4, core_1.Optional()), __param(4, core_1.Inject(forms_1.NG_VALUE_ACCESSOR)),
    __metadata("design:paramtypes", [core_1.ElementRef,
        Document,
        store_1.ActionsSubject, Array, Array])
], NgrxFormControlDirective);
exports.NgrxFormControlDirective = NgrxFormControlDirective;
var ControlValueAccessorAdapter = (function () {
    function ControlValueAccessorAdapter(valueAccessor) {
        this.valueAccessor = valueAccessor;
    }
    ControlValueAccessorAdapter.prototype.setViewValue = function (value) {
        this.valueAccessor.writeValue(value);
    };
    ControlValueAccessorAdapter.prototype.setOnChangeCallback = function (fn) {
        this.valueAccessor.registerOnChange(fn);
    };
    ControlValueAccessorAdapter.prototype.setOnTouchedCallback = function (fn) {
        this.valueAccessor.registerOnTouched(fn);
    };
    ControlValueAccessorAdapter.prototype.setIsDisabled = function (isDisabled) {
        if (this.valueAccessor.setDisabledState) {
            this.valueAccessor.setDisabledState(isDisabled);
        }
    };
    return ControlValueAccessorAdapter;
}());
//# sourceMappingURL=directive.js.map