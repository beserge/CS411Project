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
		carbs: Number,
		fats: Number,
		protein: Number,
		isKosher: Boolean,
		isHalal: Boolean,
		isVegetarian: Boolean,
		isVegan: Boolean,	
		sunday: Boolean,
		monday: Boolean,
		tuesday: Boolean,
		wednesday: Boolean,
		thursday: Boolean,
		friday: Boolean,
		saturday: Boolean,
        workoutTimes: Number, //preferred time in min since midnight
		indoor: Boolean,
		outdoor: Boolean,
		cycling: Boolean,
		running: Boolean,
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
    console.log(req.query)
    let regdata = new RegData(req.query);
    regdata.save(function (err){ if (err) console.log(err) })

    RegData.find(function(err, items){
        if(err) return console.error(err)
        let reply = JSON.stringify(items)
        console.log(reply);
    })
}


//deletes the database
//rm this soon, just for debugging
function DeleteHandler(req,res){
	console.log("delete whole db!!!")
    RegData.deleteMany(function(err){if(err) console.log(err) })

	res.send("complete!")
}

app.get("/reg", RegHandler)
app.get("/del_all", DeleteHandler)

module.exports = app;
