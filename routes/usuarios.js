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
const { validarJWT, validarADMIN_ROLE, validarADMIN_ROLE_MismoUsuario } = require('../middlewares/validar-jwt');

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

        // validamos que el nombre no esté vacío
        check('nombre', 'El nombre es obligatorio').notEmpty(),

        // validamos que el password no esté vacío
        check('password', 'La contraseña es obligatoria').notEmpty(),

        // validamos que el email no esté vacío y tenga formato de email
        check('email', 'El email es obligatorio').isEmail(),

        // Validamos según nuestras validaciones personalizadas
        validarCampos,
    ],

    crearUsuario
);

// Ruta PUT para Modificar Usuarios (necesita el id)
router.put('/:id', [

        // validamos que el nombre no esté vacío
        check('nombre', 'El nombre es obligatorio').notEmpty(),

        // validamos que el email no esté vacío y tenga formato de email
        check('email', 'El email es obligatorio').isEmail(),

        // validamos que el role no esté vacío
        check('role', 'El role es obligatorio').notEmpty(),

        // Validamos según nuestras validaciones personalizadas
        validarCampos,

        // Validamos que venga un token según nuestras validaciones personalizadas
        validarJWT,

        // Validamos que el Usuario Logueado tenga Rol Admin para poder Modificar Usuarios 
        //(si tiene Rol User solo permitimos que modifique su propio usuario)
        validarADMIN_ROLE_MismoUsuario,
    ],

    actualizarUsuario
);

// Ruta DELETE para Borrar Usuarios (necesita el id)
router.delete('/:id', [

        // Validamos que venga un token según nuestras validaciones personalizadas
        validarJWT,

        // Validamos que el Usuario Logueado tenga Rol Admin para poder Eliminar Usuarios
        validarADMIN_ROLE,
    ],

    borrarUsuario
);

// Exportamos la Ruta
module.exports = router;