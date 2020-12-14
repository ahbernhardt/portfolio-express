const express = require('express');
const router = express.Router();

/* GET Thank you Page after submit contact */
router.get('/', function(req, res) {
    res.render('thanks', {
        page:'Thank', menuId:'thanks',
    });
});

module.exports = router;
