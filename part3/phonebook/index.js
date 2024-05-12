const express = require('express')
const app = express()
var morgan = require('morgan')


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))

let data = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })

app.get('/api/persons', (request, response) => {
    response.json(data)
})

app.get('/info', (request, response) => {
    response.send(`<div><br/><p>Phonebook has info for ${data.length} people</p>
                    <p>${new Date().toString()}</p></div>`)
})

app.get('/api/person/:id', (request, response) => {
  const id = Number(request.params.id)

  person = data.find(person => person.id === id)

  if (person) {
    response.json(person)
  }
  else {
    response.status(404).end()
  }
})

app.delete('/api/person/:id', (request, response) => {
  const id = Number(request.params.id)

  data = data.filter(person => person.id !== id)
  
  response.status(204).end()
})


const generateId = () => {
  const id = data.length > 0 
            ? Math.max(...data.map(n => n.id)) 
            : 0
  return id + 1
}

app.use(express.json())
app.post('/api/persons', (request, response) => {
  const body = request.body
  
  if (!body.name && !body.number) {
    return response.status(404).json({
      'error': 'missing input contact'
    })
  }

  if (!body.name || !body.number) {
    return response.status(404).json({
      'error': 'content missing'
    })
  }
  const existedPerson = data.find( person => person.name.toLowerCase() === body.name.toLowerCase())
  if (existedPerson !== undefined) {
    return response.status(404).json({
      'error': 'name must be unique'
    })
  }

  else {
    const newPerson = 
    {
      id: generateId(), 
      name: body.name,
      number: body.number
    }
  
    data = data.concat(newPerson)
    response.json(data)

  }

})