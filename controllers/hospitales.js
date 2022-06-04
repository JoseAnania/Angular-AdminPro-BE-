// Archivo creado para manejar los Controladores de las Rutas de los Hospitales

// Importamos el modelo
const hospital = require("../models/hospital");
const Hospital = require("../models/hospital");

// Método GET
const getHospital = async(req, res) => {

    // buscamos la lista de Hospitales de la BD (await porque es una Promesa y esperamos a que termine antes de ejecutar la res)
    // en el populate mostramos los datos que queremos del usuario y no sólo su UID
    const hospitales = await Hospital.find()
        .populate('usuario', 'nombre img');

    // respuesta
    res.json({
        ok: true,
        hospitales,
    });
};

// Método POST
const crearHospital = async(req, res) => {

    // obtenemos el id del Usuario (ya que en el Schema definimos que un Hospital necesita un Usuario). El uid viene en el Token
    const uid = req.uid;

    // creamos el nuevo Hospital (desestructurando para agregar el id del Usuario)
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {

        // guardamos el Hospital en BD
        const hospitalDB = await hospital.save();

        // respuesta
        res.json({
            ok: true,
            hospital: hospitalDB
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
const actualizarHospital = async(req, res) => {

    // obtenemos el id del hospital que viene del Front
    const id = req.params.id;

    // obtenemos el id del usuario que viene del Front
    const uid = req.uid;

    try {

        // buscamos el Hospital por id
        const hospitalDB = await Hospital.findById(id);

        // si no encontramos hospital, mostramos error
        if (!hospitalDB) {

            // respuesta
            return res.status(404).json({
                ok: false,
                msg: 'No existe un hospital con ese Id'
            });
        }

        // si encontramos hospital
        // obtenemos los campos que vienen del Front sin los campos que no permitimos actualizar
        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        // grabamos los cambios en la BD
        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true });

        // respuesta
        res.json({
            ok: true,
            hospital: hospitalActualizado,
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
const borrarHospital = async(req, res) => {

    // obtenemos el id del hospital que viene del Front
    const id = req.params.id;

    try {

        // buscamos el Hospital por id
        const hospitalDB = await Hospital.findById(id);

        // si no encontramos hospital, mostramos error
        if (!hospitalDB) {

            // respuesta
            return res.status(404).json({
                ok: false,
                msg: 'No existe un hospital con ese Id'
            });
        }

        // si existe, borramos en la BD
        await Hospital.findByIdAndDelete(id);

        // respuesta
        res.json({
            ok: true,
            msg: 'Hospital eliminado'
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
    getHospital,
    crearHospital,
    actualizarHospital,
    borrarHospital,
};