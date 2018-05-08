"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A validation function that requires the value to be non-`null` and non-empty.
 *
 * The validation error returned by this validation function has the following shape:
 *
 * ```typescript
 * {
 *   required: {
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
 *  name: validate(required),
 * })
 * ```
 */
function required(value) {
    if (value !== null && value.length !== 0) {
        return {};
    }
    return {
        required: {
            actual: value,
        },
    };
}
exports.required = required;
//# sourceMappingURL=required.js.map