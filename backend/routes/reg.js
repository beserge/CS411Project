var express = require('express');
var router = express.Router();

var mongoose = require('mongoose')
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

router.post('/', function(req, res, next) {
    console.log(req.query)
    let regdata = new RegData(req.query);
    regdata.save(function (err){ 
        if (err){
            console.log(err) 
            res.sendStatus(500)
        }})

    //check database contents
    RegData.find(function(err, items){
        if(err) {
            res.sendStatus(500)
            return console.error(err)
        }
            let reply = JSON.stringify(items)
        console.log(reply)
    })

    res.sendStatus(200) //OK
    })

module.exports = router