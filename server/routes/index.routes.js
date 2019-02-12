const { Router } = require('express');
const router = Router();

router.use(require('./usuario.routes'));
router.use(require('./login.routes'));
router.use(require('./imagen.routes'));
router.use(require('./producto.routes'));
router.use(require('./categoria.routes'));
router.use(require('./talla.routes'));
router.use(require('./favorito.routes'));
router.use(require('./ubigeo.routes'));
router.use(require('./direccion.routes'));
router.use(require('./pago.routes'));

module.exports = router;