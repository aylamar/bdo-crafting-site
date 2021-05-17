// Import Dependencies
const express = require('express');
const router = express.Router();
const { itemFactory } = require('../modules/itemFactory/itemFactory');
const craftList = require('../modules/itemLists/processingList') 

// All cooking route
router.get('/', (req, res) => {
  res.render('./production/index', {craftList: craftList, header: 'Processing'});
});

router.get('/calc', async (req, res) => {
  try {
    if (typeof craftList[req.query.item] !== undefined){
      var type = 'processing';
      // Generate crate data for initial load
      var data = await itemFactory(req.query.item, type, null);
      // Render page
      await res.render('./production/calc', {data, type});
    } else {
      // If no valid item is submitted, redirect to index
      res.removeHeader();
      res.redirect('/processing');
    }
  } catch (err) {
    // Redirect to cooking index if fail
    console.log('GET ERR: ', err)
    res.redirect('/processing');
  }
});

router.post('/calc', async (req, res) => {
  try {
    // Check if crate name is submitted
    if (typeof craftList[req.query.item] !== undefined){
      var type = 'processing';
      // Process data based on information submitted
        var data = itemFactory(req.body.itemName, type, req.body);
        // Render page
        res.render('./production/calc', {data, type});
    } else {
      // If no valid item is submitted, redirect to index
      res.removeHeader();
      res.redirect('/processing');
    }
  } catch (err) {
    // Redirect to cooking index if fail
    console.log('POST ERR: ', err)
    res.redirect('/processing');    
  }

});

// Export router
module.exports = router;