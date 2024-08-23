const {Router} = require("express");
const router = Router();

const ArticuloControlador = require("../controladores/articulo");

// rutas de prueba
router.get("/ruta-de-prueba", ArticuloControlador.prueba);
router.get("/curso", ArticuloControlador.curso);


module.exports = router;
