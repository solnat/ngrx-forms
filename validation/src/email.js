"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:max-line-length
// this regex is taken from the @angular/forms source code
exports.NGRX_FORMS_EMAIL_VALIDATION_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
/**
 * A validation function that requires a value to be a valid e-mail address.
 * Considers `null` and `''` as valid. Combine this function with the
 * `required` validation function if these values should be considered invalid.
 *
 * The validation error returned by this validation function has the following shape:
 *
 * ```typescript
 * {
 *   email: {
 *     pattern: string;
 *     actual: string;
 *   };
 * }
 * ```
 *
 * Usually you would use this validation function in conjunction with the `validate`
 * update function to perform synchronous validation in your reducer:
 *
 * ```typescript
 * updateGroup<MyFormValue>({
 *  userMailAddress: validate(email),
 * })
 * ```
 */
function email(value) {
    if (value === null || value.length === 0) {
        return {};
    }
    if (exports.NGRX_FORMS_EMAIL_VALIDATION_REGEXP.test(value)) {
        return {};
    }
    return {
        email: {
            pattern: exports.NGRX_FORMS_EMAIL_VALIDATION_REGEXP.toString(),
            actual: value,
        },
    };
}
exports.email = email;
//# sourceMappingURL=email.js.map