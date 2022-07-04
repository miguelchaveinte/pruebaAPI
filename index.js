const { response } = require('express')
const express=require('express')
const app=express()

app.use(express.json())

let notes = [
  {
    id: 1,
    content: "estoy probando",
    date: "2022-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2022-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-05-30T19:20:14.298Z",
    important: true
  }
]

app.get('/',(request,response)=>{
    response.send('<h1> probanod cositas </h1>')
})

app.get('/api/notes',(request,response)=>{
    response.json(notes)
})

app.get('/api/notes/:id',(request,response)=>{
    const id = Number(request.params.id)  //Parseamos id a number ya que lo tenemos así guardado
    const note = notes.find(note => note.id === id)
    if(note){
        response.json(note)
    }
    else{
        response.status(404).end()
    }
})

app.delete('/api/notes/:id',(request,response)=>{
    const id = Number(request.params.id)  //Parseamos id a number ya que lo tenemos así guardado
    notes=notes.filter(note => note.id !== id)
    response.status(204).end()
})

const generateId = () => {
    const ids=notes.map(note=>note.id)
    const maxId = notes.length > 0
      ? Math.max(...ids)
      : 0
    return maxId + 1
}
  
app.post('/api/notes', (request, response) => {
    const note = request.body

    if (!body.content) {
        return response.status(400).json({ 
        error: 'content missing' 
        })
    }

    const newNote = {
        id: generateId(),
        content: note.content,
        important: note.important || false,
        date: new Date().toISOString      
    }

    notes = [...notes,newNote]

    response.json(newNote)
})

const PORT = 3001
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})
