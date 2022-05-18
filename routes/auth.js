// Archivo creado para manejar las Rutas del Login
/*
    Ruta: /api/login
*/

// Importamos el Router de Express
const { Router } = require('express');

// Importamos los Controladores
const { login } = require('../controllers/auth');

// Importamos las Validaciones
const { validarCampos } = require('../middlewares/validar-campos');

// Importamos el Check Express Validator
const { check } = require('express-validator');

// Construimos las Rutas
const router = Router();

// Ruta POST para Loguear Usuarios
router.post('/', [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').notEmpty(),

        // Validamos según nuestras validaciones personalizadas
        validarCampos,
    ],

    login
);

// Exportamos la Ruta
module.exports = router;