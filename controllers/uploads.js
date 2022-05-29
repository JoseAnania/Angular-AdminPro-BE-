// Archivo creado para manejar los Controladores de las Rutas de la subida de Archivos

// Importamos UUID (librería para renombrar inequivocamente los archivos)
const { v4: uuidv4 } = require('uuid');

// Importamos el Path (librería nativa, nos permite trabajar con path y sus ubicaciones)
const path = require('path');

// Importamos File System (librería nativa, nos permite leer carpetas y archivos del proyecto)
const fs = require('fs');

// Importamos el Helpers para actualizar archivos
const { actualizarImagen } = require('../helpers/actualizar-imagen');

// Método PUT de subida de Archivos
const fileUpload = async(req, res) => {

    // obtenemos a que tabla subimos el archivo (desde Front)
    const tabla = req.params.tabla;

    // obtenemos a que id subimos el archivo (desde Front)
    const id = req.params.id;

    // validamos que la tabla exista en la BD
    const tablasValidas = ['hospitales', 'medicos', 'usuarios'];

    if (!tablasValidas.includes(tabla)) {

        return res.status(400).json({
            ok: false,
            msg: 'No es una tabla de la BD',
        });
    }

    // validamos que exista un archivo (es decir que no sea vacío) según documentación de Express-Fileupload
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo',
        });
    }

    // obtenemos el archivo
    const file = req.files.imagen;

    // obtenemos la extensión del archivo
    const nombreCortado = file.name.split('.');

    // obtenemos la última posición despues del punto (por si el archivo tiene nombre como "img.1.2.jpg")
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // validamos que la extensión sea válida (o permitida)
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];

    if (!extensionesValidas.includes(extensionArchivo)) {

        return res.status(400).json({
            ok: false,
            msg: 'No es un formato de archivo permitido',
        });
    }

    // generamos el nombre del archivo (para que sean inequívocas) según documentación de UUID
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    // Path donde guardaremos la imagen (carpeta Upload/"tabla"/"archivo")
    const path = `./uploads/${tabla}/${nombreArchivo}`;

    // movemos la imagen a la carpeta correspondiente según documentación de Express-Fileupload
    file.mv(path, (err) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen',
            });
        }

        // Actualizamos BD (borramos la foto anterior de existir) llamando al Helpers
        actualizarImagen(tabla, id, nombreArchivo);

        // respuesta
        res.json({
            ok: true,
            msg: 'Archivo subido correctamente',
            nombreArchivo
        });
    });
};

// Método GET
const getImagen = async(req, res) => {

    // obtenemos la tabla
    const tabla = req.params.tabla;

    // obtenemos la foto (desde Front)
    const foto = req.params.foto;

    // construimos el Path que apunta a la ubicación según sea
    const pathImg = path.join(__dirname, `../uploads/${tabla}/${foto}`);

    // validamos si existe imagen
    if (fs.existsSync(pathImg)) {

        // si existe la obtenemos
        res.sendFile(pathImg);
    } else {

        // si no existe, mostramos una por defecto
        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }
};

// Exportamos los métodos
module.exports = {
    fileUpload,
    getImagen
};