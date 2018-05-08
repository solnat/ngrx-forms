"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A validation function that requires a value to match a regex.
 * Considers `null` and `''` as valid. Combine this function with the
 * `required` validation function if these values should be considered invalid.
 *
 * The validation error returned by this validation function has the following shape:
 *
 * ```typescript
 * {
 *   pattern: {
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
 *  numberWithPeriodsOrCommas: validate(pattern(/^[0-9.,]+$/)),
 * })
 * ```
 */
function pattern(pattern) {
    if (pattern === null || pattern === undefined) {
        throw new Error("The pattern Validation function requires the pattern parameter to be a non-null string or regular expression, got " + pattern + "!");
    }
    return function (value) {
        if (value === null || value.length === 0) {
            return {};
        }
        if (pattern.test(value)) {
            return {};
        }
        return {
            pattern: {
                pattern: pattern.toString(),
                actual: value,
            },
        };
    };
}
exports.pattern = pattern;
//# sourceMappingURL=pattern.js.map