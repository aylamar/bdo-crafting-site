// Import Dependencies
const express = require('express');
const router = express.Router();

// Setup router
router.get('/', (req, res) => {
  res.render('index');
});

// Export router
module.exports = router;