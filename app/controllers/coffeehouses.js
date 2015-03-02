var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    require('../models/coffeehouses');
  res.render('coffeehouses/index', { title: 'CoffeeHouses | Express' });
});


module.exports = router;
