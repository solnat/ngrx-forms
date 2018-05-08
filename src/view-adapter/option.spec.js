"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var option_1 = require("./option");
var select_1 = require("./select");
var select_multiple_1 = require("./select-multiple");
describe(option_1.NgrxFallbackSelectOption.name, function () {
    var viewAdapter;
    var multipleViewAdapter;
    var option;
    var renderer;
    beforeEach(function () {
        renderer = jasmine.createSpyObj('renderer2', ['setProperty']);
        viewAdapter = new select_1.NgrxSelectViewAdapter(renderer, {});
        multipleViewAdapter = new select_multiple_1.NgrxSelectMultipleViewAdapter(renderer, {});
    });
    it('should set the value attribute if no view adapter is provided', function () {
        option = new option_1.NgrxFallbackSelectOption({}, renderer, null, null);
        option.value = 'value';
        expect(renderer.setProperty).not.toHaveBeenCalledWith('value');
    });
    it('should not set the value attribute if a view adapter is provided', function () {
        option = new option_1.NgrxFallbackSelectOption({}, renderer, viewAdapter, null);
        option.value = 'value';
        expect(renderer.setProperty).not.toHaveBeenCalled();
    });
    it('should not set the value attribute if a multiple view adapter is provided', function () {
        option = new option_1.NgrxFallbackSelectOption({}, renderer, null, multipleViewAdapter);
        option.value = 'value';
        expect(renderer.setProperty).not.toHaveBeenCalled();
    });
});
//# sourceMappingURL=option.spec.js.map