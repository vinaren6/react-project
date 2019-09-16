const express = require('express');
var http = require('http').createServer(express);
var io = require('socket.io')(http);
const cors = require('cors')
const { check, validationResult } = require('express-validator');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const signup = require('./controllers/auth').signup
const login = require('./controllers/auth').login
const getUserName = require('./controllers/auth').getUserName
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




app.get('/', function(req, res){
    res.json({someProperty : "Some value"})
})


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
app.use('/getname', getUserName)

app.get('/', function(req, res){
    res.send('<h1>Hello world</h1>');
});

io.on('connection', function(socket){
    console.log('user is connected')
    socket.on('chat message', function(msg){
        console.log('message: ' + JSON.stringify(msg));
        io.emit('chat message', msg)
    });
});


http.listen(3001, function(){
    console.log('listening on *:3001');
});

app.listen(3010, function(){ console.log('Node server listening on port 3010');});