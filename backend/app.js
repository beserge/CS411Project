var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/')

var Reg = mongoose.model('Reg', {'name': String})
var testreg = new Reg({'name': 'ben'})
testreg.save(function (err){
    if(err){
        console.log('Write to db error')
    }
    else{
        console.log('Write to db success')
    }
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
