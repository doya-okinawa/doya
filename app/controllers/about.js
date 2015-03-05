var About = {
    index: function(req, res, next) {
        return res.render('about/index',{});
    }
};

module.exports = About;
