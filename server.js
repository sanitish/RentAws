const express = require('express');
const app= express();
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const passport = require('passport');

//require('./s/passport')(passport);

// Load routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');
const rooms = require('./routes/rooms');
const students = require('./routes/students');

const MongoStore = require('connect-mongo')
var mongoose = require('mongoose');

mongoose.connect('mongodb://sanitish:sanitsum@ds161164.mlab.com:61164/bookshop');
var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error : '));




app.use('/ideas', ideas);
app.use('/users', users);
app.use('/rooms', rooms);
app.use('/students', students);


const port = process.env.PORT || 3000;
app.listen(port);
console.log('server is up on port 3000');
