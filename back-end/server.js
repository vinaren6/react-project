const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { check, validationResult } = require('express-validator');
const signup = require('./controllers/auth').signup
const login = require('./controllers/auth').login
const isAuthorized = require('./controllers/auth').isAuthorized
const envVars = require('dotenv').config()
const bookRouter = require('./routes/book')

const app = express()

if (envVars.error) {
    console.log('Erro parsing environment variables')
}

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

mongoose.connect('mongodb://localhost/testbase9', {useNewUrlParser: true, useCreateIndex: true})
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))


app.post('/signup', [check('firstName').isLength({min:  3}), check('lastName').isLength({min:  3}), check('password').isLength({min:  6}), check('email').isEmail(),],(req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        } else {
            return next()
        }
    }
    , signup)
app.post('/login', [check('password').isLength({min:  6}), check('email').isEmail(),],(req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    } else {
        return next()
    }
} ,login)
app.use('/Redigera', isAuthorized)
app.use('/api/books', bookRouter)

app.listen(3010, function(){ console.log('Node server listening on port 3010');});