var express = require('express');
var router = express.Router();
var coffeehouse = require('../../../app/controllers/coffeehouse');

router.get('/', function(req, res, next) {
    res.render('coffeehouse/index', coffeehouse.index());
});

module.exports = router;
