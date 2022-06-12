// Archivo creado para manejar los Controladores del Login de Usuarios

// Importamos el Modelo del Usuario
const Usuario = require('../models/usuario');

// Importamos Bcrypt (Librería para encriptar datos)
const bcrypt = require('bcryptjs');

// importamos el JWT del Helpers
const { generarJWT } = require('../helpers/jwt');

// importamos la verificación del Token de Google del Helpers
const { googleVerify } = require('../helpers/google-verify');

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

// Método POST
const googleSignIn = async(req, res) => {

    // obtenemos el token que vienen del Front (Google SignIn)
    const googleToken = req.body.token;

    try {

        // Verificamos el Token (con la función del Helpers) y devolvemos sólo lo que nos interesa
        const { name, email, picture } = await googleVerify(googleToken);

        // variable para crear un usuario en caso que no exista en BD
        let usuario;

        // verificamos si existe un usuario en BD con el email
        const usuarioDB = await Usuario.findOne({ email });

        // si no existe
        if (!usuarioDB) {

            // creamos uno nuevo
            usuario = new Usuario({
                nombre: name,
                email, // email: email,
                password: '@@@', // no es el password con el que se podrá autenticar
                img: picture,
                google: true,
            });
        } else {

            // si el usuario ya existe en BD pero ahora viene por Google
            usuario = usuarioDB;
            usuario.google = true;
        }

        // Guardamos en BD el usuario
        await usuario.save();

        // Generamos un JWT (Jason Web Token) desde el Helpers
        const token = await generarJWT(usuario.id);

        // respuesta
        res.json({
            ok: true,
            token
        });

    } catch (error) {

        // si existe un error imprimimos en consola
        console.log(error);

        // respuesta
        res.status(401).json({
            ok: false,
            msg: "El Token no es correcto",
        });
    }

};

// Método GET (mandamos el token viejo y recibimos uno nuevo para evitar el vencimiento)
const renewToken = async(req, res) => {

    // obtenemos el id que viene del Front
    const uid = req.uid;

    // Generamos un nuevo JWT (Jason Web Token) desde el Helpers
    const token = await generarJWT(uid);

    // obtenemos el usuario
    const usuario = await Usuario.findById(uid);

    // respuesta
    res.json({
        ok: true,
        token,
        usuario,
    });
}

// Exportamos los métodos
module.exports = {
    login,
    googleSignIn,
    renewToken,
};