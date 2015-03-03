var express = require('express');
var router = express.Router();
var user = require('../../../app/controllers/user');

router.get('/', function(req, res, next) {
    res.render('user/index', user.index());
});

router.post('/', function(req, res, next) {
    user.create();
    res.redirect('/users');
});

module.exports = router;
