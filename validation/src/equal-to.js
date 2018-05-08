"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A validation function that requires the value to be strictly equal (i.e. `===`) to another value.
 *
 * The validation error returned by this validation function has the following shape:
 *
 * ```typescript
 * {
 *   equalTo: {
 *     comparand: T;
 *     actual: T;
 *   };
 * }
 * ```
 *
 * Usually you would use this validation function in conjunction with the `validate`
 * update function to perform synchronous validation in your reducer:
 *
 * ```typescript
 * updateGroup<MyFormValue>({
 *  name: validate(equalTo('John Doe')),
 * })
 * ```
 */
function equalTo(comparand) {
    return function (value) {
        if (value === comparand) {
            return {};
        }
        return {
            equalTo: {
                comparand: comparand,
                actual: value,
            },
        };
    };
}
exports.equalTo = equalTo;
//# sourceMappingURL=equal-to.js.map