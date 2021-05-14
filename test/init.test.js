// Import Dependencies
const { expect } = require('chai');
const { cookListGenerator, prodListGenerator, linkGenerator, imgGenerator } = require('../modules/init/listGenerator');
var cookList = require('../modules/cookList');
var prodList = require('../modules/prodList');

describe('the listGenerator', function() {
    it('should generate a valid link ', function() {
        var response = linkGenerator('Test Item Name', 'production');
        expect(response).to.equal('/production/calc?item=Test_Item_Name');
    })

    it('should generate a image link ', function() {
        var response = imgGenerator('Test Item Name', 'cooking');
        expect(response).to.equal('https://cdn.aylamar.com/cooking/img/test-item-name.png');
    })

    it('should generate a valid cook list ', function() {
        cookListGenerator()
        expect(cookList["O'dyllita Meal"].name).to.equal("O'dyllita Meal")
        expect(cookList["O'dyllita Meal"].img).to.equal("https://cdn.aylamar.com/cooking/img/o'dyllita-meal.png")
        expect(cookList["O'dyllita Meal"].link).to.equal("/cooking/calc?item=O'dyllita_Meal")
        
        expect(cookList['Meat Croquette'].name).to.equal("Meat Croquette")
        expect(cookList['Meat Croquette'].img).to.equal("https://cdn.aylamar.com/cooking/img/meat-croquette.png")
        expect(cookList['Meat Croquette'].link).to.equal("/cooking/calc?item=Meat_Croquette")
    })

    it('should generate a valid production list ', function() {
        prodListGenerator()
        expect(prodList['Calpheon Timber Crate'].name).to.equal("Calpheon Timber Crate")
        expect(prodList['Calpheon Timber Crate'].img).to.equal("https://cdn.aylamar.com/production/img/calpheon-timber-crate.png")
        expect(prodList['Calpheon Timber Crate'].link).to.equal("/production/calc?item=Calpheon_Timber_Crate")
        
        expect(prodList['Advanced Alchemy Tool'].name).to.equal("Advanced Alchemy Tool")
        expect(prodList['Advanced Alchemy Tool'].img).to.equal("https://cdn.aylamar.com/production/img/advanced-alchemy-tool.png")
        expect(prodList['Advanced Alchemy Tool'].link).to.equal("/production/calc?item=Advanced_Alchemy_Tool")
    })
});