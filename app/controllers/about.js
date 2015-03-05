var About = {
    index: function(req, res, next) {
        return res.render('about/index', {
            auth: req.auth
        });
    }
};

module.exports = About;
