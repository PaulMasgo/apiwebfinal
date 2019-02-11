const {Router} = require('express');
const router = Router();
const Venta = require('../models/venta.model')

router.post('/venta',(req,res)=>{
    let contenido = req.body;
    let venta = new Venta({
        Fecha:contenido.Fecha,
        usuario:usuario.usuario,
        boleta:usuario.boleta
    });

    Venta.save((err,data)=>{
        if(err){
            res.json({
                ok: false,
                message:'No se pudo completar la operacion',
                error: err
            });
        }else{
            res.json({
                ok: true,
                venta: data
            });
        };
    });
});

router.get('/venta/:id',(req,res)=>{
    let id = req.params.id;
    Venta.findOne({_id:id},(err,data)=>{
        if(err){
            res.json({
                ok: false,
                message:'No se pudo completar la operacion',
                error: err
            });
        }else{
            res.json({
                ok: true,
                venta: data
            });
        };
    })
})