const express = require('express');
const router = express.Router();
const project = require('../public/data/projects.json');
/* GET home page. */
router.get('/', function(req, res) {
    res.render('featured', {
        page:'Featured', menuId:'featured',
        projects: project
    });
});

module.exports = router;
