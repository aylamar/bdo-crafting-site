// Import Dependencies
const express = require('express');
const router = express.Router();
const { itemFactory } = require('../modules/itemFactory/itemFactory');
const craftList = require('../modules/craftList')

// All production route
router.get('/', (req, res) => {
  res.render('production/index', {craftList: craftList, header: 'Production'});
});

router.get('/calc', async (req, res) => {
  try {
    if (typeof craftList[req.query.item] !== undefined){
      // Generate crate data for initial load
      var type = 'production';
      var data = itemFactory(req.query.item, type, null);
      // Render page
      res.render('production/calc', {data, type});
    } else {
      // If no valid item is submitted, redirect to index
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
        var type = 'production';
        var data = itemFactory(req.body.itemName, type, req.body);
        // Render page
        res.render('production/calc', {data, type});
    } else {
      // If no valid item is submitted, redirect to index
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