"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A validation function that requires the value to be less than a number.
 * Considers `null` as valid. Combine this function with the `required` validation
 * function if `null` should be considered invalid.
 *
 * The validation error returned by this validation function has the following shape:
 *
 * ```typescript
 * {
 *   lessThan: {
 *     comparand: number;
 *     actual: number;
 *   };
 * }
 * ```
 *
 * Usually you would use this validation function in conjunction with the `validate`
 * update function to perform synchronous validation in your reducer:
 *
 * ```typescript
 * updateGroup<MyFormValue>({
 *  amount: validate(lessThan(10)),
 * })
 */
function lessThan(comparand) {
    if (comparand === null || comparand === undefined) {
        throw new Error("The lessThan Validation function requires the comparand parameter to be a non-null number, got " + comparand + "!");
    }
    return function (value) {
        if (value === null) {
            return {};
        }
        if (value < comparand) {
            return {};
        }
        return {
            lessThan: {
                comparand: comparand,
                actual: value,
            },
        };
    };
}
exports.lessThan = lessThan;
//# sourceMappingURL=less-than.js.map