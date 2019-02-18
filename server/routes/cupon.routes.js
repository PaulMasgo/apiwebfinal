const {Router}= require('express');
const router = Router();
const Cupon = require('../models/cupon.model');

router.post('/cupon',(req,res)=>{
    let contenido = req.body;
    let cupon = new Cupon({
        nombre:contenido.nombre,
        descuento:contenido.descuento
    });
    cupon.save((err,data)=>{
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando productos',
                error: err
            });
        } else {
            res.json({
                res:true,
                data
            });
        };
    })
});

router.get('/cupon',(req,res)=>{
    Cupon.find((err,data)=>{
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando ',
                error: err
            });
        } else {
            res.json({
                res:true,
                data
            });
        };
    })
});


router.get('/cupon/:nombre',(req,res)=>{
    let id = req.params.nombre;
    Cupon.findOne({nombre:id},(err,data)=>{
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando ',
                error: err
            });
        } else {
            res.json({
                res:true,
                data
            });
        };
    });
});


router.put('/cupon/:id',(req,res)=>{
    let id = req.params.id;
    let contenido = req.body
    Cupon.findOneAndUpdate({_id:id},{estado:contenido.estado},(err,data)=>{
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando ',
                error: err
            });
        } else {
            res.json({
                res:true,
                data
            });
        };
    });
});


module.exports = router;