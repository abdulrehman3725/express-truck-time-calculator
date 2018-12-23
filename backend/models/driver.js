const mongoose = require('mongoose');

var Driver = mongoose.model('Driver',{
    name: {type: String}
});

module.exports = {Driver};