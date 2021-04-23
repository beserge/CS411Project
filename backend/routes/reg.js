var express = require('express');
var router = express.Router();

var crypto = require('crypto');

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

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  hash: String,
  salt: String
});

UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

let UserData = mongoose.model('UserData', UserSchema)

router.post('/', function(req, res, next) {
    console.log(req.query)

    //fitness reg data
    let regdata = new RegData(req.query);
    regdata.save(function (err){ 
        if (err){
            console.log(err) 
            res.status(500).send({message: "reg, DB add error"})
        }})

    //user data
    let userdata = new UserData(req.query)
    userdata.setPassword(req.query.password)
    userdata.save(function (err){ 
        if (err){
            console.log(err) 
            res.status(500).send({message: "reg, DB add error"})
    }})

    res.status(200).send({message: "Reg added to DB"})
})

//debug and delete
router.delete('/', function(req, res, next){
    RegData.find(function(err, items){
        if(err) {
            return console.error(err)
        }
        let reply = JSON.stringify(items)
        console.log(reply)
    })

    UserData.find(function(err, items){
        if(err) {
            return console.error(err)
        }
            let reply = JSON.stringify(items)
        console.log(reply)
    })

    RegData.deleteMany({}, function(){})
    UserData.deleteMany({}, function(){})
    res.status(200).send({message: "delete all reg"})
})

module.exports = router