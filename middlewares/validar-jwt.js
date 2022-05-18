/* Este archivo Middleware es creado para validar los JWT */

// importamos el JWT
const jwt = require('jsonwebtoken');

// Método para validar los JWT
const validarJWT = (req, res, next) => {

    // leemos el token de los Headers
    const token = req.header('x-token');

    // si no existe un token, mandamos mensaje de error
    if (!token) {

        // respuesta
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {

        // validamos que si existe un token sea válido
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid;

    } catch (error) {

        // respuesta
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

    // llamamos a la Función Next en caso que no haya errores
    next();
}

// permitimos la exportación para poder usar los métodos de este componente en otros componentes
module.exports = {

    validarJWT
}