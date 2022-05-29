// Archivo creado para manejar las Rutas de la subida de Archivos
/*
    Ruta: /api/uploads/
*/

// Importamos el Router de Express
const { Router } = require('express');

// Importamos el Express-Fileupload (librería para subir archivos)
const expressFileUpload = require('express-fileupload');

// Importamos los Controladores
const { fileUpload, getImagen } = require('../controllers/uploads');

// Importamos las Validaciones desde los Middlewares
const { validarJWT } = require('../middlewares/validar-jwt');

// Construimos las Rutas
const router = Router();

// Permitimos el uso de la librería
router.use(expressFileUpload());

// Ruta PUT para realizar subidas de archivos 
router.put('/:tabla/:id', [

        // Validamos que venga un token según nuestras validaciones personalizadas
        validarJWT,
    ],

    fileUpload
);

// Ruta GET para Obtener Imágenes
router.get('/:tabla/:foto', [

        // Validamos que venga un token según nuestras validaciones personalizadas
        validarJWT,
    ],

    getImagen

);

// Exportamos la Ruta
module.exports = router;