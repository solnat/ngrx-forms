"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pattern_1 = require("./pattern");
describe(pattern_1.pattern.name, function () {
    it('should throw for null pattern parameter', function () {
        expect(function () { return pattern_1.pattern(null); }).toThrow();
    });
    it('should throw for undefined pattern parameter', function () {
        expect(function () { return pattern_1.pattern(undefined); }).toThrow();
    });
    it('should not return an error for null', function () {
        expect(pattern_1.pattern(/a/g)(null)).toEqual({});
    });
    it('should not return an error for empty string', function () {
        expect(pattern_1.pattern(/a/g)('')).toEqual({});
    });
    it('should not return an error if value matches pattern', function () {
        expect(pattern_1.pattern(/a/g)('a')).toEqual({});
    });
    it('should return an error if value does not match pattern', function () {
        expect(pattern_1.pattern(/a/g)('b')).not.toEqual({});
    });
    it('should return errors with pattern and actual properties', function () {
        var patternValue = /a/g;
        var actualValue = 'b';
        expect(pattern_1.pattern(patternValue)(actualValue)).toEqual({
            pattern: {
                pattern: patternValue.toString(),
                actual: actualValue,
            },
        });
    });
});
//# sourceMappingURL=pattern.spec.js.map