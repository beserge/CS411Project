var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var RegData = mongoose.model('RegData');

module.exports.healthreg = function(req, res){
    let regdata = new RegData(req.query);
    regdata.save(function (err){ 
        if (err){
            console.log(err) 
            res.status(500).send({message: "reg, DB add error"})
        }})
}