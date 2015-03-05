var Welcome = {
    index: function(req, res, next) {
        return res.render('welcome/index', {});
    }
};

module.exports = Welcome;
