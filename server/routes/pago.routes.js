const {Router} = require('express');
const router = Router();
const paypal = require('paypal-rest-sdk');
const paypalmodel = require('../models/paypal.model');

router.post('/pago',(req,res)=>{
    let contenido = req.body;
    let saldo = contenido.monto.toString();
    
    paypal.configure({
        'mode': 'sandbox', //sandbox or live
        'client_id': 'EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM',
        'client_secret': 'EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM'
      });

      var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:4200/#/payment",
            "cancel_url": "http://localhost:4200/#/carrito"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "item",
                    "sku": "item",
                    "price": "1.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "1.00"
            },
            "description": "Pago Tiendas Cresspo "
        }]
    };
     
     
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            let pay = new paypalmodel({
                codigo:payment.id
            });

            pay.save((errs,data)=>{
                if(errs){
                    res.json({
                        ok:false
                    })
                }else{
                    res.json({  
                    ruta:payment.links[1].href
                })
                }
                
                
            })
             
        };
        
    });

});

router.get('/pago/:codigo',(req,res)=>{
    let codigoventa = req.params.codigo;
    paypalmodel.findOne({codigo:codigoventa},(err,data)=>{
        if(err){
            res.status(200).json({
                ok:false,
                error:error
            })
        }else{
            res.json({
                ok:true,
                codigo:data
            })
        }
    })
})




module.exports = router;