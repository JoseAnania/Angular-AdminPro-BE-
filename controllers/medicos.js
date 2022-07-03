// Archivo creado para manejar los Controladores de las Rutas de los Médicos

// Importamos el modelo
const Medico = require("../models/medico");

// Método GET
const getMedico = async(req, res) => {

    // buscamos la lista de Médicos de la BD (await porque es una Promesa y esperamos a que termine antes de ejecutar la res)
    // en el populate mostramos los datos que queremos del usuario y hospital (no sólo su UID)
    const medicos = await Medico.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img');

    // respuesta
    res.json({
        ok: true,
        medicos,
    });
};

// Método POST
const crearMedico = async(req, res) => {

    // obtenemos el id del Usuario (ya que en el Schema definimos que un Médico necesita un Usuario y un Hospital). El uid viene en el Token
    const uid = req.uid;

    // creamos el nuevo Médico (desestructurando para agregar el id del Usuario)
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {

        // guardamos el Médico en BD
        const medicoDB = await medico.save();

        // respuesta
        res.json({
            ok: true,
            medico: medicoDB
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
const actualizarMedico = async(req, res) => {

    // obtenemos el id del Médico que viene del Front
    const id = req.params.id;

    // obtenemos el id del Usuario que viene del Front
    const uid = req.uid;

    try {

        // buscamos el Médico por id
        const medicoDB = await Medico.findById(id);

        // si no encontramos médico, mostramos error
        if (!medicoDB) {

            // respuesta
            return res.status(404).json({
                ok: false,
                msg: 'No existe un médico con ese Id'
            });
        }

        // si encontramos médico
        // obtenemos los campos que vienen del Front sin los campos que no permitimos actualizar
        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        // grabamos los cambios en la BD
        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true });

        // respuesta
        res.json({
            ok: true,
            hospital: medicoActualizado,
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
const borrarMedico = async(req, res) => {

    // obtenemos el id del médico que viene del Front
    const id = req.params.id;

    try {

        // buscamos el médico por id
        const medicoDB = await Medico.findById(id);

        // si no encontramos médico, mostramos error
        if (!medicoDB) {

            // respuesta
            return res.status(404).json({
                ok: false,
                msg: 'No existe un médico con ese Id'
            });
        }

        // si existe, borramos en la BD
        await Medico.findByIdAndDelete(id);

        // respuesta
        res.json({
            ok: true,
            msg: 'Médico eliminado'
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

// Método GET
const getMedicoById = async(req, res) => {

    // obtenemos el id del médico que viene del Front
    const id = req.params.id;

    try {

        // buscamos el Médico por Id de la BD (await porque es una Promesa y esperamos a que termine antes de ejecutar la res)
        // en el populate mostramos los datos que queremos del usuario y hospital (no sólo su UID)
        const medico = await Medico.findById(id)
            .populate('usuario', 'nombre img')
            .populate('hospital', 'nombre img');

        // respuesta
        res.json({
            ok: true,
            medico,
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
    getMedico,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedicoById,
};