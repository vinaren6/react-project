const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const client = require('socket.io').listen(4000).sockets;
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

//connect to socket.io
client.on('connection', function (socket) {
    let chat = db.collection('chats');

    //create function to send status
    sendStatus = function (s) {
        socket.emit('status', s);
    }
    //get chat from mongo collection
    chat.find(function (err, users) {
        if (err) return console.error(err);
        //Emit the messages
        socket.emit('output', users)
        console.log(users);
    })
    //Handle input events
    socket.on('input', function (data) {
        let name = data.name;
        let message = data.message;
        
        // check for name and message
        if (name == '' || message == ''){
            // send error status
            sendStatus('please enter a name and message')
        }else {
            // Insert message
            chat.save({name: name, message: message}, function () {
                client.emit('output', [data]);

                //send status object
                sendStatus({
                    message: 'message sent',
                    clear: true
                })

            })
        }
    })

    //handle clear
    socket.on('clear', function (data) {
        //remove all chats from collection
        chat.remove({}, function () {
            //emit cleare
            socket.emit('cleared')
        });
    })
    
})


app.get('/', function(req, res){
    res.json({someProperty : "Some value"})
})

app.post('/signup', signup)
app.post('/login', login)
app.use('/Redigera', isAuthorized)
app.use('/api/books', bookRouter)

app.listen(3010, function(){ console.log('Node server listening on port 3010');});