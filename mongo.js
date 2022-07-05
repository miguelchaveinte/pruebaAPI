const mongoose = require('mongoose')

// TODO: En un .env para las variables de entorno de mongoose     // const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env
const connectionString = 'mongodb+srv://userMiguel:apiprueba@cluster0.4fcclig.mongodb.net/pruebaDB?retryWrites=true&w=majority'

// Connect to MongoDB
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('connected to database')
}).catch(error => {
  console.error(error)
})

// Surge un error, asegurarnos de cerrar conexión
process.on('uncaughtException', error => {
  console.error(error)
  mongoose.disconnect()
})
