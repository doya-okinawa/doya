var express = require('express');
var router = express.Router();
var about = require('../../../app/controllers/about');

router.get('/', function(req, res, next) {
    res.render('about/index', about.index());
});


module.exports = router;
