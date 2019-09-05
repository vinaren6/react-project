const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3010;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/react-project', {useNewUrlParser: true, useCreateIndex: true})
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.post('/login', function (req, res) {
    console.log(req.body.email);
    console.log(req.body.password);
    res.json({aProperty: 'from post'})
});

app.listen(port, function () {console.log(`server started at: ${port}`)});