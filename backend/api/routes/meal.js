var express = require('express');
var router = express.Router();

var mongoose = require('mongoose')
var RegData = mongoose.model('MealData')

module.exports.mealpost = function(req, res, next) {
    if (!req.payload._id) {
        res.status(401).json({
          "message" : "UnauthorizedError: private profile"
    })}
    else {
        console.log(req.query)
        let mealdata = new MealData(req.query);
        mealdata.save(function (err){ 
            if (err){
                console.log(err) 
                res.status(500).send({message: "meal, DB save error"})
            }})

        //check database contents
        MealData.find(function(err, items){
            if(err) {
                return console.error(err)
            }
            let reply = JSON.stringify(items)
            console.log(reply)
        })

        res.status(200).send({message: "Meal added to DB"})
    }
}