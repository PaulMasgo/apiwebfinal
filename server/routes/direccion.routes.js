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

router.put('/direccion/:id',(req,res)=>{
    let id = req.params.id;
    let contenido = req.body;   
    let direccion = {
        Direccion:contenido.Direccion,
        Referencia:contenido.Referencia,
        Tipo:contenido.Tipo,
        Ubigeo:contenido.Ubigeo,
        Usuario:contenido.Usuario
    };

    Direccion.findOneAndUpdate({_id:id},direccion,{new:true},(err,data)=>{
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

router.get('/direccion/una/:id',(req,res)=>{
    let id = req.params.id;
    Direccion.findOne({_id:id})
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


router.get('/direccion/:usuario',(req,res)=>{
    let usuario = req.params.usuario;
    Direccion.find({Usuario:usuario,estado:'Activo'})
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


router.delete('/direccion/:id',(req,res)=>{
    let direccion = req.params.id;
    Direccion.findByIdAndUpdate({_id:direccion},{estado:'Inactivo'},(err,data)=>{
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

module.exports = router;