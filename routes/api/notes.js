const notesRouter = require('express').Router()
const Note = require('../../models/Note')

/**
 * @typedef Note
 * @property {string} content.required - Contenido de la nota
 * @property {string} date - Fecha creación de la nota
 * @property {boolean} important - Nota importante o no
 */

/**
 * @route  GET /api/notes
 * @summary Devuelve todas las notas
 * @group Note - Operaciones sobre notas
 * @returns {object} 200 - Array de todas las notas
 * @returns {Error} default - Error
 */
notesRouter.get('/', (request, response, next) => {
  Note.find({}).then((notes) => {
    response.json(notes)
  }).catch((err) => next(err))
})

/**
 * @route  GET /api/notes/{id}
 * @summary Devuelve una nota
 * @group Note - Operaciones sobre notas
 * @param {string} id.path.required - Id de la nota
 * @returns {object} 200 - Array de la información de la nota
 * @returns {Error} 404 - Error
 * @returns {Error} default - Error
 */
notesRouter.get('/:id', (request, response, next) => {
  const { id } = request.params
  Note.findById(id)
    .then((note) => {
      if (note) return response.json(note)
      response.status(404).end()
    })
    .catch((err) => next(err))
})

/**
 * @route PUT /api/notes/{id}
 * @summary Actualiza una nota
 * @group Note - Operaciones sobre notas
 * @param {string} id.path.required - Id de la nota
 * @param {string} content.query - Contenido de la nota
 * @param {boolean} important.query - Indica si la nota es importante
 * @returns {object} 200 - Array de la información de la nota actualizada
 * @returns {Error} 400 - Array de la información de los parametros de la query que causa el error
 * @returns {Error} default - Error
 */
notesRouter.put('/:id', (request, response, next) => {
  const { id } = request.params
  const note = request.body
  const newNoteInfo = { content: note.content || request.query.content, important: note.important || request.query.important }
  if (!newNoteInfo.content || !newNoteInfo.important) {
    return response.status(400).json({
      name: note.content,
      important: note.important,
      error: 'note.params missing'
    })
  }
  Note.findByIdAndUpdate(id, newNoteInfo, { new: true }).then((result) => {
    response.json(result)
  }).catch((err) => next(err))
})

/**
 * @route DELETE /api/notes/{id}
 * @summary Elimina una nota
 * @group Note - Operaciones sobre notas
 * @param {string} id.path.required - Id de la nota
 * @returns {} 204 - Nota eliminada correctamente
 * @returns {Error} default - Error
 */
notesRouter.delete('/:id', (request, response, next) => {
  const { id } = request.params
  Note.findByIdAndRemove(id)
    .then((result) => {
      response.status(204).end()
    })
    .catch((err) => next(err))
})

/**
 * @route POST /api/notes
 * @summary Crea una nota
 * @group Note - Operaciones sobre notas
 * @param {string} content.query - Contenido de la nota
 * @param {boolean} important.query - Indica si la nota es importante
 * @returns {object} 200 - Array de la información de la nota creada
 * @returns {Error} 400 - Array de la información del error
 * @returns {Error} default - Error
 */
notesRouter.post('/', (request, response,next) => {
  const note = request.body || request.query

  const noteToAdd = new Note({
    content: note.content || request.query.content,
    date: new Date(),
    important: note.important || request.query.important || false
  })

  if (!noteToAdd.content || !noteToAdd ) {
    return response.status(400).json({
      error: 'note.content missing'
    })
  }
  noteToAdd
    .save()
    .then((savedNote) => {
      response.json(savedNote)
    })
    .catch((err) => next(err))
})

module.exports = notesRouter
