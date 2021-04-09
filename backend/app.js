var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/')

const { Schema } = mongoose
const RegSchema = new Schema({
        height: Number,
        weight: Number,
        gender: String,
        goalLbs: Number,
        timeDays: Number,
        dietMacros: {
            carbs: Number,
            fats: Number,
            protein: Number,
        },
        dietRestrictions: {
            isKosher: Boolean,
            isHalal: Boolean,
            isVegetarian: Boolean,
            isVegan: Boolean,
        },
        workoutDays: {
            sunday: Boolean,
            monday: Boolean,
            tuesday: Boolean,
            wednesday: Boolean,
            thursday: Boolean,
            friday: Boolean,
            saturday: Boolean,
        },
        workoutTimes: Array, //preferred times in min since midnight, so 10:30 AM = 10*60 + 30
        workoutTypes: {
            indoor: Boolean,
            outdoor: Boolean,
            cycling: Boolean,
            running: Boolean,
        },
});

let RegData = mongoose.model('RegData', RegSchema)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

function RegHandler (req, res){

    //RegData.deleteMany(function(err){})

    console.log(req.query)
    let regdata = new RegData(req.query);
    regdata.save(function (err){ if (err) console.log(err) })

    RegData.find(function(err, items){
        if(err) return console.error(err)
        let reply = JSON.stringify(items)
        res.send(reply);
    })
}

app.get("/reg", RegHandler)

module.exports = app;
