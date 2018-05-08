"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var email_1 = require("./email");
// note that we do not test the validation regex itself, but we
// assume that it has been tested by the angular team and is correct
describe(email_1.email.name, function () {
    it('should not return an error for null', function () {
        expect(email_1.email(null)).toEqual({});
    });
    it('should not return an error for empty string', function () {
        expect(email_1.email('')).toEqual({});
    });
    it('should not return an error if value is valid mail address with top-level domain', function () {
        expect(email_1.email('a@b.com')).toEqual({});
    });
    it('should not return an error if value is valid mail address without top-level domain', function () {
        expect(email_1.email('a@b')).toEqual({});
    });
    it('should return an error if value is not a valid mail address', function () {
        expect(email_1.email('abc')).not.toEqual({});
    });
    it('should return errors with pattern and actual properties', function () {
        var value = 'abc';
        expect(email_1.email(value)).toEqual({
            email: {
                pattern: email_1.NGRX_FORMS_EMAIL_VALIDATION_REGEXP.toString(),
                actual: value,
            },
        });
    });
});
//# sourceMappingURL=email.spec.js.map