const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

const { MONGO_URL } = process.env;

mongoose.connect(MONGO_URL, {
    minPoolSize: 10,
    socketTimeoutMS: 45000,
});

// Configurando conexão com MongoDB
mongoose.connect(MONGO_URL)
    .then(() => {
        console.log("Conectado ao MongoDB! Aeeee!!");
    })
    .catch(error => {
        console.error("Deu zica na conexão!");
        console.error(error);
    });


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
