var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cntextRouter = require('./routes/cntext');
var regRouter = require('./routes/reg');

var app = express();

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/cntext', cntextRouter);
app.use('/reg', regRouter);
app.use('/del_all', regRouter);

//RegData.deleteMany(function(err){if(err) console.log(err) })

module.exports = app;