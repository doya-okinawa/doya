var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('cafes/index', { title: 'Cafes | Express' });
});


module.exports = router;
