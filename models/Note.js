const { Schema, model } = require('mongoose')

// Creamos el esquema de la nota
/**
 * @typedef Note
 * @property {string} content.required - Contenido de la nota
 * @property {Date} date - Fecha creación de la nota en formato ISO
 * @property {boolean} important - Nota importante o no
 * @property {Array.<User>} users
 */

const noteSchema = new Schema({
  content: String,
  date: Date,
  important: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

// Modificamos el toJSON que nos devolverá el schema
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = model('Note', noteSchema)

module.exports = Note
