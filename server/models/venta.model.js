const mongoose = require('mongoose');

let esquema = mongoose.Schema;

let ventaEsquema = new esquema({
    Fecha:{type:Date,required:[true,'este dato es nesesario']},
    usuario:{type:esquema.Types.ObjectId,ref:'Usuario',required:[true,'Este dato es ensesario']},
    boleta:{type:String}
});

module.exports = mongoose.model('Venta',ventaEsquema);