const mongoose = require('mongoose')

const connectionString = 'mongodb+srv://userMiguel:apiprueba@cluster0.4fcclig.mongodb.net/pruebaDB?retryWrites=true&w=majority'

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('connected to database')
}).catch(error => {
  console.error(error)
})
