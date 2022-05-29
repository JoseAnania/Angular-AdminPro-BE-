/* Archivo creado para el manejo de la Validación de Token de Google */

// copiamos según doc de Integrating Google Sign In

const { OAuth2Client } = require('google-auth-library');
const { async } = require('jshint/src/prod-params');
const client = new OAuth2Client(process.env.GOOGLE_ID);

// Función de verificación de Token
const googleVerify = async(token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_ID,
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    console.log(payload);
    const { name, email, picture } = payload;

    return { name, email, picture };
}

// Exportamos los métodos
module.exports = {
    googleVerify
};