// Import Dependencies
const express = require('express');
const router = express.Router();
const calcCook = require('../modules/cookCalc');
itemList = ['Essence_of_Liquor', 'Beer'];

// All cooking route
router.get('/', (req, res) => {
  res.render('cooking/index');
});

router.get('/calc', async (req, res) => {
  try {
    if (itemList.includes(req.query.item)){
      // Generate crate data for initial load
      var data = await calcCook(req.query.item, null);
      // Render page
      await res.render('cooking/calc', {data});
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
    if (itemList.includes(req.body.itemName)){
        // Process data based on information submitted
        var data = calcCook(req.body.itemName, req.body);
        // Render page
        res.render('cooking/calc', {data});
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