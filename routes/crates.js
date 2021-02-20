// Import Dependencies
const express = require('express');
const router = express.Router();

// All crates route
router.get('/', (req, res) => {
  res.render('crates/index');
});

router.get('/serendia', (req, res) => {
  res.render('crates/serendia');
});

// Export router
module.exports = router;