var About = {
    index: function(req, res, next) {
        return res.render('about/index',{ title: 'About'});
    }
};

module.exports = About;
