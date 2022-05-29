/* Archivo creado para el Modelo de BD (Mongoose) de Médicos */

// Importamos Mongoose
const { Schema, model } = require('mongoose');

// Definimos el Esquema
const medicoSchema = Schema({

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

    // este Schema tiene relación con el de Hospital ya que necesitamos saber a que Hospital pertenece el Médico
    hospital: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
    },

    // podemos definir el nombre que tendrá la tabla en Mongoose
}, { collection: 'medicos' });

// Podemos modificar el Esquema 
medicoSchema.method('toJSON', function() {

    // extraemos lo que no queremos que se muestre al realizar un GET
    const { __v, ...object } = this.toObject();

    // retornamos
    return object;
})

// Exportamos el Esquema para implementarlo
module.exports = model('Medico', medicoSchema);