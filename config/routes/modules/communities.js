var express = require('express');
var router = express.Router();
var community = require('../../../app/controllers/community');

router.get('/', function(req, res, next) {
    res.render('community/index', community.index());
});

module.exports = router;
