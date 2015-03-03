var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var coffeeHouseSchema = new Schema({
    name: String
}, { strict: false});

mongoose.model('CoffeeHouse', coffeeHouseSchema);
