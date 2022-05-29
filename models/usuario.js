/* Archivo creado para el Modelo de BD (Mongoose) de Usuarios */

// Importamos Mongoose
const { Schema, model } = require('mongoose');

// Definimos el Esquema
const usuarioSchema = Schema({

    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE',
    },
    google: {
        type: Boolean,
        default: false,
    },
});

// Podemos modificar el Esquema 
// por ejemplo el token que genera Mongo que viene como "_id" lo transformamos en "uid", no mostramos el "password", etc...
usuarioSchema.method('toJSON', function() {

    // extraemos lo que no queremos que se muestre al realizar un GET
    const { __v, _id, password, ...object } = this.toObject();

    // transformamos lo que queremos mostrar al realizar un GET
    object.uid = _id;

    // retornamos
    return object;
})

// Exportamos el Esquema para implementarlo
module.exports = model('Usuario', usuarioSchema);