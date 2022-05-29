// Archivo creado para manejar los Controladores de las Rutas de los Usuarios

// Importamos el modelo
const Usuario = require("../models/usuario");

// Importamos Bcrypt (Librería para encriptar datos)
const bcrypt = require('bcryptjs');

// importamos el JWT del Helpers
const { generarJWT } = require("../helpers/jwt");

// Método GET
const getUsuario = async(req, res) => {

    // creamos una constante numérica para la paginación
    const desde = Number(req.query.desde) || 0;

    // como ejecutaremos dos promesas consecutivas podemos usar el siguiente método (para las promesas "usuarios" y "total")
    const [usuarios, total] = await Promise.all([

        // buscamos la lista de Usuarios de la BD 
        // en el Find definimos sólo lo que queremos que nos muestre, en el Skip la paginación y el Limit el valor hasta del Skip
        Usuario
        .find({}, "nombre email role google img")
        .skip(desde)
        .limit(5),

        // calculamos el total de registros en BD para mostrarlos en la respuesta
        Usuario.countDocuments(),
    ]);

    // respuesta
    res.json({
        ok: true,
        usuarios,
        total,
    });
};

// Método POST
const crearUsuario = async(req, res) => {

    // obtenemos los datos que vienen del Front
    const { email, password } = req.body;

    try {

        // validamos el "email" (que fue definido en el Esquema como "unique") (await porque es una Promesa y esperamos a que termine antes de ejecutar la res)
        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {

            // respuesta
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            })
        }

        // creamos el nuevo Usuario
        const usuario = new Usuario(req.body);

        // antes de grabar en la BD encriptamos la contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        // grabamos en la BD el Usuario(await porque es una Promesa y esperamos a que termine antes de ejecutar la res)
        await usuario.save();

        // generamos un JWT (Jason Web Token) desde el Helpers
        const token = await generarJWT(usuario.id);

        // respuesta
        res.json({
            ok: true,
            usuario,
            token,
        });

    } catch (error) {

        // si existe un error imprimos en consola
        console.log(error);

        // respuesta
        res.status(500).json({
            ok: false,
            msg: "Error Inesperado",
        });
    }
};

// Método PUT
const actualizarUsuario = async(req, res) => {

    // obtenemos el id que viene del Front
    const uid = req.params.id;

    try {

        // buscamos el Usuario por id
        const usuarioDB = await Usuario.findById(uid);

        // si no encontramos usuario, mostramos error
        if (!usuarioDB) {

            // respuesta
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese Id'
            });
        }

        // si encontramos usuario
        // obtenemos los campos que vienen del Front sin los campos que no permitimos actualizar
        const { password, google, email, ...campos } = req.body;

        // verificamos que no esté registrado ya el email (en caso de modificación del mismo)
        if (usuarioDB.email !== email) {

            const existeEmail = await Usuario.findOne({ email });

            if (existeEmail) {
                // respuesta
                return res.status(404).json({
                    ok: false,
                    msg: 'Ya existe un Usuario con ese Email'
                });
            }
        }

        // actualizamos el email
        campos.email = email;

        // grabamos en la BD el Usuario actualizado(await porque es una Promesa y esperamos a que termine antes de ejecutar la res)
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        // respuesta
        res.json({
            ok: true,
            usuario: usuarioActualizado,
        });

    } catch (error) {

        // si existe un error imprimos en consola
        console.log(error);

        // respuesta
        res.status(500).json({
            ok: false,
            msg: "Error Inesperado",
        });
    }
};

// Método DELETE
const borrarUsuario = async(req, res) => {

    // obtenemos el id que viene del Front
    const uid = req.params.id;

    try {

        // buscamos el Usuario por id
        const usuarioDB = await Usuario.findById(uid);

        // si no encontramos usuario, mostramos error
        if (!usuarioDB) {

            // respuesta
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese Id'
            });
        }

        // si existe, borramos en la BD
        await Usuario.findByIdAndDelete(uid);

        // respuesta
        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        });

    } catch (error) {

        // si existe un error imprimos en consola
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
    getUsuario,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario,
};