// Archivo creado para manejar las Rutas del Login
/*
    Ruta: /api/login
*/

// Importamos el Router de Express
const { Router } = require('express');

// Importamos los Controladores
const { login, googleSignIn, renewToken } = require('../controllers/auth');

// Importamos las Validaciones
const { validarCampos } = require('../middlewares/validar-campos');

// Importamos el Check Express Validator
const { check } = require('express-validator');

// Importamos las Validaciones desde los Middlewares
const { validarJWT } = require('../middlewares/validar-jwt');

// Construimos las Rutas
const router = Router();

// Ruta POST para Loguear Usuarios
router.post('/', [

        // validamos el email no esté vacío y que tenga formato email
        check('email', 'El email es obligatorio').isEmail(),

        // validamos que el password no esté vacío
        check('password', 'La contraseña es obligatoria').notEmpty(),

        // Validamos según nuestras validaciones personalizadas
        validarCampos,
    ],

    login
);

// Ruta POST para Loguear con Google
router.post('/google', [

        // validamos que el token no esté vacío
        check('token', 'El Token de Google es obligatorio').notEmpty(),

        // Validamos según nuestras validaciones personalizadas
        validarCampos,
    ],

    googleSignIn
);

// Ruta GET para renovar el Token (si alguien está en sesión activa)
router.get('/renew', [

        // Validamos que venga un token según nuestras validaciones personalizadas
        validarJWT,
    ],

    renewToken
);

// Exportamos la Ruta
module.exports = router;