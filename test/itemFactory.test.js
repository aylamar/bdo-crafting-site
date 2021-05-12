// Import Dependencies
const assert = require('assert');
const { expect } = require('chai');
const { itemFactory } = require('../modules/itemFactory/itemFactory');
const { balenosDefault, steelDefault, balenosMealBody, balenosMealOutput, advCookUtensilBody, advCookUtensilOutput, serendiaTimberBody, serendiaTimberOutput, pickedVegetablesDefault } = require('./testData');

// Guide: https://www.youtube.com/watch?v=k4GFqgBR2qc

describe('the itemFactory', function() {
    it('should generate valid default balenos timber crate data', function() {
        var data = itemFactory('Balenos_Timber_Crate', 'production', null);
        expect(data).to.deep.equal(data, balenosDefault);
    })

    it('should generate valid default steel ingot crate data', function() {
        var data = itemFactory('Steel_Ingot_Crate', 'production', null);
        expect(data).to.deep.equal(steelDefault);
    })

    it('should generate valid advanced cooking utensil data', function() {
        var data = itemFactory("Advanced_Cooking_Utensil", 'production', advCookUtensilBody);
        expect(data).to.deep.equal(data, advCookUtensilOutput);
    })

    it('should generate valid serendia timber crate data', function() {
        var data = itemFactory("Serendia_Timber_Crate", 'production', serendiaTimberBody);
        expect(data).to.deep.equal(data, serendiaTimberOutput);
    })

    it('should generate valid balenos meal data', function() {
        var data = itemFactory("Balenos_Meal", 'cooking', balenosMealBody);
        expect(data).to.deep.equal(data, balenosMealOutput);
    })

    it('should generate valid pickled vegetables data', function() {
        var data = itemFactory("Pickled_Vegetables", 'cooking', null);
        expect(data).to.deep.equal(data, pickedVegetablesDefault);
    })
});