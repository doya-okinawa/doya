var express = require('express');
var router = express.Router();
var user = require('../../../app/controllers/user');

router.get('/', user.show);

module.exports = router;
