var express = require('express');
var router = express.Router();
var welcome = require('../../../app/controllers/welcome');

router.get('/', welcome.index);

module.exports = router;
