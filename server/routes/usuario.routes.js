const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const uuid = require('uuid/v4');
const Usuario = require('../models/usuario.models')
const router = Router();
const bcrpyt = require('bcryptjs')

// ********** Configurando multer(subida de iamgenes) *************
const storageUsuario = multer.diskStorage({
    destination: path.join(__dirname, '../../uploads/usuarios'),
    filename: (req, file, cb, filename) => {
        cb(null, uuid() + path.extname(file.originalname));
    }
});


// ******* Registrar nuevo usuario ************

router.post('/usuario', (req, res) => {

    let contenido = req.body;

    let usuario = new Usuario({
        nombre: contenido.nombre,
        correo: contenido.correo,
        password: bcrpyt.hashSync(contenido.password),
        tipo: contenido.tipo,
        telefono: contenido.telefono,
        imagen: 'default.png'
    });

    usuario.save((err, usuario) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al guardar usuario',
                error: err
            });
        } else {
            return res.status(200).json({
                ok: true,
                usuario
            });
        };
    });
});


// **********  Obtener todos los usuarios ****************
router.get('/usuario', (req, res) => {
    Usuario.find({ estado: true }, 'nombre correo imagen')
        .exec((err, usuarios) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al listar usuario',
                    error: err
                });
            } else {
                return res.status(200).json({
                    ok: true,
                    usuarios
                });
            };
        });
});


//************ Obtener un solo usuario *************/
router.get('/usuario/:id', (req, res) => {

    let id = req.params.id;
    Usuario.findOne({ _id: id }, (err, usuario) => {
        if (err) {
            return res.json({
                ok: false,
                error: err
            })
        } else {
            return res.json(usuario)
        };
    });
});

//**************    Actualizar foto  ********************************************/
router.post('/usuario/img/:id', multer({ storage: storageUsuario }).single('imagen'), (req, res) => {
    let image = req.file;
    let id = req.params.id;
    if (req.file) {
        Usuario.findByIdAndUpdate({ _id: id }, { imagen: image.filename }, { new: true }, (err, user) => {
            if (err) {
                res.send(err);
            } else {
                user.password = '*************'
                console.log('uploaded!');
                res.json(user);
            }
        });
    } else {
        res.send('No selecciono ninguna imagen')
    };
})

module.exports = router;