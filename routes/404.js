const express = require('express');
const router = express.Router();

/* GET Home page. */
router.get('/', function(req, res) {
    res.render('404', {
        page:'Oops', menuId:'error',
    });
});

module.exports = router;
