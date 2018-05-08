"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var equal_to_1 = require("./equal-to");
describe(equal_to_1.equalTo.name, function () {
    it('should not return an error if value is equal to comparand', function () {
        expect(equal_to_1.equalTo(1)(1)).toEqual({});
    });
    it('should return an error if value is not equal to comparand', function () {
        expect(equal_to_1.equalTo(1)(0)).not.toEqual({});
    });
    it('should return errors with comparand and actual properties', function () {
        var comparand = 1;
        var actualValue = 0;
        expect(equal_to_1.equalTo(comparand)(actualValue)).toEqual({
            equalTo: {
                comparand: comparand,
                actual: actualValue,
            },
        });
    });
});
//# sourceMappingURL=equal-to.spec.js.map