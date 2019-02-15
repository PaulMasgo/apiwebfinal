const {Router} = require('express');
const router = Router();
const shortUniqueId = require('short-unique-id');
const uid = new shortUniqueId();
const Venta = require('../models/venta.model')

router.post('/venta',(req,res)=>{
    let contenido = req.body;
    let venta = new Venta({
        Fecha:contenido.Fecha,
        usuario:contenido.usuario,
        boleta:contenido.boleta,
        codigo: (uid.randomUUID(6)).toLocaleLowerCase(),
        descuento:contenido.descuento,
        monto:contenido.monto,
        direccion:contenido.direccion
    });

    venta.save((err,data)=>{
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
    Venta.findOne({_id:id})
          .populate('Direccion')
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
                venta: data
            });
        };
    })
});

router.get('/venta',(req,res)=>{
    Venta.find((err,data)=>{
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
});



module.exports = router;