const express = require('express');
const router = express.Router();

/* GET Admin Login Page. */
router.get('/', function(req, res) {
    res.render('login', {
        page:'Admin Login', menuId:'login',
    });
});

module.exports = router;
