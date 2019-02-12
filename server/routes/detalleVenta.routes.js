const {Router} = require('express');
const router = Router();
const Detalle = require('../models/detalleVenta.model');

router.post('/detalleventa',(req,res)=>{
    let contenido = req.body;
    let detalle = new Detalle({
        venta:contenido.venta,
        precio:contenido.precio,
        cantidad:contenido.cantidad,
        producto:contenido.precio,
        descuento:contenido.descuento
    });

    detalle.save((err,data)=>{
        if(err){
            res.json({
                ok: false,
                message:'No se pudo completar la operacion',
                error: err
            });
        }else{
            res.json({
                ok: true,
                detalle: data
            });
        };
    });
});

router.get('/detalle/:venta',(req,res)=>{
    let venta = req.params.venta;
    Detalle.find({venta:venta},(err,data)=>{
        if(err){
            res.json({
                ok: false,
                message:'No se pudo completar la operacion',
                error: err
            });
        }else{
            res.json({
                ok: true,
                detalle: data
            });
        };
    });
});

module.exports = router;