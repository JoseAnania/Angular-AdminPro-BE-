/* Este archivo Middleware es creado para validar los JWT */

// importamos el JWT
const jwt = require('jsonwebtoken');

// importamos el Modelo de USuario
const Usuario = require('../models/usuario');

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

// Método para validar los Usuarios con Rol Admin (y no permitir a Usuarios con Rol User Modifiquen o Eliminen otros Usuarios)
const validarADMIN_ROLE = async(req, res, next) => {

    // obtenemos el id del Usuario Logueado
    const uid = req.uid;

    try {

        // buscamos en BD el usuario con el Id del Usuario Logueado
        const usuarioDB = await Usuario.findById(uid);

        // consultamos si el usuario existe 
        if (!usuarioDB) {

            // si no existe retornamos la respuesta
            return res.status(404).json({
                ok: false,
                msg: 'El Usuario no existe'
            });
        }

        // si el usuario existe consultamos si el Rol no es Admin
        if (usuarioDB.role !== 'ADMIN_ROLE') {

            // si no es Admin retornamos la respuesta
            return res.status(403).json({
                ok: false,
                msg: 'El Usuario no tiene Rol Admin'
            });
        }

        // llamamos a la Función Next en caso que pase las validaciones (es decir sea Usuario con Rol Admin)
        next();

    } catch (error) {

        // imprimimos el error en consola
        console.log(error);

        // respuesta en caso de error
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }
}

// Método para validar que los Usuarios con Rol User puedan modificar su perfil
const validarADMIN_ROLE_MismoUsuario = async(req, res, next) => {

    // obtenemos el id del Usuario Logueado
    const uid = req.uid;

    // obtenemos el id del Usuario a modificar
    const id = req.params.id;

    try {

        // buscamos en BD el usuario con el Id del Usuario Logueado
        const usuarioDB = await Usuario.findById(uid);

        // consultamos si el usuario existe 
        if (!usuarioDB) {

            // si no existe retornamos la respuesta
            return res.status(404).json({
                ok: false,
                msg: 'El Usuario no existe'
            });
        }

        // si el usuario existe consultamos si el Rol no es Admin (es decir es User) y no es el mismo ID
        if (usuarioDB.role !== 'ADMIN_ROLE' && uid !== id) {

            // si no es Admin retornamos la respuesta
            return res.status(403).json({
                ok: false,
                msg: 'El Usuario no tiene Rol Admin'
            });
        }

        // llamamos a la Función Next en caso que pase las validaciones (es decir sea Usuario con Rol Admin o User intentando modificarse
        // a si mismo)
        next();

    } catch (error) {

        // imprimimos el error en consola
        console.log(error);

        // respuesta en caso de error
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }
}

// permitimos la exportación para poder usar los métodos de este componente en otros componentes
module.exports = {

    validarJWT,
    validarADMIN_ROLE,
    validarADMIN_ROLE_MismoUsuario
}