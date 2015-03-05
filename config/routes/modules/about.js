var express = require('express');
var router = express.Router();
var about = require('../../../app/controllers/about');

router.get('/', about.index);

module.exports = router;
