/* Archivo creado para el Modelo de BD (Mongoose) de Hospitales */

// Importamos Mongoose
const { Schema, model } = require('mongoose');

// Definimos el Esquema
const hospitalSchema = Schema({

    nombre: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },

    // este Schema tiene relación con el de Usuario ya que necesitamos saber quien generó el Hospital
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
    },

    // podemos definir el nombre que tendrá la tabla en Mongoose
}, { collection: 'hospitales' });

// Podemos modificar el Esquema 
hospitalSchema.method('toJSON', function() {

    // extraemos lo que no queremos que se muestre al realizar un GET
    const { __v, ...object } = this.toObject();

    // retornamos
    return object;
})

// Exportamos el Esquema para implementarlo
module.exports = model('Hospital', hospitalSchema);