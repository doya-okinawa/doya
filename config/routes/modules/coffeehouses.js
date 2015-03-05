var express = require('express');
var router = express.Router();
var coffeehouse = require('../../../app/controllers/coffeehouse');

router.get('/', coffeehouse.index);

module.exports = router;
