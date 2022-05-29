// Archivo creado para manejar los Controladores de las Rutas de la Búsqueda

// Importamos los modelos
const Usuario = require("../models/usuario");
const Hospital = require("../models/hospital");
const Medico = require("../models/medico");

// Método GET de búsqueda global
const getTodo = async(req, res) => {

    // obtenemos los caracteres de la búsqueda que viene del Front
    const busqueda = req.params.busqueda;

    // creamos un expresión regular que nos servirá para flexibilizar la búsqueda
    const regex = new RegExp(busqueda, 'i');

    // usamos el Promise All para que las 3 peticiones se hagan al mismo tiempo
    const [usuarios, hospitales, medicos] = await Promise.all([

        // buscamos los usuarios, médicos y hospitales en BD que coincidan con lo que viene en la búsqueda (el nombre)
        Usuario.find({ nombre: regex }),
        Hospital.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
    ]);

    // respuesta
    res.json({
        ok: true,
        usuarios,
        hospitales,
        medicos,
    });
};

// Método GET de búsqueda en tabla específica
const getDocumentosColeccion = async(req, res) => {

    // obtenemos la tabla de la BD que queremos buscar
    const tabla = req.params.tabla;

    // obtenemos los caracteres de la búsqueda que viene del Front
    const busqueda = req.params.busqueda;

    // creamos un expresión regular que nos servirá para flexibilizar la búsqueda
    const regex = new RegExp(busqueda, 'i');

    // variable para guardar la data de la respuesta del Switch
    let data = [];

    // Switch para buscar según sea la tabla
    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ nombre: regex })
                .populate('usuario', 'nombre img')
                .populate('hospital', 'nombre img');
            break;

        case 'hospitales':
            data = await Hospital.find({ nombre: regex })
                .populate('usuario', 'nombre img');
            break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla debe ser "usuarios/medicos/hospitales"',
            });
    }

    // respuesta
    res.json({
        ok: true,
        resultados: data,
    })

};

// Exportamos los métodos
module.exports = {
    getTodo,
    getDocumentosColeccion,
};