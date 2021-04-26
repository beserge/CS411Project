var express = require('express');
var router = express.Router();

var mongoose = require('mongoose')
require('../api/models/users')
require('../api/models/reg')

var RegData = mongoose.model('RegData')
var UserData = mongoose.model('User')

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

router.get('/', function(err, res){
    UserData.find(function(err, items){
        if(err) {
            return console.error(err)
        }
            let reply = JSON.stringify(items)
        console.log(reply)
    })
    res.status(200).send({message: "yeah!"})
})

module.exports = router