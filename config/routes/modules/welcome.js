var express = require('express');
var router = express.Router();
var welcome = require('../../../app/controllers/welcome');

router.get('/', function(req, res, next) {
    res.render('welcome/index', welcome.index());
});

module.exports = router;
