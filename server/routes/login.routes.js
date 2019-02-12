const { Router } = require('express');
const bcrypt = require('bcryptjs');

const {CLIENT_ID} = require('../config/config')
const {OAuth2Client} =require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

const router = Router();
const Usuario = require('../models/usuario.models')

router.post('/login', (req, res) => {

    let contenido = req.body;
    Usuario.findOne({ correo: contenido.correo }, (err, usuario) => {
        if (err) {
            return res.status(200).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                error: err
            });
        }

        if (!usuario) {
            return res.status(200).json({
                ok: false,
                mensaje: 'Correo no existe',
                error: err
            });
        }
        if (!bcrypt.compareSync(contenido.password, usuario.password)) {
            return res.status(200).json({
                ok: false,
                mensaje: 'Contraseña no existe',
                error: err
            });
        } else {
            usuario.password = '********************';
            res.status(200).json({
                ok: true,
                usuario: usuario,
                id: usuario._id
            });
        };
    })
});


//*****************  Login con google *****************************/

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    // If request specified a G Suite domain:
    //const domain = payload['hd'];
    
    return{
        nombre:payload.name,
        correo:payload.email,
        imagen:payload.picture,
        google:true
    } 
  }

router.post('/login/google',async(req,res)=>{
    let token = req.body.token;

    let usuarioGoogle = await verify(token)
    .catch(res => {
        return res.json({
            ok:false,
            mensaje:'Token no valido'
        });
    });


    Usuario.findOne({correo:usuarioGoogle.correo},(err,data)=>{
        if (err) {
            return res.status(200).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                error: err
            });
        }
        if(data){
            if(data.google===false){
                return res.status(200).json({
                    ok: false,
                    mensaje: 'Debe de usar la autenticacion normal',
                    error: err
                }); 
            }else{
                return res.status(200).json({
                    ok:true,
                    usuario:data, 
                });
            }
        }else{
            let usuario = new Usuario({
                nombre :usuarioGoogle.nombre,
                correo:usuarioGoogle.correo,
                password:'**********************',
                imagen:usuarioGoogle.imagen,
                google:usuarioGoogle.google,
                estado:'activo'
            });

            usuario.save((err,data)=>{
                if (err) {
                    return res.status(200).json({
                        ok: false,
                        mensaje: 'Error al buscar usuario',
                        error: err
                    });
                }else{
                    return res.status(200).json({
                        ok:true,
                        usuario:data, 
                    });
                }
            })
        }    
    });

});

module.exports = router;