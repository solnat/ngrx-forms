"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var required_false_1 = require("./required-false");
describe(required_false_1.requiredFalse.name, function () {
    it('should not return an error for null', function () {
        expect(required_false_1.requiredFalse(null)).toEqual({});
    });
    it('should return an error for true', function () {
        var value = true;
        expect(required_false_1.requiredFalse(value)).toEqual({
            required: {
                actual: value,
            },
        });
    });
    it('should not return an error for false', function () {
        expect(required_false_1.requiredFalse(false)).toEqual({});
    });
});
//# sourceMappingURL=required-false.spec.js.map