// Archivo creado para manejar las Rutas de los Hospitales
/*
    Ruta: /api/hospitales
*/

// Importamos el Router de Express
const { Router } = require('express');

// Importamos el Check Express Validator
const { check } = require('express-validator');

// Importamos los Controladores
const { getHospital, crearHospital, actualizarHospital, borrarHospital } = require('../controllers/hospitales');

// Importamos las Validaciones desde los Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// Construimos las Rutas
const router = Router();

// Ruta GET para Obtener Hospitales
router.get('/', [

    ],

    getHospital
);

// Ruta POST para Crear Hospitales (Validaciones con Express Validator)
router.post('/', [

        // Validamos que venga un token según nuestras validaciones personalizadas
        validarJWT,

        // validamos que el nombre no esté vacío
        check('nombre', 'El nombre es obligatorio').notEmpty(),

        // Validamos según nuestras validaciones personalizadas
        validarCampos,
    ],

    crearHospital
);

// Ruta PUT para Modificar Hospitales (necesita el id)
router.put('/:id', [

    ],

    actualizarHospital
);

// Ruta DELETE para Borrar Hospitales (necesita el id)
router.delete('/:id', [

    ],

    borrarHospital
);

// Exportamos la Ruta
module.exports = router;