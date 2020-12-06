var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/featured', function(req, res) {
  res.render('featured', {title:'Featured'});
});

router.get('/about', function(req, res) {
  res.render('about', {title:'About'});
});

router.get('/contact', function(req, res) {
  res.render('contact', {title:'Contact'});
});

router.get('/thanks', function(req, res) {
  res.render('thanks', {title:'Thank You'});
});
module.exports = router;
