const express = require('express')
const app = express()
const expressSwagger = require('express-swagger-generator')(app)

const options = {
  swaggerDefinition: {
    info: {
      description: 'This is a sample server',
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
  files: ['./routes/api/note.js'] // Path to the API handle folder
}
expressSwagger(options)
app.listen(3001)

