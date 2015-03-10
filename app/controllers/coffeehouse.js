var CoffeeHouse = {
    index: function(req, res, next) {
        return res.render('coffeehouse/index', { title: 'CoffeeHouses'});
    }
};

module.exports = CoffeeHouse;
