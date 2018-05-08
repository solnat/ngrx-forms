"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var required_1 = require("./required");
describe(required_1.required.name, function () {
    it('should return an error for null', function () {
        var value = null;
        expect(required_1.required(value)).toEqual({
            required: {
                actual: value,
            },
        });
    });
    it('should return an error for empty string', function () {
        var value = '';
        expect(required_1.required(value)).toEqual({
            required: {
                actual: value,
            },
        });
    });
    it('should return an error for empty array', function () {
        var value = [];
        expect(required_1.required(value)).toEqual({
            required: {
                actual: value,
            },
        });
    });
    it('should not return an error for number zero', function () {
        expect(required_1.required(0)).toEqual({});
    });
    it('should not return an error for number', function () {
        expect(required_1.required(415)).toEqual({});
    });
    it('should not return an error for non-empty string', function () {
        expect(required_1.required('a')).toEqual({});
    });
    it('should not return an error for true', function () {
        expect(required_1.required(true)).toEqual({});
    });
    it('should not return an error for false', function () {
        expect(required_1.required(false)).toEqual({});
    });
    it('should not return an error for non-empty array', function () {
        expect(required_1.required(['a'])).toEqual({});
    });
});
//# sourceMappingURL=required.spec.js.map