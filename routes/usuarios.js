// Archivo creado para manejar las Rutas de los Usuarios
/*
    Ruta: /api/usuarios
*/

// Importamos el Router de Express
const { Router } = require('express');

// Importamos el Check Express Validator
const { check } = require('express-validator');

// Importamos los Controladores
const { getUsuario, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');

// Importamos las Validaciones desde los Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// Construimos las Rutas
const router = Router();

// Ruta GET para Obtener Usuarios
router.get('/', [

        // Validamos que venga un token según nuestras validaciones personalizadas
        validarJWT,
    ],

    getUsuario
);

// Ruta POST para Crear Usuarios (Validaciones con Express Validator)
router.post('/', [
        check('nombre', 'El nombre es obligatorio').notEmpty(),
        check('password', 'La contraseña es obligatoria').notEmpty(),
        check('email', 'El email es obligatorio').isEmail(),

        // Validamos según nuestras validaciones personalizadas
        validarCampos,
    ],

    crearUsuario
);

// Ruta PUT para Modificar Usuarios (necesita el id)
router.put('/:id', [
        check('nombre', 'El nombre es obligatorio').notEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El role es obligatorio').notEmpty(),

        // Validamos según nuestras validaciones personalizadas
        validarCampos,

        // Validamos que venga un token según nuestras validaciones personalizadas
        validarJWT,
    ],

    actualizarUsuario
);

// Ruta DELETE para Borrar Usuarios (necesita el id)
router.delete('/:id', [

        // Validamos que venga un token según nuestras validaciones personalizadas
        validarJWT,
    ],

    borrarUsuario
);

// Exportamos la Ruta
module.exports = router;