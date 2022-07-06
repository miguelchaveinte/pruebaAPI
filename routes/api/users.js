const usersRouter = require('express').Router()
const User = require('../../models/User')

/**
 * @typedef User
 * @property {string} username.required - Nombre de usuario
 * @property {string} name.required - Nombre personal del usuario
 * @property {string} password.required - Contraseña del usuario
 */

/**
 * @route GET /api/users
 * @summary Devuelve todos los usuarios
 * @group User - Operaciones sobre usuario
 * @returns {Array.<User>} 200 - Array de todos los usuarios y sus notas(contenido y fecha)
 */
usersRouter.get('/', async (request, response, next) => {
  const users = await User.find({})
  response.json(users)
})

/**
 * @route POST /api/users
 * @summary Crea un nueva usuario
 * @group User - Operaciones sobre usuario
 * @param {String} username.body username - Nombre de usuario - Data body - eg: username
 * @param {String} name.body name - Nombre personal del usuario - Data body - eg:Pepe
 * @param {String} password.body password - Contraseña del usuario - Data body - eg:123456
 * @returns {User} 201 - Array de la información del usuario creado
 * @returns {Error} 400 - Array de la información de los parametros de la query que causa el error
 */
usersRouter.post('/', async (request, response) => {
  const { body } = request
  const { username, name, password } = body

  if (!username || !password || !name) {
    return response.status(400).json({ message: 'Nombre de username, nombre y contraseña son obligatorios' })
  }

  const user = new User({
    username,
    name,
    password
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter
