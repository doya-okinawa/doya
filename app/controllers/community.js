var Community = {
    index: function(req, res, next) {
        return res.render('community/index', { title: 'Communities'});
    }
};

module.exports = Community;
