"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var greater_than_or_equal_to_1 = require("./greater-than-or-equal-to");
describe(greater_than_or_equal_to_1.greaterThanOrEqualTo.name, function () {
    it('should throw for null comparand parameter', function () {
        expect(function () { return greater_than_or_equal_to_1.greaterThanOrEqualTo(null); }).toThrow();
    });
    it('should throw for undefined comparand parameter', function () {
        expect(function () { return greater_than_or_equal_to_1.greaterThanOrEqualTo(undefined); }).toThrow();
    });
    it('should not return an error for null', function () {
        expect(greater_than_or_equal_to_1.greaterThanOrEqualTo(1)(null)).toEqual({});
    });
    it('should not return an error if value is greater than comparand', function () {
        expect(greater_than_or_equal_to_1.greaterThanOrEqualTo(1)(2)).toEqual({});
    });
    it('should not return an error if value is equal to comparand', function () {
        expect(greater_than_or_equal_to_1.greaterThanOrEqualTo(1)(1)).toEqual({});
    });
    it('should return an error if value is less than comparand', function () {
        expect(greater_than_or_equal_to_1.greaterThanOrEqualTo(1)(0)).not.toEqual({});
    });
    it('should return errors with comparand and actual properties', function () {
        var comparand = 1;
        var actual = 0;
        expect(greater_than_or_equal_to_1.greaterThanOrEqualTo(comparand)(actual)).toEqual({
            greaterThanOrEqualTo: {
                comparand: comparand,
                actual: actual,
            },
        });
    });
});
//# sourceMappingURL=greater-than-or-equal-to.spec.js.map