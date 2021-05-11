// Import Dependencies
const assert = require('assert');
const { expect } = require('chai');
const { itemFactory } = require('../modules/itemFactory/itemFactory');
const { balenosDefault, steelDefault, redSauceDefault, odyDefault, advCookUtensilBody, advCookUtensilOutput, serendiaTimberBody, serendiaTimberOutput } = require('./testData');

// Guide: https://www.youtube.com/watch?v=k4GFqgBR2qc

describe('the itemFactory', function() {
    it('should have valid default balenos timber crate data', function() {
        var data = itemFactory('Balenos_Timber_Crate', 'production', null);
        assert.notStrictEqual(data, balenosDefault);
    })

    it('should have valid default steel ingot crate data', function() {
        var data = itemFactory('Steel_Ingot_Crate', 'production', null);
        assert.notStrictEqual(data, steelDefault);
    })

    it('should have valid advanced cooking utensil data', function() {
        var data = itemFactory("Advanced_Cooking_Utensil", 'production', advCookUtensilBody);
        assert.notStrictEqual(data, advCookUtensilOutput);
    })

    it('should have valid serendia timber crate data', function() {
        var data = itemFactory("Advanced_Cooking_Utensil", 'production', serendiaTimberBody);
        assert.notStrictEqual(data, serendiaTimberOutput);
    })
});