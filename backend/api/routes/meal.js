var mongoose = require('mongoose')
var MealData = mongoose.model('MealData')

module.exports.mealget = function(req, res, next) {
    console.log(req.headers)

    if (!req.payload._id) {
        res.status(401).json({"message" : "UnauthorizedError: private profile"})
        return
    }

    MealData.find({userid: req.payload._id}).exec(function(err, items){
    // MealData.find(function(err, items){ // finds all
            if(err) {
                console.log(err)
                res.status(500).send({message: "get error, meal"})
            }
            else{
                // console.log(items)
                res.status(200).json(items)
            }
    })
}

module.exports.mealpost = function(req, res, next) {
    if (!req.payload._id) {
        res.status(401).json({
          "message" : "UnauthorizedError: private profile"
    })}
    else {
        let mealdata = new MealData(req.query);
        mealdata.userid = req.payload._id
 
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