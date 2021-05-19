// Import Dependencies
const assert = require('assert');
const { expect } = require('chai');
const { itemFactory } = require('../modules/itemFactory/itemFactory');
const { balenosDefault, steelDefault, balenosMealBody, balenosMealOutput, advCookUtensilBody, advCookUtensilOutput, serendiaTimberBody, serendiaTimberOutput } = require('./testData');

// Guide: https://www.youtube.com/watch?v=k4GFqgBR2qc

describe('the itemFactory', function() {
    it('should generate valid default balenos timber crate data', function() {
        var data = itemFactory('Balenos_Timber_Crate', 'production', null);
        expect(data).to.deep.equal(data, balenosDefault);
    });

    it('should generate valid advanced cooking utensil data', function() {
        var data = itemFactory("Advanced_Cooking_Utensil", 'production', advCookUtensilBody);
        expect(data).to.deep.equal(data, advCookUtensilOutput);
    });

    it('should generate valid serendia timber crate data', function() {
        var data = itemFactory("Serendia_Timber_Crate", 'production', serendiaTimberBody);
        expect(data).to.deep.equal(data, serendiaTimberOutput);
    });

    it('should generate valid balenos meal data', function() {
        var data = itemFactory("Balenos_Meal", 'cooking', balenosMealBody);
        expect(data).to.deep.equal(data, balenosMealOutput);
    });

    it('should generate valid pickled vegetables data', function() {
        var data = itemFactory("Pickled_Vegetables", 'cooking', null);
        
        // Spot check tree
        expect(data.materialTree[4]).to.have.all.keys('name', 'imageName', 'column', 'count', 'totalCount', 'multiPart', 'cook');
        expect(data.materialTree[0].name).to.equal('Leavening Agent');
        expect(data.materialTree[2].name).to.equal('Paprika');
        expect(data.materialTree[0].totalCount).to.equal('2');
        expect(data.materialTree[2].totalCount).to.equal('8');

        // Spot check material list
        expect(data.materialList[3]).to.have.all.keys('batchCost', 'count', 'name', 'cost');
        expect(data.materialList[2].name).to.equal('Paprika');
        expect(data.materialList[4].name).to.equal('Grain');
        expect(data.materialList[2].count).to.equal('8');
        expect(data.materialList[4].count).to.equal('2');

        // Spot check proc list
        expect(data.procList[0]).to.have.all.keys('name', 'count', 'cost', 'batchCost');

        // Spot check profit
        expect(data.profit.taxableProcBatch).to.equal('0');
        expect(data.profit.profitBatch).to.equal('-8,360');
    });
});