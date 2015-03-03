var express = require('express');
var router = express.Router();
var user = require('../../../app/controllers/user');

router.get('/', function(req, res, next) {
    // TODO:もっと綺麗にusername取れるようにする
    var username = req.baseUrl.replace(/^\//,'');
    res.render('user/show', user.show(username));
});

module.exports = router;
