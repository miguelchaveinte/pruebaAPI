const { Schema, model } = require('mongoose')

// Creamos el esquema de la nota
const noteSchema = new Schema({
  content: String,
  date: Date,
  important: Boolean
  /* user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  } */
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
