const { Router } = require('express');
const router = Router();

router.use(require('./usuario.routes'));
router.use(require('./login.routes'));
router.use(require('./imagen.routes'));
router.use(require('./producto.routes'))
router.use(require('./categoria.routes'))

module.exports = router;