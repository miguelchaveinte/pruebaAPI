const notesRouter = require('express').Router()
const Note = require('../../models/Note')

// Obtenemos todas las notas
notesRouter.get('/', (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes)
  })
})

// Obtenemos una nota por id
notesRouter.get('/:id', (request, response, next) => {
  const { id } = request.params
  Note.findById(id)
    .then((note) => {
      if (note) return response.json(note)
      response.status(404).end()
    })
    .catch((err) => next(err))
})

// Modificar una nota
notesRouter.put('/:id', (request, response, next) => {
  const { id } = request.params
  const note = request.body
  const newNoteInfo = { content: note.content, important: note.important }
  Note.findByIdAndUpdate(id, newNoteInfo, { new: true }).then((result) => {
    response.json(result)
  })
})

// Borrar una nota
notesRouter.delete('/:id', (request, response, next) => {
  const { id } = request.params
  Note.findByIdAndRemove(id)
    .then((result) => {
      response.status(204).end()
    })
    .catch((err) => next(err))
})

// Crear una nota
notesRouter.post('/', (request, response) => {
  const note = request.body

  if (!note.content || !note) {
    return response.status(400).json({
      error: 'note.content missing'
    })
  }

  const noteToAdd = new Note({
    content: note.content,
    date: new Date(),
    important: note.important || false
  })

  noteToAdd
    .save()
    .then((savedNote) => {
      response.json(savedNote)
    })
    .catch((error) => {
      console.log(error)
    })
})

module.exports = notesRouter
