const express = require('express');
const router = express.Router();

/* GET Home page. */
router.get('/', function(req, res) {
  res.render('index', {
    page:'Portfolio Website', menuId:'home',
  });
});

module.exports = router;
