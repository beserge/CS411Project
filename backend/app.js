var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cntextRouter = require('./routes/cntext');
var regRouter = require('./routes/reg');
var mealRouter = require('./routes/meal');
var workoutRouter = require('./routes/fitness');

var app = express();

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/', { useNewUrlParser: true })

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//CORS nonsense
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, content-type, Accept, Authorization, XMLHttpRequest");
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } 
    else {
        next();
    }
});

app.use('/cntext', cntextRouter)
app.use('/reg', regRouter)
app.use('/meal', mealRouter)
app.use('/fitness', workoutRouter)

//RegData.deleteMany(function(err){if(err) console.log(err) })

module.exports = app;