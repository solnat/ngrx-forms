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
var store_1 = require("@ngrx/store");
var actions_1 = require("../actions");
var NgrxFormDirective = (function () {
    function NgrxFormDirective(actionsSubject) {
        this.actionsSubject = actionsSubject;
    }
    NgrxFormDirective.prototype.ngOnInit = function () {
        if (!this.state) {
            throw new Error('The form state must not be undefined!');
        }
    };
    NgrxFormDirective.prototype.onSubmit = function (event) {
        event.preventDefault();
        if (this.state.isUnsubmitted) {
            this.actionsSubject.next(new actions_1.MarkAsSubmittedAction(this.state.id));
        }
    };
    return NgrxFormDirective;
}());
__decorate([
    core_1.Input('ngrxFormState'),
    __metadata("design:type", Object)
], NgrxFormDirective.prototype, "state", void 0);
__decorate([
    core_1.HostListener('submit', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], NgrxFormDirective.prototype, "onSubmit", null);
NgrxFormDirective = __decorate([
    core_1.Directive({
        selector: 'form[ngrxFormState]',
    }),
    __metadata("design:paramtypes", [store_1.ActionsSubject])
], NgrxFormDirective);
exports.NgrxFormDirective = NgrxFormDirective;
//# sourceMappingURL=directive.js.map