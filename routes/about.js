const express = require('express');
const router = express.Router();
const walkList = require('../public/data/walkList.json');

/* GET About page. */
router.get('/', function(req, res) {
    res.render('about', {
        page:'About', menuId:'about',
        walkLists: walkList
    });
});

module.exports = router;
