"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var less_than_1 = require("./less-than");
describe(less_than_1.lessThan.name, function () {
    it('should throw for null comparand parameter', function () {
        expect(function () { return less_than_1.lessThan(null); }).toThrow();
    });
    it('should throw for undefined comparand parameter', function () {
        expect(function () { return less_than_1.lessThan(undefined); }).toThrow();
    });
    it('should not return an error for null', function () {
        expect(less_than_1.lessThan(1)(null)).toEqual({});
    });
    it('should return an error if value is greater than comparand', function () {
        expect(less_than_1.lessThan(1)(2)).not.toEqual({});
    });
    it('should return an error if value is equal to comparand', function () {
        expect(less_than_1.lessThan(1)(1)).not.toEqual({});
    });
    it('should not return an error if value is less than comparand', function () {
        expect(less_than_1.lessThan(1)(0)).toEqual({});
    });
    it('should return errors with comparand and actual properties', function () {
        var comparand = 1;
        var actual = 2;
        expect(less_than_1.lessThan(comparand)(actual)).toEqual({
            lessThan: {
                comparand: comparand,
                actual: actual,
            },
        });
    });
});
//# sourceMappingURL=less-than.spec.js.map