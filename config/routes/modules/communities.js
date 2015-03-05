var express = require('express');
var router = express.Router();
var community = require('../../../app/controllers/community');

router.get('/', community.index);

module.exports = router;
