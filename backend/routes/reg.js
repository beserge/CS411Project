var express = require('express');
var router = express.Router();

var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose')
require('../api/models/users')
require('../api/models/reg')

var RegData = mongoose.model('RegData')
var UserData = mongoose.model('User')

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