/* Archivo creado para el manejo de los Token con JWT */

// importamos el JWT
const jwt = require('jsonwebtoken');

// Función para generar un Token (por id)
const generarJWT = (uid) => {

    // convertimos la función en un Promesa
    return new Promise((resolve, reject) => {

        // creamos el Payload (compuesto por el id, o por lo que querramos)
        const payload = {
            uid,
        };

        // creamos el token (con el payload + palabra secreta que definimos en las Variables de Entorno)
        jwt.sign(payload, process.env.JWT_SECRET, {

            // definimos la expiración
            expiresIn: '12h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('No se pudo generar el JWT');
            } else {
                resolve(token);
            }

        });
    });
}

// Exportamos los métodos
module.exports = {
    generarJWT
};