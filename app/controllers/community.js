var Community = {
    index: function(req, res, next) {
        return res.render('community/index', {
            auth: req.auth
        });
    }
};

module.exports = Community;
