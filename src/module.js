"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var directive_1 = require("./control/directive");
var directive_2 = require("./group/directive");
var checkbox_1 = require("./view-adapter/checkbox");
var default_1 = require("./view-adapter/default");
var number_1 = require("./view-adapter/number");
var option_1 = require("./view-adapter/option");
var radio_1 = require("./view-adapter/radio");
var range_1 = require("./view-adapter/range");
var select_1 = require("./view-adapter/select");
var select_multiple_1 = require("./view-adapter/select-multiple");
var status_css_classes_directive_1 = require("./status-css-classes.directive");
var exportsAndDeclarations = [
    directive_1.NgrxFormControlDirective,
    directive_2.NgrxFormDirective,
    checkbox_1.NgrxCheckboxViewAdapter,
    default_1.NgrxDefaultViewAdapter,
    number_1.NgrxNumberViewAdapter,
    radio_1.NgrxRadioViewAdapter,
    range_1.NgrxRangeViewAdapter,
    select_multiple_1.NgrxSelectMultipleOption,
    select_multiple_1.NgrxSelectMultipleViewAdapter,
    select_1.NgrxSelectOption,
    select_1.NgrxSelectViewAdapter,
    option_1.NgrxFallbackSelectOption,
    status_css_classes_directive_1.NgrxStatusCssClassesDirective,
];
var NgrxFormsModule = (function () {
    function NgrxFormsModule() {
    }
    return NgrxFormsModule;
}());
NgrxFormsModule = __decorate([
    core_1.NgModule({
        declarations: exportsAndDeclarations,
        exports: exportsAndDeclarations,
    })
], NgrxFormsModule);
exports.NgrxFormsModule = NgrxFormsModule;
//# sourceMappingURL=module.js.map