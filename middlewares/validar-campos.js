/* Este archivo Middleware es creado para validar los campos */

// importamos el Express Validator
const { validationResult } = require('express-validator');

// Método para validar los campos
const validarCampos = (req, res, next) => {


    // atrapamos los errores del Express Validator definidos en las Rutas (usuarios.js) para mostrarlos
    const errores = validationResult(req);

    if (!errores.isEmpty()) {

        // respuesta
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }

    // llamamos a la Función Next en caso que no haya errores
    next();
}

// permitimos la exportación para poder usar los métodos de este componente en otros componentes
module.exports = {

    validarCampos
}