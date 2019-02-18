const mongoose = require('mongoose');

let esquema = mongoose.Schema;

let cuponEsquema = new esquema({
    nombre: { type: String, required: [true, 'El nombre es nesesario'] },
    descuento:{type:Number,required:[true,'le monto esnesesario']}
});

module.exports = mongoose.model('Cupon', cuponEsquema);