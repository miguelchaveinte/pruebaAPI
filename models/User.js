const { Schema, model } = require('mongoose')

/**
 * @typedef User
 * @property {string} username.required - Nombre de usuario
 * @property {string} name.required - Nombre personal del usuario
 * @property {string} password.required - Contraseña del usuario
 */
const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  name: String,
  password: String
  /* notes: [{
    type: Schema.Types.ObjectId,
    ref: 'Note'
  }] */
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v

    delete returnedObject.password
  }
})

const User = model('User', userSchema)

module.exports = User
