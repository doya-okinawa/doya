var Welcome = {
    index: function(req, res, next) {
        return res.render('welcome/index', { title: 'Express'});
    }
};

module.exports = Welcome;
