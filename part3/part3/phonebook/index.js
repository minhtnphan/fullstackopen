require('dotenv').config()
const Person = require('./models/person')
const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')


app.use(express.static('dist'))
app.use(express.json())
app.use(cors())


const PORT = process.env.PORT
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

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })

app.get('/api/persons', (request, response) => {
  Person.find({}).then(person => {
    response.json(person)
  })
})

app.get('/api/persons/info', (request, response) => {
    response.send(`<div><br/><p>Phonebook has info for ${data.length} people</p>
                    <p>${new Date().toString()}</p></div>`)
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    }
    else {
      response.status(404).end()
    }
  }
  ).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id).then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
})


const generateId = () => {
  const id = data.length > 0 
            ? Math.max(...data.map(n => n.id)) 
            : 0
  return id + 1
}


app.post('/api/persons', (request, response, next) => {
  const body = request.body
  const newPerson = new Person({
    name: body.name,
    number: body.number
  })
  newPerson.save()
          .then(result => {
            response.status(200).send(`added ${[newPerson.name]} number ${newPerson.number} to phonebook`)
          })
          .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body
  if (!name && !number)
    return response.status(400).json({ error: 'Name or Number missing' })
  
  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((updatedPerson) => response.json(updatedPerson))
    .catch(error => {console.log(error)})
})

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).send({error: error.message})
  }
  else if (error.number === 'ValidationError') {
    return response.status(400).send({error: error.message})
  }
  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

// app.post('/api/persons', (request, response) => {
//   const body = request.body
  
//   if (!body.name && !body.number) {
//     return response.status(404).json({
//       'error': 'missing input contact'
//     })
//   }

//   if (!body.name || !body.number) {
//     return response.status(404).json({
//       'error': 'content missing'
//     })
//   }
//   const existedPerson = data.find(person => person.name.toLowerCase() === body.name.toLowerCase())
//   if (existedPerson !== undefined) {
//     return response.status(404).json({
//       'error': 'name must be unique'
//     })
//   }

//   else {
//     const newPerson = 
//     {
//       id: generateId(), 
//       name: body.name,
//       number: body.number
//     }
  
//     data = data.concat(newPerson)
//     response.json(data)

//   }

// })