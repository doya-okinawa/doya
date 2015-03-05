var CoffeeHouse = {
    index: function(req, res, next) {
        return res.render('coffeehouse/index', {
            auth: req.auth
        });
    }
};

module.exports = CoffeeHouse;
