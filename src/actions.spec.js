"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("./actions");
describe(actions_1.isNgrxFormsAction.name, function () {
    it('should return true if type is ngrx/forms/', function () {
        expect(actions_1.isNgrxFormsAction({ type: 'ngrx/forms/' })).toBe(true);
    });
    it('should return true if type startsWith ngrx/forms/', function () {
        expect(actions_1.isNgrxFormsAction({ type: 'ngrx/forms/test' })).toBe(true);
    });
    it('should return false if type does not have ngrx/forms/', function () {
        expect(actions_1.isNgrxFormsAction({ type: 'some-type' })).toBe(false);
    });
    it('should return false if type is missing', function () {
        expect(actions_1.isNgrxFormsAction({})).toBe(false);
    });
});
//# sourceMappingURL=actions.spec.js.map