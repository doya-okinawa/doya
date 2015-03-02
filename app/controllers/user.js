var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var username = req.baseUrl.replace('/','');
    res.render('user/index', {title:username, username: username});
});

module.exports = router;
