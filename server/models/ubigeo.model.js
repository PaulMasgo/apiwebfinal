const mongoose = require('mongoose');

let esquema = mongoose.Schema;

let ubigeoEsquema = new esquema({
    departamento:{type:String,required:[true,'El dato es nesesario']},
    provincia:{type:String,required:[true,'El dato es nesesario']},
    distrito:{type:String,required:[true,'El datos es enesesario']}
});

module.exports = mongoose.model('Ubigeo',ubigeoEsquema);