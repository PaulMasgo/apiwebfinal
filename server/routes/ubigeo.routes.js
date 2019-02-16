const {Router} = require('express');
const router = Router();
const Ubigeo = require('../models/ubigeo.model');

router.post('/ubigeo',(req,res)=>{
    let contenido = req.body;
    let ubigeo = new Ubigeo({
        departamento:contenido.departamento,
        provincia:contenido.provincia,
        distrito:contenido.distrito
    });

    ubigeo.save((err,data)=>{
        if(err){
            res.json({
                ok: false,
                message:'No se pudo completar la operacion',
                error: err
            });
        }else{
            res.json({
                ok: true,
                ubigeo: data
            });
        };
    });
});

router.put('/ubigeo/:id',(req,res)=>{
    let id = req.params.id;
    let contenido = req.body;
    let ubigeo = {
        departamento:contenido.departamento,
        provincia:contenido.provincia,
        distrito:contenido.distrito
    };

    Ubigeo.findOneAndUpdate({_id:id},ubigeo,{new:true},(err,data)=>{
        if(err){
            res.json({
                ok: false,
                message:'No se pudo completar la operacion',
                error: err
            });
        }else{
            res.json({
                ok: true,
                ubigeo: data
            });
        };
    });
});




module.exports = router;