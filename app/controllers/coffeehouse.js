var CoffeeHouse = {
    index: function(req, res, next) {
        return res.render('coffeehouse/index', {});
    }
};

module.exports = CoffeeHouse;
