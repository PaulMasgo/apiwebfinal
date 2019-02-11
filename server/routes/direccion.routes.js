const {Router} = require('express');
const router = Router();
const Direccion = require('../models/direccion.model');

router.post('/direccion',(req,res)=>{
    let contenido = req.body;
    let direccion = Direccion({
        Direccion:contenido.Direccion,
        Referencia:contenido.Referencia,
        Tipo:contenido.Tipo,
        Ubigeo:contenido.Ubigeo,
        Usuario:contenido.Usuario
    });

    direccion.save((err,data)=>{
        if(err){
            res.json({
                ok: false,
                message:'No se pudo completar la operacion',
                error: err
            });
        }else{
            res.json({
                ok: true,
                direccion: data
            });
        };
    });
});

router.get('/direccion/:usuario',(req,res)=>{
    let usuario = req.params.usuario;
    Direccion.find({Usuario:usuario})
                .populate('Ubigeo')
                .exec((err,data)=>{
                    if(err){
                        res.json({
                            ok: false,
                            message:'No se pudo completar la operacion',
                            error: err
                        });
                    }else{
                        res.json({
                            ok: true,
                            direccion: data
                        });
                    };
                });        
     
});


router.delete('/direcciom/:id',(req,res)=>{
    let direccion = req.params.id;
    Direccion.findByIdAndRemove({_id:direccion},(err,data)=>{
        router.get('/direccion/:usuario',(req,res)=>{
            let usuario = req.params.usuario;
            Direccion.find({Usuario:usuario},(err,data)=>{
            if(err){
                res.json({
                    ok: false,
                    message:'No se pudo completar la operacion',
                    error: err
                });
            }else{
                res.json({
                    ok: true,
                    direccion: data
                });
            };
           });
        });
    })
});

module.exports = router;