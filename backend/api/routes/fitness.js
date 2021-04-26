var express = require('express');
var router = express.Router();

//add new workout
module.exports.fitpost = function(req, res, next) {
    console.log(req.query)
    let workoutdata = new WorkoutData(req.query);

    //defaults
    workoutdata.completed = false

    workoutdata.save(function (err){ 
        if (err){
            console.log(err) 
            res.status(500).send({message: "workout, DB add error"})
            return
        }})

    res.status(200).send({message: "Workout added to DB"})
}

//get all workout data
//TODO just get data for one user
module.exports.fitget = function(req, res, next) {
    WorkoutData.find(function(err, items){
        if(err) {
            console.log(err)
            res.status(500).send({message: "get error, workout"})
            return
        }
        let reply = JSON.stringify(items)
        console.log(reply)
        res.send(reply)
    })
}

//delete workout by id
//TODO confirm user owns that workout
module.exports.fitdelete = function(req, res, next) {
    let deldata = WorkoutData.deleteMany({"_id": req.query.id}, function (err, result) {
      if(err){ 
          console.log(err)
          res.status(500).send({message: "delete error, workout"})
          return
      }
      else if(result.deletedCount < 1){
        res.status(500).send({message: "Couldn't find ID, workout delete"})
        return
      }
      else{
        res.status(200).send({message: "Workout removed from DB"})
      }
    })
}