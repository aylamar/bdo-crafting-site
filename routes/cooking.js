// Import Dependencies
const express = require('express');
const router = express.Router();
const { itemFactory } = require('../modules/itemFactory/itemFactory');
const cookList = require('../modules/cookList') 

// All cooking route
router.get('/', (req, res) => {
  res.render('./production/index', {craftList: cookList, header: 'Cooking'});
});

router.get('/calc', async (req, res) => {
  try {
    if (typeof cookList[req.query.item] !== undefined){
      // Generate crate data for initial load
      var type = 'cooking';
      var data = itemFactory(req.query.item, type, null);
      // Render page
      res.render('./production/calc', {data, type});
    } else {
      // If no valid item is submitted, redirect to index
      res.removeHeader();
      res.redirect('/cooking');

    }
  } catch (err) {
    // Redirect to cooking index if fail
    console.log('GET ERR: ', err)
    res.redirect('/cooking');
  }
});

router.post('/calc', async (req, res) => {
  try {
    // Check if crate name is submitted
    if (typeof cookList[req.query.item] !== undefined){
      var type = 'cooking';
      // Process data based on information submitted
        var data = itemFactory(req.body.itemName, type, req.body);
        // Render page
        res.render('./production/calc', {data, type});
    } else {
      // If no valid item is submitted, redirect to index
      res.removeHeader();
      res.redirect('/cooking');
    }
  } catch (err) {
    // Redirect to cooking index if fail
    console.log('POST ERR: ', err)
    res.redirect('/cooking');    
  }

});

// Export router
module.exports = router;