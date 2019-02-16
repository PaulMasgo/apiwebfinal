const mongoose = require('mongoose');

const esquema = mongoose.Schema;

let direccionesquema = new esquema({
    Direccion:{type:String ,required:[true,'El dato es nesesario']},
    Referencia:{type:String},
    Tipo:{type:String,required:[true,'Es nesesario indicar el tipo']},
    Ubigeo:{type:esquema.Types.ObjectId,ref:'Ubigeo',required:[true,'El dato es nesesario']},
    Usuario:{type:esquema.Types.ObjectId,ref:'Usuario',required:[true,'El dato es nesesario']},
    estado:{type:String,default:'Activo'}
})

module.exports = mongoose.model('Direccion',direccionesquema);