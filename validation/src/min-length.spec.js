"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var min_length_1 = require("./min-length");
describe(min_length_1.minLength.name, function () {
    it('should throw for null minLength parameter', function () {
        expect(function () { return min_length_1.minLength(null); }).toThrow();
    });
    it('should throw for undefined minLength parameter', function () {
        expect(function () { return min_length_1.minLength(undefined); }).toThrow();
    });
    it('should not return an error for null', function () {
        expect(min_length_1.minLength(2)(null)).toEqual({});
    });
    it('should not return an error if string value\'s length is greater than minLength', function () {
        expect(min_length_1.minLength(2)('abc')).toEqual({});
    });
    it('should not return an error if string value\'s length is equal to minLength', function () {
        expect(min_length_1.minLength(2)('ab')).toEqual({});
    });
    it('should return an error if string value\'s length is less than minLength', function () {
        expect(min_length_1.minLength(2)('a')).not.toEqual({});
    });
    it('should not return an error if array value\'s length is greater than minLength', function () {
        expect(min_length_1.minLength(2)(['a', 'b', 'c'])).toEqual({});
    });
    it('should not return an error if array value\'s length is equal to minLength', function () {
        expect(min_length_1.minLength(2)(['a', 'b'])).toEqual({});
    });
    it('should return an error if array value\'s length is less than minLength', function () {
        expect(min_length_1.minLength(2)(['a'])).not.toEqual({});
    });
    it('should return errors with minLength, value and actualLength properties', function () {
        var minLengthValue = 2;
        var value = 'a';
        expect(min_length_1.minLength(minLengthValue)(value)).toEqual({
            minLength: {
                minLength: minLengthValue,
                value: value,
                actualLength: value.length,
            },
        });
    });
});
//# sourceMappingURL=min-length.spec.js.map