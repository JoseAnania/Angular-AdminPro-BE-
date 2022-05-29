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

// Llamamos a las Rutas
app.use('/', require('./routes/pruebaServer'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/uploads', require('./routes/uploads'));

// Levantamos el Servidor en el puerto definido en las Variables de Entorno
app.listen(process.env.PORT, () => {

    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});