// Import Dependencies
const express = require('express');
const router = express.Router();
const calcCrate = require('../modules/crateCalc');
const crateList = ['Balenos_Timber_Crate', 'Calpheon_Timber_Crate', 'Serendia_Timber_Crate', 'Mediah_Timber_Crate', 'Brass_Ingot_Crate', 'Bronze_Ingot_Crate', 'Mythril_Ingot_Crate', 'Noc_Ingot_Crate', 'Steel_Ingot_Crate', 'Titanium_Ingot_Crate', 'Vanadium_Ingot_Crate'];

// All production route
router.get('/', (req, res) => {
  res.render('production/index');
});

router.get('/calc', async (req, res) => {
  try {
    if (crateList.includes(req.query.crate)){
      // Generate crate data for initial load
      var data = await calcCrate(req.query.crate, null);
      // Render page
      await res.render('production/crates', {data});
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
    if (crateList.includes(req.body.crateName)){
        // Process data based on information submitted
        var data = await calcCrate(req.body.crateName, req.body);
        // Render page
        await res.render('production/crates', {data});
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