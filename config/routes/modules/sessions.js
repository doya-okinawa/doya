var express  = require('express');
var router   = express.Router();
var passport = require('passport');
var session  = require('../../../app/controllers/session');

router.get('/login', session.login);
router.post('/login',
            passport.authenticate('local', { failureRedirect: '/login' }),
            session.signin);

router.get('/membersonly', session.isLogined, session.membersonly);
router.get('/logout', session.logout);

module.exports = router;
