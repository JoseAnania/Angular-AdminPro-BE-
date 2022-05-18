// Archivo creado para manejar las Rutas de los Usuarios
/*
    Ruta: /
*/

// Importamos Express
const { Router } = require('express');

// Construimos las Rutas
const router = Router();

router.get('/', (req, res) => {

    res.json({
        ok: true,
        msg: 'Hola Mundo'
    });
});

// Exportamos la Ruta
module.exports = router;