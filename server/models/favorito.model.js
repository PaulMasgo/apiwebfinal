const mongoose = require('mongoose');

let esquema = mongoose.Schema;
 
let esquemafavorito = new  esquema({
    Producto:{type:esquema.Types.ObjectId,ref:'Producto',required:[true,'El producto es nesesario']},
    Usuario:{type:esquema.Types.ObjectId,ref:'usuario',required:[true,'El nombre del usuario es nesesario']}
});

module.exports = mongoose.model('Favorito',esquemafavorito);