/* Archivo creado para el manejo de la Actualización de archivos (imagen) */

// Importamos los modelos
const Usuario = require("../models/usuario");
const Hospital = require("../models/hospital");
const Medico = require("../models/medico");

// Importamos el File System para leer archivos
const fs = require('fs');

// Función para actualizar una imagen
const actualizarImagen = async(tabla, id, nombreArchivo) => {

    // declaramos una variable a llenar con el path
    let pathViejo = '';

    // Switch para identificar en que Modelo estamos (Usuario, Médico u Hospital)
    switch (tabla) {
        case 'medicos':

            // validamos que exista un médico
            const medico = await Medico.findById(id);

            // si no existe un médico, no subimos imagen
            if (!medico) {
                console.log("No existe un médico con ese ID");
                return false;
            }

            // validamos si el médico ya tiene una imagen previa cargada
            pathViejo = `./uploads/medicos/${medico.img}`;

            // si ya existe una imagen, la eliminamos (para que sólo quede la nueva)
            if (fs.existsSync(pathViejo)) {
                fs.unlinkSync(pathViejo);
            }

            // si no existe imagen anterior, cargamos la nueva
            medico.img = nombreArchivo;

            // guardamos
            await medico.save();
            return true;

            break;

        case 'hospitales':

            // validamos que exista un hospital
            const hospital = await Hospital.findById(id);

            // si no existe un hospital, no subimos imagen
            if (!hospital) {
                console.log("No existe un hospital con ese ID");
                return false;
            }

            // validamos si el hospital ya tiene una imagen previa cargada
            pathViejo = `./uploads/hospitales/${hospital.img}`;

            // si ya existe una imagen, la eliminamos (para que sólo quede la nueva)
            if (fs.existsSync(pathViejo)) {
                fs.unlinkSync(pathViejo);
            }

            // si no existe imagen anterior, cargamos la nueva
            hospital.img = nombreArchivo;

            // guardamos
            await hospital.save();
            return true;

            break;

        case 'usuarios':

            // validamos que exista un usuario
            const usuario = await Usuario.findById(id);

            // si no existe un usuario, no subimos imagen
            if (!usuario) {
                console.log("No existe un usuario con ese ID");
                return false;
            }

            // validamos si el usuario ya tiene una imagen previa cargada
            pathViejo = `./uploads/usuarios/${usuario.img}`;

            // si ya existe una imagen, la eliminamos (para que sólo quede la nueva)
            if (fs.existsSync(pathViejo)) {
                fs.unlinkSync(pathViejo);
            }

            // si no existe imagen anterior, cargamos la nueva
            usuario.img = nombreArchivo;

            // guardamos
            await usuario.save();
            return true;

            break;
    }
}

// Exportamos los métodos
module.exports = {
    actualizarImagen
};