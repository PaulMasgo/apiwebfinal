const mongoose = require('mongoose');

let esquema = mongoose.Schema;

let ventaEsquema = new esquema({
    Fecha:{type:String,required:[true,'este dato es nesesario']},
    usuario:{type:esquema.Types.ObjectId,ref:'usuario',required:[true,'Este dato es ensesario']},
    boleta:{type:String},
    codigo:{type:String,required:[true,'el codigo esnesesario']},
    descuento:{type:Number},
    estado:{type:String,default:'espera'},
    monto:{type:Number,required:[true,'El monto es nesesario']},
    direccion:{type:esquema.Types.ObjectId,ref:'Direccion',required:[true,'La direccion es nesesaria']}
});

module.exports = mongoose.model('Venta',ventaEsquema);