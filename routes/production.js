// Import Dependencies
const express = require('express');
const router = express.Router();
const calcCrate = require('../modules/itemCalc');

const itemList = ['Balenos_Timber_Crate', 'Calpheon_Timber_Crate', 'Serendia_Timber_Crate', 'Mediah_Timber_Crate', 'Brass_Ingot_Crate', 'Bronze_Ingot_Crate', 'Mythril_Ingot_Crate', 'Noc_Ingot_Crate', 'Steel_Ingot_Crate', 'Titanium_Ingot_Crate', 'Vanadium_Ingot_Crate', 'Advanced_Alchemy_Tool', 'Advanced_Cooking_Utensil', 'Balenos_Traditional_Alchemy_Tool', 'Calpheon_Traditional_Alchemy_Tool', 'Serendia_Traditional_Alchemy_Tool', 'Advanced_Cooking_Utensil', 'Advanced_Cooking_Utensil', 'Balenos_Traditional_Cooking_Utensil', 'Calpheon_Traditional_Cooking_Utensil', 'Serendia_Traditional_Cooking_Utensil'];

// All production route
router.get('/', (req, res) => {
  res.render('production/index');
});

router.get('/calc', async (req, res) => {
  try {
    if (itemList.includes(req.query.item)){
      // Generate crate data for initial load
      var data = await calcCrate(req.query.item, 'prod', null);
      // Render page
      var type = 'prod';
      await res.render('production/crates', {data, type});
    } else {
      // If no valid item is submitted, redirect to crates
      res.removeHeader();
      res.redirect('/production');

    }
  } catch (err) {
    // Redirect to production index if fail
    console.log('GET ERR: ', err)
    res.redirect('/production');
  }
});

router.post('/calc', async (req, res) => {
  try {
    // Check if crate name is submitted
    if (itemList.includes(req.body.itemName)){
        // Process data based on information submitted
        var data = calcCrate(req.body.itemName, 'prod', req.body);
        // Render page
        var type = 'prod';
        res.render('production/crates', {data, type});
    } else {
      // If no valid item is submitted, redirect to crates
      res.removeHeader();
      res.redirect('/production');
    }
  } catch (err) {
    // Redirect to production index if fail
    console.log('POST ERR: ', err)
    res.redirect('/production');    
  }

});

// Export router
module.exports = router;