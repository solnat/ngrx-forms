"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var value_converter_1 = require("./value-converter");
describe('NgrxValueConverters', function () {
    describe('identity', function () {
        it('should return the same view value', function () {
            var viewValue = new Date();
            expect(value_converter_1.NgrxValueConverters.identity().convertViewToStateValue(viewValue)).toBe(viewValue);
        });
        it('should return the same state value', function () {
            var stateValue = new Date();
            expect(value_converter_1.NgrxValueConverters.identity().convertStateToViewValue(stateValue)).toBe(stateValue);
        });
    });
    describe('dateToISOString', function () {
        it('should return an ISO string when converting view value', function () {
            var viewValue = new Date();
            var stateValue = value_converter_1.NgrxValueConverters.dateToISOString.convertViewToStateValue(viewValue);
            expect(stateValue).toEqual(viewValue.toISOString());
        });
        it('should pass through "null" view values', function () {
            var stateValue = value_converter_1.NgrxValueConverters.dateToISOString.convertViewToStateValue(null);
            expect(stateValue).toEqual(null);
        });
        it('should return a date when converting state value', function () {
            var stateValue = '1970-01-01T00:00:00.000Z';
            var viewValue = value_converter_1.NgrxValueConverters.dateToISOString.convertStateToViewValue(stateValue);
            expect(viewValue).toEqual(new Date(stateValue));
        });
        it('should pass through "null" state values', function () {
            var viewValue = value_converter_1.NgrxValueConverters.dateToISOString.convertStateToViewValue(null);
            expect(viewValue).toEqual(null);
        });
        it('should return an equal value if converting from view to state and back', function () {
            var viewValue = new Date();
            var stateValue = value_converter_1.NgrxValueConverters.dateToISOString.convertViewToStateValue(viewValue);
            expect(value_converter_1.NgrxValueConverters.dateToISOString.convertStateToViewValue(stateValue)).toEqual(viewValue);
        });
        it('should return an equal value if converting from state to view and back', function () {
            var stateValue = '1970-01-01T00:00:00.000Z';
            var viewValue = value_converter_1.NgrxValueConverters.dateToISOString.convertStateToViewValue(stateValue);
            expect(value_converter_1.NgrxValueConverters.dateToISOString.convertViewToStateValue(viewValue)).toEqual(stateValue);
        });
    });
    describe('objectToJSON', function () {
        var tests = [
            {
                type: 'string',
                expectedViewValue: 'Hello world',
                expectedStateValue: '"Hello world"',
            },
            {
                type: 'number',
                expectedViewValue: 356.2,
                expectedStateValue: '356.2',
            },
            {
                type: 'boolean',
                expectedViewValue: true,
                expectedStateValue: 'true',
            },
            {
                type: 'array',
                expectedViewValue: [1, 2, 'this is a string', { a: 'b' }],
                expectedStateValue: '[1,2,"this is a string",{"a":"b"}]',
            },
            {
                type: 'object',
                expectedViewValue: {
                    a: [1, 2, 3],
                    b: {
                        c: '456',
                    },
                },
                expectedStateValue: '{"a":[1,2,3],"b":{"c":"456"}}',
            },
        ];
        tests.forEach(function (_a) {
            var type = _a.type, expectedStateValue = _a.expectedStateValue, expectedViewValue = _a.expectedViewValue;
            it("should return the expected " + type + " when converting a view value", function () {
                var stateValue = value_converter_1.NgrxValueConverters.objectToJSON.convertViewToStateValue(expectedViewValue);
                expect(stateValue).toEqual(stateValue);
            });
            it("should return the expected JSON string when converting a state value of type " + type, function () {
                var viewValue = value_converter_1.NgrxValueConverters.objectToJSON.convertStateToViewValue(expectedStateValue);
                expect(viewValue).toEqual(viewValue);
            });
            it("should return an equal value if converting from view to state and back (type " + type + ")", function () {
                var stateValue = value_converter_1.NgrxValueConverters.objectToJSON.convertViewToStateValue(expectedViewValue);
                expect(value_converter_1.NgrxValueConverters.objectToJSON.convertStateToViewValue(stateValue)).toEqual(expectedViewValue);
            });
            it("should return an equal value if converting from state to view and back (type " + type + ")", function () {
                var stateValue = value_converter_1.NgrxValueConverters.objectToJSON.convertStateToViewValue(expectedStateValue);
                expect(value_converter_1.NgrxValueConverters.objectToJSON.convertViewToStateValue(stateValue)).toEqual(expectedStateValue);
            });
        });
        it('should pass through a "null" view value', function () {
            var stateValue = value_converter_1.NgrxValueConverters.objectToJSON.convertViewToStateValue(null);
            expect(stateValue).toEqual(null);
        });
        it('should pass through a "null" state value', function () {
            var viewValue = value_converter_1.NgrxValueConverters.objectToJSON.convertStateToViewValue(null);
            expect(viewValue).toEqual(null);
        });
    });
});
//# sourceMappingURL=value-converter.spec.js.map