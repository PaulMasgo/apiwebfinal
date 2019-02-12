const {Router} = require('express');
const router = Router();
let codigoTienda = 522252201

router.post('/pago/pago.json',(req,res)=>{
    let contenido = req.body;
    res.json({ruta:`https://www.multimerchantvisanet.com/formularioweb/formulariopago.asp?codtienda=${codigoTienda}&mount=20&numcompra=2`,
             ok:true});
});

module.exports = router;