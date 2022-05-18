// Archivo creado para manejar los Controladores del Login de Usuarios

// Importamos el Modelo del Usuario
const Usuario = require('../models/usuario');

// Importamos Bcrypt (Librería para encriptar datos)
const bcrypt = require('bcryptjs');

// importamos el JWT del Helpers
const { generarJWT } = require('../helpers/jwt');

// Método POST
const login = async(req, res) => {

    // obtenemos los datos que vienen del Front
    const { email, password } = req.body;

    try {

        // verificamos que el email exista (es decir que sea un Usuario registrado)
        const usuarioDB = await Usuario.findOne({ email });

        // si no encuentra usuario con ese email registrado, mostramos error
        if (!usuarioDB) {

            // respuesta
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // verificamos que el password exista (es decir que sea igual al de un Usuario registrado)
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        // si no encuentra usuario con ese password ya registrado, mostramos error
        if (!validPassword) {

            // respuesta
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            });
        }

        // Si pasó las validaciones de Email y Password generamos un JWT (Jason Web Token) desde el Helpers
        const token = await generarJWT(usuarioDB.id);

        // respuesta
        res.json({
            ok: true,
            token,
        });

    } catch (error) {

        // si existe un error imprimimos en consola
        console.log(error);

        // respuesta
        res.status(500).json({
            ok: false,
            msg: "Error Inesperado",
        });
    }
};

// Exportamos los métodos
module.exports = {
    login
};