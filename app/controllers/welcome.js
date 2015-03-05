var Welcome = {
    index: function(req, res, next) {
        return res.render('welcome/index', { auth: req.auth});
    }
};

module.exports = Welcome;
