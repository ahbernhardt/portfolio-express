const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('login', {
        page:'Admin Login', menuId:'login',
    });
});

// // Login Handle
// router.post('/login', (req, res, next) =>{
//     passport.authenticate('local', {
//         successRedirect: '/admin',
//         failureRedirect: '/login',
//         failureFlash: true
//     })(req, res, next);
// });

module.exports = router;
