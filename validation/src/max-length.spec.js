"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var max_length_1 = require("./max-length");
describe(max_length_1.maxLength.name, function () {
    it('should throw for null maxLength parameter', function () {
        expect(function () { return max_length_1.maxLength(null); }).toThrow();
    });
    it('should throw for undefined maxLength parameter', function () {
        expect(function () { return max_length_1.maxLength(undefined); }).toThrow();
    });
    it('should not return an error for null', function () {
        expect(max_length_1.maxLength(2)(null)).toEqual({});
    });
    it('should return an error if string value\'s length is greater than maxLength', function () {
        expect(max_length_1.maxLength(2)('abc')).not.toEqual({});
    });
    it('should not return an error if string value\'s length is equal to maxLength', function () {
        expect(max_length_1.maxLength(2)('ab')).toEqual({});
    });
    it('should not return an error if string value\'s length is less than maxLength', function () {
        expect(max_length_1.maxLength(2)('a')).toEqual({});
    });
    it('should return an error if array value\'s length is greater than maxLength', function () {
        expect(max_length_1.maxLength(2)(['a', 'b', 'c'])).not.toEqual({});
    });
    it('should not return an error if array value\'s length is equal to maxLength', function () {
        expect(max_length_1.maxLength(2)(['a', 'b'])).toEqual({});
    });
    it('should not return an error if array value\'s length is less than maxLength', function () {
        expect(max_length_1.maxLength(2)(['a'])).toEqual({});
    });
    it('should return errors with maxLength, value, and actualLength properties', function () {
        var maxLengthParam = 2;
        var value = 'abc';
        expect(max_length_1.maxLength(maxLengthParam)(value)).toEqual({
            maxLength: {
                maxLength: maxLengthParam,
                value: value,
                actualLength: value.length,
            },
        });
    });
});
//# sourceMappingURL=max-length.spec.js.map