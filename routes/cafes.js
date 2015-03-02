var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('cafes/index', { title: 'Cafe | Express' });
});


module.exports = router;
