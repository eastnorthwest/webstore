const express = require('express');
const router = express.Router();

router.use('/', (req, res) => {
  res.render('cart/index', {message: req.flash('message')})
});

module.exports = router;
