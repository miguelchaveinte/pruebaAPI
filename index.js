require('./mongo')

const express = require('express')
const app = express()
const cors = require('cors')

// Importamos el modelo de mongoose para Notas
const Note = require('./models/Note')

const notesRouter = require('./routes/api/notes')

const expressSwagger = require('express-swagger-generator')(app)

const options = {
  swaggerDefinition: {
    info: {
      description: 'Probando swagger y API',
      title: 'Swagger',
      version: '1.0.0'
    },
    host: 'localhost:3001',
    basePath: '/',
    produces: [
      'application/json',
      'application/xml'
    ],
    schemes: ['http', 'https'],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: ''
      }
    }
  },
  basedir: __dirname, // app absolute path
  files: ['./routes/api/notes.js'] // Path to the API handle folder
}
expressSwagger(options)

app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1> Probando API </h1>')
})

// Notas modularizada
app.use('/api/notes', notesRouter)

// not found middleware
app.use((request, response, next) => {
  response.status(404).end()
})

// Error handler
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

// Puerto de escucha
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
