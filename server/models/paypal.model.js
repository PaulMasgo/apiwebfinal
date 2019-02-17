const mongoose = require('mongoose');

let esquema = mongoose.Schema;

let tokenesquema = new esquema({
    codigo:{type:String}
})

module.exports = mongoose.model('Paypal',tokenesquema);