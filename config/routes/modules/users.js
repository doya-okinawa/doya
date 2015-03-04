var express = require('express');
var router = express.Router();
var user = require('../../../app/controllers/user');

router.get('/users', user.index);
router.get('/:username', user.show);
router.get('/users/new', user.new);
router.post('/users', user.create);
router.get('/:username/edit', user.edit);
router.put('/:username', user.update);
router.delete('/:username', user.destroy);

router.param('username', user.preload);

module.exports = router;
