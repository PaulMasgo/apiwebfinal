const express = require('express');
const app = express();
const Favorito = require('../models/favorito.model');

app.get('/favoritos/:id',(req,res)=>{
    let id = req.params.id;
    Favorito.find({Usuario:id})
            .populate({path:'Producto',populate:{path:'imagen'}})
            .exec((err,data)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando productos',
                error: err
            });
        }else{
            res.status(200).json({
                ok:true,
                Favoritos:data
            })
        }
    });
});

app.post('/favoritos',(req,res)=>{
    let contenido = req.body;

    let favorito = Favorito({
        Usuario:contenido.usuario,
        Producto:contenido.producto
    });

    favorito.save((err,data)=>{
        if (err) {
            res.json({
                ok: false,
                message:'No se pudo completar la operacion',
                error: err
            });
        } else {
            res.json({
                ok: true,
                favorito: data
            });
        };
    });
});

app.delete('/favoritos/:id',(req,res)=>{
    let id = req.params.id;

    Favorito.findByIdAndDelete({_id:id},(err,data)=>{
        if (err) {
            res.json({
                ok: false,
                message:'No se pudo completar la operacion',
                error: err
            });
        } else {
            res.json({
                ok: true,
                Data: data
            });
        };
    });
});

module.exports = app;