var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('communities/index', { title: 'Community | Express' });
});



module.exports = router;
