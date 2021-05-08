// Import Dependencies
const express = require('express');
const router = express.Router();
const calcCrate = require('../modules/itemCalc');
const craftList = require('../modules/craftList')

// All production route
router.get('/', (req, res) => {
  res.render('production/index', {craftList});
});

router.get('/calc', async (req, res) => {
  try {
    if (typeof craftList[req.query.item] !== undefined){
      // Generate crate data for initial load
      var data = calcCrate(req.query.item, 'prod', null);
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
    console.log('GET ERR: ', err)
    res.redirect('/production');
  }
});

router.post('/calc', async (req, res) => {
  try {
    // Check if crate name is submitted
    if (typeof craftList[req.query.item] !== undefined){
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