// Archivo creado para manejar las Rutas de los Médicos
/*
    Ruta: /api/medicos
*/

// Importamos el Router de Express
const { Router } = require('express');

// Importamos el Check Express Validator
const { check } = require('express-validator');

// Importamos los Controladores
const { getMedico, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos');

// Importamos las Validaciones desde los Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// Construimos las Rutas
const router = Router();

// Ruta GET para Obtener Médicos
router.get('/', [

    ],

    getMedico
);

// Ruta POST para Crear Médicos (Validaciones con Express Validator)
router.post('/', [

        // Validamos que venga un token según nuestras validaciones personalizadas
        validarJWT,

        // validamos que el nombre no esté vacío
        check('nombre', 'El nombre es obligatorio').notEmpty(),

        // validamos que el Id exista en Mongo
        check('hospital', 'El Id del Hospital debe ser válido').isMongoId(),

        // Validamos según nuestras validaciones personalizadas
        validarCampos,

    ],

    crearMedico
);

// Ruta PUT para Modificar Médicos (necesita el id)
router.put('/:id', [

    ],

    actualizarMedico
);

// Ruta DELETE para Borrar Médicos (necesita el id)
router.delete('/:id', [

    ],

    borrarMedico
);

// Exportamos la Ruta
module.exports = router;