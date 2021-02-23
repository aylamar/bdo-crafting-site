// Import Dependencies
const express = require('express');
const router = express.Router();
const calcCrate = require('../modules/crateCalc');
const crateList = ['Serendia', 'Calpheon'];
// All crates route
router.get('/', (req, res) => {
  res.render('crates/index');
});

router.get('/calc', async (req, res) => {
  console.log('if');
  try {
    if (!crateList.includes(req.query.crate)){
      res.removeHeader();
      res.redirect('/crates');
    }
    // Generate Crate Data
    var data = await calcCrate('Serendia', null);
    
    // Render page
    await res.render('crates/crate', {
      data: data
    });
  } catch {
    // Redirect to crate if fail
    res.redirect('/crates');
  }
});

router.post('/calc', async (req, res) => {
  if (!crateList.includes(req.body.crateName)){
    res.redirect('/crates');
  };

  var data = await calcCrate(req.body.crateName, req.body);
  await res.render('crates/crate', {
    data: data
  });

  // test functions
  //res.send(req.body);
  //console.log(data);
});

// Export router
module.exports = router;