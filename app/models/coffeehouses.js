var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var coffeeHouseSchema = new Schema({
    name: String
});

var CoffeeHouse = mongoose.model('CoffeeHouse', coffeeHouseSchema);

var coffeeHouse = new CoffeeHouse({name: 'staba'});

coffeeHouse.save();
