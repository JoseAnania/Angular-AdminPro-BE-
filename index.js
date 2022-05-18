// Index creado para crear el Servidor Express

// Configuración de las Variables de Entorno
require('dotenv').config();

// Configuración del CORS
const cors = require('cors');

// Importamos el Servidor
const express = require('express');

// Importamos la Conexión a la BD
const { dbConnection } = require('./database/config');

// Iniciamos el Servidor
const app = express();

// Iniciamos los CORS
app.use(cors());

// Lectura y Parseo del Body (por ejemplo datos enviados desde Postman)
app.use(express.json());

// Llamamos al Método de Conexión a la BD
dbConnection();

// Creamos las Rutas
app.use('/', require('./routes/pruebaServer'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));

// Levantamos el Servidor en el puerto definido en las Variables de Entorno
app.listen(process.env.PORT, () => {

    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});