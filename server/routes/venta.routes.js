const {Router} = require('express');
const router = Router();
const shortUniqueId = require('short-unique-id');
const uid = new shortUniqueId();
const Venta = require('../models/venta.model')
const correo = require('../config/correoVenta');
const usuario = require('../models/usuario.models')

let enviarcorreo = (id,monto)=>{
    usuario.findOne({_id:id},(err,data)=>{
      correo.enviarCorreo({monto: monto}, data.correo)
    })
}


router.post('/venta',(req,res)=>{
    let contenido = req.body;
    let venta = new Venta({
        Fecha:contenido.Fecha,
        usuario:contenido.usuario,
        boleta:contenido.boleta,
        codigo: (uid.randomUUID(6)).toUpperCase(),
        descuento:contenido.descuento,
        monto:contenido.monto,
        direccion:contenido.direccion,
        tipo:contenido.tipo,
    });

    venta.save((err,data)=>{
        console.log(data);
        enviarcorreo(data.usuario,data.monto);
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
    Venta.find({usuario:id})
          .populate('direccion')
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

router.get('/verventa/:id',(req,res)=>{
    let id = req.params.id;
    Venta.findOne({_id:id})
          .populate('direccion usuario')
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


router.put('/venta/:id',(req,res)=>{
    let id = req.params.id;
    let contenido = req.body;
    Venta.findOneAndUpdate({_id:id},{estado:contenido.estado},{new:true},(err,data)=>{
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