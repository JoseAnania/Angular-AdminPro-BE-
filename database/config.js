// File creado para realizar la configuración de Mongoose

// Copiamos según documentación de Mongoose
const mongoose = require('mongoose');

// Método de Conexión
const dbConnection = async() => {

    try {

        // Llamamos a la Cadena de Conexión definida en las Variables de Entorno
        await mongoose.connect(process.env.DB_CNN);

        console.log('Conectado a la BD');

    } catch (error) {

        console.log(error);
        throw new Error('Error al iniciar la BD');
    }
}

// Exportamos el Método de Conexión
module.exports = {

    dbConnection
}