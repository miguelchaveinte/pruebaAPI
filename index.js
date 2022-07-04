require('./mongo')

const express = require('express')
const app = express()
const cors = require('cors')

const Note = require('./models/Note')

app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1> Probando API </h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response, next) => {
  const { id } = request.params
  Note.findById(id)
    .then(note => {
      if (note) return response.json(note)
      response.status(404).end()
    })
    .catch(err => next(err))
})

app.put('/api/notes/:id', (request, response, next) => {
  const { id } = request.params
  const note = request.body
  const newNoteInfo = { content: note.content, important: note.important }
  Note.findByIdAndUpdate(id, newNoteInfo, { new: true }).then(result => {
    response.json(result)
  })
})

app.delete('/api/notes/:id', (request, response, next) => {
  const { id } = request.params
  Note.findByIdAndRemove(id)
    .then(result => {
      response.status(204).end()
    }).catch(err => next(err))
})

app.post('/api/notes', (request, response) => {
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

  noteToAdd.save().then((savedNote) => {
    response.json(savedNote)
  }
  ).catch((error) => {
    console.log(error)
  })
})

app.use((request, response,next) => {
  response.status(404).end()
})

app.use((error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({
      error: 'malformed id'
    })
  } else {
    response.status(500).send({
      error: 'Something went wrong'
    })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
