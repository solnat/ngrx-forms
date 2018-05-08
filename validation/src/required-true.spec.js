"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var required_true_1 = require("./required-true");
describe(required_true_1.requiredTrue.name, function () {
    it('should not return an error for null', function () {
        expect(required_true_1.requiredTrue(null)).toEqual({});
    });
    it('should not return an error for true', function () {
        expect(required_true_1.requiredTrue(true)).toEqual({});
    });
    it('should return an error for false', function () {
        var value = false;
        expect(required_true_1.requiredTrue(value)).toEqual({
            required: {
                actual: value,
            },
        });
    });
});
//# sourceMappingURL=required-true.spec.js.map