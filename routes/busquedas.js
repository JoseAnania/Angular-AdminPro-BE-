// Archivo creado para manejar las Rutas de la Búsqueda
/*
    Ruta: /api/todo/: "busqueda"
*/

// Importamos el Router de Express
const { Router } = require('express');

// Importamos los Controladores
const { getTodo, getDocumentosColeccion } = require('../controllers/busquedas');

// Importamos las Validaciones desde los Middlewares
const { validarJWT } = require('../middlewares/validar-jwt');

// Construimos las Rutas
const router = Router();

// Ruta GET para realizar Búsqueda global
router.get('/:busqueda', [

        // Validamos que venga un token según nuestras validaciones personalizadas
        validarJWT,
    ],

    getTodo
);


// Ruta GET para realizar Búsqueda en tabla específica
router.get('/coleccion/:tabla/:busqueda', [

        // Validamos que venga un token según nuestras validaciones personalizadas
        validarJWT,
    ],

    getDocumentosColeccion
);

// Exportamos la Ruta
module.exports = router;